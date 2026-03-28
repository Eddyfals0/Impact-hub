/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()
const SESSION_USER_ID_KEY = 'impacthub_user_id'

// Atajo para usar la información de inicio de sesión en cualquier parte.
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [authError, setAuthError] = useState('')

    const persistSession = (nextUser) => {
        setUser(nextUser)
        if (nextUser?.id) {
            localStorage.setItem(SESSION_USER_ID_KEY, String(nextUser.id))
        }
    }

    const clearSession = () => {
        localStorage.removeItem(SESSION_USER_ID_KEY)
        setUser(null)
    }

    const apiFetch = async (path, init = {}) => {
        const storedId = localStorage.getItem(SESSION_USER_ID_KEY)
        const headers = new Headers(init.headers || {})
        if (storedId) {
            headers.set('x-user-id', storedId)
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
            const storedId = localStorage.getItem(SESSION_USER_ID_KEY)
            if (!storedId) {
                setIsLoading(false)
                return
            }

            try {
                const response = await apiFetch('/api/auth/me')
                if (response.ok) {
                    const data = await response.json()
                    setUser(data)
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

        persistSession(data)
        return data
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

        persistSession(data)
        return data
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

        persistSession(data)
        return data
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
