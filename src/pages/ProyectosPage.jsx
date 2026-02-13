import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

/* ─── Data ─── */
const TOP_PROJECTS = [
    { id: 1, rank: 1, title: 'Agua Limpia Global', tag: '#SALUD', pct: 85, raised: '$42,500', goal: '$50,000', donors: 1240, img: 'https://images.unsplash.com/photo-1518391846015-55a9cc00ddb5?q=80&w=1200&auto=format&fit=crop', medal: '🥇', medalBg: 'from-yellow-400 to-amber-500', borderColor: 'border-yellow-400', glowColor: 'shadow-[0_0_40px_rgba(250,204,21,0.2)]' },
    { id: 2, rank: 2, title: 'Escuelas Solares', tag: '#EDUCACIÓN', pct: 72, raised: '$25,200', goal: '$35,000', donors: 890, img: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1200&auto=format&fit=crop', medal: '🥈', medalBg: 'from-gray-300 to-gray-400', borderColor: 'border-gray-300', glowColor: 'shadow-xl' },
    { id: 3, rank: 3, title: 'Viviendas Resilientes', tag: '#INFRAESTRUCTURA', pct: 58, raised: '$69,600', goal: '$120,000', donors: 650, img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop', medal: '🥉', medalBg: 'from-orange-400 to-orange-500', borderColor: 'border-orange-400', glowColor: 'shadow-xl' },
]

const CATALOG_PROJECTS = [
    { id: 1, title: 'Paneles Solares Rurales', tag: 'ENERGÍA', tagColor: 'bg-yellow-500', pct: 78, raised: '$15,600', goal: '$20,000', donors: 340, desc: 'Instalación de paneles solares en comunidades sin acceso a red eléctrica convencional.', img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop' },
    { id: 2, title: 'Luz para Aprender', tag: 'EDUCACIÓN', tagColor: 'bg-blue-500', pct: 40, raised: '$10,000', goal: '$25,000', donors: 180, desc: 'Instalación de paneles solares en escuelas rurales alejadas para salas de computación.', img: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Agua Limpia Comunidades', tag: 'SALUD', tagColor: 'bg-emerald-500', pct: 62, raised: '$9,300', goal: '$15,000', donors: 420, desc: 'Construcción de pozos de agua potable y sistemas de filtrado por ósmosis inversa.', img: 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?q=80&w=1200&auto=format&fit=crop' },
    { id: 4, title: 'Kits de Estudio Digital', tag: 'INFANCIA', tagColor: 'bg-pink-500', pct: 95, raised: '$4,750', goal: '$5,000', donors: 560, desc: 'Entrega de tabletas con contenido offline y paneles solares portátiles a escuelas.', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Microcréditos Impulso', tag: 'ECONOMÍA', tagColor: 'bg-violet-500', pct: 25, raised: '$3,000', goal: '$12,000', donors: 95, desc: 'Fondo rotatorio para financiar pequeños negocios liderados por mujeres emprendedoras.', img: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Reforestación Amazónica', tag: 'AMBIENTE', tagColor: 'bg-green-600', pct: 55, raised: '$27,500', goal: '$50,000', donors: 710, desc: 'Plantación de árboles nativos y restauración de ecosistemas en la región amazónica.', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop' },
]

const FILTERS = ['Todos', 'Salud', 'Educación', 'Energía', 'Infancia', 'Economía', 'Ambiente']

const STATS = [
    { icon: 'rocket_launch', value: '42', label: 'Proyectos Activos', color: 'text-primary', bg: 'bg-primary/10' },
    { icon: 'group', value: '12,450+', label: 'Donantes Globales', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { icon: 'payments', value: '$2.1M', label: 'Total Recaudado', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { icon: 'public', value: '18', label: 'Países Alcanzados', color: 'text-purple-500', bg: 'bg-purple-500/10' },
]

/* ─── Sub-components ─── */
function ProjectCard({ project }) {
    return (
        <div className="flex flex-col bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl overflow-hidden shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
                <img src={project.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={project.title} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className={`absolute top-3 left-3 px-2.5 py-1 ${project.tagColor} text-white text-[9px] font-black uppercase rounded-lg tracking-wider shadow-sm`}>{project.tag}</span>
                {project.pct >= 90 && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-red-500 text-white text-[9px] font-black uppercase rounded-lg animate-pulse">¡Casi Lista!</span>
                )}
            </div>
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-black text-text-main dark:text-text-light mb-1.5 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-text-muted text-xs leading-relaxed line-clamp-2 mb-4">{project.desc}</p>

                {/* Progress */}
                <div className="mt-auto space-y-3">
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-end">
                            <div>
                                <span className="text-xl font-black text-text-main dark:text-text-light">{project.raised}</span>
                                <span className="text-[10px] text-text-muted ml-1">de {project.goal}</span>
                            </div>
                            <span className="text-sm font-black text-primary">{project.pct}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full shadow-[0_0_10px_rgba(19,236,91,0.3)] transition-all duration-1000"
                                style={{ width: `${project.pct}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-text-muted font-medium">
                        <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">group</span>
                            {project.donors} donantes
                        </span>
                    </div>

                    <div className="flex gap-2 pt-1">
                        <button className="flex-1 py-2.5 bg-primary hover:bg-green-400 text-background-dark font-black rounded-xl transition-all shadow-sm active:scale-95 text-xs">
                            DONAR AHORA
                        </button>
                        <button className="px-3 py-2.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-muted hover:text-primary hover:border-primary rounded-xl transition-all flex items-center justify-center">
                            <span className="material-symbols-outlined text-lg">bookmark_border</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ─── Main Page ─── */
export default function ProyectosPage() {
    const [activeFilter, setActiveFilter] = useState('Todos')
    const [search, setSearch] = useState('')
    const sliderRef = useRef(null)

    const filteredProjects = CATALOG_PROJECTS.filter((p) => {
        const matchFilter = activeFilter === 'Todos' || p.tag.toLowerCase() === activeFilter.toLowerCase()
        const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.tag.toLowerCase().includes(search.toLowerCase())
        return matchFilter && matchSearch
    })

    return (
        <div className="flex flex-col items-center">
            {/* ═══ HERO ═══ */}
            <section className="w-full relative overflow-hidden bg-gradient-to-br from-surface-light via-background-light to-surface-light dark:from-background-dark dark:via-surface-dark dark:to-background-dark border-b border-border-light dark:border-border-dark">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
                </div>
                <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-12 md:py-20 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                                <span className="material-symbols-outlined text-sm">verified</span>
                                Proyectos Verificados ODS 1
                            </div>
                            <h1 className="text-text-main dark:text-text-light text-4xl md:text-6xl font-black leading-[0.95] tracking-tight mb-6">
                                Proyectos que{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                                    Transforman Vidas
                                </span>
                            </h1>
                            <p className="text-text-muted dark:text-gray-400 text-lg max-w-xl leading-relaxed">
                                Descubre iniciativas verificadas de alto impacto. Cada donación cuenta, cada peso importa.
                            </p>
                        </div>
                        <button className="px-8 py-4 bg-primary hover:bg-green-400 text-background-dark font-black rounded-2xl transition-all shadow-lg shadow-primary/20 text-sm uppercase tracking-wider flex items-center gap-2 active:scale-95">
                            <span className="material-symbols-outlined">add_circle</span>
                            Proponer Proyecto
                        </button>
                    </div>

                    {/* Stats strip */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                        {STATS.map((s) => (
                            <div key={s.label} className="flex items-center gap-3 bg-surface-light dark:bg-surface-dark px-4 py-3 rounded-xl border border-border-light dark:border-border-dark">
                                <div className={`size-10 rounded-lg ${s.bg} flex items-center justify-center ${s.color}`}>
                                    <span className="material-symbols-outlined text-xl">{s.icon}</span>
                                </div>
                                <div>
                                    <p className="text-xl font-black text-text-main dark:text-text-light">{s.value}</p>
                                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ TOP 3 RANKING ═══ */}
            <section className="w-full max-w-[1280px] px-4 md:px-10 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <div className="size-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                        <span className="material-symbols-outlined text-2xl">emoji_events</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-text-main dark:text-text-light">Top Proyectos</h2>
                        <p className="text-xs text-text-muted">Los más financiados esta temporada</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {TOP_PROJECTS.map((p) => {
                        const isFirst = p.rank === 1
                        return (
                            <div
                                key={p.id}
                                className={`relative rounded-3xl overflow-hidden group cursor-pointer border-2 ${p.borderColor} ${p.glowColor} transition-all duration-300 hover:-translate-y-2 ${isFirst ? 'md:order-2 md:-mt-4 md:mb-4' : p.rank === 2 ? 'md:order-1' : 'md:order-3'
                                    }`}
                            >
                                {/* Image */}
                                <div className="relative h-48 md:h-56 overflow-hidden">
                                    <img src={p.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={p.title} loading="lazy" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    {/* Medal */}
                                    <div className={`absolute top-4 left-4 size-12 rounded-2xl bg-gradient-to-br ${p.medalBg} flex items-center justify-center text-2xl shadow-lg ${isFirst ? 'animate-bounce' : ''}`}>
                                        {p.medal}
                                    </div>
                                    {/* Rank tag */}
                                    <span className="absolute top-4 right-4 px-2 py-0.5 bg-black/50 text-white text-[9px] font-black uppercase rounded-lg backdrop-blur-sm">{p.tag}</span>
                                </div>

                                {/* Content */}
                                <div className="p-5 bg-surface-light dark:bg-surface-dark">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className={`${isFirst ? 'text-xl' : 'text-lg'} font-black text-text-main dark:text-text-light`}>{p.title}</h3>
                                    </div>

                                    {/* Progress */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between items-end text-sm">
                                            <span className="font-black text-text-main dark:text-text-light">{p.raised}</span>
                                            <span className="text-[10px] text-text-muted font-bold">Meta: {p.goal}</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full shadow-[0_0_12px_rgba(0,210,106,0.4)]"
                                                style={{ width: `${p.pct}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-[10px] text-text-muted">
                                            <span>{p.pct}% completado</span>
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[10px]">group</span>
                                                {p.donors.toLocaleString()} donantes
                                            </span>
                                        </div>
                                    </div>

                                    <button className="w-full py-2.5 bg-primary hover:bg-green-400 text-background-dark font-black rounded-xl text-xs transition-all active:scale-95 shadow-sm">
                                        DONAR A ESTE PROYECTO
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* ═══ SEARCH & FILTERS ═══ */}
            <section className="w-full py-5 bg-surface-light/80 dark:bg-surface-dark/80 border-y border-border-light dark:border-border-dark sticky top-[72px] z-40 backdrop-blur-xl">
                <div className="max-w-[1280px] mx-auto px-4 md:px-10">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        <div className="relative w-full lg:flex-1 group">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">search</span>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar por nombre, categoría o país..."
                                className="w-full h-12 pl-12 pr-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-text-main dark:text-text-light text-sm"
                            />
                        </div>
                        <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
                            {FILTERS.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${activeFilter === f
                                            ? 'bg-primary text-background-dark shadow-md shadow-primary/20'
                                            : 'bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark hover:border-primary text-text-main dark:text-text-light'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ PROJECT CATALOG GRID ═══ */}
            <section className="w-full max-w-[1280px] px-4 md:px-10 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-2xl">grid_view</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-text-main dark:text-text-light">Catálogo de Proyectos</h2>
                            <p className="text-xs text-text-muted">{filteredProjects.length} proyectos encontrados</p>
                        </div>
                    </div>
                </div>

                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((p) => (
                            <ProjectCard key={p.id} project={p} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <span className="material-symbols-outlined text-6xl text-text-muted/30 mb-4 block">search_off</span>
                        <p className="text-text-muted text-lg font-bold">No se encontraron proyectos</p>
                        <p className="text-text-muted text-sm mt-1">Intenta con otro filtro o búsqueda</p>
                        <button onClick={() => { setActiveFilter('Todos'); setSearch('') }} className="mt-4 px-6 py-2 bg-primary text-background-dark font-bold rounded-xl text-sm">
                            Ver todos
                        </button>
                    </div>
                )}
            </section>

            {/* ═══ CTA BOTTOM ═══ */}
            <section className="w-full max-w-[1280px] px-4 md:px-10 pb-16">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 p-8 md:p-12 text-white">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-3xl font-black mb-3">¿Tienes una idea que cambie vidas?</h2>
                            <p className="text-white/70 text-lg max-w-lg">Propón tu proyecto y recibe financiamiento de nuestra comunidad global de donantes.</p>
                        </div>
                        <button className="px-8 py-4 bg-primary hover:bg-green-400 text-background-dark font-black rounded-2xl transition-all shadow-lg shadow-primary/30 text-sm uppercase tracking-wider flex items-center gap-2 whitespace-nowrap active:scale-95">
                            <span className="material-symbols-outlined">lightbulb</span>
                            Proponer Proyecto
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
