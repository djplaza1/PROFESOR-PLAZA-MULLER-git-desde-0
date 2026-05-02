// src/features/lectura/hooks/useLectura.js
// Hook principal que encapsula todo el estado y lógica de Lectura
// Se registra como window.Muller.LecturaHooks.useLectura
window.Muller = window.Muller || {};
window.Muller.LecturaHooks = window.Muller.LecturaHooks || {};

// CONFIG - Tiempos de rondas y umbrales
var ROUNDS_CONFIG = {
  timePenaltyPercent: 0.20,      // 20% menos de tiempo cada ronda
  maxRounds: 3,
  initialTimeBuffer: 0.3,       // buffer sobre tiempo estimado para ronda 1
  minTimeSeconds: 10
};

// CONFIG - SpeechRecognition
var SR_CONFIG = {
  lang: 'de-DE',
  continuous: true,
  interimResults: true,
  maxRestartAttempts: 5,
  restartDelay: 120
};

// CONFIG - Storage keys
var STORAGE_KEYS = {
  history: 'muller_reading_history',
  recordings: 'muller_reading_recordings',
  streak: 'muller_reading_streak',
  texts: 'muller_reading_texts',
  preferences: 'muller_reading_prefs'
};

// Hook principal
window.Muller.LecturaHooks.useLectura = function(opts) {
  opts = opts || {};
  var initialText = opts.initialText || '';

  // ─── ESTADOS PRINCIPALES ───
  var source = React.useState('');        // fuente actual ('library', 'paste', 'pdf')
  var text = React.useState(initialText); // texto completo a leer
  var tokens = React.useState([]);        // tokens del texto tokenizado
  var activeWord = React.useState(null);  // palabra clickeada
  var wordInfo = React.useState(null);    // info de traducción/verbo de palabra activa
  var selectedText = React.useState('');  // texto seleccionado con el ratón
  var fontSize = React.useState(18);      // tamaño de fuente
  var showTranslation = React.useState(false); // panel de traducción visible

  // ─── ESTADOS DE RECONOCIMIENTO DE VOZ ───
  var isReading = React.useState(false);
  var transcript = React.useState('');
  var interimText = React.useState('');
  var recognitionRef = React.useRef(null);
  var isListening = React.useState(false);
  var srRestartAttempts = React.useRef(0);
  var readingStartTime = React.useRef(null);
  var readingDuration = React.useRef(0);

  // ─── ESTADOS DE GRABACIÓN ───
  var isRecording = React.useState(false);
  var mediaRecorderRef = React.useRef(null);
  var audioChunks = React.useRef([]);
  var recordedBlob = React.useState(null);
  var recordingsList = React.useState([]);
  var audioRef = React.useRef(null);
  var isPlayingRecording = React.useState(false);

  // ─── ESTADOS DE PUNTUACIÓN ───
  var compareResult = React.useState([]);
  var scoreResult = React.useState(null);
  var showScore = React.useState(false);
  var progress = React.useState({ correct: 0, total: 0 });

  // ─── ESTADOS DE RONDAS ───
  var roundsActive = React.useState(false);
  var currentRound = React.useState(0);
  var roundTimes = React.useState([]);     // tiempos usados en cada ronda
  var roundScores = React.useState([]);    // puntuaciones de cada ronda
  var roundTimeLimit = React.useState(0);  // límite de ronda actual
  var roundTimer = React.useRef(null);
  var roundTimeLeft = React.useState(0);

  // ─── ESTADOS DE KARAOKE ───
  var karaokeActive = React.useState(false);
  var karaokeCurrentWord = React.useState(-1);
  var karaokeWords = React.useState([]);
  var karaokeAudioRef = React.useRef(null);

  // ─── ESTADOS DE OSCILOSCOPIO ───
  var oscilloscopeActive = React.useState(false);
  var audioContextRef = React.useRef(null);
  var analyserRef = React.useRef(null);
  var sourceRef = React.useRef(null);
  var animationIdRef = React.useRef(null);

  // ─── ESTADOS DE DICTADO INVERSO ───
  var dictadoActive = React.useState(false);
  var dictadoCurrentSentence = React.useState('');
  var dictadoUserInput = React.useState('');
  var dictadoScore = React.useState(null);

  // ─── ESTADOS DE ESTADÍSTICAS ───
  var history = React.useState([]);
  var showHistory = React.useState(false);
  var streak = React.useState(0);
  var readingCount = React.useState(0);

  // ─── ESTADOS DE BIBLIOTECA ───
  var libraryTexts = React.useState([]);
  var showLibrary = React.useState(false);

  // ─── ESTADOS DE SOMBRA DE LECTURA ───
  var shadowActive = React.useState(false);
  var shadowSync = React.useState(0); // 0-100%

  // ─── EFECTOS INICIALES ───
  // Tokenizar cuando cambia el texto
  React.useEffect(function() {
    var t = tokenize();
    tokens[1](t);
  }, [text[0]]);

  // Cargar estadísticas e historial
  React.useEffect(function() {
    loadLibrary();
    loadHistory();
    loadRecordings();
    loadStreak();
  }, []);

  // ─── FUNCIONES DE TOKENIZACIÓN ───
  function tokenize() {
    if (!text[0]) return [];
    return window.Muller.LecturaHelpers.tokenize(text[0]);
  }

  // ─── FUNCIONES DE PALABRA ACTIVA ───
  var handleWordClick = React.useCallback(function(word, cleanKey) {
    activeWord[1](word);
    wordInfo[1](null);
    showTranslation[1](true);

    // Traducir
    if (window.M.translate && window.M.translate.word) {
      window.M.translate.word(word).then(function(info) {
        if (info) {
          // Verificar si es verbo
          var verbInfo = null;
          try {
            verbInfo = window.M.detect && window.M.detect.lookupVerb ? window.M.detect.lookupVerb(cleanKey) : null;
          } catch(e) {}

          wordInfo[1]({
            word: word,
            translation: info.es || info.translation || '',
            originalLang: info.originalLang || 'de',
            verbInfo: verbInfo
          });
        }
      }).catch(function(err) {
        console.warn('Translation error:', err);
      });
    }

    // Pronunciar
    if (window.M.speakGermanWord) {
      window.M.speakGermanWord(word);
    }

    // Desbloquear logro primera palabra
    window.Muller.Achievements.unlock('reading_first_word');

    // Reproducir sonido
    if (window.M.tone) window.M.tone();
  }, []);

  // ─── FUNCIONES DE SELECCIÓN ───
  var handleTextSelection = React.useCallback(function() {
    var sel = window.getSelection();
    if (sel && sel.toString().trim().length > 0) {
      selectedText[1](sel.toString().trim());
    }
  }, []);

  var clearSelection = React.useCallback(function() {
    selectedText[1]('');
    if (window.getSelection) window.getSelection().removeAllRanges();
  }, []);

  var playSelectedText = React.useCallback(function() {
    if (selectedText[0] && window.M.playSceneAudio) {
      window.M.playSceneAudio(selectedText[0], 'de');
    }
  }, [selectedText[0]]);

  // ─── FUNCIONES DE RECONOCIMIENTO DE VOZ ───
  var startReading = React.useCallback(function() {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      if (window.Muller.Toast) window.Muller.Toast.show({ title: 'Error', desc: 'Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.' });
      return;
    }

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.lang = SR_CONFIG.lang;
    recognition.continuous = SR_CONFIG.continuous;
    recognition.interimResults = SR_CONFIG.interimResults;

    recognition.onresult = function(event) {
      var finalText = '';
      var interim = '';
      for (var i = event.resultIndex; i < event.results.length; i++) {
        var result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript + ' ';
        } else {
          interim += result[0].transcript;
        }
      }
      transcript[1](function(prev) { return prev + finalText; });
      interimText[1](interim);

      // Actualizar progreso en tiempo real
      var fullTranscript = transcript[0] + finalText;
      var compare = window.Muller.LecturaHelpers.compareTokens(text[0], fullTranscript);
      var correct = compare.filter(function(c) { return c.correct; }).length;
      var total = compare.filter(function(c) { return c.original !== ''; }).length;
      progress[1]({ correct: correct, total: total });
    };

    recognition.onerror = function(event) {
      console.warn('SpeechRecognition error:', event.error);
      if (event.error === 'not-allowed') {
        isListening[1](false);
        isReading[1](false);
        if (window.Muller.Toast) window.Muller.Toast.show({ title: 'Micrófono', desc: 'Permiso denegado. Habilita el micrófono en la configuración del navegador.' });
        return;
      }
      // Reintentar automáticamente
      if (isReading[0] && srRestartAttempts.current < SR_CONFIG.maxRestartAttempts) {
        srRestartAttempts.current++;
        setTimeout(function() {
          if (isReading[0]) startReading();
        }, SR_CONFIG.restartDelay);
      }
    };

    recognition.onend = function() {
      isListening[1](false);
      // Reintentar si aún leyendo
      if (isReading[0] && srRestartAttempts.current < SR_CONFIG.maxRestartAttempts) {
        srRestartAttempts.current++;
        setTimeout(function() {
          if (isReading[0]) {
            try { recognition.start(); } catch(e) {}
          }
        }, SR_CONFIG.restartDelay);
      }
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
      isListening[1](true);
      isReading[1](true);
      readingStartTime.current = Date.now();
      srRestartAttempts.current = 0;
      transcript[1]('');
      interimText[1]('');
      showScore[1](false);
      scoreResult[1](null);
      compareResult[1]([]);
      progress[1]({ correct: 0, total: 0 });
    } catch(e) {
      console.error('Error starting recognition:', e);
    }
  }, []);

  var stopReading = React.useCallback(function() {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) {}
      recognitionRef.current = null;
    }
    isListening[1](false);
    isReading[1](false);

    // Calcular duración
    if (readingStartTime.current) {
      readingDuration.current = (Date.now() - readingStartTime.current) / 1000;
    }

    // Evaluar
    evaluateReading();
  }, [transcript[0], text[0], readingStartTime.current]);

  var evaluateReading = React.useCallback(function() {
    var fullTranscript = transcript[0].trim();
    if (!fullTranscript) {
      if (window.Muller.Toast) window.Muller.Toast.show({ title: 'Sin datos', desc: 'No se detectó tu lectura. Intenta de nuevo.' });
      return;
    }

    var compare = window.Muller.LecturaHelpers.compareTokens(text[0], fullTranscript);
    compareResult[1](compare);

    var result = window.Muller.LecturaHelpers.calculateScore(compare, readingDuration.current);
    scoreResult[1](result);
    showScore[1](true);

    // Guardar en historial
    saveToHistory(result);

    // Desbloquear logros
    window.Muller.Achievements.unlock('reading_first_session');
    if (result.accuracy >= 90) window.Muller.Achievements.unlock('reading_accuracy_90');
    if (result.wpm >= 50) window.Muller.Achievements.unlock('reading_speed_50');

    // Feedback sonoro
    if (result.score >= 70) {
      if (window.M.playCorrect) window.M.playCorrect();
    } else {
      if (window.M.playIncorrect) window.M.playIncorrect();
    }
  }, [transcript[0], text[0], readingDuration.current]);

  // ─── FUNCIONES DE GRABACIÓN ───
  var startRecording = React.useCallback(function() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (window.Muller.Toast) window.Muller.Toast.show({ title: 'Error', desc: 'Grabación no soportada.' });
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
      var recorder = new MediaRecorder(stream);
      audioChunks.current = [];

      recorder.ondataavailable = function(e) {
        if (e.data.size > 0) audioChunks.current.push(e.data);
      };

      recorder.onstop = function() {
        var blob = new Blob(audioChunks.current, { type: 'audio/webm' });
        recordedBlob[1](blob);
        stream.getTracks().forEach(function(t) { t.stop(); });

        // Guardar en storage
        var timestamp = new Date().toISOString();
        var key = 'reading_audio_' + timestamp;
        try {
          var reader = new FileReader();
          reader.onload = function() {
            var data = { key: key, blob: reader.result, timestamp: timestamp, score: scoreResult[0] };
            var existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.recordings) || '[]');
            existing.push(data);
            localStorage.setItem(STORAGE_KEYS.recordings, JSON.stringify(existing));
            loadRecordings();
          };
          reader.readAsDataURL(blob);
        } catch(e) {
          console.warn('Could not save recording:', e);
        }
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      isRecording[1](true);
    }).catch(function(err) {
      console.error('Error accessing microphone:', err);
      if (window.Muller.Toast) window.Muller.Toast.show({ title: 'Error', desc: 'No se pudo acceder al micrófono para grabar.' });
    });
  }, [scoreResult[0]]);

  var stopRecording = React.useCallback(function() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    isRecording[1](false);
  }, []);

  var playRecording = React.useCallback(function(blob) {
    if (!blob) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    var url = URL.createObjectURL(blob);
    var audio = new Audio(url);
    audio.onended = function() { isPlayingRecording[1](false); URL.revokeObjectURL(url); };
    audioRef.current = audio;
    isPlayingRecording[1](true);
    audio.play();
  }, []);

  var loadRecordings = React.useCallback(function() {
    try {
      var data = JSON.parse(localStorage.getItem(STORAGE_KEYS.recordings) || '[]');
      recordingsList[1](data);
    } catch(e) { recordingsList[1]([]); }
  }, []);

  var deleteRecording = React.useCallback(function(key) {
    try {
      var data = JSON.parse(localStorage.getItem(STORAGE_KEYS.recordings) || '[]');
      data = data.filter(function(d) { return d.key !== key; });
      localStorage.setItem(STORAGE_KEYS.recordings, JSON.stringify(data));
      loadRecordings();
    } catch(e) {}
  }, []);

  // ─── FUNCIONES DE RONDAS ───
  var startRounds = React.useCallback(function() {
    roundsActive[1](true);
    currentRound[1](1);
    roundTimes[1]([]);
    roundScores[1]([]);
    transcript[1]('');
    showScore[1](false);
    scoreResult[1](null);

    // Estimar tiempo inicial
    var wordCount = tokens[0].length;
    var estimatedTime = Math.max(ROUNDS_CONFIG.minTimeSeconds, Math.round(wordCount * 1.5));
    var baseTime = Math.round(estimatedTime * (1 + ROUNDS_CONFIG.initialTimeBuffer));
    roundTimeLimit[1](baseTime);
    startRoundTimer(baseTime);
  }, [tokens[0], text[0]]);

  var startRoundTimer = React.useCallback(function(limit) {
    if (roundTimer.current) clearInterval(roundTimer.current);
    roundTimeLeft[1](limit);
    roundTimer.current = setInterval(function() {
      roundTimeLeft[1](function(prev) {
        if (prev <= 1) {
          clearInterval(roundTimer.current);
          finishRound();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  var finishRound = React.useCallback(function() {
    if (roundTimer.current) clearInterval(roundTimer.current);

    // Calcular tiempo usado y puntuación
    var totalTime = roundTimeLimit[0] - roundTimeLeft[0];
    var compare = window.Muller.LecturaHelpers.compareTokens(text[0], transcript[0]);
    var baseResult = window.Muller.LecturaHelpers.calculateScore(compare, totalTime);
    var roundScore = window.Muller.LecturaHelpers.calculateRoundScore(baseResult.score, totalTime, roundTimeLimit[0]);

    var newTimes = roundTimes[0].concat([totalTime]);
    var newScores = roundScores[0].concat([roundScore]);
    roundTimes[1](newTimes);
    roundScores[1](newScores);

    var nextRound = currentRound[0] + 1;
    if (nextRound <= ROUNDS_CONFIG.maxRounds) {
      currentRound[1](nextRound);
      var newLimit = Math.max(ROUNDS_CONFIG.minTimeSeconds, Math.round(roundTimeLimit[0] * (1 - ROUNDS_CONFIG.timePenaltyPercent)));
      roundTimeLimit[1](newLimit);
      transcript[1]('');
      startRoundTimer(newLimit);
    } else {
      // Terminaron todas las rondas
      roundsActive[1](false);
      currentRound[1](0);
      compareResult[1](compare);
      scoreResult[1](baseResult);
      showScore[1](true);

      // Desbloquear logro
      window.Muller.Achievements.unlock('reading_3_rounds');

      // Guardar sesión
      saveToHistory(baseResult);
    }
  }, [text[0], transcript[0], currentRound[0], roundTimeLimit[0], roundTimes[0], roundScores[0]]);

  // ─── FUNCIONES DE KARAOKE ───
  var startKaraoke = React.useCallback(function() {
    karaokeActive[1](true);
    karaokeCurrentWord[1](0);

    var kWords = tokens[0].map(function(t) { return t.word; });
    karaokeWords[1](kWords);

    // Reproducir TTS
    if (window.M.playSceneAudio) {
      window.M.playSceneAudio(text[0], 'de', {
        onboundary: function(event) {
          // Avanzar palabra resaltada
          karaokeCurrentWord[1](function(prev) {
            return Math.min(prev + 1, kWords.length - 1);
          });
        },
        onend: function() {
          karaokeActive[1](false);
          karaokeCurrentWord[1](-1);
        }
      });
    }
  }, [tokens[0], text[0]]);

  var stopKaraoke = React.useCallback(function() {
    if (window.M.stopAudio) window.M.stopAudio();
    karaokeActive[1](false);
    karaokeCurrentWord[1](-1);
  }, []);

  // ─── FUNCIONES DE OSCILOSCOPIO ───
  var startOscilloscope = React.useCallback(function() {
    if (!navigator.mediaDevices) return;
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      var source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);
      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;
      oscilloscopeActive[1](true);
    }).catch(function(err) {
      console.warn('Oscilloscope error:', err);
    });
  }, []);

  var stopOscilloscope = React.useCallback(function() {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    sourceRef.current = null;
    oscilloscopeActive[1](false);
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
  }, []);

  // ─── FUNCIONES DE DICTADO INVERSO ───
  var startDictado = React.useCallback(function() {
    dictadoActive[1](true);
    dictadoUserInput[1]('');
    dictadoScore[1](null);

    // Seleccionar frase aleatoria del texto
    var sentences = text[0].split(/[.!?]+/).filter(Boolean);
    if (sentences.length > 0) {
      var randomIdx = Math.floor(Math.random() * sentences.length);
      dictadoCurrentSentence[1](sentences[randomIdx].trim());
      // Reproducir TTS
      if (window.M.playSceneAudio) {
        window.M.playSceneAudio(sentences[randomIdx].trim(), 'de');
      }
    }
  }, [text[0]]);

  var submitDictado = React.useCallback(function() {
    var compare = window.Muller.LecturaHelpers.compareTokens(dictadoCurrentSentence[0], dictadoUserInput[0]);
    var total = compare.filter(function(c) { return c.original !== ''; }).length;
    var correct = compare.filter(function(c) { return c.correct; }).length;
    var score = total > 0 ? Math.round((correct / total) * 100) : 0;
    dictadoScore[1]({ score: score, correct: correct, total: total, compare: compare });
  }, [dictadoCurrentSentence[0], dictadoUserInput[0]]);

  var stopDictado = React.useCallback(function() {
    dictadoActive[1](false);
    dictadoCurrentSentence[1]('');
    dictadoUserInput[1]('');
    dictadoScore[1](null);
  }, []);

  // ─── FUNCIONES DE ESTADÍSTICAS ───
  var saveToHistory = React.useCallback(function(result) {
    try {
      var entry = {
        timestamp: new Date().toISOString(),
        source: source[0],
        textPreview: text[0].substring(0, 100),
        score: result.score,
        accuracy: result.accuracy,
        wpm: result.wpm,
        correct: result.correct,
        total: result.total,
        duration: readingDuration.current,
        rounds: roundScores[0].length > 0 ? roundScores[0] : null
      };

      var data = JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || '[]');
      data.unshift(entry);
      // Mantener solo últimas 200 entradas
      if (data.length > 200) data = data.slice(0, 200);
      localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(data));
      loadHistory();
      updateStreak();
      checkAchievements(result);
    } catch(e) {
      console.warn('Could not save history:', e);
    }
  }, [source[0], text[0], readingDuration.current, roundScores[0]]);

  var loadHistory = React.useCallback(function() {
    try {
      var data = JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || '[]');
      history[1](data);
      readingCount[1](data.length);
    } catch(e) { history[1]([]); }
  }, []);

  var updateStreak = React.useCallback(function() {
    try {
      var now = new Date();
      var today = now.toISOString().split('T')[0];
      var streakData = JSON.parse(localStorage.getItem(STORAGE_KEYS.streak) || '{"current":0,"lastDate":null}');

      if (streakData.lastDate === today) return; // ya contado hoy

      var lastDate = streakData.lastDate ? new Date(streakData.lastDate) : null;
      var yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);

      if (!lastDate || lastDate.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]) {
        streakData.current++;
      } else {
        streakData.current = 1;
      }
      streakData.lastDate = today;
      localStorage.setItem(STORAGE_KEYS.streak, JSON.stringify(streakData));
      streak[1](streakData.current);

      // Logro racha
      if (streakData.current >= 7) window.Muller.Achievements.unlock('reading_streak_7');
    } catch(e) {}
  }, []);

  var loadStreak = React.useCallback(function() {
    try {
      var data = JSON.parse(localStorage.getItem(STORAGE_KEYS.streak) || '{"current":0,"lastDate":null}');
      streak[1](data.current);
    } catch(e) { streak[1](0); }
  }, []);

  // ─── FUNCIONES DE LOGROS ───
  var checkAchievements = React.useCallback(function(result) {
    // reading_first_session - ya desbloqueado en evaluateReading
    // Comprobar reading_10_texts
    if (readingCount[0] >= 10) {
      window.Muller.Achievements.unlock('reading_10_texts');
    }
  }, [readingCount[0]]);

  // ─── FUNCIONES DE BIBLIOTECA ───
  var loadLibrary = React.useCallback(function() {
    var lib = window.Muller.LecturaHelpers.getDefaultLibrary ? window.Muller.LecturaHelpers.getDefaultLibrary() : [];
    // Cargar textos personalizados
    try {
      var custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.texts) || '[]');
      lib = lib.concat(custom);
    } catch(e) {}
    libraryTexts[1](lib);
  }, []);

  var selectText = React.useCallback(function(newText, newSource) {
    text[1](newText);
    source[1](newSource || 'library');
    tokens[1](window.Muller.LecturaHelpers.tokenize(newText));
    activeWord[1](null);
    wordInfo[1](null);
    selectedText[1]('');
    showScore[1](false);
    scoreResult[1](null);
    transcript[1]('');
    showLibrary[1](false);
  }, []);

  var importPDFText = React.useCallback(function(pdfText) {
    selectText(pdfText, 'pdf');
  }, []);

  var pasteText = React.useCallback(function(pastedText) {
    selectText(pastedText, 'paste');
    // Guardar en textos personalizados
    try {
      var custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.texts) || '[]');
      custom.push({ id: 'custom_' + Date.now(), title: 'Texto pegado ' + (custom.length + 1), text: pastedText, level: 'N/A', isCustom: true });
      localStorage.setItem(STORAGE_KEYS.texts, JSON.stringify(custom));
      loadLibrary();
    } catch(e) {}
  }, []);

  var deleteCustomText = React.useCallback(function(id) {
    try {
      var custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.texts) || '[]');
      custom = custom.filter(function(t) { return t.id !== id; });
      localStorage.setItem(STORAGE_KEYS.texts, JSON.stringify(custom));
      loadLibrary();
    } catch(e) {}
  }, []);

  // ─── FUNCIONES DE AI PLACEHOLDER ───
  var aiAnalyzeReading = React.useCallback(function(textData, transcriptData) {
    // Placeholder para futura API DeepSeek
    // Por ahora devuelve análisis local simple
    var wordCount = textData ? window.Muller.LecturaHelpers.tokenize(textData).length : 0;
    var readingTime = readingDuration.current;
    return {
      analysis: 'Análisis local',
      wordCount: wordCount,
      readingTime: readingTime,
      suggestedFocus: Math.random() > 0.5 ? 'Vocabulario' : 'Pronunciación',
      message: 'Próximamente: análisis con IA de DeepSeek para recomendaciones personalizadas.'
    };
  }, []);

  // ─── FUNCIONES DE FUENTE ───
  var increaseFont = React.useCallback(function() {
    fontSize[1](function(prev) { return Math.min(prev + 2, 36); });
  }, []);

  var decreaseFont = React.useCallback(function() {
    fontSize[1](function(prev) { return Math.max(prev - 2, 12); });
  }, []);

  var resetFont = React.useCallback(function() {
    fontSize[1](18);
  }, []);

  // ─── FUNCIONES DE SOMBRA ───
  var startShadowReading = React.useCallback(function() {
    shadowActive[1](true);
    shadowSync[1](0);
    // Iniciar TTS y esperar sincronización
    if (window.M.playSceneAudio) {
      var startTime = Date.now();
      window.M.playSceneAudio(text[0], 'de', {
        onboundary: function(event) {
          var elapsed = (Date.now() - startTime) / 1000;
          var totalDuration = text[0].split(' ').length * 0.3; // estimación
          var progress = Math.min(100, (elapsed / totalDuration) * 100);
          shadowSync[1](Math.round(progress));
        },
        onend: function() {
          shadowActive[1](false);
          shadowSync[1](100);
        }
      });
    }
  }, [text[0]]);

  var stopShadowReading = React.useCallback(function() {
    if (window.M.stopAudio) window.M.stopAudio();
    shadowActive[1](false);
    shadowSync[1](0);
  }, []);

  // ─── FUNCIONES DE MODO SIN CONEXIÓN ───
  var isOffline = React.useState(!navigator.onLine);

  React.useEffect(function() {
    function handleOnline() { isOffline[1](false); }
    function handleOffline() { isOffline[1](true); }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return function() {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ─── FUNCIÓN ESPECIAL PARA A+ A- (preferencias) ───
  // Cargar preferencia de fuente guardada
  React.useEffect(function() {
    try {
      var pref = localStorage.getItem(STORAGE_KEYS.preferences);
      if (pref) {
        var p = JSON.parse(pref);
        if (p.fontSize) fontSize[1](p.fontSize);
      }
    } catch(e) {}
  }, []);

  React.useEffect(function() {
    try {
      localStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify({ fontSize: fontSize[0] }));
    } catch(e) {}
  }, [fontSize[0]]);

  // ─── RETURN: TODOS LOS ESTADOS Y FUNCIONES ───
  return {
    // Estados principales
    source: source[0], setSource: source[1],
    text: text[0], setText: text[1],
    tokens: tokens[0],
    activeWord: activeWord[0], setActiveWord: activeWord[1],
    wordInfo: wordInfo[0],
    selectedText: selectedText[0],
    fontSize: fontSize[0],
    showTranslation: showTranslation[0], setShowTranslation: showTranslation[1],

    // Reconocimiento de voz
    isReading: isReading[0],
    isListening: isListening[0],
    transcript: transcript[0], setTranscript: transcript[1],
    interimText: interimText[0],
    startReading: startReading,
    stopReading: stopReading,
    evaluateReading: evaluateReading,
    progress: progress[0],

    // Grabación
    isRecording: isRecording[0],
    recordedBlob: recordedBlob[0],
    recordingsList: recordingsList[0],
    isPlayingRecording: isPlayingRecording[0],
    startRecording: startRecording,
    stopRecording: stopRecording,
    playRecording: playRecording,
    deleteRecording: deleteRecording,

    // Puntuación
    compareResult: compareResult[0],
    scoreResult: scoreResult[0],
    showScore: showScore[0],

    // Rondas
    roundsActive: roundsActive[0],
    currentRound: currentRound[0],
    roundTimes: roundTimes[0],
    roundScores: roundScores[0],
    roundTimeLimit: roundTimeLimit[0],
    roundTimeLeft: roundTimeLeft[0],
    startRounds: startRounds,
    finishRound: finishRound,

    // Karaoke
    karaokeActive: karaokeActive[0],
    karaokeCurrentWord: karaokeCurrentWord[0],
    karaokeWords: karaokeWords[0],
    startKaraoke: startKaraoke,
    stopKaraoke: stopKaraoke,

    // Osciloscopio
    oscilloscopeActive: oscilloscopeActive[0],
    analyserRef: analyserRef,
    animationIdRef: animationIdRef,
    startOscilloscope: startOscilloscope,
    stopOscilloscope: stopOscilloscope,

    // Dictado inverso
    dictadoActive: dictadoActive[0],
    dictadoCurrentSentence: dictadoCurrentSentence[0],
    dictadoUserInput: dictadoUserInput[0], setDictadoUserInput: dictadoUserInput[1],
    dictadoScore: dictadoScore[0],
    startDictado: startDictado,
    submitDictado: submitDictado,
    stopDictado: stopDictado,

    // Estadísticas
    history: history[0],
    showHistory: showHistory[0], setShowHistory: showHistory[1],
    streak: streak[0],
    readingCount: readingCount[0],

    // Biblioteca
    libraryTexts: libraryTexts[0],
    showLibrary: showLibrary[0], setShowLibrary: showLibrary[1],
    selectText: selectText,
    importPDFText: importPDFText,
    pasteText: pasteText,
    deleteCustomText: deleteCustomText,
    loadLibrary: loadLibrary,

    // Fuente
    increaseFont: increaseFont,
    decreaseFont: decreaseFont,
    resetFont: resetFont,

    // Interacción con texto
    handleWordClick: handleWordClick,
    handleTextSelection: handleTextSelection,
    clearSelection: clearSelection,
    playSelectedText: playSelectedText,

    // Sombra de lectura
    shadowActive: shadowActive[0],
    shadowSync: shadowSync[0],
    startShadowReading: startShadowReading,
    stopShadowReading: stopShadowReading,

    // Offline
    isOffline: isOffline[0],

    // AI placeholder
    aiAnalyzeReading: aiAnalyzeReading
  };
};