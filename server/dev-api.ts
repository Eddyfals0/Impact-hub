import { serve } from '@hono/node-server';
import 'dotenv/config';
import { app } from '../netlify/functions/api';

const port = Number(process.env.API_PORT || 8888);

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`[dev-api] running on http://localhost:${info.port}`);
  }
);
