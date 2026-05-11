import 'dotenv/config';
import { serve } from '@hono/node-server';
import { app } from './api';

const port = Number(process.env.API_PORT || 8787);

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`[dev-api] running on http://localhost:${info.port}`);
  }
);
