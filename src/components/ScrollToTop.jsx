import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Herramienta automática que se asegura de que cada vez que cambias de página,
// la pantalla suba automáticamente hacia la parte de arriba.
export default function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}
