import { useState } from 'react'

const PODIUM = [
    { rank: 2, name: 'Sofia Chen', tag: '#Maestro', pts: '985,200', img: 'https://i.pravatar.cc/150?u=sofia', borderColor: 'border-gray-300 dark:border-gray-600', badgeBg: 'bg-gray-300 dark:bg-gray-600' },
    { rank: 1, name: 'Alex Rivera', tag: '#Legendario', pts: '1,240,500', img: 'https://i.pravatar.cc/150?u=alex', borderColor: 'border-yellow-400', badgeBg: 'bg-yellow-400' },
    { rank: 3, name: 'Marco V.', tag: '#Experto', pts: '750,100', img: 'https://i.pravatar.cc/150?u=marco', borderColor: 'border-orange-400 dark:border-orange-500/50', badgeBg: 'bg-orange-400 dark:bg-orange-600' },
]

const TABLE_ROWS = [
    { rank: '04', name: 'Lucía Gómez', handle: '@luciagmz_impact', rangoSocial: 'Veterano', rangoColor: 'bg-blue-400', img: 'https://i.pravatar.cc/100?u=4', avatarBg: 'bg-blue-100', projects: [{ letter: 'W', bg: 'bg-green-500' }, { letter: 'E', bg: 'bg-blue-500' }, { letter: 'S', bg: 'bg-yellow-500' }], extra: '+12', pts: '642,300' },
    { rank: '05', name: 'Daniel Ryu', handle: '@dryu_agente2026', rangoSocial: 'Veterano', rangoColor: 'bg-blue-400', img: 'https://i.pravatar.cc/100?u=5', avatarBg: 'bg-green-100', projects: [{ letter: 'F', bg: 'bg-orange-500' }, { letter: 'H', bg: 'bg-red-500' }], extra: '+8', pts: '512,100' },
    { rank: '06', name: 'Elena Torrente', handle: '@elena_impact', rangoSocial: 'Colaborador', rangoColor: 'bg-green-400', img: 'https://i.pravatar.cc/100?u=6', avatarBg: 'bg-purple-100', projects: [{ letter: 'A', bg: 'bg-pink-500' }], extra: '+5', pts: '489,000' },
    { rank: '07', name: 'Luis K. Smith', handle: '@luisk_agente', rangoSocial: 'Colaborador', rangoColor: 'bg-green-400', img: 'https://i.pravatar.cc/100?u=7', avatarBg: 'bg-gray-100', projects: [], extra: '+3', pts: '320,500' },
]

const BADGES = [
    { icon: 'workspace_premium', color: 'text-yellow-500', bg: 'bg-yellow-400/10 border-yellow-400/30', tooltip: 'Donante Gold' },
    { icon: 'bolt', color: 'text-blue-500', bg: 'bg-blue-400/10 border-blue-400/30', tooltip: 'Velocidad de Ayuda' },
    { icon: 'eco', color: 'text-green-500', bg: 'bg-green-400/10 border-green-400/30', tooltip: 'Eco Guerrero' },
    { icon: 'lock', color: 'text-gray-400', bg: 'bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600', tooltip: 'Bloqueado', locked: true },
]

export default function RankingPage() {
    const [activeTab, setActiveTab] = useState('Global')

    return (
        <div className="flex-1">
            {/* Hero */}
            <section className="w-full bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark py-12 md:py-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
                    <h1 className="text-[25vw] font-black leading-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ fontFamily: "'Outfit', sans-serif" }}>LEADERBOARD</h1>
                </div>
                <div className="max-w-[1280px] mx-auto px-4 md:px-10 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-text-main dark:text-text-light mb-6 tracking-tight">
                        Hall de la Fama <span className="text-primary italic">2026</span>
                    </h1>
                    <p className="text-lg text-text-muted dark:text-gray-400 max-w-2xl mx-auto">
                        Honramos a quienes transforman el mundo con sus acciones. Cada punto de impacto representa una solución financiada.
                    </p>
                </div>
            </section>

            {/* Podium */}
            <section className="w-full max-w-[1280px] mx-auto px-4 md:px-10 -mt-10 mb-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    {PODIUM.map((p, i) => {
                        const isFirst = p.rank === 1
                        return (
                            <div key={p.rank} className={`flex flex-col items-center ${isFirst ? 'order-1 md:order-2' : p.rank === 2 ? 'order-2 md:order-1' : 'order-3'}`}>
                                <div className={`relative mb-${isFirst ? '6' : '4'} group cursor-pointer ${isFirst ? 'scale-110' : ''}`}>
                                    <div className={`${isFirst ? 'size-32' : 'size-24'} rounded-full border-4 ${p.borderColor} overflow-hidden ${isFirst ? "shadow-[0_0_30px_rgba(250,204,21,0.3)]" : "shadow-xl"} transform transition-transform group-hover:scale-105`}>
                                        <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className={`absolute -bottom-${isFirst ? '3' : '2'} -right-${isFirst ? '3' : '2'} ${isFirst ? 'size-10' : 'size-8'} ${p.badgeBg} rounded-full flex items-center justify-center font-black ${isFirst ? 'text-background-dark text-lg shadow-xl animate-pulse' : 'text-white text-sm shadow-md'}`}>
                                        {isFirst ? <span className="material-symbols-outlined">star</span> : p.rank}
                                    </div>
                                </div>
                                <div className={`text-center bg-surface-light dark:bg-surface-dark ${isFirst ? 'p-8 rounded-3xl border-2 border-primary shadow-2xl' : 'p-6 rounded-2xl border border-border-light dark:border-border-dark shadow-lg'} w-full relative`}>
                                    {isFirst && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-background-dark text-[10px] font-black px-4 py-1 rounded-full whitespace-nowrap shadow-md uppercase">
                                            Líder Supremo
                                        </div>
                                    )}
                                    <h3 className={`font-black ${isFirst ? 'text-2xl' : 'text-xl'} text-text-main dark:text-text-light`}>{p.name}</h3>
                                    <p className={`text-primary font-bold ${isFirst ? 'text-lg mb-4' : 'text-sm mb-3'}`}>{p.tag}</p>
                                    {isFirst ? (
                                        <div className="flex flex-col gap-1 bg-primary/10 p-4 rounded-xl border border-primary/20">
                                            <span className="text-[10px] text-primary font-black uppercase tracking-widest">Total Impacto PTS</span>
                                            <span className="text-3xl font-black text-text-main dark:text-text-light tracking-tighter">{p.pts}</span>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-center bg-background-light dark:bg-background-dark p-3 rounded-xl border border-border-light dark:border-border-dark">
                                            <span className="text-[10px] text-text-muted font-black uppercase">Impacto</span>
                                            <span className="font-black text-text-main dark:text-text-light">{p.pts}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* Leaderboard Table */}
            <section className="w-full max-w-[1280px] mx-auto px-4 md:px-10 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-text-main dark:text-text-light">Clasificación General</h2>
                        <p className="text-text-muted text-sm mt-1">Actualizado en tiempo real • Última sincronización: Hace 2m</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex bg-surface-light dark:bg-surface-dark p-1 rounded-xl border border-border-light dark:border-border-dark">
                            {['Global', 'Regional', 'Semanal'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-primary text-background-dark shadow-sm' : 'text-text-muted dark:text-gray-400 hover:text-text-main'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-3xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-gray-800/30 border-b border-border-light dark:border-border-dark">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Posición</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Usuario</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Rango Social</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted">Proyectos Apoyados</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Impacto (PTS)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-light dark:divide-border-dark">
                                {TABLE_ROWS.map((r) => (
                                    <tr key={r.rank} className="hover:bg-primary/5 transition-colors group cursor-pointer">
                                        <td className="px-8 py-6">
                                            <div className="font-black text-lg text-text-muted group-hover:text-primary transition-colors">{r.rank}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`size-10 rounded-full ${r.avatarBg} overflow-hidden border border-border-light dark:border-border-dark`}>
                                                    <img src={r.img} alt={r.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-text-main dark:text-text-light">{r.name}</p>
                                                    <p className="text-[10px] text-text-muted font-medium">{r.handle}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`size-2 rounded-full ${r.rangoColor}`} />
                                                <span className="text-xs font-bold text-text-main dark:text-text-light">{r.rangoSocial}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex -space-x-2">
                                                {r.projects.map((pr, idx) => (
                                                    <div key={idx} className={`size-7 rounded-full ${pr.bg} border-2 border-white dark:border-gray-800 flex items-center justify-center text-[10px] text-white font-bold`}>{pr.letter}</div>
                                                ))}
                                                <div className="size-7 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800 flex items-center justify-center text-[8px] text-gray-500 font-bold">{r.extra}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <p className="font-black text-lg text-text-main dark:text-text-light">{r.pts}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-8 border-t border-border-light dark:border-border-dark bg-gray-50/30 dark:bg-gray-800/20 text-center">
                        <button className="text-primary font-black text-sm uppercase tracking-widest hover:underline flex items-center gap-2 mx-auto transition-all">
                            Cargar más participantes <span className="material-symbols-outlined text-lg">expand_more</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats/Summary */}
            <section className="w-full max-w-[1280px] mx-auto px-4 md:px-10 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Your Position */}
                    <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-3xl border border-border-light dark:border-border-dark shadow-lg">
                        <h3 className="text-xl font-black text-text-main dark:text-text-light mb-6">Tu Posición Actual</h3>
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="size-20 rounded-full border-4 border-primary p-1">
                                    <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-4xl">person</span>
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-text-main text-white text-[10px] font-black px-2 py-1 rounded-full">TÚ</div>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-end mb-2">
                                    <p className="font-black text-2xl text-text-main dark:text-text-light">#4,231</p>
                                    <p className="text-xs font-bold text-primary">Top 15%</p>
                                </div>
                                <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                                    <div className="bg-primary h-full w-[85%] rounded-full shadow-[0_0_10px_rgba(19,236,91,0.5)]" />
                                </div>
                                <p className="text-[10px] text-text-muted font-medium uppercase">Te faltan 4,200 pts para el nivel <span className="text-text-main dark:text-white font-bold">Veterano</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-3xl border border-border-light dark:border-border-dark shadow-lg">
                        <h3 className="text-xl font-black text-text-main dark:text-text-light mb-6 text-center md:text-left">Insignias de la Temporada</h3>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            {BADGES.map((b) => (
                                <div key={b.icon} className={`size-16 rounded-2xl ${b.bg} border flex items-center justify-center ${b.color} group relative cursor-help ${b.locked ? 'grayscale' : ''}`}>
                                    <span className="material-symbols-outlined text-3xl">{b.icon}</span>
                                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black/80 text-white text-[9px] px-2 py-1 rounded whitespace-nowrap z-50">
                                        {b.tooltip}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
