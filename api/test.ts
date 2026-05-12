import { db } from '../server/db/index.js';
import { users } from '../server/db/schema.js';

export default async function handler(req: any, res: any) {
  try {
    const result = await db.select().from(users).limit(1);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ status: 'ok', count: result.length }));
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: err.message }));
  }
}
