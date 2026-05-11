-- Impact Hub - schema completo para Neon Postgres
-- Ejecutar una vez en el SQL Editor de Neon (o con `psql` contra DATABASE_URL).
-- Es idempotente: se puede correr varias veces sin romper nada.

-- =============================================================
-- Tabla: users
-- =============================================================
CREATE TABLE IF NOT EXISTS users (
  id                SERIAL PRIMARY KEY,
  name              TEXT        NOT NULL,
  email             TEXT        NOT NULL UNIQUE,
  avatar            TEXT,
  password_hash     TEXT,
  auth_provider     TEXT        NOT NULL DEFAULT 'email',
  google_sub        TEXT        UNIQUE,
  role              TEXT        NOT NULL DEFAULT 'donor',
  country           TEXT,
  bio               TEXT,
  is_email_verified BOOLEAN     NOT NULL DEFAULT FALSE,
  points            INTEGER     DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS users_email_idx      ON users (email);
CREATE INDEX IF NOT EXISTS users_google_sub_idx ON users (google_sub);

-- =============================================================
-- Tabla: projects
-- =============================================================
CREATE TABLE IF NOT EXISTS projects (
  id                SERIAL PRIMARY KEY,
  title             TEXT        NOT NULL,
  slug              TEXT        UNIQUE,
  description       TEXT        NOT NULL,
  category          TEXT        NOT NULL DEFAULT 'general',
  status            TEXT        NOT NULL DEFAULT 'draft',
  goal              INTEGER     NOT NULL,
  raised            INTEGER     DEFAULT 0,
  cover_image       TEXT,
  location          TEXT,
  beneficiary_name  TEXT,
  start_date        TIMESTAMPTZ,
  end_date          TIMESTAMPTZ,
  is_featured       BOOLEAN     NOT NULL DEFAULT FALSE,
  creator_id        INTEGER     REFERENCES users (id) ON DELETE SET NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS projects_creator_idx  ON projects (creator_id);
CREATE INDEX IF NOT EXISTS projects_status_idx   ON projects (status);
CREATE INDEX IF NOT EXISTS projects_category_idx ON projects (category);
CREATE INDEX IF NOT EXISTS projects_featured_idx ON projects (is_featured) WHERE is_featured = TRUE;

-- =============================================================
-- Trigger: mantener updated_at al dia en ambas tablas
-- =============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_set_updated_at    ON users;
CREATE TRIGGER users_set_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS projects_set_updated_at ON projects;
CREATE TRIGGER projects_set_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =============================================================
-- Seed opcional de ejemplo (descomenta si quieres datos iniciales)
-- =============================================================
-- INSERT INTO users (name, email, auth_provider, role, is_email_verified)
-- VALUES ('Admin Demo', 'admin@impacthub.dev', 'email', 'admin', TRUE)
-- ON CONFLICT (email) DO NOTHING;
--
-- INSERT INTO projects (title, slug, description, category, status, goal, is_featured, creator_id)
-- VALUES (
--   'Agua limpia para la sierra', 'agua-limpia-sierra',
--   'Instalacion de filtros comunitarios para 3 aldeas.',
--   'salud', 'active', 10000, TRUE,
--   (SELECT id FROM users WHERE email = 'admin@impacthub.dev')
-- )
-- ON CONFLICT (slug) DO NOTHING;
