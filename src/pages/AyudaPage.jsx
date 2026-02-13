import { useState } from 'react'
import { Link } from 'react-router-dom'

const FAQ_CATEGORIES = [
    {
        id: 'general',
        label: 'General',
        icon: 'info',
        questions: [
            { q: '¿Qué es Impact Hub?', a: 'Impact Hub es una plataforma de donaciones alineada al ODS 1 (Fin de la Pobreza) de la ONU. Conectamos a donantes con proyectos verificados de alto impacto social en comunidades vulnerables alrededor del mundo.' },
            { q: '¿Cómo sé que los proyectos son legítimos?', a: 'Todos los proyectos pasan por un riguroso proceso de verificación. Nuestro equipo revisa la documentación legal, historial de la organización y realiza visitas de campo antes de publicarlos. Además, publicamos reportes trimestrales de uso de fondos.' },
            { q: '¿Puedo proponer mi propio proyecto?', a: 'Sí. Dirígete a la sección de Proyectos y haz clic en "Proponer Proyecto". Deberás completar un formulario con la descripción, objetivo, presupuesto estimado y documentos de respaldo. Nuestro equipo lo revisará en un plazo de 5 a 10 días hábiles.' },
        ]
    },
    {
        id: 'donaciones',
        label: 'Donaciones',
        icon: 'volunteer_activism',
        questions: [
            { q: '¿Cuál es el monto mínimo para donar?', a: 'Puedes donar desde $1 USD. No hay monto máximo. Cada peso cuenta y se destina directamente al proyecto que elijas.' },
            { q: '¿Puedo hacer donaciones recurrentes?', a: 'Sí. Al momento de donar, puedes seleccionar la opción de donación mensual. Puedes cancelar o modificar el monto en cualquier momento desde Configuración > Métodos de Pago.' },
            { q: '¿Mi donación es deducible de impuestos?', a: 'Depende de tu país de residencia. En México, las donaciones a proyectos certificados por el SAT son deducibles. Recuerda solicitar tu recibo fiscal al momento de donar.' },
            { q: '¿Qué métodos de pago aceptan?', a: 'Aceptamos tarjetas Visa, Mastercard, American Express, transferencias bancarias y PayPal. Puedes guardar tus tarjetas de forma segura en tu perfil para futuras donaciones.' },
        ]
    },
    {
        id: 'puntos',
        label: 'Puntos y Recompensas',
        icon: 'stars',
        questions: [
            { q: '¿Cómo gano puntos de impacto?', a: 'Ganas puntos con cada donación realizada (1 punto por cada $1 donado), al completar tu perfil, al invitar amigos a la plataforma, al jugar el minijuego diario y al participar en eventos especiales.' },
            { q: '¿Qué puedo canjear con mis puntos?', a: 'En la Tienda de Recompensas encontrarás skins exclusivos para tu avatar, artículos de merchandising, certificados digitales de impacto, descuentos en aliados y experiencias únicas.' },
            { q: '¿Los puntos expiran?', a: 'Los puntos tienen una vigencia de 12 meses desde su obtención. Te enviaremos un recordatorio 30 días antes de que expiren para que puedas canjearlos.' },
        ]
    },
    {
        id: 'cuenta',
        label: 'Mi Cuenta',
        icon: 'manage_accounts',
        questions: [
            { q: '¿Cómo cambio mi contraseña?', a: 'Ve a Configuración > Seguridad > Cambiar Contraseña. Necesitarás ingresar tu contraseña actual y definir una nueva. Recomendamos usar al menos 8 caracteres con letras, números y símbolos.' },
            { q: '¿Puedo vincular mi cuenta de LinkedIn?', a: 'Sí. Desde tu perfil de usuario o desde Configuración > Perfil, encontrarás la opción para sincronizar tu cuenta de LinkedIn. Esto nos permite verificar tu identidad y mostrarte proyectos relevantes.' },
            { q: '¿Cómo elimino mi cuenta?', a: 'Puedes solicitar la eliminación de tu cuenta desde Configuración > Seguridad > Zona de Peligro. Ten en cuenta que esta acción es irreversible y perderás todos tus puntos, insignias e historial de donaciones.' },
        ]
    },
    {
        id: 'juego',
        label: 'Minijuego',
        icon: 'sports_esports',
        questions: [
            { q: '¿Cómo funciona el minijuego?', a: 'El minijuego es un juego estilo "Flappy Bird" donde controlas un globo aerostático. Haz clic o toca la pantalla para elevarte y evita los obstáculos. A mayor puntaje, más puntos de impacto ganas como bonificación diaria.' },
            { q: '¿Hay límite de intentos?', a: 'No hay límite de intentos, pero los puntos de bonificación solo se otorgan una vez al día por tu mejor puntaje. ¡Practica todo lo que quieras!' },
        ]
    },
]

export default function AyudaPage() {
    const [activeCategory, setActiveCategory] = useState('general')
    const [openQuestion, setOpenQuestion] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')

    const currentCategory = FAQ_CATEGORIES.find((c) => c.id === activeCategory)

    // Filter by search
    const filteredQuestions = searchQuery
        ? FAQ_CATEGORIES.flatMap((cat) =>
            cat.questions
                .filter((q) => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((q) => ({ ...q, category: cat.label }))
        )
        : currentCategory?.questions || []

    const toggleQuestion = (idx) => {
        setOpenQuestion(openQuestion === idx ? null : idx)
    }

    return (
        <div className="flex-grow w-full px-4 md:px-10 py-8 max-w-[1280px] mx-auto">
            {/* Hero */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-surface-light via-primary/5 to-surface-light dark:from-surface-dark dark:via-primary/10 dark:to-surface-dark border border-border-light dark:border-border-dark p-8 md:p-12 mb-8">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-primary rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 text-center max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                        <span className="material-symbols-outlined text-sm">support</span>
                        Centro de Ayuda
                    </div>
                    <h1 className="text-text-main dark:text-text-light text-3xl md:text-4xl font-black tracking-tight mb-3">
                        ¿Cómo podemos ayudarte?
                    </h1>
                    <p className="text-text-muted dark:text-gray-400 mb-6">
                        Encuentra respuestas rápidas a las preguntas más frecuentes
                    </p>

                    {/* Search */}
                    <div className="relative max-w-lg mx-auto group">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">search</span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setOpenQuestion(null) }}
                            placeholder="Buscar en preguntas frecuentes..."
                            className="w-full h-13 pl-12 pr-4 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-text-main dark:text-text-light text-sm shadow-sm transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* ─── Category sidebar ─── */}
                {!searchQuery && (
                    <aside className="lg:col-span-3">
                        <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
                            {FAQ_CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => { setActiveCategory(cat.id); setOpenQuestion(null) }}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat.id
                                            ? 'bg-primary text-background-dark font-bold shadow-md shadow-primary/20'
                                            : 'text-text-main dark:text-text-light hover:bg-primary/5 hover:text-primary'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                                    {cat.label}
                                    <span className={`ml-auto text-[10px] font-black px-1.5 py-0.5 rounded ${activeCategory === cat.id ? 'bg-background-dark/10' : 'bg-gray-100 dark:bg-white/10 text-text-muted'
                                        }`}>
                                        {cat.questions.length}
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </aside>
                )}

                {/* ─── Questions ─── */}
                <div className={searchQuery ? 'lg:col-span-12' : 'lg:col-span-9'}>
                    {searchQuery && (
                        <p className="text-sm text-text-muted mb-4 font-medium">
                            {filteredQuestions.length} resultado{filteredQuestions.length !== 1 ? 's' : ''} para "<span className="text-primary font-bold">{searchQuery}</span>"
                        </p>
                    )}

                    <div className="space-y-3">
                        {filteredQuestions.map((q, idx) => (
                            <div
                                key={idx}
                                className={`bg-surface-light dark:bg-surface-dark border rounded-2xl overflow-hidden transition-all ${openQuestion === idx
                                        ? 'border-primary/40 shadow-md shadow-primary/5'
                                        : 'border-border-light dark:border-border-dark hover:border-primary/20'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleQuestion(idx)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <span className={`material-symbols-outlined text-lg shrink-0 transition-colors ${openQuestion === idx ? 'text-primary' : 'text-text-muted group-hover:text-primary'
                                            }`}>
                                            help
                                        </span>
                                        <div className="min-w-0">
                                            <span className={`text-sm font-bold block ${openQuestion === idx ? 'text-primary' : 'text-text-main dark:text-text-light'
                                                }`}>
                                                {q.q}
                                            </span>
                                            {searchQuery && q.category && (
                                                <span className="text-[9px] text-text-muted bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded font-bold mt-1 inline-block">{q.category}</span>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`material-symbols-outlined text-lg text-text-muted shrink-0 transition-transform duration-300 ${openQuestion === idx ? 'rotate-180 text-primary' : ''
                                        }`}>
                                        expand_more
                                    </span>
                                </button>

                                {openQuestion === idx && (
                                    <div className="px-6 pb-5 -mt-2">
                                        <div className="pl-9 border-l-2 border-primary/20 ml-1.5">
                                            <p className="text-sm text-text-muted dark:text-gray-400 leading-relaxed">{q.a}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {filteredQuestions.length === 0 && (
                            <div className="text-center py-16">
                                <span className="material-symbols-outlined text-5xl text-text-muted/30 mb-3 block">search_off</span>
                                <p className="text-text-muted font-bold">No encontramos resultados</p>
                                <p className="text-text-muted text-sm mt-1">Intenta con otras palabras clave</p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="mt-4 px-5 py-2 bg-primary text-background-dark font-bold rounded-xl text-sm active:scale-95 transition-all"
                                >
                                    Ver todas las preguntas
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ─── Contact CTA ─── */}
            <div className="mt-12 mb-4 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 p-8 md:p-12 text-white relative">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 text-center max-w-xl mx-auto">
                    <span className="material-symbols-outlined text-4xl mb-4 block opacity-80">mail</span>
                    <h2 className="text-2xl font-black mb-2">¿No encontraste lo que buscabas?</h2>
                    <p className="text-white/60 text-sm mb-6">Nuestro equipo de soporte está listo para ayudarte</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a href="mailto:soporte@impacthub.com" className="px-6 py-3 bg-white text-green-900 font-bold rounded-xl text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-lg">email</span>
                            soporte@impacthub.com
                        </a>
                        <Link to="/configuracion" className="px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl text-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
                            <span className="material-symbols-outlined text-lg">settings</span>
                            Ir a Configuración
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
