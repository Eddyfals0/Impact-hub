import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const SAVED_CARDS = [
    { id: 1, brand: 'Visa', last4: '4521', exp: '09/27', icon: 'credit_card', color: 'from-blue-600 to-blue-800' },
    { id: 2, brand: 'Mastercard', last4: '8832', exp: '03/26', icon: 'credit_card', color: 'from-red-500 to-orange-600' },
]

export default function ConfiguracionPage() {
    const { user } = useAuth()

    const [form, setForm] = useState({
        name: user?.name || '',
        email: 'eduardo@impacthub.com',
        phone: '+52 33 1234 5678',
        bio: 'Estudiante de Ingeniería apasionado por el impacto social.',
    })
    const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' })
    const [saved, setSaved] = useState(false)
    const [passSaved, setPassSaved] = useState(false)
    const [activeTab, setActiveTab] = useState('perfil')
    const [showAddCard, setShowAddCard] = useState(false)
    const [newCard, setNewCard] = useState({ number: '', name: '', exp: '', cvv: '' })

    const handleSave = (e) => {
        e.preventDefault()
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
    }

    const handlePassSave = (e) => {
        e.preventDefault()
        setPassSaved(true)
        setPasswordForm({ current: '', newPass: '', confirm: '' })
        setTimeout(() => setPassSaved(false), 2500)
    }

    const tabs = [
        { id: 'perfil', label: 'Perfil', icon: 'person' },
        { id: 'seguridad', label: 'Seguridad', icon: 'lock' },
        { id: 'pagos', label: 'Métodos de Pago', icon: 'credit_card' },
        { id: 'notificaciones', label: 'Notificaciones', icon: 'notifications' },
    ]

    return (
        <div className="flex-grow w-full px-4 md:px-10 py-8 max-w-[1280px] mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-text-main dark:text-text-light text-3xl md:text-4xl font-black tracking-tight">Configuración</h1>
                <p className="text-text-muted dark:text-gray-400 mt-1">Administra tu cuenta, seguridad y preferencias</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* ─── Sidebar Tabs ─── */}
                <aside className="lg:col-span-3">
                    <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                        ? 'bg-primary text-background-dark font-bold shadow-md shadow-primary/20'
                                        : 'text-text-main dark:text-text-light hover:bg-primary/5 hover:text-primary'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* ─── Content ─── */}
                <div className="lg:col-span-9 flex flex-col gap-6">

                    {/* ═══ PERFIL ═══ */}
                    {activeTab === 'perfil' && (
                        <>
                            {/* Avatar section */}
                            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-text-main dark:text-text-light mb-4">Foto de Perfil</h2>
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <div
                                            className="size-20 rounded-full bg-cover bg-center border-4 border-primary/20 shadow-lg"
                                            style={{ backgroundImage: `url('${user?.avatar}')` }}
                                        />
                                        <button className="absolute -bottom-1 -right-1 size-8 bg-primary text-background-dark rounded-full flex items-center justify-center shadow-md hover:bg-green-400 transition-colors">
                                            <span className="material-symbols-outlined text-sm">edit</span>
                                        </button>
                                    </div>
                                    <div>
                                        <p className="text-sm text-text-main dark:text-text-light font-medium">Sube una nueva foto</p>
                                        <p className="text-xs text-text-muted mt-1">JPG, PNG o GIF. Máximo 5MB.</p>
                                        <div className="flex gap-2 mt-3">
                                            <button className="px-4 py-2 bg-primary/10 text-primary font-bold text-xs rounded-lg hover:bg-primary/20 transition-colors">Subir foto</button>
                                            <button className="px-4 py-2 text-red-500 font-bold text-xs rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Profile form */}
                            <form onSubmit={handleSave} className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-text-main dark:text-text-light mb-6">Información Personal</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Nombre completo</label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-text-main dark:text-text-light text-sm transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Correo electrónico</label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-text-main dark:text-text-light text-sm transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Teléfono</label>
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-text-main dark:text-text-light text-sm transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">LinkedIn</label>
                                        <input
                                            type="url"
                                            defaultValue="https://linkedin.com/in/eduardo"
                                            className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-text-main dark:text-text-light text-sm transition-all"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Biografía</label>
                                        <textarea
                                            value={form.bio}
                                            onChange={(e) => setForm({ ...form, bio: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-3 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-text-main dark:text-text-light text-sm transition-all resize-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border-light dark:border-border-dark">
                                    {saved && (
                                        <span className="text-primary text-sm font-bold flex items-center gap-1 animate-pulse">
                                            <span className="material-symbols-outlined text-sm">check_circle</span> Guardado
                                        </span>
                                    )}
                                    <button type="submit" className="px-6 py-3 bg-primary hover:bg-green-400 text-background-dark font-bold rounded-xl text-sm transition-all active:scale-95 shadow-sm">
                                        Guardar cambios
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                    {/* ═══ SEGURIDAD ═══ */}
                    {activeTab === 'seguridad' && (
                        <>
                            <form onSubmit={handlePassSave} className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-text-main dark:text-text-light mb-6">Cambiar Contraseña</h2>
                                <div className="flex flex-col gap-5 max-w-md">
                                    <div>
                                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Contraseña actual</label>
                                        <input
                                            type="password"
                                            value={passwordForm.current}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                                            placeholder="••••••••"
                                            className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-text-main dark:text-text-light text-sm transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Nueva contraseña</label>
                                        <input
                                            type="password"
                                            value={passwordForm.newPass}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                                            placeholder="Mínimo 8 caracteres"
                                            className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-text-main dark:text-text-light text-sm transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Confirmar contraseña</label>
                                        <input
                                            type="password"
                                            value={passwordForm.confirm}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                                            placeholder="Repite la nueva contraseña"
                                            className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-text-main dark:text-text-light text-sm transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border-light dark:border-border-dark">
                                    {passSaved && (
                                        <span className="text-primary text-sm font-bold flex items-center gap-1 animate-pulse">
                                            <span className="material-symbols-outlined text-sm">check_circle</span> Contraseña actualizada
                                        </span>
                                    )}
                                    <button type="submit" className="px-6 py-3 bg-primary hover:bg-green-400 text-background-dark font-bold rounded-xl text-sm transition-all active:scale-95">
                                        Actualizar contraseña
                                    </button>
                                </div>
                            </form>

                            {/* Sessions */}
                            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-text-main dark:text-text-light mb-4">Sesiones activas</h2>
                                <div className="space-y-3">
                                    {[
                                        { device: 'Chrome — Windows 11', loc: 'Guadalajara, MX', current: true, time: 'Ahora' },
                                        { device: 'Safari — iPhone 15', loc: 'Guadalajara, MX', current: false, time: 'Hace 2 horas' },
                                    ].map((s, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-text-muted">devices</span>
                                                <div>
                                                    <p className="text-sm font-bold text-text-main dark:text-text-light flex items-center gap-2">
                                                        {s.device}
                                                        {s.current && <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">ACTUAL</span>}
                                                    </p>
                                                    <p className="text-[10px] text-text-muted">{s.loc} • {s.time}</p>
                                                </div>
                                            </div>
                                            {!s.current && (
                                                <button className="text-xs text-red-500 font-bold hover:underline">Cerrar</button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Danger zone */}
                            <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-900/30 p-6">
                                <h2 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">Zona de peligro</h2>
                                <p className="text-sm text-red-500/80 mb-4">Una vez eliminada, toda tu información será borrada permanentemente.</p>
                                <button className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-xs transition-all">
                                    Eliminar mi cuenta
                                </button>
                            </div>
                        </>
                    )}

                    {/* ═══ PAGOS ═══ */}
                    {activeTab === 'pagos' && (
                        <>
                            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-text-main dark:text-text-light">Tarjetas guardadas</h2>
                                    <button
                                        onClick={() => setShowAddCard(!showAddCard)}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-bold text-xs rounded-xl hover:bg-primary/20 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-sm">add</span>
                                        Agregar tarjeta
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {SAVED_CARDS.map((card) => (
                                        <div key={card.id} className={`relative p-5 rounded-2xl bg-gradient-to-br ${card.color} text-white overflow-hidden group`}>
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                                            <div className="relative z-10">
                                                <div className="flex items-center justify-between mb-6">
                                                    <span className="material-symbols-outlined text-2xl opacity-80">{card.icon}</span>
                                                    <span className="text-xs font-bold opacity-80">{card.brand}</span>
                                                </div>
                                                <p className="text-lg font-bold tracking-[0.2em] mb-4">•••• •••• •••• {card.last4}</p>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-[9px] opacity-60 uppercase">Vence</p>
                                                        <p className="text-sm font-bold">{card.exp}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button className="size-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                                                            <span className="material-symbols-outlined text-sm">edit</span>
                                                        </button>
                                                        <button className="size-8 rounded-lg bg-white/10 hover:bg-red-500/50 flex items-center justify-center transition-colors">
                                                            <span className="material-symbols-outlined text-sm">delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Add card form */}
                                {showAddCard && (
                                    <div className="mt-6 pt-6 border-t border-border-light dark:border-border-dark">
                                        <h3 className="text-sm font-bold text-text-main dark:text-text-light mb-4">Nueva tarjeta</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Número de tarjeta</label>
                                                <input
                                                    type="text"
                                                    value={newCard.number}
                                                    onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength={19}
                                                    className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-text-main dark:text-text-light text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Nombre en la tarjeta</label>
                                                <input
                                                    type="text"
                                                    value={newCard.name}
                                                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                                                    placeholder="Eduardo García"
                                                    className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-text-main dark:text-text-light text-sm"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Vencimiento</label>
                                                    <input
                                                        type="text"
                                                        value={newCard.exp}
                                                        onChange={(e) => setNewCard({ ...newCard, exp: e.target.value })}
                                                        placeholder="MM/AA"
                                                        maxLength={5}
                                                        className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-text-main dark:text-text-light text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">CVV</label>
                                                    <input
                                                        type="password"
                                                        value={newCard.cvv}
                                                        onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                                                        placeholder="•••"
                                                        maxLength={4}
                                                        className="w-full h-12 px-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-text-main dark:text-text-light text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-3 mt-4">
                                            <button onClick={() => setShowAddCard(false)} className="px-5 py-2.5 text-text-muted font-bold text-xs rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">Cancelar</button>
                                            <button className="px-5 py-2.5 bg-primary hover:bg-green-400 text-background-dark font-bold text-xs rounded-xl transition-all active:scale-95">Agregar tarjeta</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* ═══ NOTIFICACIONES ═══ */}
                    {activeTab === 'notificaciones' && (
                        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-text-main dark:text-text-light mb-6">Preferencias de Notificaciones</h2>
                            <div className="space-y-4">
                                {[
                                    { label: 'Actualizaciones de proyectos', desc: 'Recibe noticias sobre los proyectos que apoyaste', default: true },
                                    { label: 'Nuevos proyectos', desc: 'Sé el primero en enterarte de nuevas iniciativas', default: true },
                                    { label: 'Recompensas y tienda', desc: 'Ofertas especiales y nuevos artículos disponibles', default: false },
                                    { label: 'Estadísticas semanales', desc: 'Resumen semanal de tu impacto', default: true },
                                    { label: 'Correo promocional', desc: 'Boletín mensual con historias de impacto', default: false },
                                ].map((notif) => (
                                    <label key={notif.label} className="flex items-center justify-between p-4 rounded-xl bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark cursor-pointer hover:border-primary/30 transition-colors group">
                                        <div>
                                            <p className="text-sm font-bold text-text-main dark:text-text-light group-hover:text-primary transition-colors">{notif.label}</p>
                                            <p className="text-[10px] text-text-muted mt-0.5">{notif.desc}</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            defaultChecked={notif.default}
                                            className="size-5 rounded-md border-2 border-border-light dark:border-border-dark text-primary focus:ring-primary cursor-pointer"
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
