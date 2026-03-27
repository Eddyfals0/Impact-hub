import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

// Atajo para usar la información de inicio de sesión en cualquier parte.
export const useAuth = () => useContext(AuthContext)

const MOCK_USER = {
    name: 'Eduardo',
    avatar: 'https://i.pravatar.cc/100?u=eduardo',
    points: 5800,
}

// Guarda y reparte la información del usuario conectado
// a todas las páginas de la plataforma que la necesiten.
export function AuthProvider({ children }) {
    const [user, setUser] = useState(MOCK_USER)

    const login = () => setUser(MOCK_USER)
    const logout = () => setUser(null)

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
