// ═══════════════════════════════════════════════════
// HISTORIA PANEL – Aprendizaje de guiones con modo vocabulario
// Ahora incluye modo "Vocabulario" que:
//   - Muestra frases una por una
//   - Resalta en amarillo palabras del vocabulario del usuario
//   - Al final de cada frase muestra lista de palabras con traducción
// ═══════════════════════════════════════════════════
window.Muller.Panels['historia'] = function({ session }) {
    const { useState, useEffect, useRef, useCallback } = window.React;
    const lucide = window.lucide;

    const MData = window.Muller.Data || {};
    const guionRaw = MData.defaultGuion;
    let guion;
    if (Array.isArray(guionRaw)) {
        guion = guionRaw;
    } else if (guionRaw && Array.isArray(guionRaw.escenas)) {
        guion = guionRaw.escenas;
    } else {
        guion = [];
    }

    if (!guion.length) {
        return window.React.createElement('div', { className: 'flex items-center justify-center h-full bg-gray-900 text-white' },
            window.React.createElement('p', null, 'Cargando guion...')
        );
    }

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
    const autoPlayRef = useRef(null);
    
    // Estados para vocabulario del usuario en modo Diálogo normal
    const [sceneUserVocab, setSceneUserVocab] = useState([]);
    const [showSceneVocab, setShowSceneVocab] = useState(true);

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

    // --- Modo Vocabulario: navegación de oraciones ---
    const activateVocabMode = () => {
        stopScene();
        setVocabModeActive(true);
        setActiveSubmodo(null);
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

    // Regenerar iconos Lucide después de que React termine su reconciliación
    // Usar requestAnimationFrame para ejecutarse DESPUÉS del próximo paint
    // No usar MutationObserver porque interfiere con React al detectar cambios
    // que ocurren durante la reconciliación del virtual DOM
    useEffect(() => {
        if (!window.lucide) return;
        let cancelled = false;
        const raf = requestAnimationFrame(() => {
            if (cancelled) return;
            try {
                // Resetear asignaciones previas para que lucide ignore nodos <svg>
                // que ya fueron convertidos (evita removeChild en nodos que React movió)
                window.lucide.createIcons();
            } catch (e) {
                // Ignorar NotFoundError: React desmontó nodos durante el proceso
            }
        });
        return () => {
            cancelled = true;
            cancelAnimationFrame(raf);
        };
    });

    const Icon = ({ name, size = 18, className = '' }) => {
        if (!name) return null;
        return window.React.createElement('i', {
            'data-lucide': name,
            style: { width: size, height: size, display: 'inline-block' }
        });
    };

    const GlassButton = ({ icon, label, onClick, disabled, active, className = '', ...props }) =>
        window.React.createElement('button', {
            onClick,
            disabled,
            className: 'flex flex-col items-center gap-0.5 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-lg px-2 py-1.5 text-white hover:bg-white/20 transition disabled:opacity-50 ' + (active ? 'ring-2 ring-amber-400 ' : '') + className,
            title: label,
            ...props
        },
            window.React.createElement(Icon, { name: icon, size: 16 }),
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
                        window.React.createElement(Icon, { name: 'volume-2', size: 14 }),
                        window.React.createElement('span', null, 'Escuchar')
                    ),
                    window.React.createElement('button', {
                        onClick: function() { setShowVocabTranslation(!showVocabTranslation); },
                        className: 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition cursor-pointer'
                    },
                        window.React.createElement(Icon, { name: showVocabTranslation ? 'eye-off' : 'eye', size: 14 }),
                        window.React.createElement('span', null, showVocabTranslation ? 'Ocultar vocabulario' : 'Ver vocabulario')
                    )
                )
            ),

        // Panel de vocabulario de la frase (mostrar las palabras del usuario que aparecen)
        showVocabTranslation && currentSentenceVocab.length > 0 && window.React.createElement('div', { className: 'w-full p-4 rounded-2xl backdrop-blur-md bg-yellow-500/5 border border-yellow-500/20 mb-4 animate-fadeIn' },
            window.React.createElement('h4', { className: 'text-sm font-bold text-yellow-300 mb-3 flex items-center gap-2' },
                window.React.createElement(Icon, { name: 'bookmark', size: 16 }),
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
                    window.React.createElement(Icon, { name: 'chevron-left', size: 16 }),
                    window.React.createElement('span', null, 'Anterior')
                ),
                window.React.createElement('span', { className: 'text-xs text-gray-500' }, (currentSentenceIdx + 1) + ' / ' + sentences.length),
                window.React.createElement('button', {
                    onClick: nextSentence,
                    disabled: sentences.length <= 1,
                    className: 'flex items-center gap-1 px-4 py-2 rounded-xl text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition disabled:opacity-40 cursor-pointer'
                },
                    window.React.createElement('span', null, 'Siguiente'),
                    window.React.createElement(Icon, { name: 'chevron-right', size: 16 })
                )
            ),

            // Botón de auto-play
            window.React.createElement('div', { className: 'flex gap-2 mt-3' },
                isAutoPlaying
                    ? window.React.createElement('button', {
                        onClick: stopAutoPlay,
                        className: 'flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition cursor-pointer'
                    },
                        window.React.createElement(Icon, { name: 'pause', size: 14 }),
                        window.React.createElement('span', null, 'Detener auto')
                    )
                    : window.React.createElement('button', {
                        onClick: startAutoPlay,
                        disabled: currentSentenceIdx >= sentences.length - 1,
                        className: 'flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition cursor-pointer disabled:opacity-40'
                    },
                        window.React.createElement(Icon, { name: 'play', size: 14 }),
                        window.React.createElement('span', null, 'Auto-play')
                    ),
                window.React.createElement('button', {
                    onClick: deactivateVocabMode,
                    className: 'flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs bg-gray-500/20 text-gray-300 border border-gray-500/30 hover:bg-gray-500/30 transition cursor-pointer'
                },
                    window.React.createElement(Icon, { name: 'x', size: 14 }),
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
            return window.React.createElement('div', { className: 'w-full max-w-2xl mx-auto' },
                window.React.createElement(SubmodoComponent, { escena, currentScene: escena, guion, sceneIndex, salir: salirSubmodo })
            );
        }

        return window.React.createElement('div', { className: 'w-full h-full flex flex-col' },
            window.React.createElement('button', {
                onClick: salirSubmodo,
                className: 'self-start mb-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-4 py-1 text-white text-sm hover:bg-white/20'
            }, '← Volver al diálogo'),
            window.React.createElement('div', { className: 'flex-1 overflow-auto' },
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
                className: 'backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-3 py-1 text-sm text-white ml-2',
                onChange: (e) => {
                    if (e.target.value === 'default') setSceneIndex(0);
                    else {
                        var script = savedScripts.find(function(s) { return s.id === e.target.value; });
                        if (script) window.Muller.activeScript = script;
                    }
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
                            window.React.createElement(Icon, { name: 'bookmark', size: 16 }),
                            window.React.createElement('span', null, 'Tu vocabulario en esta escena (' + sceneUserVocab.length + ')')
                        ),
                        window.React.createElement('button', {
                            onClick: function() { setShowSceneVocab(false); },
                            className: 'text-xs text-gray-500 hover:text-white transition cursor-pointer'
                        },
                            window.React.createElement(Icon, { name: 'x', size: 14 })
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
                window.React.createElement('i', { 'data-lucide': 'gauge', style: { width: 14, height: 14, color: '#94a3b8' } }),
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