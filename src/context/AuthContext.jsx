/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext()
const SESSION_TOKEN_KEY = 'impacthub_auth_token'
const API_TIMEOUT_MS = 15000

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

    const apiFetch = useCallback(async (path, init = {}) => {
        const token = localStorage.getItem(SESSION_TOKEN_KEY)
        const headers = new Headers(init.headers || {})
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        const controller = new AbortController()
        const timeout = window.setTimeout(() => controller.abort(), API_TIMEOUT_MS)

        try {
            return await fetch(path, {
                ...init,
                headers,
                signal: controller.signal,
            })
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('El servidor tardó demasiado en responder. Revisa la función /api en Vercel.')
            }
            throw error
        } finally {
            window.clearTimeout(timeout)
        }
    }, [])

    const readApiPayload = async (response) => {
        const contentType = response.headers.get('content-type') || ''
        if (contentType.includes('application/json')) {
            return response.json()
        }

        const text = await response.text()
        return { error: text || 'El servidor devolvio una respuesta invalida' }
    }

    const requestAuth = async (path, payload, fallbackMessage) => {
        let res
        try {
            res = await apiFetch(path, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
        } catch (error) {
            const message = error.message || 'No se pudo conectar con el servidor'
            setAuthError(message)
            throw new Error(message)
        }

        const data = await readApiPayload(res)
        if (!res.ok) {
            const statusMessage = res.status === 403
                ? 'La API respondió 403 Forbidden. Revisa Deployment Protection/Firewall en Vercel.'
                : fallbackMessage
            const message = data?.error || statusMessage
            setAuthError(message)
            throw new Error(message)
        }

        persistSession(data.user, data.token)
        return data.user
    }

    // Re-obtener datos del usuario desde el servidor (después de comprar puntos, donar, etc.)
    const refreshUser = useCallback(async () => {
        const token = localStorage.getItem(SESSION_TOKEN_KEY)
        if (!token) return null

        try {
            const response = await apiFetch('/api/auth/me')
            if (response.ok) {
                const data = await response.json()
                setUser(data)
                return data
            }
        } catch (error) {
            console.error('Error refreshing user:', error)
        }
        return null
    }, [apiFetch])

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
    }, [apiFetch])

    const loginWithEmail = async ({ email, password }) => {
        setAuthError('')
        return requestAuth('/api/auth/login', { email, password }, 'No fue posible iniciar sesión')
    }

    const registerWithEmail = async ({ name, email, password }) => {
        setAuthError('')
        return requestAuth('/api/auth/register', { name, email, password }, 'No fue posible crear la cuenta')
    }

    const loginWithGoogle = async (idToken) => {
        setAuthError('')
        return requestAuth('/api/auth/google', { idToken }, 'No fue posible iniciar con Google')
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
                refreshUser,
                apiFetch,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
