import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="flex flex-col gap-6 border-t border-solid border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 md:px-10 py-10 transition-colors">
            <div className="flex flex-col md:flex-row justify-between gap-10">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-background-dark">
                            <span className="material-symbols-outlined font-bold">volunteer_activism</span>
                        </div>
                        <h2 className="text-text-main dark:text-text-light text-xl font-bold">Impact Hub</h2>
                    </div>
                    <p className="text-text-muted dark:text-gray-400 max-w-sm">
                        La plataforma líder en micro-inversiones sociales para el cumplimiento de los ODS.
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-10">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-text-main dark:text-text-light font-bold">Plataforma</h3>
                        <Link to="/proyectos" className="text-text-muted dark:text-gray-400 text-sm hover:text-primary transition-colors">Proyectos</Link>
                        <Link to="/tienda" className="text-text-muted dark:text-gray-400 text-sm hover:text-primary transition-colors">Tienda</Link>
                        <Link to="/ranking" className="text-text-muted dark:text-gray-400 text-sm hover:text-primary transition-colors">Impacto</Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-text-main dark:text-text-light font-bold">Compañía</h3>
                        <Link to="/nosotros" className="text-text-muted dark:text-gray-400 text-sm hover:text-primary transition-colors">Sobre nosotros</Link>
                        <a href="#" className="text-text-muted dark:text-gray-400 text-sm hover:text-primary transition-colors">Contáctanos</a>
                        <a href="#" className="text-text-muted dark:text-gray-400 text-sm hover:text-primary transition-colors">Ventas</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-text-main dark:text-text-light font-bold">Legal</h3>
                        <a href="#" className="text-text-muted dark:text-gray-400 text-sm hover:text-primary transition-colors">Privacidad</a>
                        <a href="#" className="text-text-muted dark:text-gray-400 text-sm hover:text-primary transition-colors">Términos</a>
                    </div>
                </div>
            </div>
            <div className="border-t border-border-light dark:border-border-dark pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-text-muted dark:text-gray-400 text-xs">© 2026 Impact Hub. Todos los derechos reservados.</p>
                <div className="flex gap-4">
                    <span className="material-symbols-outlined text-text-muted dark:text-gray-400 cursor-pointer hover:text-primary">public</span>
                    <span className="material-symbols-outlined text-text-muted dark:text-gray-400 cursor-pointer hover:text-primary">mail</span>
                </div>
            </div>
        </footer>
    )
}
