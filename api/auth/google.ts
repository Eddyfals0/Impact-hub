import { googleHandler } from '../../server/vercel-api.js';

export const config = { api: { bodyParser: false } };
export default googleHandler;
