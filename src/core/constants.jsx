// ═══════════════════════════════════════════════════
// CONSTANTES GLOBALES - Profesor Plaza Müller v2
// ═══════════════════════════════════════════════════
(function() {
  const M = window.Muller = window.Muller || {};

  M.KEYS = {
    ACCOUNTS: 'muller_accounts_v1',
    SESSION: 'muller_session_v1',
    BX_USER_OVERLAY: 'muller_bx_user_overlay_v1',
    VOCAB_SRS: 'muller_vocab_srs_v1',
    STREAK_TODAY: 'muller_streak_today_v1',
    STREAK_QUAL: 'muller_streak_qual_v1',
    MAIN_GOAL: 'muller_main_goal_v1',
    OCR_HISTORY: 'muller_ocr_history_v1',
    THEME: 'muller_theme_v1',
    ONBOARDING: 'muller_onboarding_v1',
    READING_FONT: 'muller_reading_font_v1',
    PDF_STUDY: 'muller_pdf_study_v1',
    PDF_NOTES: 'muller_pdf_notes_v1',
    PDF_LIBRARY: 'muller_pdf_library_v1',
    TTS_RATE: 'muller_tts_rate_v1',
    MIC_PERMISSION: 'muller_mic_permission_v1',
    GOAL_CLAIM: 'muller_goal_claim_v1',
    ACHIEVEMENTS: 'muller_achievements',
    ADVANCED_PROGRESS: 'muller_advanced_progress',
    DAILY_ACTIVITY: 'muller_daily_activity',
    B1B2_SESSION: 'muller_b1b2_json_v1',
    // PLAZA MÜNZEN & PREMIUM
    PLAZA_MUENZEN: 'muller_plaza_muenzen_v1',
    ACTIVE_TIME: 'muller_active_time_v1',
    MISSIONS: 'muller_missions_v1',
    MISSION_PROGRESS: 'muller_mission_progress_v1',
    ACHIEVEMENT_BADGES: 'muller_achievement_badges_v1',
    TELC_TRACKING: 'muller_telc_tracking_v1',
    PROGRESS_EXPORT: 'muller_progress_export_v1'
  };

  M.DEFAULT_GOAL = 30;
  M.DEFAULT_TTS_RATE = 0.92;
  M.DEFAULT_THEME = 'dark';
  M.LEVELS = ['A1','A2','B1','B2','C1'];
  M.ARTICLE_MODES = ['der','die','das'];
  M.SUBMODOS_HISTORIA = ['Flüstern','Ruido','Diktat','Huecos','Artículos','Declinar','Tempus','Satzbau','Oído'];
  M.MAIN_TABS = ['inicio','historia','biblioteca','lexikon','telc','entrenamiento','comunidad','lectura','escritura','progreso','maestros','ia','ajustes'];
  M.COLORS = { bg:'#0f172a', surface:'#1e293b', border:'#334155', accent:'#06b6d4', accentAlt:'#8b5cf6', text:'#e2e8f0', muted:'#94a3b8' };
  M.TTS_RATES = [{id:'0.75',rate:'0.75'},{id:'0.92',rate:'0.92'},{id:'1.0',rate:'1.0'},{id:'1.15',rate:'1.15'},{id:'1.3',rate:'1.3'}];
  M.UI_THEMES = [{id:'dark',label:'Oscuro'},{id:'light',label:'Claro'},{id:'contrast',label:'Contraste'}];
  
  // PLAZA MÜNZEN - sistema de monedas
  M.PLAZA_MUENZEN_RATES = {
    DAILY_LOGIN: 10,
    MISSION_COMPLETE: 50,
    STREAK_7D: 100,
    STREAK_30D: 500,
    EXERCISE_COMPLETE: 5,
    WRITING_SESSION: 15,
    READING_SESSION: 10,
    TELC_PRACTICE: 25,
    ACHIEVEMENT_UNLOCK: 100,
    PERFECT_SCORE: 30,
    FIRST_OF_DAY: 20
  };

  // PLAZA MÜNZEN - tienda
  M.PLAZA_MUENZEN_SHOP = [
    { id: 'theme_gold', name: 'Tema Dorado', cost: 500, desc: 'Desbloquea tema visual dorado', type: 'theme' },
    { id: 'theme_ocean', name: 'Tema Océano', cost: 300, desc: 'Desbloquea tema visual azul océano', type: 'theme' },
    { id: 'hint_pack_5', name: '5 Pistas Extra', cost: 50, desc: '5 pistas para usar en ejercicios', type: 'hint', qty: 5 },
    { id: 'hint_pack_20', name: '20 Pistas Extra', cost: 150, desc: '20 pistas para usar en ejercicios', type: 'hint', qty: 20 },
    { id: 'ai_coach_1h', name: 'Personal Trainer AI (1h)', cost: 200, desc: '1 hora de coaching con IA personalizada', type: 'ai_coach', hours: 1 },
    { id: 'ai_coach_5h', name: 'Personal Trainer AI (5h)', cost: 800, desc: '5 horas de coaching con IA personalizada', type: 'ai_coach', hours: 5 },
    { id: 'telc_sim_b1', name: 'Simulacro TELC B1', cost: 300, desc: 'Simulacro completo de examen TELC B1', type: 'telc_sim', level: 'B1' },
    { id: 'telc_sim_b2', name: 'Simulacro TELC B2', cost: 400, desc: 'Simulacro completo de examen TELC B2', type: 'telc_sim', level: 'B2' },
    { id: 'premium_week', name: 'Semana Premium', cost: 1000, desc: '1 semana de todas las funciones premium', type: 'premium', days: 7 },
    { id: 'premium_month', name: 'Mes Premium', cost: 3000, desc: '1 mes de todas las funciones premium', type: 'premium', days: 30 }
  ];

  // MISIONES
  M.MISSIONS_DAILY_POOL = [
    { id: 'daily_dictation', name: '3 Dictados', desc: 'Completa 3 dictados', reward: 50, icon: 'ear', target: 3, type: 'daily' },
    { id: 'daily_writing', name: '15 min Escritura', desc: 'Escribe durante 15 minutos', reward: 40, icon: 'pen', target: 15, type: 'daily', unit: 'min' },
    { id: 'daily_reading', name: '10 min Lectura', desc: 'Lee durante 10 minutos', reward: 30, icon: 'book', target: 10, type: 'daily', unit: 'min' },
    { id: 'daily_vocab', name: '10 Palabras Nuevas', desc: 'Aprende 10 palabras nuevas', reward: 45, icon: 'bookmark', target: 10, type: 'daily' },
    { id: 'daily_streak', name: 'Racha del Día', desc: 'Completa la racha del día', reward: 20, icon: 'flame', target: 1, type: 'daily' },
    { id: 'daily_telc', name: '1 Ejercicio TELC', desc: 'Completa 1 ejercicio TELC', reward: 35, icon: 'target', target: 1, type: 'daily' },
    { id: 'daily_history', name: '1 Ronda Historia', desc: 'Completa 1 ronda en Historia', reward: 25, icon: 'book-open', target: 1, type: 'daily' }
  ];

  M.MISSIONS_WEEKLY_POOL = [
    { id: 'weekly_streak_7', name: '7 Días de Racha', desc: 'Mantén la racha toda la semana', reward: 500, icon: 'flame', target: 7, type: 'weekly' },
    { id: 'weekly_exercises_50', name: '50 Ejercicios', desc: 'Completa 50 ejercicios', reward: 300, icon: 'zap', target: 50, type: 'weekly' },
    { id: 'weekly_hours_5', name: '5 Horas de Estudio', desc: 'Estudia 5 horas activas', reward: 400, icon: 'clock', target: 5, type: 'weekly', unit: 'hours' },
    { id: 'weekly_writing_3', name: '3 Textos', desc: 'Escribe 3 textos completos', reward: 250, icon: 'pen-tool', target: 3, type: 'weekly' },
    { id: 'weekly_all_modes', name: 'Todos los Submodos', desc: 'Prueba todos los submodos de Historia', reward: 600, icon: 'layers', target: 9, type: 'weekly' }
  ];

  M.MISSIONS_MONTHLY_POOL = [
    { id: 'monthly_30d_streak', name: '30 Días de Racha', desc: 'Mantén la racha todo el mes', reward: 2000, icon: 'flame', target: 30, type: 'monthly' },
    { id: 'monthly_1000_words', name: '1000 Palabras', desc: 'Aprende o repasa 1000 palabras', reward: 1500, icon: 'bookmark', target: 1000, type: 'monthly' },
    { id: 'monthly_30h_study', name: '30 Horas de Estudio', desc: 'Estudia 30 horas activas', reward: 1800, icon: 'clock', target: 30, type: 'monthly', unit: 'hours' },
    { id: 'monthly_telc_pass', name: 'Simulacro TELC Aprobado', desc: 'Aprueba un simulacro TELC (≥60%)', reward: 2500, icon: 'award', target: 1, type: 'monthly' }
  ];

  // LOGROS / INSIGNIAS (30+)
  M.ACHIEVEMENT_BADGES = [
    { id: 'first_login', name: 'Willkommen!', desc: 'Primer inicio de sesión', emoji: '👋', rarity: 'common', category: 'general' },
    { id: 'streak_7', name: '7 Tage', desc: '7 días de racha', emoji: '🔥', rarity: 'common', category: 'streak' },
    { id: 'streak_30', name: 'Ein Monat', desc: '30 días de racha', emoji: '💪', rarity: 'uncommon', category: 'streak' },
    { id: 'streak_90', name: 'Vierteljahr', desc: '90 días de racha', emoji: '⚡', rarity: 'rare', category: 'streak' },
    { id: 'streak_365', name: 'Ein Jahr!', desc: '365 días de racha', emoji: '👑', rarity: 'legendary', category: 'streak' },
    { id: 'first_mission', name: 'Fleißig', desc: 'Completar primera misión', emoji: '✅', rarity: 'common', category: 'missions' },
    { id: 'missions_10', name: 'Missionar', desc: '10 misiones completadas', emoji: '🎯', rarity: 'uncommon', category: 'missions' },
    { id: 'missions_50', name: 'Professionell', desc: '50 misiones completadas', emoji: '🏅', rarity: 'rare', category: 'missions' },
    { id: 'missions_100', name: 'Legende der Missionen', desc: '100 misiones completadas', emoji: '🌟', rarity: 'legendary', category: 'missions' },
    { id: 'words_10', name: 'Wörtersammler', desc: '10 palabras aprendidas', emoji: '📝', rarity: 'common', category: 'vocabulary' },
    { id: 'words_100', name: 'Vokabelmeister', desc: '100 palabras aprendidas', emoji: '📚', rarity: 'uncommon', category: 'vocabulary' },
    { id: 'words_500', name: 'Wortschatzprofi', desc: '500 palabras aprendidas', emoji: '📖', rarity: 'rare', category: 'vocabulary' },
    { id: 'words_1000', name: 'Sprachgenie', desc: '1000 palabras aprendidas', emoji: '🧠', rarity: 'legendary', category: 'vocabulary' },
    { id: 'hours_1', name: 'Anfänger', desc: '1 hora de estudio activo', emoji: '⏱️', rarity: 'common', category: 'time' },
    { id: 'hours_10', name: 'Lernender', desc: '10 horas de estudio activo', emoji: '⏰', rarity: 'uncommon', category: 'time' },
    { id: 'hours_50', name: 'Eifriger Lerner', desc: '50 horas de estudio activo', emoji: '⌛', rarity: 'rare', category: 'time' },
    { id: 'hours_100', name: 'Zeitmeister', desc: '100 horas de estudio activo', emoji: '⏳', rarity: 'legendary', category: 'time' },
    { id: 'hours_500', name: 'Zeitlegende', desc: '500 horas de estudio activo', emoji: '⌚', rarity: 'legendary', category: 'time' },
    { id: 'muenzen_100', name: 'Münzensammler', desc: 'Acumula 100 Plaza Münzen', emoji: '🪙', rarity: 'common', category: 'currency' },
    { id: 'muenzen_1000', name: 'Münzenmeister', desc: 'Acumula 1000 Plaza Münzen', emoji: '💰', rarity: 'uncommon', category: 'currency' },
    { id: 'muenzen_5000', name: 'Münzenkönig', desc: 'Acumula 5000 Plaza Münzen', emoji: '💎', rarity: 'rare', category: 'currency' },
    { id: 'muenzen_10000', name: 'Münzenlegende', desc: 'Acumula 10000 Plaza Münzen', emoji: '🏦', rarity: 'legendary', category: 'currency' },
    { id: 'first_telc', name: 'TELC-Anwärter', desc: 'Completar primer ejercicio TELC', emoji: '🎯', rarity: 'common', category: 'telc' },
    { id: 'telc_b1_pass', name: 'B1 Bestanden', desc: 'Aprobar simulacro TELC B1', emoji: '📜', rarity: 'uncommon', category: 'telc' },
    { id: 'telc_b2_pass', name: 'B2 Bestanden', desc: 'Aprobar simulacro TELC B2', emoji: '📜', rarity: 'rare', category: 'telc' },
    { id: 'telc_perfect', name: 'Perfektion', desc: 'Conseguir 100% en un ejercicio TELC', emoji: '💯', rarity: 'legendary', category: 'telc' },
    { id: 'history_all', name: 'Geschichtenmeister', desc: 'Completar todos los submodos de Historia', emoji: '📖', rarity: 'rare', category: 'history' },
    { id: 'writing_10', name: 'Schreibanfänger', desc: '10 textos escritos', emoji: '✍️', rarity: 'common', category: 'writing' },
    { id: 'writing_50', name: 'Schreibprofi', desc: '50 textos escritos', emoji: '🖊️', rarity: 'uncommon', category: 'writing' },
    { id: 'writing_100', name: 'Schreibmeister', desc: '100 textos escritos', emoji: '✒️', rarity: 'rare', category: 'writing' },
    { id: 'shop_first', name: 'Käufer', desc: 'Primera compra en la tienda', emoji: '🛒', rarity: 'common', category: 'shop' },
    { id: 'shop_all_themes', name: 'Sammler', desc: 'Comprar todos los temas', emoji: '🎨', rarity: 'rare', category: 'shop' },
    { id: 'perfect_day', name: 'Perfecter Tag', desc: 'Completar todas las misiones diarias', emoji: '⭐', rarity: 'uncommon', category: 'missions' }
  ];

  // TELC niveles de puntuación
  M.TELC_THRESHOLDS = {
    B1: { pass: 60, gut: 80, sehrGut: 90 },
    B2: { pass: 60, gut: 75, sehrGut: 85 },
    C1: { pass: 60, gut: 70, sehrGut: 80 }
  };

  // TELC competencias
  M.TELC_COMPETENCIES = ['Lesen', 'Hören', 'Schreiben', 'Sprechen'];

  // Racha de calidad
  M.STREAK_QUALITY = {
    BRONZE: { days: 7, label: 'Bronze', emoji: '🥉' },
    SILVER: { days: 30, label: 'Silber', emoji: '🥈' },
    GOLD: { days: 90, label: 'Gold', emoji: '🥇' },
    DIAMOND: { days: 365, label: 'Diamant', emoji: '💎' }
  };

  // Logo path
  M.LOGO_PATH = 'assets/icons/Logo-Plaza-Sin-fondo_20250125_054126_0000.png';
})();