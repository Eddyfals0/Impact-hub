import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProyectosPage from './pages/ProyectosPage'
import TiendaPage from './pages/TiendaPage'
import JuegoPage from './pages/JuegoPage'
import RankingPage from './pages/RankingPage'
import UserPage from './pages/UserPage'
import ConfiguracionPage from './pages/ConfiguracionPage'
import AyudaPage from './pages/AyudaPage'
import SobreNosotrosPage from './pages/SobreNosotrosPage'

import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/proyectos" element={<ProyectosPage />} />
            <Route path="/tienda" element={<TiendaPage />} />
            <Route path="/juego" element={<JuegoPage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/usuario" element={<UserPage />} />
            <Route path="/configuracion" element={<ConfiguracionPage />} />
            <Route path="/ayuda" element={<AyudaPage />} />
            <Route path="/nosotros" element={<SobreNosotrosPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  )
}
