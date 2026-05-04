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
    ACTIVE_TIME: 'muller_active_time_v1',
    MISSIONS: 'muller_missions_v1',
    CLAIMED_REWARDS: 'muller_claimed_rewards_v1',
    PLAZA_MUENZEN: 'muller_plaza_muenzen_v1',
    SHOP_PURCHASES: 'muller_shop_purchases_v1',
  };

  M.DEFAULT_GOAL = 30;
  M.DEFAULT_TTS_RATE = 0.92;
  M.DEFAULT_THEME = 'dark';
  M.LEVELS = ['A1','A2','B1','B2','C1'];
  M.ARTICLE_MODES = ['der','die','das'];
  M.SUBMODOS_HISTORIA = ['Flüstern','Ruido','Diktat','Huecos','Artículos','Declinar','Tempus','Satzbau','Oído'];
  M.MAIN_TABS = ['inicio','historia','biblioteca','lexikon','telc','entrenamiento','comunidad','lectura','escritura','progreso','tienda','maestros','ia','ajustes','pdfstudy'];
  M.COLORS = { bg:'#0f172a', surface:'#1e293b', border:'#334155', accent:'#06b6d4', accentAlt:'#8b5cf6', text:'#e2e8f0', muted:'#94a3b8' };
  M.TTS_RATES = [{id:'0.75',rate:'0.75'},{id:'0.92',rate:'0.92'},{id:'1.0',rate:'1.0'},{id:'1.15',rate:'1.15'},{id:'1.3',rate:'1.3'}];
  M.UI_THEMES = [{id:'dark',label:'Oscuro'},{id:'light',label:'Claro'},{id:'contrast',label:'Contraste'}];
})();
