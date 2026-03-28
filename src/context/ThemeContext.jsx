/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

// Atajo para controlar los colores (Claro / Oscuro) desde cualquier página.
export const useTheme = () => useContext(ThemeContext)

// Guarda la preferencia de diseño del usuario (iluminado u oscuro).
// Recuerda esta decisión en el navegador para cuando vuelva a entrar a la web.
export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme')
        if (saved === 'dark') return true
        if (saved === 'light') return false
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }, [isDark])

    const toggleTheme = () => setIsDark((prev) => !prev)

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
