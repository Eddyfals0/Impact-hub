import { Hono } from 'hono';
import { handle } from 'hono/netlify';
import { db } from '../../src/db';
import { users, projects } from '../../src/db/schema';
import { eq } from 'drizzle-orm';

const app = new Hono().basePath('/api');

// Test route
app.get('/hello', (c) => {
  return c.json({ message: 'Hello from Netlify Functions + Hono!' });
});

// Auth Simulation (Mocking a logged-in user for now, fetching from Neon)
app.get('/auth/me', async (c) => {
  try {
    // For demonstration, let's just get the first user or return a hardcoded one if none
    const allUsers = await db.select().from(users).limit(1);
    
    if (allUsers.length > 0) {
      return c.json(allUsers[0]);
    }
    
    // Fallback if DB is empty
    return c.json({
      name: 'Eduardo (DB Empty)',
      avatar: 'https://i.pravatar.cc/100?u=eduardo',
      points: 5800,
      email: 'eduardo@test.com'
    });
  } catch (error: any) {
    console.error("DB Error:", error);
    return c.json({ error: error.message }, 500);
  }
});

// Projects route
app.get('/projects', async (c) => {
  try {
    const allProjects = await db.select().from(projects);
    return c.json(allProjects);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

export const handler = handle(app);
