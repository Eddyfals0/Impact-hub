// Archivo de configuración de Vite.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  // Plugins que usa el proyecto: React para la interfaz gráfica y Tailwind para diseñar con clases.
  plugins: [react(), tailwindcss()],
=======
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888', // Default Netlify dev port
        changeOrigin: true,
      }
    }
  }
>>>>>>> 195a56f (feat: implement serverless backend with Netlify Functions, Hono, Drizzle and Neon DB)
})
