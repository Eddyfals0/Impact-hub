import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import UserAvatar from '../components/UserAvatar'

const ROLE_LABELS = { donor: 'Donante', admin: 'Administrador' }

const getMemberYear = (createdAt) => {
    if (!createdAt) return new Date().getFullYear()
    const date = new Date(createdAt)
    return Number.isNaN(date.getTime()) ? new Date().getFullYear() : date.getFullYear()
}

const getImpactProfile = (user) => {
    const points = user?.points ?? 0
    const level = Math.max(1, Math.floor(points / 1000) + 1)
    const xpNext = level * 1000
    const rewardTotal = 5800
    return {
        name: user?.name || user?.email?.split('@')[0] || 'Usuario Impact Hub',
        email: user?.email || '',
        role: user?.bio || ROLE_LABELS[user?.role] || 'Donante',
        memberSince: getMemberYear(user?.createdAt),
        projects: 0,
        totalContributed: '$0',
        contributedChange: '0%',
        impactPoints: points,
        livesImpacted: 0,
        level,
        levelTitle: points >= 5000 ? 'Constructor de Comunidad' : points >= 1000 ? 'Colaborador Activo' : 'Nuevo Donante',
        xp: points,
        xpNext,
        topPercent: points >= 5000 ? '5%' : points >= 1000 ? '25%' : '100%',
        rewardGoal: { name: 'Guardián del Agua', current: points, total: rewardTotal, pct: Math.min(100, Math.round((points / rewardTotal) * 100)) },
    }
}

const BADGES = [
    { icon: 'water_drop', color: 'text-blue-500', name: 'Primera Gota', desc: 'Donó a Agua', active: true },
    { icon: 'volunteer_activism', color: 'text-yellow-500', name: 'Aliviador', desc: 'Donante Recurrente', active: true },
    { icon: 'sports_esports', color: 'text-indigo-500', name: 'Skin: Pionero', desc: 'Equipado', active: true, special: true },
    { icon: 'workspace_premium', color: 'text-gray-400', name: 'Visionario', desc: 'Bloqueado', active: false },
]

const POINT_PACKAGES = [
    { id: 'starter', points: 100, price: '$1', icon: 'bolt', gradient: 'from-blue-500 to-cyan-400' },
    { id: 'popular', points: 500, price: '$5', icon: 'local_fire_department', gradient: 'from-orange-500 to-yellow-400', badge: 'Popular' },
    { id: 'premium', points: 1000, price: '$10', icon: 'diamond', gradient: 'from-purple-500 to-pink-400' },
    { id: 'mega', points: 5000, price: '$50', icon: 'rocket_launch', gradient: 'from-emerald-500 to-primary', badge: 'Mejor Valor' },
]

// Panel personal del usuario (Perfil).
// Muestra su historial de donaciones, insignias obtenidas y su nivel actual de impacto.
export default function UserPage() {
    const { user, isLoading, apiFetch, refreshUser } = useAuth()
    const [buying, setBuying] = useState(null)
    const [buySuccess, setBuySuccess] = useState(null)
    const [buyError, setBuyError] = useState('')

    const handleBuyPoints = async (pkgId) => {
        setBuying(pkgId)
        setBuyError('')
        setBuySuccess(null)
        try {
            const res = await apiFetch('/api/points/buy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ packageId: pkgId }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Error al comprar')
            await refreshUser()
            setBuySuccess(data.purchased)
            setTimeout(() => setBuySuccess(null), 3000)
        } catch (e) {
            setBuyError(e.message)
        } finally {
            setBuying(null)
        }
    }

    if (isLoading) {
        return (<div className="flex-grow flex items-center justify-center p-10 text-text-muted">Cargando perfil...</div>)
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }

    const profile = getImpactProfile(user)
    const xpPct = Math.min(100, Math.round((profile.xp / profile.xpNext) * 100))

    return (
        <div className="flex-grow w-full px-4 md:px-10 py-8 max-w-[1280px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-text-main dark:text-text-light text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Mi Panel de Impacto</h1>
                    <p className="text-text-muted dark:text-gray-400 text-base font-normal mt-1">Sigue tus contribuciones al ODS 1 de la ONU: Fin de la Pobreza</p>
                </div>
                <div className="flex items-center gap-2 bg-surface-light dark:bg-surface-dark px-4 py-2 rounded-full border border-border-light dark:border-border-dark shadow-sm">
                    <span className="material-symbols-outlined text-yellow-500">emoji_events</span>
                    <span className="text-sm font-bold text-text-main dark:text-text-light">Donante Top {profile.topPercent}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* ─── Left Column ─── */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Profile Card */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-border-light dark:border-border-dark flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/10 to-transparent" />
                        <div className="relative mb-4 mt-2">
                            <UserAvatar user={user} size="xl" className="border-4 border-white dark:border-background-dark" />
                            <div className="absolute bottom-0 right-0 bg-primary text-background-dark p-1.5 rounded-full border-2 border-white dark:border-background-dark flex items-center justify-center shadow-sm" title={`Nivel verificado ${profile.level}`}>
                                <span className="material-symbols-outlined text-[16px] font-bold">verified</span>
                            </div>
                        </div>
                        <h2 className="text-xl font-bold mb-1 text-text-main dark:text-text-light">{profile.name}</h2>
                        <p className="text-text-muted dark:text-gray-400 text-sm font-medium">{profile.role}</p>
                        <p className="text-text-muted dark:text-gray-500 text-xs mb-4">{profile.email}</p>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 ${user.isEmailVerified ? 'text-primary bg-primary/10' : 'text-yellow-500 bg-yellow-500/10'}`}>
                            <span className="material-symbols-outlined text-sm">{user.isEmailVerified ? 'verified' : 'mail'}</span>
                            {user.isEmailVerified ? 'Correo verificado' : 'Correo pendiente de verificar'}
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full border-t border-border-light dark:border-border-dark pt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-text-main dark:text-text-light">{profile.memberSince}</div>
                                <div className="text-xs text-text-muted uppercase tracking-wide font-bold">Miembro Desde</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-text-main dark:text-text-light">{profile.projects}</div>
                                <div className="text-xs text-text-muted uppercase tracking-wide font-bold">Proyectos</div>
                            </div>
                        </div>
                    </div>

                    {/* Reward Shop CTA */}
                    <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white p-6 rounded-xl shadow-md relative overflow-hidden group border border-indigo-500/30">
                        <div className="absolute -right-4 -top-4 opacity-10 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                            <span className="material-symbols-outlined text-9xl">storefront</span>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-xs font-bold opacity-80 uppercase tracking-wider">Tienda de Recompensas</div>
                                <span className="bg-yellow-400 text-indigo-900 text-[10px] px-1.5 py-0.5 rounded font-bold">NUEVO</span>
                            </div>
                            <h3 className="text-xl font-black leading-tight mb-4">Canjea tus Puntos</h3>
                            <div className="bg-white/10 rounded-lg p-3 mb-4 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="size-10 rounded bg-indigo-950/50 flex items-center justify-center border border-white/10">
                                        <span className="material-symbols-outlined text-yellow-400">palette</span>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold opacity-70 uppercase">Meta: Skin Exclusiva</div>
                                        <div className="text-sm font-bold">{profile.rewardGoal.name}</div>
                                    </div>
                                </div>
                                <div className="w-full bg-black/30 rounded-full h-1.5 mb-1">
                                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-200 h-1.5 rounded-full" style={{ width: `${profile.rewardGoal.pct}%` }} />
                                </div>
                                <div className="flex justify-between text-[10px] font-medium opacity-80">
                                    <span>{profile.rewardGoal.current.toLocaleString()} / {profile.rewardGoal.total.toLocaleString()} Puntos</span>
                                    <span>{profile.rewardGoal.pct}%</span>
                                </div>
                            </div>
                            <Link to="/tienda" className="w-full py-2.5 bg-white text-indigo-900 font-bold rounded-lg text-sm hover:bg-indigo-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-lg">shopping_bag</span>
                                Ir a la Tienda
                            </Link>
                        </div>
                    </div>

                    {/* ODS Card */}
                    <div className="bg-[#e5243b] text-white p-6 rounded-xl shadow-md relative overflow-hidden group">
                        <div className="absolute -right-6 -bottom-6 opacity-20 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                            <span className="material-symbols-outlined text-9xl">family_restroom</span>
                        </div>
                        <div className="relative z-10">
                            <div className="text-xs font-bold opacity-80 mb-2 uppercase tracking-wider">Misión Principal</div>
                            <div className="text-2xl font-black leading-tight mb-1">ODS 1</div>
                            <div className="text-lg font-bold">Fin de la Pobreza</div>
                            <div className="mt-4 inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm">
                                <span>Objetivo Global</span>
                                <span className="material-symbols-outlined text-xs">arrow_outward</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Right Column ─── */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { label: 'Total Contribuido', value: profile.totalContributed, icon: 'savings', iconBg: 'bg-primary/10', iconColor: 'text-green-700 dark:text-primary', badge: profile.contributedChange, badgeBg: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400', badgeExtra: 'vs mes anterior', hoverBorder: 'hover:border-primary/50' },
                            { label: 'Puntos de Impacto', value: profile.impactPoints.toLocaleString(), icon: 'stars', iconBg: 'bg-yellow-100 dark:bg-yellow-900/20', iconColor: 'text-yellow-700 dark:text-yellow-400', badge: 'Canjear →', badgeBg: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400', isLink: true, hoverBorder: 'hover:border-yellow-500/50' },
                            { label: 'Vidas Impactadas', value: profile.livesImpacted, icon: 'diversity_1', iconBg: 'bg-primary/10', iconColor: 'text-green-700 dark:text-primary', badgeExtra: 'Familias apoyadas', hoverBorder: 'hover:border-primary/50' },
                        ].map((s) => (
                            <div key={s.label} className={`bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-border-light dark:border-border-dark relative overflow-hidden group ${s.hoverBorder} transition-colors`}>
                                <div className={`absolute top-4 right-4 p-2 ${s.iconBg} rounded-lg ${s.iconColor}`}>
                                    <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                                </div>
                                <div className="text-sm font-medium text-text-muted dark:text-gray-400 mb-2">{s.label}</div>
                                <div className="text-3xl font-black text-text-main dark:text-text-light tracking-tight">{s.value}</div>
                                <div className="mt-4 flex items-center gap-2">
                                    {s.badge && (s.isLink ? (
                                        <Link to="/tienda" className={`text-xs font-bold ${s.badgeBg} px-2 py-1 rounded flex items-center gap-1 hover:opacity-80 transition-opacity`}>{s.badge}</Link>
                                    ) : (
                                        <span className={`text-xs font-bold ${s.badgeBg} px-2 py-1 rounded`}>{s.badge}</span>
                                    ))}
                                    {s.badgeExtra && <span className="text-xs text-text-muted">{s.badgeExtra}</span>}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ═══ BUY POINTS SECTION ═══ */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 lg:p-8 rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="size-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
                                <span className="material-symbols-outlined text-xl">shopping_cart</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text-main dark:text-text-light">Comprar Puntos</h3>
                                <p className="text-xs text-text-muted">Adquiere puntos para donar a proyectos de impacto</p>
                            </div>
                        </div>

                        {buySuccess && (
                            <div className="mb-4 flex items-center gap-2 bg-primary/10 text-primary px-4 py-3 rounded-xl text-sm font-bold animate-pulse">
                                <span className="material-symbols-outlined">check_circle</span>
                                ¡Compraste {buySuccess.points.toLocaleString()} puntos por {buySuccess.price}!
                            </div>
                        )}
                        {buyError && (
                            <div className="mb-4 flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-3 rounded-xl text-sm font-bold">
                                <span className="material-symbols-outlined">error</span>
                                {buyError}
                            </div>
                        )}

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {POINT_PACKAGES.map((pkg) => (
                                <button
                                    key={pkg.id}
                                    onClick={() => handleBuyPoints(pkg.id)}
                                    disabled={buying === pkg.id}
                                    className="relative flex flex-col items-center text-center p-5 rounded-2xl border-2 border-border-light dark:border-border-dark hover:border-primary bg-background-light dark:bg-background-dark transition-all hover:-translate-y-1 hover:shadow-lg group active:scale-95 disabled:opacity-60"
                                >
                                    {pkg.badge && (
                                        <span className="absolute -top-2.5 right-2 px-2 py-0.5 bg-primary text-background-dark text-[9px] font-black uppercase rounded-full shadow">{pkg.badge}</span>
                                    )}
                                    <div className={`size-12 rounded-xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center text-white mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                                        <span className="material-symbols-outlined text-2xl">{pkg.icon}</span>
                                    </div>
                                    <div className="text-2xl font-black text-text-main dark:text-text-light mb-0.5">
                                        {buying === pkg.id ? '...' : pkg.points.toLocaleString()}
                                    </div>
                                    <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider mb-2">Puntos</div>
                                    <div className="text-sm font-black text-primary">{pkg.price}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* XP Level */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 lg:p-8 rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl font-bold text-text-main dark:text-text-light">Nivel de Impacto {profile.level}</h3>
                                    <span className="bg-primary text-background-dark text-[10px] px-2 py-0.5 rounded font-bold uppercase">{profile.levelTitle}</span>
                                </div>
                                <p className="text-sm text-text-muted dark:text-gray-400">Tu progreso se calcula con los puntos reales de tu cuenta.</p>
                            </div>
                            <div className="text-right hidden md:block">
                                <div className="text-2xl font-bold text-text-main dark:text-text-light">{profile.xp.toLocaleString()} XP</div>
                                <div className="text-xs text-text-muted">Experiencia Total</div>
                            </div>
                        </div>
                        <div className="relative w-full h-6 bg-gray-100 dark:bg-white/10 rounded-full mb-2 overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-primary flex items-center justify-end px-2 rounded-full transition-all duration-700" style={{ width: `${xpPct}%` }}>
                                <div className="animate-pulse w-1 h-full bg-white/30" />
                            </div>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-text-muted mb-8">
                            <span>Actual: {profile.xp.toLocaleString()} XP</span>
                            <span>Siguiente Nivel: {profile.xpNext.toLocaleString()} XP</span>
                        </div>

                        <div className="border-t border-border-light dark:border-border-dark my-6" />

                        {/* Badges */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-bold uppercase text-text-muted tracking-wider">Insignias y Coleccionables</h4>
                                <a className="text-xs font-bold text-primary hover:underline" href="#">Ver Galería</a>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {BADGES.map((b) => (
                                    <div key={b.name} className={`group flex flex-col items-center text-center p-4 rounded-xl transition-all cursor-pointer border ${b.active ? b.special ? 'bg-indigo-50 dark:bg-indigo-900/10 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 border-transparent hover:border-indigo-500/30' : 'bg-gray-50 dark:bg-white/5 hover:bg-primary/5 border-transparent hover:border-primary/30' : 'bg-gray-50 dark:bg-white/5 border-transparent opacity-50 grayscale'}`}>
                                        <div className={`bg-white dark:bg-white/10 shadow-sm ${b.color} rounded-full p-3 mb-3 ${b.active ? 'group-hover:scale-110' : ''} transition-transform`}>
                                            <span className="material-symbols-outlined">{b.icon}</span>
                                        </div>
                                        <span className="text-xs font-bold text-text-main dark:text-text-light">{b.name}</span>
                                        <span className={`text-[10px] mt-1 ${b.special ? 'text-indigo-500 font-bold' : 'text-text-muted'}`}>{b.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contribution History */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
                        <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center">
                            <h3 className="text-lg font-bold text-text-main dark:text-text-light">Historial de Contribuciones</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50/50 dark:bg-white/5 text-text-muted font-bold uppercase tracking-wider text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Proyecto</th>
                                        <th className="px-6 py-4">Fecha</th>
                                        <th className="px-6 py-4 text-right">Monto</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                                    <tr>
                                        <td className="px-6 py-10 text-center text-text-muted" colSpan="3">
                                            Aún no hay contribuciones registradas para esta cuenta.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
