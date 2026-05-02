-- ========== PROFESOR PLAZA MÜLLER – Migración Supabase ==========
-- Ejecutar en SQL Editor de Supabase
-- Este script crea TODAS las tablas necesarias (idempotente).

-- =====================================================
-- 1. TABLAS EXISTENTES (settings, srs)
-- =====================================================

-- Tabla de ajustes de usuario
CREATE TABLE IF NOT EXISTS user_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  settings JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);

-- Tabla de SRS (repetición espaciada)
CREATE TABLE IF NOT EXISTS user_srs (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  srs JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_user_srs_user_id ON user_srs(user_id);

-- =====================================================
-- 2. NUEVAS TABLAS (guiones, progreso, vocabulario, logros)
-- =====================================================

-- Guiones guardados por el usuario
CREATE TABLE IF NOT EXISTS user_scripts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  script_data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Progreso del usuario (escenas completadas, rachas, puntuación)
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  progress_data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Vocabulario del usuario
CREATE TABLE IF NOT EXISTS user_vocab (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  vocab_data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Logros del usuario
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievements_data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 3. POLÍTICAS RLS (Row Level Security)
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_srs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_vocab ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- user_settings
CREATE POLICY "Usuarios ven sus ajustes" ON user_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios editan sus ajustes" ON user_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan sus ajustes" ON user_settings FOR UPDATE USING (auth.uid() = user_id);

-- user_srs
CREATE POLICY "Usuarios ven su SRS" ON user_srs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios editan su SRS" ON user_srs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan su SRS" ON user_srs FOR UPDATE USING (auth.uid() = user_id);

-- user_scripts
CREATE POLICY "Usuarios ven sus guiones" ON user_scripts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios insertan sus guiones" ON user_scripts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan sus guiones" ON user_scripts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuarios borran sus guiones" ON user_scripts FOR DELETE USING (auth.uid() = user_id);

-- user_progress
CREATE POLICY "Usuarios ven su progreso" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios insertan su progreso" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan su progreso" ON user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuarios borran su progreso" ON user_progress FOR DELETE USING (auth.uid() = user_id);

-- user_vocab
CREATE POLICY "Usuarios ven su vocabulario" ON user_vocab FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios insertan su vocabulario" ON user_vocab FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan su vocabulario" ON user_vocab FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuarios borran su vocabulario" ON user_vocab FOR DELETE USING (auth.uid() = user_id);

-- user_achievements
CREATE POLICY "Usuarios ven sus logros" ON user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios insertan sus logros" ON user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan sus logros" ON user_achievements FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuarios borran sus logros" ON user_achievements FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- 4. ÍNDICES ADICIONALES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_user_scripts_user_id ON user_scripts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_vocab_user_id ON user_vocab(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);