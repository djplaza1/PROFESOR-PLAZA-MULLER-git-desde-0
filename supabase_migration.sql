-- ========== PROFESOR PLAZA MÜLLER – Migración Supabase ==========
-- Ejecutar en SQL Editor de Supabase

-- 1. Tabla de ajustes de usuario
CREATE TABLE IF NOT EXISTS user_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  settings JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Índice para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);

-- 3. Tabla de SRS (repetición espaciada)
CREATE TABLE IF NOT EXISTS user_srs (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  srs JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Índice para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_user_srs_user_id ON user_srs(user_id);

-- 5. Políticas RLS – cada usuario solo ve/solo edita sus datos
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_srs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios ven sus ajustes" ON user_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios editan sus ajustes" ON user_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan sus ajustes" ON user_settings FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Usuarios ven su SRS" ON user_srs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuarios editan su SRS" ON user_srs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuarios actualizan su SRS" ON user_srs FOR UPDATE USING (auth.uid() = user_id);