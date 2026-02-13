import { Link } from 'react-router-dom'

export default function LoginPage() {
    return (
        <div className="flex-grow flex items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left image panel */}
                <div className="relative hidden lg:flex flex-col h-[450px] rounded-[1.5rem] overflow-hidden group shadow-2xl">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop')" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                    <div className="relative z-10 flex flex-col justify-between h-full p-6">
                        <div className="flex justify-between items-start">
                            <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold text-white shadow-lg">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                Objetivo ODS 1: Fin de la Pobreza
                            </div>
                        </div>
                        <div className="mt-auto">
                            <h2 className="text-3xl font-black text-white leading-tight mb-2 drop-shadow-md">
                                Tu contribución<br />
                                <span className="text-primary">cambia el mundo.</span>
                            </h2>
                            <p className="text-white/90 text-sm font-medium max-w-sm drop-shadow-sm">
                                Únete a la mayor red de micro-financiación para erradicar la pobreza global. Transparencia total, impacto real.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right form */}
                <div className="flex flex-col justify-center max-w-md mx-auto w-full py-2">
                    <div className="mb-4">
                        <h1 className="text-xl font-black text-text-main dark:text-white mb-1 leading-tight">Únete a la Misión</h1>
                        <p className="text-xs text-text-muted dark:text-gray-400">Inicia sesión para financiar proyectos del ODS 1.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <button className="flex items-center justify-center gap-2 bg-[#0077b5] hover:bg-[#006097] text-white h-11 rounded-full font-bold shadow-md transition-all transform hover:-translate-y-0.5 text-xs px-2">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
                            <span>LinkedIn</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-white h-11 rounded-full font-bold shadow-md transition-all transform hover:-translate-y-0.5 text-xs px-2">
                            <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            <span>Google</span>
                        </button>
                    </div>

                    <div className="flex items-center mb-4">
                        <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
                        <span className="flex-shrink mx-4 text-[10px] font-medium text-gray-400 uppercase tracking-wider">o con correo electrónico</span>
                        <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
                    </div>

                    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                        <label className="block relative group/input">
                            <span className="absolute left-4 top-3 text-gray-400 group-focus-within/input:text-primary transition-colors">
                                <span className="material-symbols-outlined text-xl">mail</span>
                            </span>
                            <input className="w-full bg-white dark:bg-gray-800 border-none ring-1 ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-primary rounded-full py-2 pl-12 pr-4 text-slate-900 dark:text-white placeholder-gray-400 transition-all shadow-sm h-11 text-sm" placeholder="Correo electrónico" type="email" />
                        </label>
                        <label className="block relative group/input">
                            <span className="absolute left-4 top-3 text-gray-400 group-focus-within/input:text-primary transition-colors">
                                <span className="material-symbols-outlined text-xl">lock</span>
                            </span>
                            <input className="w-full bg-white dark:bg-gray-800 border-none ring-1 ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-primary rounded-full py-2 pl-12 pr-12 text-slate-900 dark:text-white placeholder-gray-400 transition-all shadow-sm h-11 text-sm" placeholder="Contraseña" type="password" />
                        </label>
                        <div className="flex items-center justify-between text-[11px] px-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input className="h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-primary checked:bg-primary" type="checkbox" />
                                <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200">Recordarme</span>
                            </label>
                            <a className="text-primary hover:text-primary-dark font-medium hover:underline" href="#">¿Olvidaste tu contraseña?</a>
                        </div>
                        <button className="w-full bg-primary hover:bg-primary-dark text-slate-900 h-11 rounded-full font-bold text-base shadow-[0_4px_15px_rgba(19,236,91,0.2)] hover:shadow-[0_6px_20px_rgba(19,236,91,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2" type="submit">
                            <span>Acceder</span>
                            <span className="material-symbols-outlined text-sm">volunteer_activism</span>
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-[12px] text-gray-500 dark:text-gray-400">
                            ¿Nuevo? <a className="text-primary font-bold hover:underline" href="#">Crear cuenta</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
