import { handle } from '@hono/node-server/vercel';
import { app } from '../../../server/api.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handle(app);
