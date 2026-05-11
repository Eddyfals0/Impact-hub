import 'dotenv/config';
import { db } from './server/db/index';
import { users } from './server/db/schema';
import { sql } from 'drizzle-orm';

async function testConnection() {
  try {
    console.log('Testing connection to Neon DB...');
    const result = await db.execute(sql`SELECT NOW()`);
    console.log('Connection successful! Current DB Time:', result.rows[0].now);

    console.log('Checking if users table exists and fetching count...');
    const allUsers = await db.select().from(users);
    console.log(`Users table is accessible. Total users: ${allUsers.length}`);

    console.log('Database connection and schema verification passed ✅');
  } catch (error) {
    console.error('Database connection failed ❌', error);
  }
}

testConnection();
