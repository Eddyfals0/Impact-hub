import { Hono } from 'hono';
import { db } from './db';
import { users, projects } from './db/schema';
import { eq } from 'drizzle-orm';
import { compare, hash } from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { sign, verify } from 'hono/jwt';

export const app = new Hono().basePath('/api');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const defaultAvatarFor = (name: string, email: string) => {
  const seed = encodeURIComponent(`${name || email}`);
  return `https://i.pravatar.cc/100?u=${seed}`;
};

const toPublicUser = (user: typeof users.$inferSelect) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  points: user.points ?? 0,
  authProvider: user.authProvider,
  role: user.role,
  country: user.country,
  bio: user.bio,
  isEmailVerified: user.isEmailVerified,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

app.get('/hello', (c) => {
  return c.json({ message: 'Hello from Vercel + Hono!' });
});

app.get('/auth/google/client-id', (c) => {
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    return c.json({ error: 'Google client id is not configured' }, 404);
  }
  return c.json({ clientId });
});

app.get('/auth/me', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthenticated' }, 401);
    }
    
    const token = authHeader.split(' ')[1];
    let payload;
    try {
      payload = await verify(token, JWT_SECRET, 'HS256');
    } catch (e) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    const userId = Number(payload.id);

    const matched = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!matched.length) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json(toPublicUser(matched[0]));
  } catch (error: any) {
    console.error('DB Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

app.post('/auth/register', async (c) => {
  try {
    const body = await c.req.json();
    const name = String(body?.name ?? '').trim();
    const email = normalizeEmail(String(body?.email ?? ''));
    const password = String(body?.password ?? '');

    if (!name || !email || !password) {
      return c.json({ error: 'name, email and password are required' }, 400);
    }
    if (password.length < 8) {
      return c.json({ error: 'Password must contain at least 8 characters' }, 400);
    }

    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existing.length && existing[0].passwordHash) {
      return c.json({ error: 'Email already registered' }, 409);
    }

    const passwordHash = await hash(password, 10);
    const now = new Date();

    let userRecord: typeof users.$inferSelect;

    if (existing.length) {
      const updated = await db
        .update(users)
        .set({
          name,
          passwordHash,
          authProvider: 'email',
          avatar: existing[0].avatar || defaultAvatarFor(name, email),
          updatedAt: now,
        })
        .where(eq(users.id, existing[0].id))
        .returning();
      userRecord = updated[0];
    } else {
      const inserted = await db
        .insert(users)
        .values({
          name,
          email,
          passwordHash,
          authProvider: 'email',
          avatar: defaultAvatarFor(name, email),
          points: 0,
          isEmailVerified: false,
        })
        .returning();
      userRecord = inserted[0];
    }

    const token = await sign({ id: userRecord.id }, JWT_SECRET, 'HS256');
    return c.json({ user: toPublicUser(userRecord), token }, 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.post('/auth/login', async (c) => {
  try {
    const body = await c.req.json();
    const email = normalizeEmail(String(body?.email ?? ''));
    const password = String(body?.password ?? '');

    if (!email || !password) {
      return c.json({ error: 'email and password are required' }, 400);
    }

    const matched = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!matched.length || !matched[0].passwordHash) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const valid = await compare(password, matched[0].passwordHash);
    if (!valid) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const refreshed = await db
      .update(users)
      .set({ updatedAt: new Date() })
      .where(eq(users.id, matched[0].id))
      .returning();

    const token = await sign({ id: refreshed[0].id }, JWT_SECRET, 'HS256');
    return c.json({ user: toPublicUser(refreshed[0]), token });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.post('/auth/google', async (c) => {
  try {
    const body = await c.req.json();
    const idToken = String(body?.idToken ?? '');
    if (!idToken) {
      return c.json({ error: 'idToken is required' }, 400);
    }

    const audience = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;
    if (!audience) {
      return c.json({ error: 'Google auth is not configured on server' }, 500);
    }
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience,
    });

    const payload = ticket.getPayload();
    if (!payload?.sub || !payload?.email) {
      return c.json({ error: 'Invalid Google token payload' }, 401);
    }

    const email = normalizeEmail(payload.email);
    const name = payload.name?.trim() || email.split('@')[0] || 'Impact User';
    const avatar = payload.picture || defaultAvatarFor(name, email);
    const now = new Date();

    let matchedByGoogle = await db.select().from(users).where(eq(users.googleSub, payload.sub)).limit(1);
    if (!matchedByGoogle.length) {
      matchedByGoogle = await db.select().from(users).where(eq(users.email, email)).limit(1);
    }

    let userRecord: typeof users.$inferSelect;
    if (matchedByGoogle.length) {
      const updated = await db
        .update(users)
        .set({
          name,
          email,
          avatar,
          authProvider: 'google',
          googleSub: payload.sub,
          isEmailVerified: !!payload.email_verified,
          updatedAt: now,
        })
        .where(eq(users.id, matchedByGoogle[0].id))
        .returning();
      userRecord = updated[0];
    } else {
      const inserted = await db
        .insert(users)
        .values({
          name,
          email,
          avatar,
          authProvider: 'google',
          googleSub: payload.sub,
          isEmailVerified: !!payload.email_verified,
          points: 0,
        })
        .returning();
      userRecord = inserted[0];
    }

    const token = await sign({ id: userRecord.id }, JWT_SECRET, 'HS256');
    return c.json({ user: toPublicUser(userRecord), token });
  } catch (error: any) {
    return c.json({ error: error.message }, 401);
  }
});

app.get('/projects', async (c) => {
  try {
    const allProjects = await db.select().from(projects);
    return c.json(allProjects);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.post('/projects', async (c) => {
  try {
    const body = await c.req.json();
    const title = String(body?.title ?? '').trim();
    const description = String(body?.description ?? '').trim();
    const goal = Number(body?.goal ?? 0);
    const creatorId = Number(body?.creatorId ?? 0);

    if (!title || !description || !Number.isFinite(goal) || goal <= 0 || !Number.isInteger(creatorId) || creatorId <= 0) {
      return c.json({ error: 'title, description, goal and creatorId are required' }, 400);
    }

    const inserted = await db
      .insert(projects)
      .values({
        title,
        slug: `${slugify(title)}-${Date.now()}`,
        description,
        category: String(body?.category ?? 'general'),
        status: String(body?.status ?? 'draft'),
        goal,
        raised: Number(body?.raised ?? 0),
        coverImage: body?.coverImage ? String(body.coverImage) : null,
        location: body?.location ? String(body.location) : null,
        beneficiaryName: body?.beneficiaryName ? String(body.beneficiaryName) : null,
        isFeatured: !!body?.isFeatured,
        creatorId,
      })
      .returning();

    return c.json(inserted[0], 201);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});
