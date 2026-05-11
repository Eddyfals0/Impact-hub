// Archivo de configuración de Vite.
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const projectRoot = fs.realpathSync(process.cwd())

// https://vite.dev/config/
export default defineConfig({
  root: projectRoot,
  cacheDir: path.join(projectRoot, 'node_modules/.vite'),
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    fs: {
      // Windows + OneDrive can resolve canonical paths outside the workspace root.
      // Disabling strict mode avoids false "file does not exist" for /src/main.jsx.
      strict: false,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      }
    }
  }
})
