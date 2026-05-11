import { handle } from 'hono/vercel';
import { app } from '../server/api';

export const config = {
  runtime: 'nodejs',
};

export default handle(app);
