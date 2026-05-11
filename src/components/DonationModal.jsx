import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function DonationModal({ project, onClose, onSuccess }) {
    const { user, isLoggedIn, apiFetch, refreshUser } = useAuth()
    const [amount, setAmount] = useState(100)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleDonate = async () => {
        setError('')
        setLoading(true)
        try {
            let res
            if (isLoggedIn) {
                if ((user?.points ?? 0) < amount) {
                    throw new Error(`No tienes suficientes puntos. Tienes ${user.points}, necesitas ${amount}`)
                }
                res = await apiFetch('/api/donations/authenticated', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ projectId: project.id, amount }),
                })
            } else {
                if (!name.trim() || !email.trim()) {
                    throw new Error('Nombre y email son requeridos')
                }
                res = await apiFetch('/api/donations/anonymous', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ projectId: project.id, amount, donorName: name.trim(), donorEmail: email.trim() }),
                })
            }
            const ct = res.headers.get('content-type') || ''
            if (!ct.includes('application/json')) {
                const txt = await res.text()
                throw new Error(txt.slice(0, 120) || `Error del servidor (${res.status})`)
            }
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Error al donar')
            if (isLoggedIn) await refreshUser()
            setSuccess(data.message)
            setTimeout(() => { onSuccess?.(); onClose() }, 2000)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    const presets = [50, 100, 250, 500, 1000]

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl border border-border-light dark:border-border-dark w-full max-w-md overflow-hidden animate-[fadeIn_0.2s_ease]" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="relative p-6 pb-4 bg-gradient-to-br from-primary/10 to-emerald-400/5">
                    <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-text-muted">close</span>
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">volunteer_activism</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-text-main dark:text-text-light">Donar a Proyecto</h3>
                            <p className="text-xs text-text-muted">{project.title}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {success ? (
                        <div className="text-center py-6">
                            <span className="material-symbols-outlined text-5xl text-primary mb-3 block animate-bounce">check_circle</span>
                            <p className="text-lg font-bold text-text-main dark:text-text-light">{success}</p>
                        </div>
                    ) : (
                        <>
                            {isLoggedIn && (
                                <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-bold">
                                    <span className="material-symbols-outlined text-base">stars</span>
                                    Tu saldo: {(user?.points ?? 0).toLocaleString()} puntos
                                </div>
                            )}

                            {!isLoggedIn && (
                                <>
                                    <div>
                                        <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">Nombre</label>
                                        <input value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main dark:text-text-light text-sm outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-1">Email</label>
                                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="tu@email.com" className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main dark:text-text-light text-sm outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2">Cantidad de Puntos</label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {presets.map(p => (
                                        <button key={p} onClick={() => setAmount(p)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${amount === p ? 'bg-primary text-background-dark shadow-md' : 'bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark text-text-main dark:text-text-light hover:border-primary'}`}>
                                            {p.toLocaleString()}
                                        </button>
                                    ))}
                                </div>
                                <input type="number" value={amount} onChange={e => setAmount(Math.max(1, parseInt(e.target.value) || 0))} min="1" className="w-full px-4 py-2.5 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main dark:text-text-light text-sm outline-none focus:ring-2 focus:ring-primary" />
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 bg-red-500/10 text-red-500 px-3 py-2 rounded-lg text-xs font-bold">
                                    <span className="material-symbols-outlined text-base">error</span>{error}
                                </div>
                            )}

                            <button onClick={handleDonate} disabled={loading || amount <= 0} className="w-full py-3 bg-primary hover:bg-green-400 text-background-dark font-black rounded-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                                {loading ? (
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">favorite</span>
                                        Donar {amount.toLocaleString()} Puntos
                                    </>
                                )}
                            </button>

                            {!isLoggedIn && (
                                <p className="text-[10px] text-text-muted text-center">
                                    ¿Ya tienes cuenta? <a href="/login" className="text-primary font-bold hover:underline">Inicia sesión</a> para donar con tus puntos
                                </p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
