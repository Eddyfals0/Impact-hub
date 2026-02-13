import { useState } from 'react'

const FILTERS = ['Todos', 'Skins', 'Merch', 'Emotes', 'Gaming']

const PRODUCTS = [
    { id: 1, name: 'Globo Futurista \'26', pts: 500, tag: 'SKIN', tagBg: 'bg-black/60 text-white', icon: 'flight', iconColor: 'text-blue-400', brand: 'Impact Hub' },
    { id: 2, name: 'Camiseta ODS 1', pts: 2500, tag: 'MERCH', tagBg: 'bg-primary text-black', icon: 'checkroom', iconColor: 'text-green-600', brand: 'Eco Wear' },
    { id: 3, name: 'Pack Reacciones', pts: 200, tag: 'EMOTE', tagBg: 'bg-black/60 text-white', icon: 'sentiment_very_satisfied', iconColor: 'text-yellow-500', brand: 'Impact Hub' },
    { id: 4, name: 'Tote Bag Eco', pts: 1200, tag: 'MERCH', tagBg: 'bg-primary text-black', icon: 'local_mall', iconColor: 'text-purple-500', brand: 'Green Line' },
    { id: 5, name: 'Globo Galaxia', pts: 800, tag: 'SKIN', tagBg: 'bg-black/60 text-white', icon: 'rocket_launch', iconColor: 'text-indigo-500', brand: 'Impact Hub' },
    { id: 6, name: 'Gorra Impact', pts: 1800, tag: 'MERCH', tagBg: 'bg-primary text-black', icon: 'sports_baseball', iconColor: 'text-red-500', brand: 'Eco Wear' },
    { id: 7, name: 'Marco Avatar Neón', pts: 350, tag: 'SKIN', tagBg: 'bg-black/60 text-white', icon: 'filter_frames', iconColor: 'text-cyan-400', brand: 'Impact Hub' },
    { id: 8, name: 'Pack Gaming LoL', pts: 3000, tag: 'GAMING', tagBg: 'bg-blue-600 text-white', icon: 'sports_esports', iconColor: 'text-yellow-400', brand: 'Riot Games' },
]

export default function TiendaPage() {
    const [activeFilter, setActiveFilter] = useState('Todos')

    const filtered = activeFilter === 'Todos'
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.tag.toLowerCase() === activeFilter.toLowerCase())

    return (
        <div className="flex flex-col items-center w-full">
            {/* Hero */}
            <section className="w-full max-w-[1280px] px-4 md:px-10 py-12">
                <div className="relative rounded-3xl overflow-hidden bg-surface-light dark:bg-surface-dark shadow-lg border border-border-light dark:border-border-dark p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
                        <div className="flex flex-col gap-6">
                            <div className="inline-flex items-center gap-2">
                                <span className="px-3 py-1 bg-text-main text-text-light text-[10px] font-black uppercase tracking-widest rounded-full">Temporada '26</span>
                                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">Recompensas Globales</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black leading-[0.95] tracking-tight text-text-main dark:text-text-light" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                                TU IMPACTO,<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">TU JUEGO.</span>
                            </h1>
                            <p className="text-text-muted dark:text-gray-400 text-lg font-medium max-w-lg leading-relaxed">
                                Convierte tus acciones solidarias en skins legendarias, puntos y contenido exclusivo para tus juegos favoritos.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {[{ name: 'LoL', color: 'bg-blue-600' }, { name: 'Fortnite', color: 'bg-purple-600' }, { name: 'Valorant', color: 'bg-red-500' }].map((b) => (
                                    <span key={b.name} className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${b.color}`} />{b.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="relative">
                                <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-primary/20 via-emerald-500/10 to-blue-500/10 border-2 border-white/10 flex items-center justify-center shadow-2xl">
                                    <span className="material-symbols-outlined text-9xl text-primary/80 animate-pulse">redeem</span>
                                </div>
                                <div className="absolute -top-4 -right-4 px-3 py-1 bg-primary text-background-dark text-[10px] font-black uppercase rounded-full shadow-lg animate-bounce">Nuevo</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Points balance */}
            <section className="w-full max-w-[1280px] px-4 md:px-10 mb-8">
                <div className="flex flex-col sm:flex-row items-center justify-between bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 shadow-sm gap-4">
                    <div className="flex items-center gap-3">
                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-2xl">savings</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-wider">Tu saldo</p>
                            <p className="text-2xl font-black text-text-main dark:text-text-light">1,250 <span className="text-sm text-primary">PTS</span></p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-6 py-3 bg-primary hover:bg-green-400 text-background-dark font-bold rounded-xl transition-all text-sm">Ganar Puntos</button>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="w-full max-w-[1280px] px-4 md:px-10 mb-8">
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`whitespace-nowrap px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeFilter === f
                                    ? 'bg-primary text-background-dark shadow-lg shadow-primary/20'
                                    : 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark hover:border-primary text-text-main dark:text-text-light'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </section>

            {/* Product Grid */}
            <section className="w-full max-w-[1280px] px-4 md:px-10 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filtered.map((p) => (
                        <div key={p.id} className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-2xl shadow-md border border-border-light dark:border-border-dark overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                            <div className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative">
                                <span className={`material-symbols-outlined text-7xl ${p.iconColor} transition-transform group-hover:scale-110`}>{p.icon}</span>
                                <div className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold ${p.tagBg}`}>{p.tag}</div>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mb-1">{p.brand}</p>
                                <h3 className="font-bold text-text-main dark:text-text-light text-lg mb-2">{p.name}</h3>
                                <div className="mt-auto flex items-center justify-between pt-3 border-t border-border-light dark:border-border-dark">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-primary text-base">savingss</span>
                                        <span className="material-symbols-outlined text-primary text-base">savings</span>
                                        <span className="font-black text-text-main dark:text-text-light">{p.pts.toLocaleString()}</span>
                                        <span className="text-[10px] text-text-muted font-bold">PTS</span>
                                    </div>
                                    <button className="px-4 py-2 bg-primary hover:bg-green-400 text-background-dark font-bold rounded-lg text-xs transition-all active:scale-95">
                                        Canjear
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
