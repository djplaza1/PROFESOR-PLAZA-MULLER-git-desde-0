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
-- 2. TABLAS DE DATOS DE USUARIO (guiones, progreso, vocabulario, logros)
-- =====================================================

-- Guiones guardados por el usuario
CREATE TABLE IF NOT EXISTS user_scripts (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  script_data JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Progreso del usuario (escenas completadas, rachas, puntuación)
CREATE TABLE IF NOT EXISTS user_progress (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  progress_data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vocabulario del usuario
CREATE TABLE IF NOT EXISTS user_vocab (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  vocab_data JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Logros del usuario
CREATE TABLE IF NOT EXISTS user_achievements (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  achievements_data JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. NUEVAS TABLAS (ocr, datos generales)
-- =====================================================

-- Historial OCR del usuario
CREATE TABLE IF NOT EXISTS user_ocr_history (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  history JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Datos generales del usuario (monedas, rachas, pdf, misiones, etc.)
-- Almacena cualquier clave localStorage que no tenga tabla propia
CREATE TABLE IF NOT EXISTS user_general_data (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 4. POLÍTICAS RLS (Row Level Security)
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_srs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_vocab ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_ocr_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_general_data ENABLE ROW LEVEL SECURITY;

-- user_settings
DROP POLICY IF EXISTS "Usuarios ven sus ajustes" ON user_settings;
DROP POLICY IF EXISTS "Usuarios editan sus ajustes" ON user_settings;
DROP POLICY IF EXISTS "Usuarios actualizan sus ajustes" ON user_settings;
CREATE POLICY "Usuarios ven sus ajustes" ON user_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios editan sus ajustes" ON user_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan sus ajustes" ON user_settings FOR UPDATE USING (auth.uid() = user_id);

-- user_srs
DROP POLICY IF EXISTS "Usuarios ven su SRS" ON user_srs;
DROP POLICY IF EXISTS "Usuarios editan su SRS" ON user_srs;
DROP POLICY IF EXISTS "Usuarios actualizan su SRS" ON user_srs;
CREATE POLICY "Usuarios ven su SRS" ON user_srs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios editan su SRS" ON user_srs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan su SRS" ON user_srs FOR UPDATE USING (auth.uid() = user_id);

-- user_scripts
DROP POLICY IF EXISTS "Usuarios ven sus guiones" ON user_scripts;
DROP POLICY IF EXISTS "Usuarios insertan sus guiones" ON user_scripts;
DROP POLICY IF EXISTS "Usuarios actualizan sus guiones" ON user_scripts;
DROP POLICY IF EXISTS "Usuarios borran sus guiones" ON user_scripts;
CREATE POLICY "Usuarios ven sus guiones" ON user_scripts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios insertan sus guiones" ON user_scripts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan sus guiones" ON user_scripts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuarios borran sus guiones" ON user_scripts FOR DELETE USING (auth.uid() = user_id);

-- user_progress
DROP POLICY IF EXISTS "Usuarios ven su progreso" ON user_progress;
DROP POLICY IF EXISTS "Usuarios insertan su progreso" ON user_progress;
DROP POLICY IF EXISTS "Usuarios actualizan su progreso" ON user_progress;
DROP POLICY IF EXISTS "Usuarios borran su progreso" ON user_progress;
CREATE POLICY "Usuarios ven su progreso" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios insertan su progreso" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan su progreso" ON user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuarios borran su progreso" ON user_progress FOR DELETE USING (auth.uid() = user_id);

-- user_vocab
DROP POLICY IF EXISTS "Usuarios ven su vocabulario" ON user_vocab;
DROP POLICY IF EXISTS "Usuarios insertan su vocabulario" ON user_vocab;
DROP POLICY IF EXISTS "Usuarios actualizan su vocabulario" ON user_vocab;
DROP POLICY IF EXISTS "Usuarios borran su vocabulario" ON user_vocab;
CREATE POLICY "Usuarios ven su vocabulario" ON user_vocab FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios insertan su vocabulario" ON user_vocab FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan su vocabulario" ON user_vocab FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuarios borran su vocabulario" ON user_vocab FOR DELETE USING (auth.uid() = user_id);

-- user_achievements
DROP POLICY IF EXISTS "Usuarios ven sus logros" ON user_achievements;
DROP POLICY IF EXISTS "Usuarios insertan sus logros" ON user_achievements;
DROP POLICY IF EXISTS "Usuarios actualizan sus logros" ON user_achievements;
DROP POLICY IF EXISTS "Usuarios borran sus logros" ON user_achievements;
CREATE POLICY "Usuarios ven sus logros" ON user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios insertan sus logros" ON user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan sus logros" ON user_achievements FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuarios borran sus logros" ON user_achievements FOR DELETE USING (auth.uid() = user_id);

-- user_ocr_history
DROP POLICY IF EXISTS "Usuarios ven su OCR" ON user_ocr_history;
DROP POLICY IF EXISTS "Usuarios editan su OCR" ON user_ocr_history;
DROP POLICY IF EXISTS "Usuarios actualizan su OCR" ON user_ocr_history;
CREATE POLICY "Usuarios ven su OCR" ON user_ocr_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios editan su OCR" ON user_ocr_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan su OCR" ON user_ocr_history FOR UPDATE USING (auth.uid() = user_id);

-- user_general_data
DROP POLICY IF EXISTS "Usuarios ven sus datos generales" ON user_general_data;
DROP POLICY IF EXISTS "Usuarios editan sus datos generales" ON user_general_data;
DROP POLICY IF EXISTS "Usuarios actualizan sus datos generales" ON user_general_data;
CREATE POLICY "Usuarios ven sus datos generales" ON user_general_data FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios editan sus datos generales" ON user_general_data FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan sus datos generales" ON user_general_data FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- 5. ÍNDICES ADICIONALES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_user_scripts_user_id ON user_scripts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_vocab_user_id ON user_vocab(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_ocr_history_user_id ON user_ocr_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_general_data_user_id ON user_general_data(user_id);

-- =====================================================
-- 6. FUNCIÓN PARA ACTUALIZAR updated_at AUTOMÁTICAMENTE
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a todas las tablas
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY['user_settings','user_srs','user_scripts','user_progress','user_vocab','user_achievements','user_ocr_history','user_general_data'])
  LOOP
    EXECUTE format('
      DROP TRIGGER IF EXISTS trg_%s_updated_at ON %s;
      CREATE TRIGGER trg_%s_updated_at
        BEFORE UPDATE ON %s
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    ', tbl, tbl, tbl, tbl);
  END LOOP;
END;
$$;