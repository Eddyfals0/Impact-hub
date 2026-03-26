// Archivo de configuración de Vite.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Plugins que usa el proyecto: React para la interfaz gráfica y Tailwind para diseñar con clases.
  plugins: [react(), tailwindcss()],
})
