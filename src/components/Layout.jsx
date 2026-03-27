import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

// Plantilla base para las páginas.
// Muestra el menú de navegación arriba (Header), el pie de página abajo (Footer),
// y en el centro (<Outlet />) muestra el contenido de la página en la que estás.
export default function Layout() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
