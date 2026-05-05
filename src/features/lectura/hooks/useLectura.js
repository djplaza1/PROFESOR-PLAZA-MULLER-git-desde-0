// src/features/lectura/hooks/useLectura.js
// Hook principal que encapsula todo el estado y lógica de Lectura
// Se registra como window.Muller.LecturaHooks.useLectura
window.Muller = window.Muller || {};
window.Muller.LecturaHooks = window.Muller.LecturaHooks || {};

// CONFIG - Tiempos de rondas y umbrales
var ROUNDS_CONFIG = {
  timePenaltyPercent: 0.20,
  maxRounds: 3,
  initialTimeBuffer: 0.3,
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
  preferences: 'muller_reading_prefs',
  fallWords: 'muller_reading_fallWords',
  srsWords: 'muller_srs_words',
  marathonHistory: 'muller_reading_marathon'
};

// Helper wrapper for storage access
function storageGet(key) {
  try {
    if (window.Muller.storage && window.Muller.storage.get) {
      return window.Muller.storage.get(key);
    }
    return JSON.parse(localStorage.getItem(key));
  } catch(e) { return null; }
}

function storageSet(key, val) {
  try {
    if (window.Muller.storage && window.Muller.storage.set) {
      window.Muller.storage.set(key, val);
      return;
    }
    localStorage.setItem(key, JSON.stringify(val));
  } catch(e) {}
}

// ─── ATAJOS DE TECLADO ───
var KEYBOARD_SHORTCUTS = {
  SPACE: 'Space',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ENTER: 'Enter',
  KEY_M: 'KeyM', // maratón
  KEY_H: 'KeyH', // historial
  KEY_L: 'KeyL', // biblioteca
  KEY_R: 'KeyR', // rondas
  KEY_K: 'KeyK', // karaoke
  KEY_S: 'KeyS', // sombra
  KEY_D: 'KeyD'  // dictado
};

// Hook principal
window.Muller.LecturaHooks.useLectura = function(opts) {
  opts = opts || {};
  var initialText = opts.initialText || '';

  // ─── ESTADOS PRINCIPALES ───
  var source = React.useState('');
  var text = React.useState(initialText);
  var tokens = React.useState([]);
  var activeWord = React.useState(null);
  var wordInfo = React.useState(null);
  var selectedText = React.useState('');
  var fontSize = React.useState(18);
  var showTranslation = React.useState(false);

  // ─── ESTADOS DE RECONOCIMIENTO DE VOZ ───
  var isReading = React.useState(false);
  var transcript = React.useState('');
  var interimText = React.useState('');
  var recognitionRef = React.useRef(null);
  var isListening = React.useState(false);
  var srRestartAttempts = React.useRef(0);
  var readingStartTime = React.useRef(null);
  var readingDuration = React.useRef(0);

  // ─── FEEDBACK VISUAL EN VIVO ───
  // Para cada token: 'pending' | 'correct' | 'incorrect'
  var wordStatuses = React.useState({});
  var transcriptionErrors = React.useState([]); // array de { expected, got, cleanKey }

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
  var roundTimes = React.useState([]);
  var roundScores = React.useState([]);
  var roundTimeLimit = React.useState(0);
  var roundTimer = React.useRef(null);
  var roundTimeLeft = React.useState(0);

  // ─── ESTADOS DE KARAOKE ───
  var karaokeActive = React.useState(false);
  var karaokeCurrentWord = React.useState(-1);
  var karaokeWords = React.useState([]);

  // ─── ESTADOS DE OSCILOSCOPIO ───
  var oscilloscopeActive = React.useState(false);
  var analyserRef = React.useRef(null);
  var animationIdRef = React.useRef(null);
  var audioContextRef = React.useRef(null);
  var oscilloscopeStreamRef = React.useRef(null);
  var sourceRef = React.useRef(null);

  // ─── ESTADOS DE DICTADO ───
  var dictadoActive = React.useState(false);
  var dictadoCurrentSentence = React.useState('');
  var dictadoUserInput = React.useState('');
  var dictadoScore = React.useState(null);

  // ─── ESTADOS DE SOMBRA ───
  var shadowActive = React.useState(false);
  var shadowSync = React.useState(0);

  // ─── ESTADOS DE ESTADÍSTICAS ───
  var history = React.useState([]);
  var showHistory = React.useState(false);
  var streak = React.useState(0);
  var readingCount = React.useState(0);

  // ─── ESTADOS DE BIBLIOTECA ───
  var libraryTexts = React.useState([]);
  var showLibrary = React.useState(false);
  var pasteTextInput = React.useState('');

  // ─── ESTADOS DE MODO MARATÓN ───
  var marathonActive = React.useState(false);
  var marathonDuration = React.useState(0); // segundos totales seleccionados (300/600/900)
  var marathonTimeLeft = React.useState(0);
  var marathonTimer = React.useRef(null);
  var marathonStats = React.useState({ correct: 0, total: 0, wpm: 0, streak: 0, bestStreak: 0 });

  // ─── ESTADOS DE MAPA DE CALOR ───
  var showHeatmap = React.useState(false);
  var heatmapTokens = React.useState([]);

  // ─── ESTADOS DE SRS ───
  var fallWordsList = React.useState([]);

  // ─── ESTADOS DE EXPORT/IMPORT ───
  var showExportImport = React.useState(false);

  // ─── REFS ───
  var textoRef = React.useRef('');

  // ─── FUNCIONES DE RECONOCIMIENTO DE VOZ ───

  var startReading = React.useCallback(function() {
    if (isReading[0]) return;

    // Limpiar estados previos
    wordStatuses[1]({});
    transcriptionErrors[1]([]);
    transcript[1]('');
    interimText[1]('');
    showScore[1](false);
    scoreResult[1](null);
    progress[1]({ correct: 0, total: 0 });

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (window.Muller.Toast) {
        window.Muller.Toast.show({ title: 'No soportado', desc: 'Tu navegador no soporta reconocimiento de voz.' });
      }
      return;
    }

    var recognition = new SpeechRecognition();
    recognition.lang = SR_CONFIG.lang;
    recognition.continuous = SR_CONFIG.continuous;
    recognition.interimResults = SR_CONFIG.interimResults;

    recognition.onresult = function(event) {
      var interim = '';
      var final = '';
      for (var i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      if (final) {
        transcript[1](function(prev) { return (prev + ' ' + final).trim(); });
      }
      interimText[1](interim);
    };

    recognition.onerror = function(event) {
      console.warn('Speech recognition error:', event.error);
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      srRestartAttempts.current++;
      if (srRestartAttempts.current < SR_CONFIG.maxRestartAttempts) {
        setTimeout(function() { startReading(); }, SR_CONFIG.restartDelay);
      } else {
        isListening[1](false);
        isReading[1](false);
        if (window.Muller.Toast) {
          window.Muller.Toast.show({ title: 'Error', desc: 'No se pudo iniciar el reconocimiento de voz.' });
        }
      }
    };

    recognition.onend = function() {
      isListening[1](false);
      if (isReading[0]) {
        // Si sigue leyendo, reiniciar
        if (srRestartAttempts.current < SR_CONFIG.maxRestartAttempts) {
          srRestartAttempts.current++;
          setTimeout(function() {
            try { recognition.start(); isListening[1](true); } catch(e) {}
          }, SR_CONFIG.restartDelay);
        }
      }
    };

    srRestartAttempts.current = 0;
    readingStartTime.current = Date.now();

    try {
      recognition.start();
      recognitionRef.current = recognition;
      isReading[1](true);
      isListening[1](true);
      startOscilloscope();
    } catch(e) {
      console.warn('Could not start recognition:', e);
    }
  }, [isReading[0], text[0], tokens[0], startOscilloscope]);

  var stopReading = React.useCallback(function() {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) {}
      recognitionRef.current = null;
    }
    isReading[1](false);
    isListening[1](false);
    readingDuration.current = Date.now() - (readingStartTime.current || Date.now());
    stopOscilloscope();
    evaluateReading();
  }, [transcript[0], text[0], tokens[0], stopOscilloscope, evaluateReading]);

  // ─── FEEDBACK VISUAL EN VIVO ───
  // Compara transcript con tokens en tiempo real y actualiza wordStatuses
  var updateWordStatuses = React.useCallback(function(transcriptText, originalTokens) {
    if (!transcriptText || !originalTokens || originalTokens.length === 0) return;

    var normalizedTranscript = window.Muller.LecturaHelpers.normalize(transcriptText);
    var spokenWords = normalizedTranscript.split(/\s+/).filter(Boolean);

    var newStatuses = {};
    var newErrors = [];
    var correctCount = 0;
    var totalCount = originalTokens.length;

    originalTokens.forEach(function(token, idx) {
      var cleanKey = token.cleanKey;
      var spokenWord = spokenWords[idx] || '';

      if (!spokenWord) {
        newStatuses[cleanKey] = newStatuses[cleanKey] || 'pending';
        return;
      }

      var isExact = spokenWord === cleanKey;
      var phoneticCheck = window.Muller.LecturaHelpers.checkGermanPhonetics(cleanKey, spokenWord);

      if (isExact) {
        newStatuses[cleanKey] = 'correct';
        correctCount++;
      } else if (phoneticCheck.correct) {
        newStatuses[cleanKey] = 'correct';
        correctCount++;
      } else {
        newStatuses[cleanKey] = 'incorrect';
        newErrors.push({ expected: cleanKey, got: spokenWord, cleanKey: cleanKey, phoneticErrors: phoneticCheck.errors });
      }
    });

    wordStatuses[1](newStatuses);
    transcriptionErrors[1](newErrors);
    progress[1]({ correct: correctCount, total: totalCount });
  }, []);

  // Efecto que se dispara cuando cambia el transcript
  React.useEffect(function() {
    if (isReading[0] && transcript[0]) {
      updateWordStatuses(transcript[0], tokens[0]);
    }
  }, [transcript[0], isReading[0], tokens[0]]);

  var evaluateReading = React.useCallback(function() {
    if (!text[0]) return;
    var compare = window.Muller.LecturaHelpers.compareTokens(text[0], transcript[0]);
    var result = window.Muller.LecturaHelpers.calculateScore(compare, readingDuration.current);

    compareResult[1](compare);
    scoreResult[1](result);
    showScore[1](true);

    // Guardar en historial
    saveToHistory(result);

    // Guardar palabras falladas para SRS
    saveFailedWords(compare);

    // Logros
    if (result.score >= 90) {
      try { window.Muller.Achievements.unlock('reading_perfect_90'); } catch(e) {}
    }
  }, [text[0], transcript[0], readingDuration.current]);

  // ─── SRS AUTOMÁTICO: PALABRAS FALLADAS ───
  var saveFailedWords = React.useCallback(function(compareTokens) {
    if (!compareTokens || compareTokens.length === 0) return;

    var failed = compareTokens
      .filter(function(c) { return !c.correct && c.original && c.original.trim(); })
      .map(function(c) { return c.original.toLowerCase().trim(); });

    if (failed.length === 0) return;

    // Guardar en localStorage para Léxikon
    try {
      var existing = storageGet(STORAGE_KEYS.srsWords) || [];
      var now = Date.now();
      failed.forEach(function(word) {
        var found = existing.find(function(e) { return e.word === word; });
        if (found) {
          found.lastFailed = now;
          found.count = (found.count || 1) + 1;
        } else {
          existing.push({ word: word, lastFailed: now, count: 1, addedFrom: 'lectura' });
        }
      });
      storageSet(STORAGE_KEYS.srsWords, existing);
    } catch(e) {}

    // También guardar lista de fallos específica de lectura
    try {
      var fallWords = storageGet(STORAGE_KEYS.fallWords) || [];
      failed.forEach(function(word) {
        if (!fallWords.includes(word)) fallWords.push(word);
      });
      storageSet(STORAGE_KEYS.fallWords, fallWords);
      fallWordsList[1](fallWords);
    } catch(e) {}
  }, []);

  var loadFallWords = React.useCallback(function() {
    try {
      var data = storageGet(STORAGE_KEYS.fallWords) || [];
      fallWordsList[1](data);
    } catch(e) { fallWordsList[1]([]); }
  }, []);

  var clearFallWords = React.useCallback(function() {
    try {
      storageSet(STORAGE_KEYS.fallWords, []);
      fallWordsList[1]([]);
    } catch(e) {}
  }, []);

  // ─── FUNCIONES DE GRABACIÓN ───
  var startRecording = React.useCallback(function() {
    if (isRecording[0]) return;
    if (!navigator.mediaDevices) {
      if (window.Muller.Toast) window.Muller.Toast.show({ title: 'No soportado', desc: 'Tu navegador no soporta grabación.' });
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
      var mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];

      mediaRecorder.ondataavailable = function(event) {
        if (event.data.size > 0) audioChunks.current.push(event.data);
      };

      mediaRecorder.onstop = function() {
        stream.getTracks().forEach(function(t) { t.stop(); });
        var blob = new Blob(audioChunks.current, { type: 'audio/webm' });
        recordedBlob[1](blob);

        // Guardar grabación con metadatos completos
        var reader = new FileReader();
        reader.onload = function(e) {
          var dataURL = e.target.result;
          try {
            var data = storageGet(STORAGE_KEYS.recordings) || [];
            var entry = {
              key: 'rec_' + Date.now(),
              blob: dataURL,
              timestamp: new Date().toISOString(),
              duration: audioChunks.current.length > 0 ? '~' + Math.round(audioChunks.current.length * 0.5) + 's' : '?',
              source: source[0] || 'unknown',
              textPreview: text[0] ? text[0].substring(0, 80) : ''
            };
            // LIMITAR grabaciones: máximo 10, y cada dataURL no debe exceder ~500KB
            // Eliminar las más antiguas si se supera el límite
            data.push(entry);
            // Limitar a máximo 10 grabaciones
            if (data.length > 10) {
              data = data.slice(-10);
            }
            // Verificar tamaño total aproximado del localStorage
            try {
              var totalSize = 0;
              data.forEach(function(r) { totalSize += (r.blob ? r.blob.length : 0); });
              var totalSizeMB = totalSize / (1024 * 1024);
              if (totalSizeMB > 4) {
                // Si supera 4MB, eliminar las grabaciones más antiguas hasta bajar de 3MB
                while (data.length > 3 && totalSizeMB > 3) {
                  var removed = data.shift();
                  totalSizeMB -= (removed.blob ? removed.blob.length / (1024 * 1024) : 0);
                }
                if (window.Muller.Toast) {
                  window.Muller.Toast.show({
                    title: 'Límite de almacenamiento',
                    desc: 'Las grabaciones más antiguas se han eliminado para liberar espacio.'
                  });
                }
              }
            } catch(e) {}
            storageSet(STORAGE_KEYS.recordings, data);
            loadRecordings();
          } catch(e) {
            console.warn('Could not save recording:', e);
          }
        };
        reader.readAsDataURL(blob);
      };

      mediaRecorder.start();
      isRecording[1](true);
      if (window.Muller.Toast) window.Muller.Toast.show({ title: 'Grabando', desc: 'Grabación iniciada. Habla en alemán.' });
    }).catch(function(err) {
      console.warn('Microphone error:', err);
      if (window.Muller.Toast) window.Muller.Toast.show({ title: 'Error', desc: 'No se pudo acceder al micrófono.' });
    });
  }, [isRecording[0], text[0], source[0]]);

  var stopRecording = React.useCallback(function() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    isRecording[1](false);
    if (window.Muller.Toast) window.Muller.Toast.show({ title: 'Grabación guardada', desc: 'Audio almacenado en tu dispositivo.' });
  }, []);

  var playRecording = React.useCallback(function(blob) {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (!blob) return;
    var url = URL.createObjectURL(blob);
    var audio = new Audio(url);
    audio.onended = function() { isPlayingRecording[1](false); URL.revokeObjectURL(url); };
    audioRef.current = audio;
    isPlayingRecording[1](true);
    audio.play();
  }, []);

  var playRecordingFromDataURL = React.useCallback(function(dataURL) {
    if (!dataURL) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    var audio = new Audio(dataURL);
    audio.onended = function() { isPlayingRecording[1](false); };
    audioRef.current = audio;
    isPlayingRecording[1](true);
    audio.play();
  }, []);

  var loadRecordings = React.useCallback(function() {
    try {
      var data = storageGet(STORAGE_KEYS.recordings) || [];
      recordingsList[1](data);
    } catch(e) { recordingsList[1]([]); }
  }, []);

  var deleteRecording = React.useCallback(function(key) {
    try {
      var data = storageGet(STORAGE_KEYS.recordings) || [];
      data = data.filter(function(d) { return d.key !== key; });
      storageSet(STORAGE_KEYS.recordings, data);
      loadRecordings();
      if (window.Muller.Toast) window.Muller.Toast.show({ title: 'Eliminada', desc: 'Grabación borrada.' });
    } catch(e) {}
  }, []);

  var deleteAllRecordings = React.useCallback(function() {
    try {
      storageSet(STORAGE_KEYS.recordings, []);
      recordingsList[1]([]);
      if (window.Muller.Toast) window.Muller.Toast.show({ title: 'Todas eliminadas', desc: 'Grabaciones borradas.' });
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
    wordStatuses[1]({});
    transcriptionErrors[1]([]);

    var wordCount = tokens[0].length;
    var estimatedTime = Math.max(ROUNDS_CONFIG.minTimeSeconds, Math.round(wordCount * 1.5));
    var baseTime = Math.round(estimatedTime * (1 + ROUNDS_CONFIG.initialTimeBuffer));
    roundTimeLimit[1](baseTime);
    startOscilloscope();
    startRoundTimer(baseTime);
  }, [tokens[0], text[0]]);

  // Usamos refs para evitar closures stale en el timer de rondas
  var roundStateRef = React.useRef({ currentRound: 1, roundTimeLimit: 30, roundTimeLeft: 30, roundTimes: [], roundScores: [] });

  var startRoundTimer = React.useCallback(function(limit) {
    if (roundTimer.current) clearInterval(roundTimer.current);
    roundTimeLeft[1](limit);
    roundStateRef.current.roundTimeLimit = limit;
    roundStateRef.current.roundTimeLeft = limit;
    roundTimer.current = setInterval(function() {
      roundTimeLeft[1](function(prev) {
        if (prev <= 1) {
          clearInterval(roundTimer.current);
          roundTimer.current = null;
          roundStateRef.current.roundTimeLeft = 0;
          // Ejecutar finishRound usando refs en lugar de closures
          finishRoundFromRefs();
          return 0;
        }
        roundStateRef.current.roundTimeLeft = prev - 1;
        return prev - 1;
      });
    }, 1000);
  }, []);

  // finishRound basado en refs para evitar closures stale
  var finishRoundFromRefs = React.useCallback(function() {
    if (roundTimer.current) { clearInterval(roundTimer.current); roundTimer.current = null; }

    var state = roundStateRef.current;
    var totalTime = state.roundTimeLimit - state.roundTimeLeft;
    var transcriptText = transcript[0];
    var compare = window.Muller.LecturaHelpers.compareTokens(text[0], transcriptText);
    var baseResult = window.Muller.LecturaHelpers.calculateScore(compare, totalTime);
    var roundScore = window.Muller.LecturaHelpers.calculateRoundScore(baseResult.score, totalTime, state.roundTimeLimit);

    var newTimes = state.roundTimes.concat([totalTime]);
    var newScores = state.roundScores.concat([roundScore]);
    roundTimes[1](newTimes);
    roundScores[1](newScores);

    // Guardar palabras falladas de esta ronda
    saveFailedWords(compare);

    var nextRound = state.currentRound + 1;
    if (nextRound <= ROUNDS_CONFIG.maxRounds) {
      var newLimit = Math.max(ROUNDS_CONFIG.minTimeSeconds, Math.round(state.roundTimeLimit * (1 - ROUNDS_CONFIG.timePenaltyPercent)));
      currentRound[1](nextRound);
      roundTimeLimit[1](newLimit);
      transcript[1]('');
      roundStateRef.current = { currentRound: nextRound, roundTimeLimit: newLimit, roundTimeLeft: newLimit, roundTimes: newTimes, roundScores: newScores };
      startRoundTimer(newLimit);
    } else {
      roundsActive[1](false);
      currentRound[1](0);
      compareResult[1](compare);
      scoreResult[1](baseResult);
      showScore[1](true);
      stopOscilloscope();

      try { window.Muller.Achievements.unlock('reading_3_rounds'); } catch(e) {}
      saveToHistory(baseResult);
    }
  }, [text[0], transcript[0]]);

  // finishRound legacy: llama a la versión con refs
  var finishRound = React.useCallback(function() {
    finishRoundFromRefs();
  }, [finishRoundFromRefs]);

  // ─── MODO MARATÓN ───
  var startMarathon = React.useCallback(function(durationSeconds) {
    if (marathonActive[0]) return;
    marathonDuration[1](durationSeconds);
    marathonTimeLeft[1](durationSeconds);
    marathonStats[1]({ correct: 0, total: 0, wpm: 0, streak: 0, bestStreak: 0 });
    transcript[1]('');
    interimText[1]('');
    showScore[1](false);
    scoreResult[1](null);
    wordStatuses[1]({});
    transcriptionErrors[1]([]);
    readingStartTime.current = Date.now();

    // Iniciar timer
    if (marathonTimer.current) clearInterval(marathonTimer.current);
    marathonTimer.current = setInterval(function() {
      marathonTimeLeft[1](function(prev) {
        if (prev <= 1) {
          clearInterval(marathonTimer.current);
          marathonTimer.current = null;
          finishMarathon();
          return 0;
        }
        return prev - 1;
      });
      // Actualizar wpm en vivo
      marathonStats[1](function(prev) {
        var elapsed = (Date.now() - readingStartTime.current) / 1000 / 60;
        var wpm = elapsed > 0 ? Math.round(prev.correct / elapsed) : 0;
        return Object.assign({}, prev, { wpm: wpm });
      });
    }, 1000);

    marathonActive[1](true);
    // Iniciar speech recognition
    startReading();
  }, [marathonActive[0], text[0]]);

  var stopMarathon = React.useCallback(function() {
    if (marathonTimer.current) {
      clearInterval(marathonTimer.current);
      marathonTimer.current = null;
    }
    marathonActive[1](false);
    stopReading();

    // Guardar estadísticas de maratón
    try {
      var data = storageGet(STORAGE_KEYS.marathonHistory) || [];
      data.push({
        timestamp: new Date().toISOString(),
        duration: marathonDuration[0],
        stats: marathonStats[0]
      });
      if (data.length > 50) data = data.slice(-50);
      storageSet(STORAGE_KEYS.marathonHistory, data);
    } catch(e) {}
  }, [marathonDuration[0], marathonStats[0]]);

  var finishMarathon = React.useCallback(function() {
    marathonActive[1](false);
    readingDuration.current = marathonDuration[0] * 1000;
    stopReading();

    try {
      var data = storageGet(STORAGE_KEYS.marathonHistory) || [];
      data.push({
        timestamp: new Date().toISOString(),
        duration: marathonDuration[0],
        stats: marathonStats[0]
      });
      if (data.length > 50) data = data.slice(-50);
      storageSet(STORAGE_KEYS.marathonHistory, data);
    } catch(e) {}
  }, [marathonDuration[0], marathonStats[0]]);

  // ─── FUNCIONES DE KARAOKE ───
  var startKaraoke = React.useCallback(function() {
    karaokeActive[1](true);
    karaokeCurrentWord[1](0);

    var kWords = tokens[0].map(function(t) { return t.word; });
    karaokeWords[1](kWords);

    if (window.Muller.playSceneAudio) {
      window.Muller.playSceneAudio(text[0], 'de', {
        onboundary: function(event) {
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
    if (window.Muller.stopSpeech) window.Muller.stopSpeech();
    karaokeActive[1](false);
    karaokeCurrentWord[1](-1);
  }, []);

  // ─── FUNCIONES DE OSCILOSCOPIO ───
  var startOscilloscope = React.useCallback(function() {
    if (oscilloscopeActive[0]) return;
    if (!navigator.mediaDevices) return;
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
      oscilloscopeStreamRef.current = stream;
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
  }, [oscilloscopeActive[0]]);

  var stopOscilloscope = React.useCallback(function() {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (oscilloscopeStreamRef.current) {
      oscilloscopeStreamRef.current.getTracks().forEach(function(t) { t.stop(); });
      oscilloscopeStreamRef.current = null;
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

    var sentences = text[0].split(/[.!?]+/).filter(Boolean);
    if (sentences.length > 0) {
      var randomIdx = Math.floor(Math.random() * sentences.length);
      dictadoCurrentSentence[1](sentences[randomIdx].trim());
      if (window.Muller.playSceneAudio) {
        window.Muller.playSceneAudio(sentences[randomIdx].trim(), 'de');
      }
    }
  }, [text[0]]);

  var repeatDictadoPhrase = React.useCallback(function() {
    if (dictadoCurrentSentence[0] && window.Muller.playSceneAudio) {
      window.Muller.playSceneAudio(dictadoCurrentSentence[0], 'de');
    }
  }, [dictadoCurrentSentence[0]]);

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
        textPreview: text[0] ? text[0].substring(0, 100) : '',
        score: result.score,
        accuracy: result.accuracy,
        wpm: result.wpm,
        correct: result.correct,
        total: result.total,
        errors: transcriptionErrors[0].length,
        duration: readingDuration.current,
        rounds: roundScores[0].length > 0 ? roundScores[0] : null
      };

      var data = storageGet(STORAGE_KEYS.history) || [];
      data.unshift(entry);
      if (data.length > 200) data = data.slice(0, 200);
      storageSet(STORAGE_KEYS.history, data);
      loadHistory();
      updateStreak();
      checkAchievements(result);
    } catch(e) {
      console.warn('Could not save history:', e);
    }
  }, [source[0], text[0], readingDuration.current, roundScores[0], transcriptionErrors[0]]);

  var loadHistory = React.useCallback(function() {
    try {
      var data = storageGet(STORAGE_KEYS.history) || [];
      history[1](data);
      readingCount[1](data.length);
    } catch(e) { history[1]([]); }
  }, []);

  var updateStreak = React.useCallback(function() {
    try {
      var now = new Date();
      var today = now.toISOString().split('T')[0];
      var streakData = storageGet(STORAGE_KEYS.streak) || { current: 0, lastDate: null };

      if (streakData.lastDate === today) return;

      var lastDate = streakData.lastDate ? new Date(streakData.lastDate) : null;
      var yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);

      if (!lastDate || lastDate.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0]) {
        streakData.current++;
      } else {
        streakData.current = 1;
      }
      streakData.lastDate = today;
      storageSet(STORAGE_KEYS.streak, streakData);
      streak[1](streakData.current);

      if (streakData.current >= 7) {
        try { window.Muller.Achievements.unlock('reading_streak_7'); } catch(e) {}
      }
    } catch(e) {}
  }, []);

  var loadStreak = React.useCallback(function() {
    try {
      var data = storageGet(STORAGE_KEYS.streak) || { current: 0, lastDate: null };
      streak[1](data.current);
    } catch(e) { streak[1](0); }
  }, []);

  // ─── FUNCIONES DE LOGROS ───
  var checkAchievements = React.useCallback(function(result) {
    if (readingCount[0] >= 10) {
      try { window.Muller.Achievements.unlock('reading_10_texts'); } catch(e) {}
    }
    if (result && result.wpm >= 100) {
      try { window.Muller.Achievements.unlock('reading_speed_100'); } catch(e) {}
    }
  }, [readingCount[0]]);

  // ─── FUNCIONES DE BIBLIOTECA ───
  var loadLibrary = React.useCallback(function() {
    var lib = window.Muller.LecturaHelpers.getDefaultLibrary ? window.Muller.LecturaHelpers.getDefaultLibrary() : [];
    try {
      var custom = storageGet(STORAGE_KEYS.texts) || [];
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
    wordStatuses[1]({});
    transcriptionErrors[1]([]);
  }, []);

  var importPDFText = React.useCallback(function(pdfText) {
    selectText(pdfText, 'pdf');
  }, []);

  var pasteText = React.useCallback(function(textArg) {
    var pastedText = textArg;
    if (!pastedText) {
      pastedText = pasteTextInput[0].trim();
    }
    if (!pastedText) {
      if (window.Muller.Toast) window.Muller.Toast.show({ title: 'Sin contenido', desc: 'Pega primero un texto en el área.' });
      return;
    }
    selectText(pastedText, 'paste');
    try {
      var custom = storageGet(STORAGE_KEYS.texts) || [];
      custom.push({ id: 'custom_' + Date.now(), title: 'Texto pegado ' + (custom.length + 1), text: pastedText, level: 'N/A', isCustom: true });
      storageSet(STORAGE_KEYS.texts, custom);
      loadLibrary();
    } catch(e) {}
    pasteTextInput[1]('');
  }, [pasteTextInput[0]]);

  var deleteCustomText = React.useCallback(function(id) {
    try {
      var custom = storageGet(STORAGE_KEYS.texts) || [];
      custom = custom.filter(function(t) { return t.id !== id; });
      storageSet(STORAGE_KEYS.texts, custom);
      loadLibrary();
    } catch(e) {}
  }, []);

  // clearText eliminado: era código muerto con variables indefinidas

  // ─── FUNCIONES DE AI PLACEHOLDER (mejorado para DeepSeek) ───
  var aiAnalyzeReading = React.useCallback(function(textData, transcriptData) {
    var wordCount = textData ? window.Muller.LecturaHelpers.tokenize(textData).length : 0;
    var readingTime = readingDuration.current;
    var errors = transcriptionErrors[0] || [];

    // Si DeepSeek está disponible, usarlo
    if (window.Muller.DeepSeek && window.Muller.DeepSeek.analyze) {
      return window.Muller.DeepSeek.analyze({
        type: 'reading',
        text: textData,
        transcript: transcriptData,
        errors: errors,
        readingTime: readingTime
      });
    }

    // Fallback offline mejorado
    var analysis = {
      analysis: 'Análisis local',
      wordCount: wordCount,
      readingTime: readingTime,
      errorCount: errors.length,
      errorWords: errors.map(function(e) { return e.expected; }),
      suggestedFocus: errors.length > 3 ? 'Pronunciación' : 'Vocabulario',
      message: errors.length > 0
        ? 'Has cometido ' + errors.length + ' error(es) de pronunciación. Revisa las palabras marcadas en rojo.'
        : '¡Buena lectura! Tu pronunciación es clara.',
      deepseekReady: window.Muller.DeepSeek ? true : false
    };

    // Sugerencias basadas en errores fonéticos
    var phoneticTips = [];
    errors.forEach(function(err) {
      if (err.phoneticErrors && err.phoneticErrors.length > 0) {
        phoneticTips = phoneticTips.concat(err.phoneticErrors);
      }
    });
    if (phoneticTips.length > 0) {
      analysis.phoneticTips = phoneticTips.slice(0, 5);
      analysis.message += ' Consejos: ' + phoneticTips.slice(0, 3).join(' | ');
    }

    return analysis;
  }, [transcriptionErrors[0], readingDuration.current]);

  // ─── MAPA DE CALOR ───
  var toggleHeatmap = React.useCallback(function() {
    if (showHeatmap[0]) {
      showHeatmap[1](false);
      return;
    }
    // Cargar palabras falladas del historial reciente
    try {
      var historyData = storageGet(STORAGE_KEYS.history) || [];
      var fallWords = storageGet(STORAGE_KEYS.fallWords) || [];
      var hTokens = window.Muller.LecturaHelpers.generateHeatmap(tokens[0], fallWords);
      heatmapTokens[1](hTokens);
      showHeatmap[1](true);
    } catch(e) {
      showHeatmap[1](false);
    }
  }, [tokens[0], showHeatmap[0]]);

  // ─── EXPORTAR / IMPORTAR ESTADÍSTICAS ───
  var exportStats = React.useCallback(function() {
    try {
      var data = {
        version: 1,
        exportedAt: new Date().toISOString(),
        history: storageGet(STORAGE_KEYS.history) || [],
        streak: storageGet(STORAGE_KEYS.streak) || { current: 0, lastDate: null },
        recordingsCount: (storageGet(STORAGE_KEYS.recordings) || []).length,
        fallWords: storageGet(STORAGE_KEYS.fallWords) || [],
        marathonHistory: storageGet(STORAGE_KEYS.marathonHistory) || []
      };
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'muller_reading_stats_' + new Date().toISOString().split('T')[0] + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      if (window.Muller.Toast) window.Muller.Toast.show({ title: 'Exportado', desc: 'Estadísticas descargadas como JSON.' });
    } catch(e) {
      console.warn('Export error:', e);
    }
  }, []);

  var importStats = React.useCallback(function(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      try {
        var data = JSON.parse(e.target.result);
        if (!data.version) throw new Error('Formato inválido');
        if (data.history) storageSet(STORAGE_KEYS.history, data.history);
        if (data.streak) storageSet(STORAGE_KEYS.streak, data.streak);
        if (data.fallWords) storageSet(STORAGE_KEYS.fallWords, data.fallWords);
        if (data.marathonHistory) storageSet(STORAGE_KEYS.marathonHistory, data.marathonHistory);
        loadHistory();
        loadStreak();
        loadFallWords();
        if (window.Muller.Toast) window.Muller.Toast.show({ title: 'Importado', desc: 'Estadísticas cargadas correctamente.' });
      } catch(err) {
        if (window.Muller.Toast) window.Muller.Toast.show({ title: 'Error', desc: 'Archivo inválido.' });
      }
    };
    reader.readAsText(file);
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
    if (window.Muller.playSceneAudio) {
      var startTime = Date.now();
      window.Muller.playSceneAudio(text[0], 'de', {
        onboundary: function(event) {
          var elapsed = (Date.now() - startTime) / 1000;
          var totalDuration = text[0].split(' ').length * 0.3;
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
    if (window.Muller.stopSpeech) window.Muller.stopSpeech();
    shadowActive[1](false);
    shadowSync[1](0);
  }, []);

  // ─── MANEJADORES DE PALABRA CLICK / SELECCIÓN ───
  var handleWordClick = React.useCallback(function(word, cleanKey) {
    activeWord[1](word);
    setWordInfo(word, cleanKey);
  }, []);

  var setWordInfo = React.useCallback(function(word, cleanKey) {
    if (window.Muller.translate && window.Muller.translate.word) {
      window.Muller.translate.word(cleanKey || word).then(function(info) {
        wordInfo[1](info);
        showTranslation[1](true);
      }).catch(function() {
        wordInfo[1]({ word: word, translation: 'Traducción no disponible' });
        showTranslation[1](true);
      });
    } else {
      wordInfo[1]({ word: word, translation: 'Sin servicio de traducción' });
      showTranslation[1](true);
    }
    // TTS de la palabra
    try { window.Muller.speakGermanWord(word); } catch(e) {}
  }, []);

  var handleTextSelection = React.useCallback(function() {
    var sel = window.getSelection();
    if (sel && sel.toString().trim()) {
      selectedText[1](sel.toString().trim());
    }
  }, []);

  var clearSelection = React.useCallback(function() {
    selectedText[1]('');
    var sel = window.getSelection();
    if (sel) sel.removeAllRanges();
  }, []);

  var playSelectedText = React.useCallback(function() {
    if (selectedText[0] && window.Muller.playSceneAudio) {
      window.Muller.playSceneAudio(selectedText[0], 'de');
    }
  }, [selectedText[0]]);

  // ─── MODO SIN CONEXIÓN ───
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

  // ─── ATAJOS DE TECLADO ───
  React.useEffect(function() {
    function handleKeyDown(e) {
      // Solo si no estamos en un input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.code) {
        case KEYBOARD_SHORTCUTS.SPACE:
          e.preventDefault();
          if (text[0]) {
            if (isReading[0]) stopReading();
            else startReading();
          }
          break;
        case KEYBOARD_SHORTCUTS.ARROW_LEFT:
          e.preventDefault();
          if (activeWord[0] && tokens[0].length > 0) {
            var currentIdx = tokens[0].findIndex(function(t) { return t.word === activeWord[0]; });
            if (currentIdx > 0) {
              var prevToken = tokens[0][currentIdx - 1];
              handleWordClick(prevToken.word, prevToken.cleanKey);
            }
          }
          break;
        case KEYBOARD_SHORTCUTS.ARROW_RIGHT:
          e.preventDefault();
          if (activeWord[0] && tokens[0].length > 0) {
            var currentIdx = tokens[0].findIndex(function(t) { return t.word === activeWord[0]; });
            if (currentIdx < tokens[0].length - 1) {
              var nextToken = tokens[0][currentIdx + 1];
              handleWordClick(nextToken.word, nextToken.cleanKey);
            }
          }
          break;
        case KEYBOARD_SHORTCUTS.KEY_M:
          e.preventDefault();
          if (text[0] && !marathonActive[0]) startMarathon(300);
          else if (marathonActive[0]) stopMarathon();
          break;
        case KEYBOARD_SHORTCUTS.KEY_H:
          e.preventDefault();
          showHistory[1](function(prev) { return !prev; });
          break;
        case KEYBOARD_SHORTCUTS.KEY_L:
          e.preventDefault();
          showLibrary[1](function(prev) { return !prev; });
          break;
        case KEYBOARD_SHORTCUTS.KEY_R:
          e.preventDefault();
          if (text[0] && !roundsActive[0]) startRounds();
          break;
        case KEYBOARD_SHORTCUTS.KEY_K:
          e.preventDefault();
          if (!karaokeActive[0] && text[0]) startKaraoke();
          else if (karaokeActive[0]) stopKaraoke();
          break;
        case KEYBOARD_SHORTCUTS.KEY_S:
          e.preventDefault();
          if (!shadowActive[0] && text[0]) startShadowReading();
          else if (shadowActive[0]) stopShadowReading();
          break;
        case KEYBOARD_SHORTCUTS.KEY_D:
          e.preventDefault();
          if (!dictadoActive[0] && text[0]) startDictado();
          else if (dictadoActive[0]) stopDictado();
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return function() { window.removeEventListener('keydown', handleKeyDown); };
  }, [text[0], isReading[0], activeWord[0], tokens[0], marathonActive[0], roundsActive[0], karaokeActive[0], shadowActive[0], dictadoActive[0]]);

  // ─── PREFERENCIAS DE FUENTE ───
  React.useEffect(function() {
    try {
      var pref = storageGet(STORAGE_KEYS.preferences);
      if (pref && pref.fontSize) fontSize[1](pref.fontSize);
    } catch(e) {}
  }, []);

  React.useEffect(function() {
    try {
      storageSet(STORAGE_KEYS.preferences, { fontSize: fontSize[0] });
    } catch(e) {}
  }, [fontSize[0]]);

  // ─── CARGA INICIAL ───
  React.useEffect(function() {
    loadHistory();
    loadStreak();
    loadRecordings();
    loadLibrary();
    loadFallWords();
  }, []);

  // ─── RETURN ───
  return {
    // Principales
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

    // Feedback visual en vivo
    wordStatuses: wordStatuses[0],
    transcriptionErrors: transcriptionErrors[0],

    // Grabación
    isRecording: isRecording[0],
    recordedBlob: recordedBlob[0],
    recordingsList: recordingsList[0],
    isPlayingRecording: isPlayingRecording[0],
    startRecording: startRecording,
    stopRecording: stopRecording,
    playRecording: playRecording,
    playRecordingFromDataURL: playRecordingFromDataURL,
    deleteRecording: deleteRecording,
    deleteAllRecordings: deleteAllRecordings,

    // Puntuación
    compareResult: compareResult[0],
    scoreResult: scoreResult[0],
    showScore: showScore[0], setShowScore: showScore[1],

    // Rondas
    roundsActive: roundsActive[0],
    currentRound: currentRound[0],
    roundTimes: roundTimes[0],
    roundScores: roundScores[0],
    roundTimeLimit: roundTimeLimit[0],
    roundTimeLeft: roundTimeLeft[0],
    startRounds: startRounds,
    finishRound: finishRound,

    // Maratón
    marathonActive: marathonActive[0],
    marathonDuration: marathonDuration[0],
    marathonTimeLeft: marathonTimeLeft[0],
    marathonStats: marathonStats[0],
    startMarathon: startMarathon,
    stopMarathon: stopMarathon,

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
    audioContextRef: audioContextRef,
    startOscilloscope: startOscilloscope,
    stopOscilloscope: stopOscilloscope,

    // Dictado
    dictadoActive: dictadoActive[0],
    dictadoCurrentSentence: dictadoCurrentSentence[0],
    dictadoUserInput: dictadoUserInput[0], setDictadoUserInput: dictadoUserInput[1],
    dictadoScore: dictadoScore[0],
    startDictado: startDictado,
    repeatDictadoPhrase: repeatDictadoPhrase,
    submitDictado: submitDictado,
    stopDictado: stopDictado,

    // Historial
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
    pasteTextInput: pasteTextInput[0], setPasteTextInput: pasteTextInput[1],
    deleteCustomText: deleteCustomText,
    loadLibrary: loadLibrary,

    // Fuente
    increaseFont: increaseFont,
    decreaseFont: decreaseFont,
    resetFont: resetFont,

    // Palabra y selección
    handleWordClick: handleWordClick,
    handleTextSelection: handleTextSelection,
    clearSelection: clearSelection,
    playSelectedText: playSelectedText,

    // Sombra
    shadowActive: shadowActive[0],
    shadowSync: shadowSync[0],
    startShadowReading: startShadowReading,
    stopShadowReading: stopShadowReading,

    // Offline
    isOffline: isOffline[0],

    // AI
    aiAnalyzeReading: aiAnalyzeReading,

    // SRS de palabras falladas
    fallWordsList: fallWordsList[0],
    clearFallWords: clearFallWords,

    // Mapa de calor
    showHeatmap: showHeatmap[0],
    heatmapTokens: heatmapTokens[0],
    toggleHeatmap: toggleHeatmap,

    // Exportar / Importar
    showExportImport: showExportImport[0], setShowExportImport: showExportImport[1],
    exportStats: exportStats,
    importStats: importStats
  };
};