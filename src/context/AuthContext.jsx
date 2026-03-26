import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

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
