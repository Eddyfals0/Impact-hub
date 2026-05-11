import { compare, hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { OAuth2Client } from 'google-auth-library';
import { sign, verify } from 'hono/jwt';
import { db } from './db/index.js';
import { projects, users } from './db/schema.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod';
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

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const sendJson = (res: any, status: number, payload: unknown) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
};

const readJsonBody = async (req: any) => {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body;
  }

  if (typeof req.body === 'string') {
    return req.body ? JSON.parse(req.body) : {};
  }

  if (Buffer.isBuffer(req.body)) {
    const text = req.body.toString('utf8');
    return text ? JSON.parse(text) : {};
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const text = Buffer.concat(chunks).toString('utf8');
  return text ? JSON.parse(text) : {};
};

const methodGuard = (req: any, res: any, method: string) => {
  if (req.method === method) return true;
  res.setHeader('Allow', method);
  sendJson(res, 405, { error: `Method ${req.method} not allowed` });
  return false;
};

export async function helloHandler(_req: any, res: any) {
  sendJson(res, 200, { message: 'Hello from Vercel + Hono!' });
}

export async function googleClientIdHandler(req: any, res: any) {
  if (!methodGuard(req, res, 'GET')) return;

  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    sendJson(res, 404, { error: 'Google client id is not configured' });
    return;
  }

  sendJson(res, 200, { clientId });
}

export async function meHandler(req: any, res: any) {
  if (!methodGuard(req, res, 'GET')) return;

  try {
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      sendJson(res, 401, { error: 'Unauthenticated' });
      return;
    }

    let payload;
    try {
      payload = await verify(authHeader.split(' ')[1], JWT_SECRET, 'HS256');
    } catch {
      sendJson(res, 401, { error: 'Invalid token' });
      return;
    }

    const userId = Number(payload.id);
    const matched = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!matched.length) {
      sendJson(res, 404, { error: 'User not found' });
      return;
    }

    sendJson(res, 200, toPublicUser(matched[0]));
  } catch (error: any) {
    sendJson(res, 500, { error: error.message });
  }
}

export async function registerHandler(req: any, res: any) {
  if (!methodGuard(req, res, 'POST')) return;

  try {
    const body = await readJsonBody(req);
    const name = String(body?.name ?? '').trim();
    const email = normalizeEmail(String(body?.email ?? ''));
    const password = String(body?.password ?? '');

    if (!name || !email || !password) {
      sendJson(res, 400, { error: 'name, email and password are required' });
      return;
    }
    if (password.length < 8) {
      sendJson(res, 400, { error: 'Password must contain at least 8 characters' });
      return;
    }

    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existing.length && existing[0].passwordHash) {
      sendJson(res, 409, { error: 'Email already registered' });
      return;
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
    sendJson(res, 201, { user: toPublicUser(userRecord), token });
  } catch (error: any) {
    sendJson(res, 500, { error: error.message });
  }
}

export async function loginHandler(req: any, res: any) {
  if (!methodGuard(req, res, 'POST')) return;

  try {
    const body = await readJsonBody(req);
    const email = normalizeEmail(String(body?.email ?? ''));
    const password = String(body?.password ?? '');

    if (!email || !password) {
      sendJson(res, 400, { error: 'email and password are required' });
      return;
    }

    const matched = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!matched.length || !matched[0].passwordHash) {
      sendJson(res, 401, { error: 'Invalid credentials' });
      return;
    }

    const valid = await compare(password, matched[0].passwordHash);
    if (!valid) {
      sendJson(res, 401, { error: 'Invalid credentials' });
      return;
    }

    const refreshed = await db
      .update(users)
      .set({ updatedAt: new Date() })
      .where(eq(users.id, matched[0].id))
      .returning();

    const token = await sign({ id: refreshed[0].id }, JWT_SECRET, 'HS256');
    sendJson(res, 200, { user: toPublicUser(refreshed[0]), token });
  } catch (error: any) {
    sendJson(res, 500, { error: error.message });
  }
}

export async function googleHandler(req: any, res: any) {
  if (!methodGuard(req, res, 'POST')) return;

  try {
    const body = await readJsonBody(req);
    const idToken = String(body?.idToken ?? '');
    if (!idToken) {
      sendJson(res, 400, { error: 'idToken is required' });
      return;
    }

    const audience = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;
    if (!audience) {
      sendJson(res, 500, { error: 'Google auth is not configured on server' });
      return;
    }

    const ticket = await googleClient.verifyIdToken({ idToken, audience });
    const payload = ticket.getPayload();
    if (!payload?.sub || !payload?.email) {
      sendJson(res, 401, { error: 'Invalid Google token payload' });
      return;
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
    sendJson(res, 200, { user: toPublicUser(userRecord), token });
  } catch (error: any) {
    sendJson(res, 401, { error: error.message });
  }
}

export async function projectsHandler(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      const allProjects = await db.select().from(projects);
      sendJson(res, 200, allProjects);
      return;
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      sendJson(res, 405, { error: `Method ${req.method} not allowed` });
      return;
    }

    const body = await readJsonBody(req);
    const title = String(body?.title ?? '').trim();
    const description = String(body?.description ?? '').trim();
    const goal = Number(body?.goal ?? 0);
    const creatorId = Number(body?.creatorId ?? 0);

    if (!title || !description || !Number.isFinite(goal) || goal <= 0 || !Number.isInteger(creatorId) || creatorId <= 0) {
      sendJson(res, 400, { error: 'title, description, goal and creatorId are required' });
      return;
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

    sendJson(res, 201, inserted[0]);
  } catch (error: any) {
    sendJson(res, 500, { error: error.message });
  }
}
