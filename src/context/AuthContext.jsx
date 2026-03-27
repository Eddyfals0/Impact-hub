import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

// Atajo para usar la información de inicio de sesión en cualquier parte.
export const useAuth = () => useContext(AuthContext)

<<<<<<< HEAD
const MOCK_USER = {
    name: 'Eduardo',
    avatar: 'https://i.pravatar.cc/100?u=eduardo',
    points: 5800,
}

// Guarda y reparte la información del usuario conectado
// a todas las páginas de la plataforma que la necesiten.
=======
>>>>>>> 195a56f (feat: implement serverless backend with Netlify Functions, Hono, Drizzle and Neon DB)
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Fetch real data from the Netlify function
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/auth/me');
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    console.error("Failed to load user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async () => {
        // Here we could add a real POST /api/auth/login if needed
        // For now, let's just re-fetch the 'me' endpoint to simulate log in
        const res = await fetch('/api/auth/me');
        if (res.ok) {
            setUser(await res.json());
        }
    };
    
    const logout = () => setUser(null)

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
