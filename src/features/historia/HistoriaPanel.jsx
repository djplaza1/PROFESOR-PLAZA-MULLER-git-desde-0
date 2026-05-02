// ═══════════════════════════════════════════════════
// HISTORIA PANEL – Aprendizaje de guiones con modo vocabulario
// Ahora incluye modo "Vocabulario" que:
//   - Muestra frases una por una
//   - Resalta en amarillo palabras del vocabulario del usuario
//   - Al final de cada frase muestra lista de palabras con traducción
// ═══════════════════════════════════════════════════
// NOTA: Íconos SVG inline para evitar conflictos React ↔ lucide.createIcons()
window.Muller.Panels['historia'] = function({ session }) {
    const { useState, useEffect, useRef, useCallback } = window.React;

    const MData = window.Muller.Data || {};

    // --- Helper: parsear guion a array de escenas ---
    function parseGuion(raw) {
        if (Array.isArray(raw)) return raw;
        if (raw && Array.isArray(raw.escenas)) return raw.escenas;
        return [];
    }

    // --- Estado reactivo del guion activo ---
    const [activeScriptId, setActiveScriptId] = useState(function() {
        return window.Muller.storage.get('activeScriptId', 'default');
    });
    const [guion, setGuion] = useState(function() {
        // Inicializar desde activeScriptId guardado
        var id = window.Muller.storage.get('activeScriptId', 'default');
        if (id !== 'default') {
            var scripts = window.Muller.storage.get('savedScripts', []);
            var found = scripts.find(function(s) { return s.id === id; });
            if (found) {
                window.Muller.activeScript = found;
                return parseGuion(found.escenas || found);
            }
        }
        return parseGuion(MData.defaultGuion);
    });

    useEffect(function() {
        // Cargar savedScripts y recomputar guion si activeScriptId ha cambiado
        var scripts = window.Muller.storage.get('savedScripts', []);
        setSavedScripts(scripts);
        
        var id = activeScriptId;
        if (id !== 'default') {
            var found = scripts.find(function(s) { return s.id === id; });
            if (found) {
                window.Muller.activeScript = found;
                var newGuion = parseGuion(found.escenas || found);
                setGuion(newGuion);
                return;
            }
        }
        // Fallback a guion por defecto
        window.Muller.activeScript = null;
        setGuion(parseGuion(MData.defaultGuion));
    }, [activeScriptId]);

    // Si no hay guion, mostrar loading
    var shouldShowLoading = !guion || !guion.length;

    const [sceneIndex, setSceneIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1.0);
    const [activeSubmodo, setActiveSubmodo] = useState(null);
    const [mode, setMode] = useState('dialogo');
    const [savedScripts, setSavedScripts] = useState([]);
    
    // Estados para modo Vocabulario (frase por frase)
    const [vocabModeActive, setVocabModeActive] = useState(false);
    const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
    const [sentences, setSentences] = useState([]);
    const [currentSentenceVocab, setCurrentSentenceVocab] = useState([]);
    const [showVocabTranslation, setShowVocabTranslation] = useState(true);
    const [shouldAutoPlayFirst, setShouldAutoPlayFirst] = useState(false);
    const autoPlayRef = useRef(null);
    
    // Estados para vocabulario del usuario en modo Diálogo normal
    const [sceneUserVocab, setSceneUserVocab] = useState([]);
    const [showSceneVocab, setShowSceneVocab] = useState(true);

    // Si no hay guion, return early
    if (shouldShowLoading) {
        return window.React.createElement('div', { className: 'flex items-center justify-center h-full bg-gray-900 text-white' },
            window.React.createElement('p', null, 'Cargando guion...')
        );
    }

    const escena = guion[sceneIndex] || guion[0];

    useEffect(() => {
        const scripts = window.Muller.storage.get('savedScripts', []);
        setSavedScripts(scripts);
    }, []);

    const textoAleman = escena ? window.Muller.sanitizeHistoriaText(escena.text_de || escena.text) : '';
    const textoEspanol = escena ? escena.translation || '' : '';

    // Cuando se activa el modo vocabulario, dividir el texto en oraciones
    useEffect(() => {
        if (vocabModeActive && textoAleman) {
            var oraciones = window.Muller.Resaltador.dividirEnOraciones(textoAleman);
            setSentences(oraciones);
            setCurrentSentenceIdx(0);
            setShowVocabTranslation(true);
        }
    }, [vocabModeActive, sceneIndex, textoAleman]);

    // Cuando cambia la oración actual, buscar vocabulario del usuario
    useEffect(() => {
        if (!vocabModeActive || sentences.length === 0) return;
        var currentSentence = sentences[currentSentenceIdx] || '';
        var foundVocab = window.Muller.Resaltador.findUserVocabInText(currentSentence);
        setCurrentSentenceVocab(foundVocab);
        setShowVocabTranslation(true);
    }, [vocabModeActive, currentSentenceIdx, sentences]);

    // Detectar vocabulario del usuario en la escena actual (modo Diálogo normal)
    useEffect(() => {
        if (vocabModeActive) return;
        if (textoAleman) {
            var foundVocab = window.Muller.Resaltador.findUserVocabInText(textoAleman);
            setSceneUserVocab(foundVocab);
            setShowSceneVocab(true);
        } else {
            setSceneUserVocab([]);
        }
    }, [sceneIndex, textoAleman, vocabModeActive]);

    // Auto-play temporizado
    useEffect(() => {
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, []);

    const playScene = useCallback(() => {
        if (!textoAleman) return;
        window.Muller.stopSpeech();
        window.Muller.playSceneAudio(textoAleman, 'de');
        setIsPlaying(true);
    }, [textoAleman]);

    const pauseScene = () => {
        window.Muller.pauseSpeech();
        setIsPlaying(false);
    };

    const stopScene = () => {
        window.Muller.stopSpeech();
        setIsPlaying(false);
    };

    const changeSpeed = (newSpeed) => {
        setSpeed(newSpeed);
        window.Muller.setTtsRate(newSpeed);
    };

    const nextScene = () => {
        stopScene();
        setSceneIndex(prev => Math.min(prev + 1, guion.length - 1));
    };
    const prevScene = () => {
        stopScene();
        setSceneIndex(prev => Math.max(prev - 1, 0));
    };

    const activarSubmodo = (id) => {
        stopScene();
        setActiveSubmodo(id);
    };
    const salirSubmodo = () => setActiveSubmodo(null);

    // Auto-play la primera frase al activar modo vocabulario desde el botón bookmark
    useEffect(() => {
        if (shouldAutoPlayFirst && vocabModeActive && sentences.length > 0 && currentSentenceIdx < sentences.length) {
            setShouldAutoPlayFirst(false);
            var sentence = sentences[currentSentenceIdx];
            if (sentence) {
                window.Muller.stopSpeech();
                window.Muller.playSceneAudio(sentence, 'de');
            }
        }
    }, [shouldAutoPlayFirst, vocabModeActive, sentences, currentSentenceIdx]);

    // --- Modo Vocabulario: navegación de oraciones ---
    const activateVocabMode = () => {
        stopScene();
        setVocabModeActive(true);
        setActiveSubmodo(null);
        setShouldAutoPlayFirst(true);
    };

    const deactivateVocabMode = () => {
        stopScene();
        setVocabModeActive(false);
        setCurrentSentenceIdx(0);
        setSentences([]);
        setCurrentSentenceVocab([]);
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    };

    const nextSentence = () => {
        setCurrentSentenceIdx(prev => {
            var next = prev + 1;
            return next < sentences.length ? next : 0; // Volver al inicio si llegamos al final
        });
    };

    const prevSentence = () => {
        setCurrentSentenceIdx(prev => {
            var prevIdx = prev - 1;
            return prevIdx >= 0 ? prevIdx : sentences.length - 1; // Ir al final si estamos al inicio
        });
    };

    const startAutoPlay = () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        var speedMs = 4000 + (parseInt(speed * 3000)); // 4s + ajuste de velocidad
        autoPlayRef.current = setInterval(function() {
            setCurrentSentenceIdx(function(prev) {
                var next = prev + 1;
                if (next >= sentences.length) {
                    clearInterval(autoPlayRef.current);
                    autoPlayRef.current = null;
                    return prev;
                }
                return next;
            });
        }, speedMs);
    };

    const stopAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    };

    const speakCurrentSentence = () => {
        var sentence = sentences[currentSentenceIdx];
        if (!sentence) return;
        window.Muller.stopSpeech();
        window.Muller.playSceneAudio(sentence, 'de');
    };

    // SVG inline para todos los iconos (sin depender de lucide.createIcons)
    var ICON_SVGS = {
        'play': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
        'pause': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
        'skip-forward': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>',
        'skip-back': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>',
        'square': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>',
        'book-open': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
        'bookmark': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
        'users': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        'mic': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
        'clock': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        'edit-3': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
        'align-left': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="17" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>',
        'type': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
        'table': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>',
        'ear': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"/></svg>',
        'volume-1': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
        'volume-2': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
        'circle': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>',
        'chevron-left': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
        'chevron-right': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
        'x': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
        'eye': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
        'eye-off': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
        'gauge': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15l-2-5 7-2-2 5z"/><circle cx="12" cy="12" r="10"/></svg>'
    };

    var crearIcono = function(iconName, size) {
        if (size === undefined) size = 18;
        if (!iconName) return null;
        var svgString = ICON_SVGS[iconName.toLowerCase()];
        if (!svgString) return null;
        var resized = svgString.replace('width="24"', 'width="' + size + '"').replace('height="24"', 'height="' + size + '"');
        return window.React.createElement('span', {
            style: { display: 'inline-flex', width: size, height: size },
            dangerouslySetInnerHTML: { __html: resized }
        });
    };

    var Icon = function({ name, size }) {
        if (size === undefined) size = 18;
        return crearIcono(name, size);
    };

    const GlassButton = ({ icon, label, onClick, disabled, active, className = '', ...props }) =>
        window.React.createElement('button', {
            onClick,
            disabled,
            className: 'flex flex-col items-center gap-0.5 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-lg px-2 py-1.5 text-white hover:bg-white/20 transition disabled:opacity-50 ' + (active ? 'ring-2 ring-amber-400 ' : '') + className,
            title: label,
            ...props
        },
            crearIcono(icon, 16),
            window.React.createElement('span', { className: 'text-[0.5rem] leading-tight font-medium whitespace-nowrap' }, label || '')
        );

    // --- Renderizado del modo Vocabulario (frase por frase) ---
    var renderVocabMode = function() {
        if (sentences.length === 0) {
            return window.React.createElement('div', { className: 'text-center py-8 text-gray-400 text-sm' },
                'No se pudieron dividir las oraciones del texto actual.'
            );
        }

        var currentSentence = sentences[currentSentenceIdx] || '';
        var progressPct = ((currentSentenceIdx + 1) / sentences.length * 100);
        var isAutoPlaying = autoPlayRef.current !== null;

        return window.React.createElement('div', { className: 'flex flex-col items-center w-full max-w-2xl mx-auto animate-fadeIn' },
            // Barra de progreso
            window.React.createElement('div', { className: 'w-full mb-4' },
                window.React.createElement('div', { className: 'flex justify-between text-xs text-gray-500 mb-1' },
                    window.React.createElement('span', null, 'Frase ' + (currentSentenceIdx + 1) + ' / ' + sentences.length),
                    window.React.createElement('span', null, Math.round(progressPct) + '%')
                ),
                window.React.createElement('div', { className: 'w-full h-1.5 bg-white/10 rounded-full overflow-hidden' },
                    window.React.createElement('div', {
                        className: 'h-full bg-amber-500 rounded-full transition-all duration-500',
                        style: { width: progressPct + '%' }
                    })
                )
            ),

            // Indicador de modo
            window.React.createElement('div', { className: 'flex items-center gap-2 mb-3' },
                window.React.createElement('span', { className: 'text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full' }, 'Modo Vocabulario'),
                isAutoPlaying ? window.React.createElement('span', { className: 'text-xs text-emerald-400 animate-pulse' }, '▶ Auto') : null
            ),

            // Frase actual con palabras resaltadas
            window.React.createElement('div', { className: 'w-full p-6 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 mb-4' },
                window.React.createElement('p', { className: 'text-2xl md:text-3xl font-serif leading-relaxed tracking-wide text-white text-center' },
                    window.Muller.Resaltador.resaltar(currentSentence, [], currentSentenceVocab.map(function(v) { return v.word; }))
                ),
                window.React.createElement('div', { className: 'flex justify-center gap-2 mt-4' },
                    window.React.createElement('button', {
                        onClick: speakCurrentSentence,
                        className: 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition cursor-pointer'
                    },
                        crearIcono('volume-2', 14),
                        window.React.createElement('span', null, 'Escuchar')
                    ),
                    window.React.createElement('button', {
                        onClick: function() { setShowVocabTranslation(!showVocabTranslation); },
                        className: 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition cursor-pointer'
                    },
                        crearIcono(showVocabTranslation ? 'eye-off' : 'eye', 14),
                        window.React.createElement('span', null, showVocabTranslation ? 'Ocultar vocabulario' : 'Ver vocabulario')
                    )
                )
            ),

        // Panel de vocabulario de la frase (mostrar las palabras del usuario que aparecen)
        showVocabTranslation && currentSentenceVocab.length > 0 && window.React.createElement('div', { className: 'w-full p-4 rounded-2xl backdrop-blur-md bg-yellow-500/5 border border-yellow-500/20 mb-4 animate-fadeIn' },
            window.React.createElement('h4', { className: 'text-sm font-bold text-yellow-300 mb-3 flex items-center gap-2' },
                crearIcono('bookmark', 16),
                window.React.createElement('span', null, 'Vocabulario en esta frase (' + currentSentenceVocab.length + ')')
            ),
            window.React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-2 gap-2' },
                currentSentenceVocab.map(function(item, idx) {
                    // Extraer artículo si existe en la palabra original
                    var wordWithArticle = item.vocabInfo.de || item.word;
                    var article = '';
                    var wordDisplay = wordWithArticle;
                    var articleMatch = wordWithArticle.match(/^(der|die|das)\s+(.+)/i);
                    if (articleMatch) {
                        article = articleMatch[1];
                        wordDisplay = articleMatch[2];
                    }
                    return window.React.createElement('div', {
                        key: idx,
                        className: 'flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm'
                    },
                        window.React.createElement('div', { className: 'flex items-center gap-2' },
                            article ? window.React.createElement('span', { className: 'text-xs font-bold px-1.5 py-0.5 rounded ' +
                                (article === 'der' ? 'bg-blue-500/30 text-blue-300' :
                                 article === 'die' ? 'bg-red-500/30 text-red-300' :
                                 article === 'das' ? 'bg-green-500/30 text-green-300' :
                                 'bg-gray-500/30 text-gray-300')
                            }, article) : null,
                            window.React.createElement('span', { className: 'text-yellow-200 font-medium' }, wordDisplay)
                        ),
                        window.React.createElement('div', { className: 'flex items-center gap-2' },
                            item.vocabInfo.level && item.vocabInfo.level !== '?' ? window.React.createElement('span', { className: 'text-[10px] px-1.5 py-0.5 rounded-full ' +
                                (['A1','A2'].includes(item.vocabInfo.level) ? 'bg-emerald-500/20 text-emerald-300' :
                                 ['B1','B2'].includes(item.vocabInfo.level) ? 'bg-amber-500/20 text-amber-300' :
                                 'bg-red-500/20 text-red-300')
                            }, item.vocabInfo.level) : null,
                            window.React.createElement('span', { className: 'text-gray-400' }, item.vocabInfo.es)
                        )
                    );
                })
            )
        ),

            // Sin vocabulario en esta frase
            showVocabTranslation && currentSentenceVocab.length === 0 && window.React.createElement('div', { className: 'w-full p-4 rounded-2xl backdrop-blur-md bg-gray-800/50 border border-gray-700/30 mb-4 text-center text-sm text-gray-500' },
                'No hay palabras de tu vocabulario en esta frase.'
            ),

            // Navegación entre oraciones
            window.React.createElement('div', { className: 'flex items-center gap-3 mt-2' },
                window.React.createElement('button', {
                    onClick: prevSentence,
                    disabled: sentences.length <= 1,
                    className: 'flex items-center gap-1 px-4 py-2 rounded-xl text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition disabled:opacity-40 cursor-pointer'
                },
                    crearIcono('chevron-left', 16),
                    window.React.createElement('span', null, 'Anterior')
                ),
                window.React.createElement('span', { className: 'text-xs text-gray-500' }, (currentSentenceIdx + 1) + ' / ' + sentences.length),
                window.React.createElement('button', {
                    onClick: nextSentence,
                    disabled: sentences.length <= 1,
                    className: 'flex items-center gap-1 px-4 py-2 rounded-xl text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition disabled:opacity-40 cursor-pointer'
                },
                    window.React.createElement('span', null, 'Siguiente'),
                    crearIcono('chevron-right', 16)
                )
            ),

            // Botón de auto-play
            window.React.createElement('div', { className: 'flex gap-2 mt-3' },
                isAutoPlaying
                    ? window.React.createElement('button', {
                        onClick: stopAutoPlay,
                        className: 'flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition cursor-pointer'
                    },
                        crearIcono('pause', 14),
                        window.React.createElement('span', null, 'Detener auto')
                    )
                    : window.React.createElement('button', {
                        onClick: startAutoPlay,
                        disabled: currentSentenceIdx >= sentences.length - 1,
                        className: 'flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition cursor-pointer disabled:opacity-40'
                    },
                        crearIcono('play', 14),
                        window.React.createElement('span', null, 'Auto-play')
                    ),
                window.React.createElement('button', {
                    onClick: deactivateVocabMode,
                    className: 'flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs bg-gray-500/20 text-gray-300 border border-gray-500/30 hover:bg-gray-500/30 transition cursor-pointer'
                },
                    crearIcono('x', 14),
                    window.React.createElement('span', null, 'Salir')
                )
            )
        );
    };

    const renderSubmodo = () => {
        if (!activeSubmodo) return null;
        const submodoEntry = window.Muller.Submodos && window.Muller.Submodos[activeSubmodo];
        if (!submodoEntry) return window.React.createElement('div', { className: 'text-white' }, 'Submodo no encontrado');
        const SubmodoComponent = typeof submodoEntry === 'function' ? submodoEntry : submodoEntry.render;
        if (!SubmodoComponent) return window.React.createElement('div', { className: 'text-white' }, 'Submodo no encontrado');

        if (activeSubmodo === 'tempus') {
            return window.React.createElement('div', { className: 'w-full max-w-2xl mx-auto bg-gray-900 text-white' },
                window.React.createElement(SubmodoComponent, { escena, currentScene: escena, guion, sceneIndex, salir: salirSubmodo })
            );
        }

        return window.React.createElement('div', { className: 'w-full h-full flex flex-col bg-gray-900 text-white' },
            window.React.createElement('button', {
                onClick: salirSubmodo,
                className: 'self-start mb-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-4 py-1 text-white text-sm hover:bg-white/20'
            }, '← Volver al diálogo'),
            window.React.createElement('div', { className: 'flex-1 overflow-auto bg-gray-900 text-white' },
                window.React.createElement(SubmodoComponent, { escena, currentScene: escena, guion, sceneIndex, salir: salirSubmodo })
            )
        );
    };

    const renderOralMode = () =>
        window.React.createElement('div', { className: 'w-full max-w-2xl mx-auto text-white' },
            window.React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Entrevista oral B1'),
            window.React.createElement('p', { className: 'mb-4' }, 'Responde oralmente a las preguntas. Pulsa el micrófono para grabar tu respuesta.'),
            window.React.createElement('button', { onClick: () => setMode('dialogo'), className: 'glass-btn mt-4' }, 'Volver al diálogo')
        );

    const renderRoleplay = () =>
        window.React.createElement('div', { className: 'w-full max-w-2xl mx-auto text-white' },
            window.React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Roleplay'),
            window.React.createElement('p', {}, 'Elige un personaje y practica la conversación.'),
            window.React.createElement('button', { onClick: () => setMode('dialogo'), className: 'glass-btn mt-4' }, 'Volver al diálogo')
        );

    return window.React.createElement('div', { className: 'flex flex-col h-full bg-gray-900 text-gray-100' },
        window.React.createElement('div', { className: 'flex flex-wrap gap-1 p-2 bg-gray-800/80 backdrop-blur-md border-b border-white/10' },
            window.React.createElement(GlassButton, { icon: 'book-open', label: 'Diálogo', onClick: () => { setMode('dialogo'); setActiveSubmodo(null); deactivateVocabMode(); }, active: mode === 'dialogo' && !activeSubmodo && !vocabModeActive }),
            window.React.createElement(GlassButton, { icon: 'bookmark', label: 'Vocabulario', onClick: () => { setMode('dialogo'); activateVocabMode(); }, active: vocabModeActive }),
            window.React.createElement(GlassButton, { icon: 'users', label: 'Roleplay', onClick: () => { setMode('roleplay'); setActiveSubmodo(null); deactivateVocabMode(); }, active: mode === 'roleplay' }),
            window.React.createElement(GlassButton, { icon: 'mic', label: 'Oral', onClick: () => { setMode('oral'); setActiveSubmodo(null); deactivateVocabMode(); }, active: mode === 'oral' }),
            window.React.createElement('div', { className: 'w-px bg-white/20 mx-1' }),
            ...Object.keys(window.Muller.Submodos || {}).map(key =>
                window.React.createElement(GlassButton, {
                    key,
                    icon: key === 'diktat' ? 'edit-3' : key === 'huecos' ? 'square' : key === 'satzbau' ? 'align-left' : key === 'articulos' ? 'type' : key === 'declinar' ? 'table' : key === 'tempus' ? 'clock' : key === 'oido' ? 'ear' : key === 'fluestern' ? 'volume-1' : key === 'ruido' ? 'volume-2' : 'circle',
                    label: key.charAt(0).toUpperCase() + key.slice(1),
                    onClick: () => { activarSubmodo(key); deactivateVocabMode(); },
                    active: activeSubmodo === key
                })
            ),
            window.React.createElement('select', {
                value: activeScriptId,
                className: 'backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-3 py-1 text-sm text-white ml-2',
                onChange: (e) => {
                    var newId = e.target.value;
                    // Guardar en localStorage para persistencia
                    window.Muller.storage.set('activeScriptId', newId);
                    // Actualizar estado reactivo (dispara useEffect que recarga el guion)
                    setActiveScriptId(newId);
                    // Resetear a primera escena
                    setSceneIndex(0);
                }
            },
                window.React.createElement('option', { value: 'default' }, 'Guión por defecto'),
                savedScripts.map(s => window.React.createElement('option', { key: s.id, value: s.id }, s.title))
            )
        ),
        window.React.createElement('div', { className: 'flex-1 flex items-center justify-center overflow-auto p-4' },
            // Modo Vocabulario (frase por frase)
            vocabModeActive && renderVocabMode(),

            // Modo Diálogo normal
            !vocabModeActive && mode === 'dialogo' && !activeSubmodo && window.React.createElement('div', { className: 'text-center max-w-2xl animate-fadeIn w-full' },
                window.React.createElement('div', { className: 'mb-6' },
                    window.React.createElement('p', { className: 'text-3xl md:text-4xl font-serif leading-relaxed mb-4 tracking-wide' },
                        textoAleman ? window.Muller.Resaltador.resaltar(textoAleman, [], sceneUserVocab.map(function(v) { return v.word; })) : ''
                    ),
                    showTranslation && window.React.createElement('p', { className: 'text-lg text-gray-400 italic' }, textoEspanol),
                    window.React.createElement('button', {
                        onClick: () => setShowTranslation(!showTranslation),
                        className: 'text-sm text-amber-400 underline mt-2'
                    }, showTranslation ? 'Ocultar traducción' : 'Ver traducción')
                ),
                escena && escena.vocab && escena.vocab.length > 0 && window.React.createElement('div', { className: 'flex flex-wrap justify-center gap-2 mt-4' },
                    escena.vocab.map((palabra, idx) =>
                        window.React.createElement('span', {
                            key: idx,
                            className: 'px-2 py-1 rounded-full text-xs font-medium cursor-pointer bg-yellow-500/20 text-yellow-300',
                            title: palabra.es || '',
                            onClick: () => window.Muller.speakGermanWord(palabra.de || '')
                        }, palabra.de || '')
                    )
                ),
                // Panel de vocabulario del usuario en la escena actual
                showSceneVocab && sceneUserVocab.length > 0 && window.React.createElement('div', { className: 'mt-6 p-4 rounded-2xl backdrop-blur-md bg-yellow-500/5 border border-yellow-500/20 text-left' },
                    window.React.createElement('div', { className: 'flex items-center justify-between mb-3' },
                        window.React.createElement('h4', { className: 'text-sm font-bold text-yellow-300 flex items-center gap-2' },
                            crearIcono('bookmark', 16),
                            window.React.createElement('span', null, 'Tu vocabulario en esta escena (' + sceneUserVocab.length + ')')
                        ),
                        window.React.createElement('button', {
                            onClick: function() { setShowSceneVocab(false); },
                            className: 'text-xs text-gray-500 hover:text-white transition cursor-pointer'
                        },
                            crearIcono('x', 14)
                        )
                    ),
                    window.React.createElement('div', { className: 'flex flex-wrap gap-2' },
                        sceneUserVocab.map(function(item, idx) {
                            var wordWithArticle = item.vocabInfo.de || item.word;
                            var article = '';
                            var wordDisplay = wordWithArticle;
                            var articleMatch = wordWithArticle.match(/^(der|die|das)\s+(.+)/i);
                            if (articleMatch) {
                                article = articleMatch[1];
                                wordDisplay = articleMatch[2];
                            }
                            return window.React.createElement('div', {
                                key: idx,
                                className: 'flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs'
                            },
                                article ? window.React.createElement('span', { className: 'font-bold px-1 py-0.5 rounded text-[10px] ' +
                                    (article === 'der' ? 'bg-blue-500/30 text-blue-300' :
                                     article === 'die' ? 'bg-red-500/30 text-red-300' :
                                     article === 'das' ? 'bg-green-500/30 text-green-300' :
                                     'bg-gray-500/30 text-gray-300')
                                }, article) : null,
                                window.React.createElement('span', { className: 'text-yellow-200 font-medium' }, wordDisplay),
                                item.vocabInfo.level && item.vocabInfo.level !== '?' ? window.React.createElement('span', { className: 'text-[9px] px-1 py-0.5 rounded-full ' +
                                    (['A1','A2'].includes(item.vocabInfo.level) ? 'bg-emerald-500/20 text-emerald-300' :
                                     ['B1','B2'].includes(item.vocabInfo.level) ? 'bg-amber-500/20 text-amber-300' :
                                     'bg-red-500/20 text-red-300')
                                }, item.vocabInfo.level) : null,
                                window.React.createElement('span', { className: 'text-gray-400' }, '→ ' + item.vocabInfo.es)
                            );
                        })
                    )
                ),
                // Botón para re-mostrar vocabulario si se ocultó
                !showSceneVocab && sceneUserVocab.length > 0 && window.React.createElement('button', {
                    onClick: function() { setShowSceneVocab(true); },
                    className: 'mt-3 text-xs text-yellow-500/70 hover:text-yellow-300 transition cursor-pointer'
                }, 'Mostrar vocabulario (' + sceneUserVocab.length + ' palabras)'),
                window.React.createElement('div', { className: 'mt-6 text-xs text-gray-500' }, 'Escena ' + (sceneIndex + 1) + ' / ' + guion.length)
            ),
            mode === 'oral' && !activeSubmodo && renderOralMode(),
            mode === 'roleplay' && !activeSubmodo && renderRoleplay(),
            mode === 'dialogo' && activeSubmodo === 'tempus' && window.React.createElement('div', { className: 'text-center max-w-2xl animate-fadeIn' },
                window.React.createElement('div', { className: 'mb-6' },
                    window.React.createElement('p', { className: 'text-3xl md:text-4xl font-serif leading-relaxed mb-4 tracking-wide' }, textoAleman),
                    showTranslation && window.React.createElement('p', { className: 'text-lg text-gray-400 italic' }, textoEspanol),
                    window.React.createElement('button', {
                        onClick: () => setShowTranslation(!showTranslation),
                        className: 'text-sm text-amber-400 underline mt-2'
                    }, showTranslation ? 'Ocultar traducción' : 'Ver traducción')
                ),
                escena && escena.vocab && escena.vocab.length > 0 && window.React.createElement('div', { className: 'flex flex-wrap justify-center gap-2 mt-4' },
                    escena.vocab.map((palabra, idx) =>
                        window.React.createElement('span', {
                            key: idx,
                            className: 'px-2 py-1 rounded-full text-xs font-medium cursor-pointer bg-yellow-500/20 text-yellow-300',
                            title: palabra.es || '',
                            onClick: () => window.Muller.speakGermanWord(palabra.de || '')
                        }, palabra.de || '')
                    )
                ),
                window.React.createElement('div', { className: 'mt-6 text-xs text-gray-500' }, 'Escena ' + (sceneIndex + 1) + ' / ' + guion.length),
                renderSubmodo()
            ),
            activeSubmodo && activeSubmodo !== 'tempus' && renderSubmodo(),
            !activeSubmodo && mode !== 'dialogo' && mode !== 'oral' && mode !== 'roleplay' && null
        ),
        window.React.createElement('div', { className: 'muller-historia-player-bar fixed bottom-[40px] left-1/2 -translate-x-1/2 z-[110] backdrop-blur-xl bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(17,24,39,0.8)] border border-[rgba(255,255,255,0.2)] rounded-xl px-4 py-1.5 flex items-center justify-center gap-4 max-w-md w-auto' },
            window.React.createElement('div', { className: 'flex items-center gap-1.5' },
                window.React.createElement(GlassButton, { icon: 'skip-back', label: 'Anterior', onClick: vocabModeActive ? prevSentence : prevScene, disabled: vocabModeActive ? sentences.length <= 1 : sceneIndex === 0 }),
                isPlaying
                    ? window.React.createElement(GlassButton, { icon: 'pause', label: 'Pausa', onClick: pauseScene })
                    : window.React.createElement(GlassButton, { icon: 'play', label: 'Reproducir', onClick: vocabModeActive ? speakCurrentSentence : playScene }),
                window.React.createElement(GlassButton, { icon: 'square', label: 'Detener', onClick: stopScene }),
                window.React.createElement(GlassButton, { icon: 'skip-forward', label: 'Siguiente', onClick: vocabModeActive ? nextSentence : nextScene, disabled: vocabModeActive ? sentences.length <= 1 : sceneIndex >= guion.length - 1 })
            ),
            window.React.createElement('div', { className: 'flex items-center gap-2' },
                crearIcono('gauge', 14),
                window.React.createElement('input', {
                    type: 'range',
                    min: '0.25',
                    max: '3.0',
                    step: '0.05',
                    value: speed,
                    onChange: e => changeSpeed(parseFloat(e.target.value)),
                    style: {
                        width: 80,
                        height: 4,
                        WebkitAppearance: 'none',
                        appearance: 'none',
                        background: 'linear-gradient(to right, #06b6d4 ' + ((speed - 0.25) / (3.0 - 0.25)) * 100 + '%, rgba(255,255,255,0.2) ' + ((speed - 0.25) / (3.0 - 0.25)) * 100 + '%)',
                        borderRadius: 2,
                        cursor: 'pointer',
                        outline: 'none'
                    }
                }),
                window.React.createElement('span', { className: 'text-xs text-gray-400 font-mono min-w-[3rem] text-right' }, speed.toFixed(2) + '×')
            )
        )
    );
};