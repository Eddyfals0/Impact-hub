import { donationsAuthenticatedHandler } from '../../server/vercel-api.js';

export const config = { api: { bodyParser: false } };
export default donationsAuthenticatedHandler;
