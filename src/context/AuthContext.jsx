/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()
const SESSION_TOKEN_KEY = 'impacthub_auth_token'

// Atajo para usar la información de inicio de sesión en cualquier parte.
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [authError, setAuthError] = useState('')

    const persistSession = (userRecord, token) => {
        setUser(userRecord)
        if (token) {
            localStorage.setItem(SESSION_TOKEN_KEY, token)
        }
    }

    const clearSession = () => {
        localStorage.removeItem(SESSION_TOKEN_KEY)
        setUser(null)
    }

    const apiFetch = async (path, init = {}) => {
        const token = localStorage.getItem(SESSION_TOKEN_KEY)
        const headers = new Headers(init.headers || {})
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        return fetch(path, {
            ...init,
            headers,
        })
    }

    const readApiPayload = async (response) => {
        const contentType = response.headers.get('content-type') || ''
        if (contentType.includes('application/json')) {
            return response.json()
        }

        const text = await response.text()
        return {
            error: text || 'El servidor devolvio una respuesta invalida',
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem(SESSION_TOKEN_KEY)
            if (!token) {
                setIsLoading(false)
                return
            }

            try {
                const response = await apiFetch('/api/auth/me')
                if (response.ok) {
                    const data = await response.json()
                    setUser(data) // /auth/me solo devuelve el user
                } else {
                    clearSession()
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
                clearSession()
            } finally {
                setIsLoading(false)
            }
        }

        fetchUser()
    }, [])

    const loginWithEmail = async ({ email, password }) => {
        setAuthError('')
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        const data = await readApiPayload(res)
        if (!res.ok) {
            const message = data?.error || 'No fue posible iniciar sesión'
            setAuthError(message)
            throw new Error(message)
        }

        persistSession(data.user, data.token)
        return data.user
    }

    const registerWithEmail = async ({ name, email, password }) => {
        setAuthError('')
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        })

        const data = await readApiPayload(res)
        if (!res.ok) {
            const message = data?.error || 'No fue posible crear la cuenta'
            setAuthError(message)
            throw new Error(message)
        }

        persistSession(data.user, data.token)
        return data.user
    }

    const loginWithGoogle = async (idToken) => {
        setAuthError('')
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
        })

        const data = await readApiPayload(res)
        if (!res.ok) {
            const message = data?.error || 'No fue posible iniciar con Google'
            setAuthError(message)
            throw new Error(message)
        }

        persistSession(data.user, data.token)
        return data.user
    }

    // Compatibilidad con llamadas anteriores.
    const login = loginWithEmail

    const logout = () => {
        setAuthError('')
        clearSession()
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                isLoading,
                authError,
                login,
                loginWithEmail,
                registerWithEmail,
                loginWithGoogle,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
