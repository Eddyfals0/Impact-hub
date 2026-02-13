import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

const NAV_LINKS = [
    { to: '/proyectos', label: 'Proyectos' },
    { to: '/tienda', label: 'Tienda' },
    { to: '/juego', label: 'Juego' },
    { to: '/ranking', label: 'Clasificación' },
]

const DROPDOWN_ITEMS = [
    { to: '/usuario', label: 'Mi Perfil', icon: 'person' },
    { to: '/configuracion', label: 'Configuración', icon: 'settings' },
    { to: '/ayuda', label: 'Ayuda', icon: 'help' },
]

export default function Header() {
    const { toggleTheme } = useTheme()
    const { user, isLoggedIn, logout } = useAuth()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const dropdownRef = useRef(null)

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    // Close dropdown on route change
    useEffect(() => {
        setDropdownOpen(false)
        setMobileOpen(false)
    }, [location.pathname])

    const handleLogout = () => {
        logout()
        setDropdownOpen(false)
        navigate('/login')
    }

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3 md:px-10 shadow-sm">
            <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-3 cursor-pointer">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-background-dark">
                        <span className="material-symbols-outlined font-bold">volunteer_activism</span>
                    </div>
                    <h2 className="text-text-main dark:text-text-light text-lg font-bold leading-tight tracking-[-0.015em]">
                        Impact Hub
                    </h2>
                </Link>
            </div>

            <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-9">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`text-sm font-medium leading-normal transition-colors ${location.pathname === link.to
                                ? 'text-primary font-bold'
                                : 'text-text-main dark:text-text-light hover:text-primary'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Points badge */}
                {isLoggedIn && (
                    <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-border-light dark:border-border-dark">
                        <span className="material-symbols-outlined text-primary text-sm">savings</span>
                        <span className="font-black text-text-main dark:text-text-light text-xs">
                            {user.points.toLocaleString()} PTS
                        </span>
                    </div>
                )}

                <div className="flex gap-2 items-center">
                    {/* User avatar with dropdown OR Login button */}
                    {isLoggedIn ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="group relative flex items-center gap-0 cursor-pointer"
                            >
                                <div
                                    className={`size-10 rounded-full bg-cover bg-center border-2 shadow-sm transition-all ${dropdownOpen
                                        ? 'border-primary ring-2 ring-primary/20'
                                        : 'border-primary/40 hover:border-primary ring-2 ring-transparent hover:ring-primary/20'
                                        }`}
                                    style={{ backgroundImage: `url('${user.avatar}')` }}
                                    title={`Perfil de ${user.name}`}
                                />
                                <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-primary rounded-full border-2 border-surface-light dark:border-surface-dark" />
                            </button>

                            {/* Dropdown */}
                            {dropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 w-64 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-2xl overflow-hidden z-[200] animate-in fade-in slide-in-from-top-2">
                                    {/* User info header */}
                                    <div className="p-4 border-b border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-white/5">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="size-11 rounded-full bg-cover bg-center border-2 border-primary/30 shadow-sm"
                                                style={{ backgroundImage: `url('${user.avatar}')` }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-text-main dark:text-text-light truncate">{user.name}</p>
                                                <p className="text-[10px] text-text-muted truncate">eduardo@impacthub.com</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-lg">
                                            <span className="material-symbols-outlined text-primary text-sm">savings</span>
                                            <span className="text-xs font-bold text-primary">{user.points.toLocaleString()} puntos disponibles</span>
                                        </div>
                                    </div>

                                    {/* Menu items */}
                                    <div className="py-1.5">
                                        {DROPDOWN_ITEMS.map((item) => (
                                            <Link
                                                key={item.to}
                                                to={item.to}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-main dark:text-text-light hover:bg-primary/5 hover:text-primary transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-lg text-text-muted">{item.icon}</span>
                                                <span className="font-medium">{item.label}</span>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Logout */}
                                    <div className="border-t border-border-light dark:border-border-dark py-1.5">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-lg">logout</span>
                                            <span className="font-medium">Cerrar sesión</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary hover:bg-green-400 text-[#111813] text-sm font-bold leading-normal tracking-[0.015em] transition-colors">
                                <span className="truncate">Iniciar Sesión</span>
                            </button>
                        </Link>
                    )}

                    <button
                        onClick={toggleTheme}
                        className="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-background-light dark:bg-border-dark text-text-main dark:text-text-light hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">contrast</span>
                    </button>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-background-light dark:bg-border-dark text-text-main dark:text-text-light"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {mobileOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileOpen && (
                <div className="absolute top-[70px] right-4 left-4 md:hidden flex flex-col gap-1 bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-xl border border-border-light dark:border-border-dark z-[100]">
                    {isLoggedIn && (
                        <div className="flex items-center gap-3 pb-3 mb-2 border-b border-border-light dark:border-border-dark">
                            <div
                                className="size-9 rounded-full bg-cover bg-center border-2 border-primary/40"
                                style={{ backgroundImage: `url('${user.avatar}')` }}
                            />
                            <div>
                                <p className="text-sm font-bold text-text-main dark:text-text-light">{user.name}</p>
                                <p className="text-[10px] text-text-muted">{user.points.toLocaleString()} PTS</p>
                            </div>
                        </div>
                    )}
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname === link.to
                                ? 'text-primary bg-primary/5 font-bold'
                                : 'text-text-main dark:text-text-light hover:text-primary hover:bg-primary/5'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {isLoggedIn && (
                        <>
                            <div className="border-t border-border-light dark:border-border-dark my-2" />
                            {DROPDOWN_ITEMS.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-main dark:text-text-light hover:text-primary hover:bg-primary/5 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg text-text-muted">{item.icon}</span>
                                    {item.label}
                                </Link>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors mt-1"
                            >
                                <span className="material-symbols-outlined text-lg">logout</span>
                                Cerrar sesión
                            </button>
                        </>
                    )}
                    {!isLoggedIn && (
                        <Link to="/login">
                            <button className="w-full mt-2 py-3 bg-primary hover:bg-green-400 text-[#111813] text-sm font-bold rounded-xl transition-colors">
                                Iniciar Sesión
                            </button>
                        </Link>
                    )}
                </div>
            )}
        </header>
    )
}
