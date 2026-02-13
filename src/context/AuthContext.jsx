import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const MOCK_USER = {
    name: 'Eduardo',
    avatar: 'https://i.pravatar.cc/100?u=eduardo',
    points: 5800,
}

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
