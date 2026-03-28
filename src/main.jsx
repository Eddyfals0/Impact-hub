import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css' // Importa los estilos visuales para toda la plataforma
import App from './App.jsx' // Importa el controlador central de las páginas

// Conecta el proyecto con el navegador y enciende el sistema de rutas.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
