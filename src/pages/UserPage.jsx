import { Link } from 'react-router-dom'

const USER = {
    name: 'Eduardo',
    role: 'Estudiante de Ingeniería',
    avatar: 'https://i.pravatar.cc/300?u=eduardo',
    memberSince: '2024',
    projects: 15,
    totalContributed: '$2,180',
    contributedChange: '+22%',
    impactPoints: 5_800,
    livesImpacted: 47,
    level: 6,
    levelTitle: 'Constructor de Comunidad',
    xp: 1_680,
    xpNext: 2_500,
    topPercent: '5%',
    rewardGoal: { name: 'Guardián del Agua', current: 4200, total: 5800, pct: 72 },
}

const BADGES = [
    { icon: 'water_drop', color: 'text-blue-500', name: 'Primera Gota', desc: 'Donó a Agua', active: true },
    { icon: 'volunteer_activism', color: 'text-yellow-500', name: 'Aliviador', desc: 'Donante Recurrente', active: true },
    { icon: 'sports_esports', color: 'text-indigo-500', name: 'Skin: Pionero', desc: 'Equipado', active: true, special: true },
    { icon: 'workspace_premium', color: 'text-gray-400', name: 'Visionario', desc: 'Bloqueado', active: false },
]

const CONTRIBUTIONS = [
    { id: '#83921', project: 'Agua Limpia para Kenia', date: '24 Oct 2024', tag: 'Agua Limpia', tagIcon: 'water_drop', tagColor: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-900/30', amount: '$250.00' },
    { id: '#92011', project: 'Iniciativa de Útiles Escolares', date: '12 Oct 2024', tag: 'Educación', tagIcon: 'school', tagColor: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-100 dark:border-yellow-900/30', amount: '$100.00' },
    { id: '#77421', project: 'Microcréditos para Mujeres', date: '28 Sep 2024', tag: 'Empleo', tagIcon: 'work', tagColor: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-100 dark:border-green-900/30', amount: '$500.00' },
    { id: '#61204', project: 'Paneles Solares Rurales', date: '15 Sep 2024', tag: 'Energía', tagIcon: 'bolt', tagColor: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-100 dark:border-orange-900/30', amount: '$330.00' },
    { id: '#55102', project: 'Viviendas Resilientes', date: '01 Sep 2024', tag: 'Infraestructura', tagIcon: 'home', tagColor: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-100 dark:border-purple-900/30', amount: '$1,000.00' },
]

export default function UserPage() {
    const xpPct = Math.round((USER.xp / USER.xpNext) * 100)

    return (
        <div className="flex-grow w-full px-4 md:px-10 py-8 max-w-[1280px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-text-main dark:text-text-light text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                        Mi Panel de Impacto
                    </h1>
                    <p className="text-text-muted dark:text-gray-400 text-base font-normal mt-1">
                        Sigue tus contribuciones al ODS 1 de la ONU: Fin de la Pobreza
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-surface-light dark:bg-surface-dark px-4 py-2 rounded-full border border-border-light dark:border-border-dark shadow-sm">
                    <span className="material-symbols-outlined text-yellow-500">emoji_events</span>
                    <span className="text-sm font-bold text-text-main dark:text-text-light">Donante Top {USER.topPercent}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* ─── Left Column ─── */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Profile Card */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-border-light dark:border-border-dark flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/10 to-transparent" />
                        <div className="relative mb-4 mt-2">
                            <div
                                className="w-28 h-28 rounded-full bg-gray-200 bg-cover bg-center border-4 border-white dark:border-background-dark shadow-lg"
                                style={{ backgroundImage: `url('${USER.avatar}')` }}
                            />
                            <div className="absolute bottom-0 right-0 bg-primary text-background-dark p-1.5 rounded-full border-2 border-white dark:border-background-dark flex items-center justify-center shadow-sm" title={`Nivel verificado ${USER.level}`}>
                                <span className="material-symbols-outlined text-[16px] font-bold">verified</span>
                            </div>
                        </div>
                        <h2 className="text-xl font-bold mb-1 text-text-main dark:text-text-light">{USER.name}</h2>
                        <p className="text-text-muted dark:text-gray-400 text-sm mb-4 font-medium">{USER.role}</p>
                        <a className="flex items-center gap-2 text-[#0077b5] bg-[#0077b5]/10 px-4 py-2 rounded-full text-xs font-bold mb-6 hover:bg-[#0077b5]/20 transition-colors" href="#">
                            <span className="material-symbols-outlined text-sm">link</span>
                            Sincronizado con LinkedIn
                        </a>
                        <div className="grid grid-cols-2 gap-4 w-full border-t border-border-light dark:border-border-dark pt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-text-main dark:text-text-light">{USER.memberSince}</div>
                                <div className="text-xs text-text-muted uppercase tracking-wide font-bold">Miembro Desde</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-text-main dark:text-text-light">{USER.projects}</div>
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
                                        <div className="text-sm font-bold">{USER.rewardGoal.name}</div>
                                    </div>
                                </div>
                                <div className="w-full bg-black/30 rounded-full h-1.5 mb-1">
                                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-200 h-1.5 rounded-full" style={{ width: `${USER.rewardGoal.pct}%` }} />
                                </div>
                                <div className="flex justify-between text-[10px] font-medium opacity-80">
                                    <span>{USER.rewardGoal.current.toLocaleString()} / {USER.rewardGoal.total.toLocaleString()} Puntos</span>
                                    <span>{USER.rewardGoal.pct}%</span>
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
                            { label: 'Total Contribuido', value: USER.totalContributed, icon: 'savings', iconBg: 'bg-primary/10', iconColor: 'text-green-700 dark:text-primary', badge: USER.contributedChange, badgeBg: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400', badgeExtra: 'vs mes anterior', hoverBorder: 'hover:border-primary/50' },
                            { label: 'Puntos de Impacto', value: USER.impactPoints.toLocaleString(), icon: 'stars', iconBg: 'bg-yellow-100 dark:bg-yellow-900/20', iconColor: 'text-yellow-700 dark:text-yellow-400', badge: 'Canjear →', badgeBg: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400', isLink: true, hoverBorder: 'hover:border-yellow-500/50' },
                            { label: 'Vidas Impactadas', value: USER.livesImpacted, icon: 'diversity_1', iconBg: 'bg-primary/10', iconColor: 'text-green-700 dark:text-primary', badgeExtra: 'Familias apoyadas', hoverBorder: 'hover:border-primary/50' },
                        ].map((s) => (
                            <div key={s.label} className={`bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-sm border border-border-light dark:border-border-dark relative overflow-hidden group ${s.hoverBorder} transition-colors`}>
                                <div className={`absolute top-4 right-4 p-2 ${s.iconBg} rounded-lg ${s.iconColor}`}>
                                    <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                                </div>
                                <div className="text-sm font-medium text-text-muted dark:text-gray-400 mb-2">{s.label}</div>
                                <div className="text-3xl font-black text-text-main dark:text-text-light tracking-tight">{s.value}</div>
                                <div className="mt-4 flex items-center gap-2">
                                    {s.badge && (
                                        s.isLink ? (
                                            <Link to="/tienda" className={`text-xs font-bold ${s.badgeBg} px-2 py-1 rounded flex items-center gap-1 hover:opacity-80 transition-opacity`}>
                                                {s.badge}
                                            </Link>
                                        ) : (
                                            <span className={`text-xs font-bold ${s.badgeBg} px-2 py-1 rounded`}>{s.badge}</span>
                                        )
                                    )}
                                    {s.badgeExtra && <span className="text-xs text-text-muted">{s.badgeExtra}</span>}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* XP Level */}
                    <div className="bg-surface-light dark:bg-surface-dark p-6 lg:p-8 rounded-xl shadow-sm border border-border-light dark:border-border-dark">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl font-bold text-text-main dark:text-text-light">Nivel de Impacto {USER.level}</h3>
                                    <span className="bg-primary text-background-dark text-[10px] px-2 py-0.5 rounded font-bold uppercase">{USER.levelTitle}</span>
                                </div>
                                <p className="text-sm text-text-muted dark:text-gray-400">¡Estás en el {USER.topPercent} superior de donantes este mes!</p>
                            </div>
                            <div className="text-right hidden md:block">
                                <div className="text-2xl font-bold text-text-main dark:text-text-light">{USER.xp.toLocaleString()} XP</div>
                                <div className="text-xs text-text-muted">Experiencia Total</div>
                            </div>
                        </div>
                        <div className="relative w-full h-6 bg-gray-100 dark:bg-white/10 rounded-full mb-2 overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-primary flex items-center justify-end px-2 rounded-full transition-all duration-700" style={{ width: `${xpPct}%` }}>
                                <div className="animate-pulse w-1 h-full bg-white/30" />
                            </div>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-text-muted mb-8">
                            <span>Actual: {USER.xp.toLocaleString()} XP</span>
                            <span>Siguiente Nivel: {USER.xpNext.toLocaleString()} XP</span>
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
                                    <div
                                        key={b.name}
                                        className={`group flex flex-col items-center text-center p-4 rounded-xl transition-all cursor-pointer border ${b.active
                                                ? b.special
                                                    ? 'bg-indigo-50 dark:bg-indigo-900/10 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 border-transparent hover:border-indigo-500/30'
                                                    : 'bg-gray-50 dark:bg-white/5 hover:bg-primary/5 border-transparent hover:border-primary/30'
                                                : 'bg-gray-50 dark:bg-white/5 border-transparent opacity-50 grayscale'
                                            }`}
                                    >
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
                            <button className="text-sm text-primary font-bold hover:underline flex items-center gap-1">
                                Ver Todo
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50/50 dark:bg-white/5 text-text-muted font-bold uppercase tracking-wider text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Proyecto</th>
                                        <th className="px-6 py-4">Fecha</th>
                                        <th className="px-6 py-4">Meta de Impacto</th>
                                        <th className="px-6 py-4 text-right">Monto</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                                    {CONTRIBUTIONS.map((c) => (
                                        <tr key={c.id} className="group hover:bg-primary/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-text-main dark:text-text-light">{c.project}</div>
                                                <div className="text-xs text-text-muted">ID: {c.id}</div>
                                            </td>
                                            <td className="px-6 py-4 text-text-muted">{c.date}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 ${c.tagColor} px-2.5 py-1 rounded-md text-xs font-bold border`}>
                                                    <span className="material-symbols-outlined text-xs">{c.tagIcon}</span>
                                                    {c.tag}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-text-main dark:text-text-light">{c.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
