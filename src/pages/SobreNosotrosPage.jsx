import { Link } from 'react-router-dom'
import losDosImg from '../assets/losdos.jpg'
import eddyImg from '../assets/eddy.jpg'
import angieImg from '../assets/angie.png'

const HISTORY_TIMELINE = [
    { year: '2022', title: 'El Origen', desc: 'Nos conocimos en los primeros días de la carrera. Una charla en el pasillo sobre el futuro de la IA se convirtió en nuestra primera sesión de brainstorming.' },
    { year: '2023', title: 'EcoSort Beta', desc: 'Desarrollamos nuestro primer prototipo: un clasificador de basura con visión artificial que ganó el Hackathon local de Puebla.' },
    { year: '2023', title: 'NASA Space Apps', desc: '1er Lugar Nacional. Desarrollamos "Solaris", un predictor de tormentas solares utilizando datos abiertos de la NASA.' },
    { year: '2024', title: 'Google IO Extended', desc: 'Presentamos "HealthChain", registro médico descentralizado. Recibimos mención honorífica por innovación en seguridad.' },
    { year: '2024', title: 'MIT Solver', desc: 'Finalistas globales con "AquaNet", sensores IoT para monitoreo de agua potable en zonas rurales.' },
    { year: '2024', title: 'StartUp Weekend', desc: 'Lanzamiento de "EduVerse", plataforma de realidad aumentada para educación STEM. Adquirida por una incubadora edtech.' },
    { year: '2025', title: 'HackMty', desc: 'Ganadores absolutos con "NeuroDrive", interfaz cerebro-computadora de bajo costo para control de sillas de ruedas.' },
    { year: '2025', title: 'Premio Turing Joven', desc: 'Reconocimiento nacional por nuestra contribución al desarrollo de IA ética en "BiasBreaker".' },
    { year: '2025', title: 'Smart City Expo', desc: 'Medalla de Oro por "UrbanFlow", IA para optimización semafórica en tiempo real aplicada en Puebla.' },
    { year: '2026', title: 'Impact Hub', desc: 'La culminación de nuestra experiencia. Una plataforma que une todas nuestras tecnologías para erradicar la pobreza.' },
]

const AWARDS = [
    "Microsoft Imagine Cup - Regional Winner 2024",
    "Apple Swift Student Challenge 2024 & 2025",
    "IBM Quantum Challenge - Top 1% Global",
    "Oracle Cloud Innovation Award",
    "Intel AI for Social Good - Gold Medal",
    "GitHub Octoverse - Rising Stars",
    "Forbes 30 Under 30 (Nominados Ciencia y Tecnología)",
    "Premio Estatal de la Juventud 2025",
]

const INNOVATION_LAB = [
    { name: 'QuantumKey', cat: 'Criptografía', desc: 'Protocolo de encriptación post-cuántica.' },
    { name: 'BioLeaf', cat: 'Biotecnología', desc: 'App móvil para detección temprana de plagas.' },
    { name: 'SkyMonitor', cat: 'Aeroespacial', desc: 'Telemetry dashboard para CubeSats.' },
    { name: 'VoiceBridge', cat: 'Accesibilidad', desc: 'Traductor de lengua de señas a voz en tiempo real.' },
    { name: 'DataCore', cat: 'Big Data', desc: 'Motor de procesamiento de datos distribuidos.' },
    { name: 'PixelRest', cat: 'IA', desc: 'Restauración de fotos antiguas con GANs.' },
    { name: 'SafeRoute', cat: 'Movilidad', desc: 'Navegación segura para peatones basada en luminaria.' },
    { name: 'RecycleBot', cat: 'Hardware', desc: 'Robot autónomo recolector de PET.' },
]

export default function SobreNosotrosPage() {
    return (
        <div className="flex flex-col w-full bg-background-light dark:bg-background-dark overflow-hidden">

            {/* ═══ HERO: SPLIT SCREEN ═══ */}
            <section className="relative w-full min-h-[90vh] flex items-center bg-background-dark overflow-hidden py-20 px-4 md:px-12">
                {/* Background Effects (Destello original) */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-900/30 via-background-dark to-background-dark" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

                <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

                    {/* Text Content */}
                    <div className="order-2 lg:order-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-3 mb-8 animate-fade-in-up">
                            <span className="h-[2px] w-12 bg-primary" />
                            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm md:text-base">Arquitectos del Futuro</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tighter drop-shadow-lg">
                            Angélica &<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Eduardo.</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-xl leading-relaxed font-light drop-shadow-md mb-10 mx-auto lg:mx-0">
                            Dos mentes que se encontraron en 2022 con una misión compartida: reescribir las reglas de la tecnología social.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a href="#bio" className="px-8 py-3 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm">
                                Leer Historia
                            </a>
                            <Link to="/proyectos" className="px-8 py-3 bg-primary text-background-dark font-black rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all">
                                Ver Inventos
                            </Link>
                        </div>
                    </div>

                    {/* Image Content (Size Original) */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative group perspective-1000">
                        {/* Decorative Elements behind image */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-500 rounded-3xl blur-2xl opacity-20 transform rotate-6 scale-90 transition-transform group-hover:rotate-3 duration-700"></div>

                        {/* The Image */}
                        <img
                            src={losDosImg}
                            alt="Eduardo y Angélica en 2022"
                            className="relative rounded-3xl shadow-2xl border border-white/10 max-h-[600px] w-auto object-contain transform transition-transform duration-700 hover:scale-[1.02] hover:rotate-1"
                        />

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-surface-dark/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                            <span className="text-3xl">🚀</span>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold">Desde</p>
                                <p className="text-xl font-black text-white">2022</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ═══ BIO & ORIGIN ═══ */}
            <section id="bio" className="w-full py-24 px-4 md:px-12 bg-surface-light dark:bg-surface-dark relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-text-main dark:text-text-light mb-8">
                            Codificando sincronicidad.<br />
                            <span className="text-primary">Desde el Día 1.</span>
                        </h2>
                        <div className="space-y-6 text-lg text-text-muted dark:text-gray-400 leading-relaxed text-justify">
                            <p>
                                Era <strong>2022</strong>. Los primeros días de la carrera de Ingeniería en Ciencias de la Computación. Mientras la mayoría trataba de entender dónde estaba la cafetería, nosotros discutíamos sobre el impacto de la Inteligencia Artificial en la sociedad.
                            </p>
                            <p>
                                Esa primera conversación en los pasillos de la BUAP encendió una chispa. <strong className="text-text-main dark:text-text-light">Eduardo</strong> traía la visión de sistemas robustos y escalables; <strong className="text-text-main dark:text-text-light">Angélica</strong> aportaba la genialidad algorítmica y la creatividad.
                            </p>
                            <p>
                                Nos dimos cuenta de que nuestras habilidades no se sumaban, se multiplicaban. Decidimos formar un equipo permanente, convirtiendo cada proyecto escolar en un prototipo de calidad industrial.
                            </p>
                        </div>

                        <div className="flex gap-6 mt-10">
                            <div className="flex -space-x-4">
                                <img src={eddyImg} className="w-16 h-16 rounded-full border-4 border-surface-light dark:border-background-dark object-cover" alt="Eduardo" />
                                <img src={angieImg} className="w-16 h-16 rounded-full border-4 border-surface-light dark:border-background-dark object-cover" alt="Angélica" />
                            </div>
                            <div>
                                <p className="font-bold text-text-main dark:text-text-light">Partners in Code</p>
                                <p className="text-sm text-text-muted">4 Años de Innovación Continua</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-background-light dark:bg-background-dark p-8 md:p-12 rounded-[2.5rem] border border-border-light dark:border-border-dark shadow-2xl relative">
                        <span className="absolute -top-6 -right-6 text-[10rem] text-primary/10 select-none font-black leading-none">20+</span>
                        <h3 className="text-2xl font-black text-text-main dark:text-text-light mb-8 relative z-10">Trofeos en la Vitrina</h3>
                        <ul className="space-y-4 relative z-10">
                            {AWARDS.slice(0, 5).map((award, i) => (
                                <li key={i} className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-yellow-500">emoji_events</span>
                                    <span className="text-sm md:text-base font-bold text-text-muted dark:text-gray-300">{award}</span>
                                </li>
                            ))}
                            <li className="pl-10 text-primary font-bold text-sm cursor-pointer hover:underline">Ver lista completa...</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ═══ TIMELINE OF GLORY ═══ */}
            <section className="w-full py-24 bg-background-dark text-white relative overflow-hidden">
                <div className="max-w-[1280px] mx-auto px-4 md:px-12 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm block mb-4">De Estudiantes a Fundadores</span>
                        <h2 className="text-4xl md:text-6xl font-black">Nuestra Trayectoria</h2>
                    </div>

                    <div className="relative border-l-2 border-white/10 ml-4 md:ml-1/2 space-y-16">
                        {HISTORY_TIMELINE.map((item, idx) => (
                            <div key={idx} className={`relative pl-8 md:pl-0 ${idx % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0 md:mr-1/2' : 'md:pl-12 md:ml-1/2'}`}>
                                <div className="absolute -left-[9px] top-0 size-4 rounded-full bg-primary ring-4 ring-background-dark" />
                                <div className={`transition-all duration-500 hover:scale-105 ${idx % 2 === 0 ? 'origin-right' : 'origin-left'}`}>
                                    <span className="text-6xl font-black text-white/5 absolute -top-8 -z-10 select-none block w-full">{item.year}</span>
                                    <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed max-w-md ml-auto mr-auto md:mx-0">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ INNOVATION LAB (GRID) ═══ */}
            <section className="w-full py-24 px-4 md:px-12 bg-background-light dark:bg-background-dark">
                <div className="max-w-[1280px] mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black text-text-main dark:text-text-light mb-12 text-center">
                        Innovation Lab <span className="text-primary text-lg align-top ml-2">BETA</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {INNOVATION_LAB.map((proj, i) => (
                            <div key={i} className="group bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-border-light dark:border-border-dark hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded-md">{proj.cat}</span>
                                    <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors">arrow_outward</span>
                                </div>
                                <h3 className="font-black text-lg text-text-main dark:text-text-light mb-2">{proj.name}</h3>
                                <p className="text-xs text-text-muted leading-relaxed">{proj.desc}</p>
                            </div>
                        ))}

                        {/* Card "See More" */}
                        <div className="bg-gradient-to-br from-primary to-emerald-600 p-6 rounded-2xl text-white flex flex-col justify-center items-center text-center cursor-pointer hover:scale-[1.02] transition-transform">
                            <span className="material-symbols-outlined text-4xl mb-2">add_circle</span>
                            <span className="font-bold text-lg">Y mucho más...</span>
                            <span className="text-xs opacity-80 mt-2">Explora nuestro GitHub</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ FINAL CTA ═══ */}
            <section className="w-full py-24 text-center bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-4xl font-black text-text-main dark:text-text-light mb-6">¿Listo para cambiar el mundo con nosotros?</h2>
                    <p className="text-text-muted dark:text-gray-400 mb-8 text-lg">
                        Impact Hub es nuestra obra maestra. Únete hoy.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/proyectos" className="px-8 py-4 bg-primary text-background-dark font-black rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1">
                            Ver Proyectos
                        </Link>
                        <a href="mailto:hola@impacthub.com" className="px-8 py-4 border-2 border-text-main dark:border-text-light text-text-main dark:text-text-light font-bold rounded-full hover:bg-text-main hover:text-background-light dark:hover:bg-text-light dark:hover:text-background-dark transition-all">
                            Contactar Equipo
                        </a>
                    </div>
                </div>
            </section>

        </div>
    )
}
