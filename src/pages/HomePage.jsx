import { Link } from 'react-router-dom'
import heroImage from '../assets/pexels-hero.jpg'

const STATS = [
    { icon: 'favorite', label: 'Vidas Impactadas', value: '850,000' },
    { icon: 'payments', label: 'Total Recaudado', value: '$25M' },
    { icon: 'group', label: 'Donantes Activos', value: '125,000' },
]

const STEPS = [
    { icon: 'volunteer_activism', title: '1. Dona', desc: 'Elige un proyecto verificado del ODS 1. Cada dólar va directamente a soluciones de infraestructura y ayuda.' },
    { icon: 'sports_esports', title: '2. Juega', desc: 'Participa en minijuegos interactivos de última generación. Tus puntuaciones altas desbloquean fondos corporativos.' },
    { icon: 'trending_up', title: '3. Impacta', desc: 'Ve resultados del mundo real en tu panel y muestra tu insignia de impacto verificada 2026 en LinkedIn.' },
]

const PROJECTS = [
    { category: 'Infraestructura', title: 'Agua Limpia para Kenia Rural', desc: 'Proporcionando fuentes de agua sostenibles para 500 familias en regiones afectadas por la sequía.', raised: '$5,000', goal: 'de $8,000', pct: 62, badge: 'Tendencia', badgeIcon: 'trending_up', badgeColor: 'text-primary', img: 'https://images.unsplash.com/photo-1518391846015-55a9cc00ddb5?q=80&w=800&auto=format&fit=crop' },
    { category: 'Crecimiento Económico', title: 'Microcréditos para Mujeres', desc: 'Empoderando a mujeres emprendedoras con capital semilla para iniciar sus propios negocios locales.', raised: '$2,100', goal: 'de $3,000', pct: 70, badge: 'Popular', badgeIcon: 'local_fire_department', badgeColor: 'text-orange-500', img: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=800' },
    { category: 'Agricultura', title: 'Kits de Agricultura Sostenible', desc: 'Distribuyendo semillas resistentes a la sequía y herramientas a agricultores para garantizar la seguridad alimentaria.', raised: '$900', goal: 'de $10,000', pct: 9, badge: 'Nuevo', badgeIcon: 'new_releases', badgeColor: 'text-blue-500', img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800' },
    { category: 'Medio Ambiente', title: 'Reforestación Comunitaria', desc: 'Plantación de 5,000 árboles nativos para restaurar ecosistemas locales y combatir el cambio climático.', raised: '$4,500', goal: 'de $6,000', pct: 75, badge: 'Ecológico', badgeIcon: 'eco', badgeColor: 'text-green-500', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800' },
    { category: 'Tecnología', title: 'Alfabetización Digital Rural', desc: 'Llevando computadoras y acceso a internet satelital a comunidades remotas para cerrar la brecha digital.', raised: '$12,000', goal: 'de $15,000', pct: 80, badge: 'Educación', badgeIcon: 'school', badgeColor: 'text-purple-500', img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800' },
    { category: 'Salud Pública', title: 'Clínica Médica Móvil', desc: 'Equipamiento de un vehículo para brindar atención médica básica y vacunas en zonas de difícil acceso.', raised: '$7,500', goal: 'de $20,000', pct: 37.5, badge: 'Salud', badgeIcon: 'medical_services', badgeColor: 'text-red-500', img: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=800&auto=format&fit=crop' },
]

const LEADERBOARD = [
    { rank: 1, name: 'Alex Rivera', role: 'Donante Platino', level: 'Legendario', levelColor: 'bg-blue-500/10 text-blue-500', pts: '1,240,500', badge: 'stars', badgeColor: 'text-yellow-500', avatarBg: 'bg-blue-100 text-blue-600', rankBg: 'bg-yellow-400/20 text-yellow-600' },
    { rank: 2, name: 'Sofía Chen', role: 'Embajadora Global', level: 'Maestro', levelColor: 'bg-green-500/10 text-green-500', pts: '985,200', badge: 'verified', badgeColor: 'text-gray-400', avatarBg: 'bg-green-100 text-green-600', rankBg: 'bg-gray-400/20 text-gray-500' },
    { rank: 3, name: 'Marco V.', role: 'Líder Regional', level: 'Experto', levelColor: 'bg-purple-500/10 text-purple-500', pts: '750,100', badge: 'military_tech', badgeColor: 'text-orange-500', avatarBg: 'bg-purple-100 text-purple-600', rankBg: 'bg-orange-400/20 text-orange-600' },
]

const REWARDS = [
    { icon: 'flight', color: 'text-blue-400', name: 'Globo Futurista \'26', pts: '500 Puntos', tag: 'SKIN', tagBg: 'bg-black/60 text-white' },
    { icon: 'checkroom', color: 'text-green-600', name: 'Camiseta ODS 1', pts: '2,500 Puntos', tag: 'MERCH', tagBg: 'bg-primary text-black' },
    { icon: 'sentiment_very_satisfied', color: 'text-yellow-500', name: 'Pack Reacciones', pts: '200 Puntos', tag: 'EMOTE', tagBg: 'bg-black/60 text-white' },
    { icon: 'local_mall', color: 'text-purple-500', name: 'Tote Bag Eco', pts: '1,200 Puntos', tag: 'MERCH', tagBg: 'bg-primary text-black' },
]

export default function HomePage() {
    return (
        <div className="flex flex-col items-center">
            {/* Hero */}
            <section className="w-full max-w-[1280px] px-4 md:px-10 py-10 md:py-16">
                <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-center">
                    <div className="flex flex-1 flex-col gap-6 lg:max-w-[500px]">
                        <div className="flex flex-col gap-2 text-left">
                            <h1 className="text-text-main dark:text-text-light text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl lg:text-6xl">
                                Fin de la Pobreza 2026.<br />El futuro es ahora.
                            </h1>
                            <h2 className="text-text-muted dark:text-gray-400 text-base font-normal leading-relaxed md:text-lg mt-2">
                                Únete a la mayor red gamificada de agentes de cambio. Juntos financiaremos soluciones sostenibles para el ODS 1. Rastrea tu impacto en tiempo real en la era 2026.
                            </h2>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Link to="/proyectos">
                                <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-green-400 text-[#111813] text-base font-bold transition-colors">
                                    Empezar a Donar
                                </button>
                            </Link>
                            <Link to="/ranking">
                                <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-transparent border border-border-light dark:border-border-dark text-text-main dark:text-text-light hover:bg-background-light dark:hover:bg-background-dark text-base font-bold transition-colors">
                                    Ver Clasificación
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="w-full aspect-video bg-cover bg-center rounded-xl shadow-lg overflow-hidden relative group" style={{ backgroundImage: `url(${heroImage})` }}>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="w-full max-w-[1280px] px-4 md:px-10 pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {STATS.map((s) => (
                        <div key={s.label} className="flex flex-col gap-2 rounded-xl p-6 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm">
                            <div className="flex items-center gap-2 text-primary mb-1">
                                <span className="material-symbols-outlined">{s.icon}</span>
                                <p className="text-text-muted dark:text-gray-400 text-sm font-medium uppercase tracking-wider">{s.label}</p>
                            </div>
                            <p className="text-text-main dark:text-text-light text-3xl font-bold leading-tight">{s.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="w-full max-w-[1280px] px-4 md:px-10 py-12 md:py-20 border-t border-border-light dark:border-border-dark">
                <div className="text-center mb-12">
                    <h2 className="text-text-main dark:text-text-light text-3xl font-black mb-4">Cómo funciona Impact Hub 2026</h2>
                    <p className="text-text-muted dark:text-gray-400 max-w-2xl mx-auto text-lg">Hemos evolucionado las donaciones benéficas para el nuevo milenio, combinando el impacto directo con la participación interactiva.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {STEPS.map((step) => (
                        <div key={step.title} className="flex flex-col items-center text-center p-8 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <div className="size-20 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-primary mb-6">
                                <span className="material-symbols-outlined text-4xl">{step.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-text-main dark:text-text-light mb-3">{step.title}</h3>
                            <p className="text-text-muted dark:text-gray-400 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Game Preview */}
            <section className="w-full bg-surface-light dark:bg-surface-dark border-y border-border-light dark:border-border-dark py-16 md:py-24 overflow-hidden">
                <div className="max-w-[1280px] mx-auto px-4 md:px-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                        <div className="flex-1 space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-primary text-sm font-bold uppercase tracking-wider">
                                <span className="material-symbols-outlined text-sm">stadia_controller</span>
                                Experiencia Inmersiva 2026
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-text-main dark:text-text-light leading-tight">
                                Juega al <span className="text-primary">Juego de Donación del Globo</span>
                            </h2>
                            <p className="text-lg text-text-muted dark:text-gray-400 leading-relaxed">
                                ¡No solo hagas clic en un botón, lanza esperanza! En nuestro minijuego exclusivo, tu donación compra un globo virtual que transporta suministros. Cuanto más alto vuele, más fondos liberarán nuestros socios corporativos.
                            </p>
                            <ul className="space-y-5">
                                {['Navega entre obstáculos futuristas para entregar la ayuda.', 'Alcanza altitudes estratosféricas para activar bonificaciones.', 'Compite en la clasificación mundial 2026.'].map((item) => (
                                    <li key={item} className="flex items-start gap-4">
                                        <div className="mt-1 min-w-6 text-primary">
                                            <span className="material-symbols-outlined">check_circle</span>
                                        </div>
                                        <span className="text-text-main dark:text-text-light font-medium text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4">
                                <Link to="/juego">
                                    <button className="flex items-center justify-center rounded-lg h-14 px-8 bg-text-main dark:bg-white text-white dark:text-text-main font-bold text-lg hover:opacity-90 transition-opacity shadow-lg">
                                        Probar la Demo
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 w-full max-w-[500px]">
                            <div className="relative w-full aspect-square bg-gradient-to-b from-blue-100 to-blue-200 dark:from-slate-800 dark:to-slate-900 rounded-3xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl p-8 flex flex-col items-center justify-end group">
                                <div className="absolute top-16 left-12 text-white/60 dark:text-white/10 scale-150 animate-[pulse_4s_ease-in-out_infinite]">
                                    <span className="material-symbols-outlined text-7xl">cloud</span>
                                </div>
                                <div className="absolute top-32 right-12 text-white/50 dark:text-white/10 animate-[pulse_5s_ease-in-out_infinite]">
                                    <span className="material-symbols-outlined text-8xl">cloud</span>
                                </div>
                                <div className="relative z-10 animate-[bounce_3s_infinite] flex flex-col items-center">
                                    <div className="relative transition-transform duration-700 group-hover:-translate-y-16">
                                        <svg className="w-40 h-40 text-primary drop-shadow-xl" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-3 9c0-1.66 1.34-3 3-3s3 1.34 3 3H9z" />
                                            <path d="M12 20c-1.1 0-2 .9-2 2h4c0-1.1-.9-2-2-2z" opacity="0.6" />
                                        </svg>
                                    </div>
                                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur px-5 py-3 rounded-xl shadow-lg mt-4 text-center transform transition-all duration-700 group-hover:-translate-y-16">
                                        <p className="text-xs uppercase font-bold text-text-muted mb-1">Altitud Actual</p>
                                        <p className="text-xl font-black text-text-main dark:text-text-light">5,240m</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-green-500/30 to-transparent backdrop-blur-sm z-0" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rewards */}
            <section className="w-full max-w-[1280px] px-4 md:px-10 py-16 md:py-24">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider">
                            <span className="material-symbols-outlined text-sm">stars</span>
                            Recompensas
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-text-main dark:text-text-light leading-tight">
                            Gana Recompensas Exclusivas
                        </h2>
                        <p className="text-lg text-text-muted dark:text-gray-400 leading-relaxed">
                            Tu impacto merece ser reconocido. Al donar y jugar al Juego del Globo, acumulas <strong>Puntos de Impacto</strong>. Canjéalos por recompensas virtuales para tu perfil o mercancía física exclusiva.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex items-start gap-4">
                                <div className="mt-1 p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-primary"><span className="material-symbols-outlined">extension</span></div>
                                <div><h4 className="font-bold text-text-main dark:text-text-light text-lg">Virtuales</h4><p className="text-sm text-text-muted dark:text-gray-400 mt-1">Skins para el globo, marcos de avatar 2026 y emotes de chat.</p></div>
                            </div>
                            <div className="p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex items-start gap-4">
                                <div className="mt-1 p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-primary"><span className="material-symbols-outlined">checkroom</span></div>
                                <div><h4 className="font-bold text-text-main dark:text-text-light text-lg">Físicas</h4><p className="text-sm text-text-muted dark:text-gray-400 mt-1">Camisetas, gorras y accesorios sostenibles de edición limitada.</p></div>
                            </div>
                        </div>
                        <div className="pt-2">
                            <Link to="/tienda">
                                <button className="flex items-center justify-center rounded-lg h-12 px-6 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold transition-all">
                                    Ver Catálogo de Premios
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 w-full max-w-[600px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {REWARDS.map((r) => (
                                <div key={r.name} className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-xl shadow-md border border-border-light dark:border-border-dark overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                                    <div className="h-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative">
                                        <span className={`material-symbols-outlined text-6xl ${r.color}`}>{r.icon}</span>
                                        <div className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold ${r.tagBg}`}>{r.tag}</div>
                                    </div>
                                    <div className="p-4">
                                        <h5 className="font-bold text-text-main dark:text-text-light">{r.name}</h5>
                                        <p className="text-xs text-text-muted dark:text-gray-400 mt-1">{r.pts}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="w-full max-w-[1280px] px-4 md:px-10 pt-16 pb-6 flex items-center justify-between">
                <h2 className="text-text-main dark:text-text-light text-2xl font-bold leading-tight">Proyectos Destacados</h2>
                <Link className="text-primary font-bold text-sm hover:underline flex items-center gap-1" to="/proyectos">
                    Ver Todo <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
            </section>
            <section className="w-full max-w-[1280px] px-4 md:px-10 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROJECTS.map((p) => (
                        <div key={p.title} className="flex flex-col rounded-xl overflow-hidden bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow group">
                            <div className="relative w-full aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url("${p.img}")` }}>
                                <div className={`absolute top-3 left-3 bg-white/90 dark:bg-black/80 px-2 py-1 rounded text-xs font-bold ${p.badgeColor} backdrop-blur-sm flex items-center gap-1`}>
                                    <span className="material-symbols-outlined text-[14px]">{p.badgeIcon}</span> {p.badge}
                                </div>
                            </div>
                            <div className="flex flex-col flex-1 p-5 gap-4">
                                <div>
                                    <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">{p.category}</p>
                                    <h3 className="text-text-main dark:text-text-light text-xl font-bold leading-tight group-hover:text-primary transition-colors">{p.title}</h3>
                                    <p className="text-text-muted dark:text-gray-400 text-sm mt-2 line-clamp-2">{p.desc}</p>
                                </div>
                                <div className="mt-auto">
                                    <div className="flex justify-between text-sm font-medium mb-2">
                                        <span className="text-text-main dark:text-text-light">{p.raised} recaudados</span>
                                        <span className="text-text-muted dark:text-gray-500">{p.goal}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
                                        <div className="bg-primary h-full rounded-full" style={{ width: `${p.pct}%` }} />
                                    </div>
                                    <button className="w-full flex cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary hover:bg-green-400 text-[#111813] text-sm font-bold transition-colors">
                                        Donar Ahora
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* LinkedIn CTA */}
            <section className="w-full max-w-[1280px] px-4 md:px-10 pb-20">
                <div className="bg-[#0a66c2] rounded-3xl p-8 md:p-12 overflow-hidden relative shadow-2xl">
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="text-white max-w-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-white/10 p-2 rounded-lg backdrop-blur-md border border-white/20">
                                    <svg className="size-6 fill-current" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </span>
                                <span className="font-bold text-lg tracking-wide uppercase opacity-90">Impacto Profesional 2026</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Impulsa tu Marca Profesional</h2>
                            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                Conecta tu filantropía con tu identidad profesional. Los principales donantes y jugadores activos reciben una insignia verificada de "Contribuyente al ODS 1 2026" en su perfil de LinkedIn, señalando tu compromiso con el cambio global a los reclutadores.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-white text-[#0a66c2] hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-base transition-colors shadow-lg">Conectar Perfil</button>
                                <button className="bg-[#0a66c2] border border-white/30 hover:bg-[#004182] text-white px-8 py-4 rounded-xl font-bold text-base transition-colors">Beneficios para Socios</button>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl shadow-xl max-w-sm w-full transform lg:rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="size-14 rounded-full bg-primary/20 flex items-center justify-center text-primary border-2 border-primary">
                                    <span className="material-symbols-outlined text-3xl">person</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-text-main dark:text-text-light">Sarah Chen</h4>
                                    <p className="text-xs text-text-muted font-medium uppercase tracking-wide">Diseñadora de Producto • Donante Principal</p>
                                </div>
                                <div className="ml-auto">
                                    <span className="material-symbols-outlined text-[#0a66c2] text-2xl">verified</span>
                                </div>
                            </div>
                            <div className="border-t border-b border-gray-100 dark:border-gray-700 py-5 my-2">
                                <p className="text-sm text-text-main dark:text-text-light mb-3 leading-relaxed">
                                    <span className="font-bold">Logro de Impacto:</span> Contribuyente Top 5% al ODS 1 (Fin de la Pobreza) este mes vía Impact Hub.
                                </p>
                                <div className="w-full h-32 bg-background-light dark:bg-background-dark rounded-xl flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-600 group cursor-pointer hover:border-primary transition-colors">
                                    <div className="text-center group-hover:scale-105 transition-transform">
                                        <span className="material-symbols-outlined text-4xl text-primary mb-1">public</span>
                                        <p className="text-xs text-text-muted font-bold">Certificado por Impact Hub 2026</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                                <span className="flex items-center gap-1 hover:text-[#0a66c2] cursor-pointer"><span className="material-symbols-outlined text-base">thumb_up</span> 324</span>
                                <span className="flex items-center gap-1 hover:text-[#0a66c2] cursor-pointer"><span className="material-symbols-outlined text-base">comment</span> 24</span>
                                <span className="flex items-center gap-1 hover:text-[#0a66c2] cursor-pointer"><span className="material-symbols-outlined text-base">share</span> 15</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-32 -right-32 size-80 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -top-32 -left-32 size-80 bg-white/10 rounded-full blur-3xl" />
                </div>
            </section>

            {/* Leaderboard */}
            <section className="w-full max-w-[1280px] px-4 md:px-10 py-16 md:py-24" id="clasificacion">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-text-main dark:text-text-light leading-tight">Líderes de Impacto Social</h2>
                    <p className="text-lg text-text-muted dark:text-gray-400 max-w-2xl mx-auto mt-4">Reconocimiento a los agentes de cambio más activos. Tu posición en el ranking desbloquea beneficios exclusivos.</p>
                </div>
                <div className="w-full overflow-hidden bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-3xl shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-gray-800/30">
                                    <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-text-muted">Rango</th>
                                    <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-text-muted">Agente de Cambio</th>
                                    <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-text-muted">Nivel</th>
                                    <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-text-muted">Impacto (PTS)</th>
                                    <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-text-muted text-right">Insignia</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-light dark:divide-border-dark">
                                {LEADERBOARD.map((l) => (
                                    <tr key={l.rank} className="hover:bg-primary/5 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className={`flex items-center justify-center size-10 rounded-full ${l.rankBg} font-black`}>{l.rank}</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`size-10 rounded-full ${l.avatarBg} flex items-center justify-center border-2 border-white dark:border-gray-700`}>
                                                    <span className="material-symbols-outlined">person</span>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-text-main dark:text-text-light">{l.name}</p>
                                                    <p className="text-[10px] text-text-muted font-medium">{l.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-2 py-1 rounded-lg ${l.levelColor} text-[10px] font-black uppercase`}>{l.level}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="font-black text-text-main dark:text-text-light">{l.pts}</p>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <span className={`material-symbols-outlined ${l.badgeColor}`}>{l.badge}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <Link to="/ranking">
                        <button className="bg-primary hover:bg-green-400 text-text-main font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-primary/20">Ver Clasificación Completa</button>
                    </Link>
                </div>
            </section>

            {/* Brand watermark */}
            <section className="w-full relative overflow-hidden pointer-events-none select-none -mt-10 md:-mt-16 pb-12 md:pb-24 z-0 px-4 flex justify-center">
                <div className="max-w-full">
                    <h2 className="text-[15vw] font-black leading-none tracking-[-0.02em] text-text-main dark:text-text-light opacity-[0.04] dark:opacity-[0.07] text-center whitespace-nowrap" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        IMPACT HUB
                    </h2>
                </div>
            </section>
        </div>
    )
}
