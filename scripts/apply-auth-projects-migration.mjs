import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing in environment variables');
}

const sql = neon(process.env.DATABASE_URL);

const statements = [
  `ALTER TABLE users
    ADD COLUMN IF NOT EXISTS password_hash TEXT,
    ADD COLUMN IF NOT EXISTS auth_provider TEXT NOT NULL DEFAULT 'email',
    ADD COLUMN IF NOT EXISTS google_sub TEXT,
    ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'donor',
    ADD COLUMN IF NOT EXISTS country TEXT,
    ADD COLUMN IF NOT EXISTS bio TEXT,
    ADD COLUMN IF NOT EXISTS is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();`,
  `ALTER TABLE projects
    ADD COLUMN IF NOT EXISTS slug TEXT,
    ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'general',
    ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft',
    ADD COLUMN IF NOT EXISTS cover_image TEXT,
    ADD COLUMN IF NOT EXISTS location TEXT,
    ADD COLUMN IF NOT EXISTS beneficiary_name TEXT,
    ADD COLUMN IF NOT EXISTS start_date TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS end_date TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();`,
];

for (const statement of statements) {
  await sql.query(statement);
}

const userConstraint = await sql.query("SELECT 1 FROM pg_constraint WHERE conname = 'users_google_sub_unique' LIMIT 1;");
if (userConstraint.length === 0) {
  await sql.query('ALTER TABLE users ADD CONSTRAINT users_google_sub_unique UNIQUE (google_sub);');
}

const projectConstraint = await sql.query("SELECT 1 FROM pg_constraint WHERE conname = 'projects_slug_unique' LIMIT 1;");
if (projectConstraint.length === 0) {
  await sql.query('ALTER TABLE projects ADD CONSTRAINT projects_slug_unique UNIQUE (slug);');
}

console.log('Migration applied: auth + projects schema expanded.');
