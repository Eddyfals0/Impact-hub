import { handle } from 'hono/vercel';
import { Hono } from 'hono';

let handler;
try {
  // Intentamos cargar el backend
  const apiModule = await import('../server/api.js');
  handler = handle(apiModule.app);
} catch (error: any) {
  // Si algo explota (como variables de entorno o importaciones), devolvemos el error exacto
  const fallbackApp = new Hono();
  fallbackApp.all('*', (c) => c.json({ 
    error: 'Fallo al arrancar el servidor', 
    message: error.message,
    stack: error.stack 
  }, 500));
  handler = handle(fallbackApp);
}

export const config = {
  runtime: 'nodejs',
};

export default handler;
