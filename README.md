# Impact Hub 2026 - Plataforma Gamificada de Donaciones

Bienvenido a **Impact Hub 2026**, una red revolucionaria y gamificada de agentes de cambio. Nuestra misión es financiar soluciones sostenibles para el ODS 1 (Fin de la pobreza) combinando el impacto directo de las donaciones con la participación interactiva de los usuarios.

---

## 🎯 ¿Qué es Impact Hub?

Impact Hub ha evolucionado las donaciones benéficas para el nuevo milenio. No se trata solo de hacer clic en un botón para donar, sino de involucrarte en el proceso:

1.  **Dona a Proyectos Verificados:** Elige proyectos específicos (infraestructura, agricultura, educación) donde cada dólar va directamente a la causa.
2.  **Juega e Impacta:** Al donar, participas en minijuegos (como el *Juego de Donación del Globo*). Tu desempeño en el juego logra desbloquear fondos adicionales de nuestros socios corporativos.
3.  **Gana Recompensas:** Acumula *Puntos de Impacto* por tus donaciones y tu actividad. Puedes canjear estos puntos en nuestra tienda por recompensas virtuales (skins, emotes, avatares) o mercancía física sostenible (camisetas, tote bags).
4.  **Marca Profesional:** Conecta tu perfil y obtén insignias de impacto verificadas para lucir en tu cuenta de LinkedIn como "Contribuyente Top al ODS 1".

---

## 🚀 Cómo instalar y ejecutar el proyecto localmente

El proyecto está construido con las siguientes tecnologías clave:
*   [React](https://react.dev/) (v19)
*   [Vite](https://vitejs.dev/) (Empaquetador ultrarrápido)
*   [TailwindCSS](https://tailwindcss.com/) (Estilos utilitarios)
*   [React Router](https://reactrouter.com/) (Navegación entre páginas)

### Pasos para iniciar:

1.  **Clona el repositorio** (Si lo descargaste desde GitHub):
    ```bash
    git clone https://github.com/TU-USUARIO/impact-hub.git
    cd impact-hub
    ```
2.  **Instala las dependencias:**
    ```bash
    npm install
    ```
3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
4.  Abre tu navegador y entra a `http://localhost:5173/` (o la ruta que te indique la terminal) para ver la aplicación corriendo.

---

## 📂 Estructura del Código 

Todo el código fuente en el que trabajarás se encuentra dentro de la carpeta `src/`.

*   **`public/`:** Contiene imágenes estáticas independientes o el icono general de la web (favicon).
*   **`src/`:** Corazón de la aplicación en React.
    *   **`assets/`:** Imágenes y recursos visuales específicos usados por los componentes.
    *   **`components/`:** Bloques de construcción visuales reutilizables (ej: `Header.jsx`, `Layout.jsx`, `Footer.jsx`).
    *   **`pages/`:** Las "pantallas" principales del sitio web:
        *   `HomePage.jsx`: Pantalla de inicio de la plataforma.
        *   `ProyectosPage.jsx`: Lista de los proyectos de ODS a los cuales donar.
        *   `JuegoPage.jsx`: El minijuego del Globo.
        *   `RankingPage.jsx`: Tabla de clasificación (Leaderboard) de los mayores donantes.
        *   `TiendaPage.jsx`: Tienda para canjear Puntos de Impacto por recompensas.
        *   *Entre otras (Configuración, Ayuda, Usuario, Login).*
    *   **`context/`:** Control global de la información (ej: `ThemeContext.jsx` para el Modo Claro/Oscuro y `AuthContext.jsx` para la sesión de usuario).
    *   **`App.jsx` y `main.jsx`:** Archivos principales que controlan las rutas de navegación y renderizan toda la aplicación.
*   **`package.json`:** Muestra las dependencias, scripts de ejecución (dev, build) e identidad del proyecto.

---

# Documentación Completa del Proyecto Impact Hub 2026

Este documento detalla exhaustivamente cada archivo y directorio que compone el proyecto **Impact Hub 2026**, una plataforma gamificada de donaciones construida con React, Vite y TailwindCSS.

---

## 📁 Directorio Raíz (`/`)

*   **`.gitignore`**: Define qué archivos y carpetas deben ser ignorados por Git (por ejemplo, `node_modules/` o archivos `.env`), evitando que se suban al repositorio.
*   **`eslint.config.js`**: Archivo de configuración para ESLint, la herramienta que analiza el código en busca de errores de sintaxis o malas prácticas, garantizando un código estandarizado.
*   **`index.html`**: El archivo HTML principal que sirve como punto de entrada de la aplicación. Contiene el elemento `<div id="root"></div>` donde React inyecta toda la interfaz.
*   **`package.json`**: El "manifiesto" del proyecto. Contiene metadatos (nombre, versión), los scripts ejecutables (`npm run dev`, `npm run build`) y el listado de todas las dependencias (librerías) instaladas en el proyecto.
*   **`package-lock.json`**: Archivo autogenerado que bloquea las versiones exactas de las dependencias y sub-dependencias instaladas, asegurando que el proyecto funcione igual en cualquier computadora.
*   **`README.md`**: El archivo de presentación (que ya editaste) donde se documenta lo esencial del proyecto y guías para los desarrolladores de cómo empezar a contribuir.
*   **`vite.config.js`**: Archivo de configuración para Vite, el empaquetador (bundler) y servidor de desarrollo del proyecto. Define cómo se compila el código y qué plugins se usan (como el plugin de React y Tailwind).

---

## 📁 Directorio Público (`/public/`)

*   Esta carpeta contiene archivos que no pasan por el proceso de compilación de Vite. Cualquier archivo aquí (como el ícono de la pestaña del navegador o logos) se copia directamente a la carpeta final de producción.

---

## 📁 Directorio de Código Fuente (`/src/`)

### 📄 Archivos Principales
*   **`main.jsx`**: Es el punto de entrada de React. Se encarga de tomar el componente `<App />`, envolverlo con `<BrowserRouter>` (para el enrutamiento) y renderizarlo dentro del `index.html`.
*   **`App.jsx`**: El componente base que agrupa toda la aplicación. Aquí se configuran todas las rutas (`<Route>`) utilizando React Router, definiendo qué página mostrar dependiendo de la URL (ej: `/login` renderiza `LoginPage`). También envuelve la aplicación en los *Providers* globales (`AuthProvider` y `ThemeProvider`).
*   **`index.css`**: Hoja de estilos principal del proyecto. Aquí se importan las directivas y utilidades base de TailwindCSS (`@tailwind base; @tailwind components; @tailwind utilities;`).
*   **`App.css`**: Hoja de estilos secundaria, generalmente utilizada para estilos específicos de componentes que no se pudieron resolver fácilmente con clases utilitarias de Tailwind.

### 📁 Componentes Reutilizables (`/src/components/`)
*   **`Header.jsx`**: Componente de navegación superior. Muestra el logo de Impact Hub, los enlaces a diferentes páginas (Proyectos, Ranking, Tienda) y el acceso al perfil del usuario.
*   **`Footer.jsx`**: Componente de pie de página. Contiene enlaces útiles, información legal de la plataforma, redes sociales y contacto. Aparece al final de cada página.
*   **`Layout.jsx`**: Componente estructural que define la disposición general de la web. Típicamente envuelve el `Header`, el espacio dinámico para la página (`<Outlet />` de React Router) y el `Footer`, asegurando una vista consistente al cambiar de URL.
*   **`ScrollToTop.jsx`**: Un pequeño componente utilitario sin interfaz gráfica. Escucha los cambios de ruta y fuerza la ventana a desplazarse (scroll) hacia la parte superior (`y: 0`) cada vez que el usuario navega a una nueva página.

### 📁 Gestión de Estado Global (`/src/context/`)
*   **`AuthContext.jsx`**: Controla la sesión del usuario. Provee funciones para iniciar sesión (login), cerrar sesión (logout) y mantiene disponible globalmente el perfil del usuario activo en todas las páginas.
*   **`ThemeContext.jsx`**: Controla la apariencia visual de la plataforma (Modo Claro vs. Modo Oscuro). Guarda la preferencia del usuario y aplica las clases correspondientes a la raíz del documento.

### 📁 Páginas de la Aplicación (`/src/pages/`)
Estas son las vistas completas ("pantallas") que se muestran cuando un usuario navega por las distintas URLs:

*   **`HomePage.jsx`** (Mapeado a `/`): La página de aterrizaje (Landing Page). Explica la misión de Impact Hub, muestra estadísticas del ODS 1, proyectos en tendencia, líderes top y el valor de jugar para donar.
*   **`AyudaPage.jsx`** (Mapeado a `/ayuda`): Sección de Preguntas Frecuentes (FAQ), recursos de asistencia y vías de contacto para usuarios que necesiten soporte en la plataforma.
*   **`ConfiguracionPage.jsx`** (Mapeado a `/configuracion`): Página donde el usuario puede modificar las preferencias de su cuenta (datos personales, ajustes de notificaciones, temas, etc.).
*   **`JuegoPage.jsx`** (Mapeado a `/juego`): El minijuego interactivo "Juego del Globo". Permite a los donantes jugar, ganar Puntos de Impacto y desbloquear fondos corporativos adicionales mientras donan.
*   **`LoginPage.jsx`** (Mapeado a `/login`): Formulario donde los usuarios pueden iniciar sesión con su cuenta existente o registrarse (crear un nuevo usuario) en Impact Hub.
*   **`ProyectosPage.jsx`** (Mapeado a `/proyectos`): El catálogo interactivo de todos los proyectos de beneficencia enfocados al ODS 1 (filtrados por categorías) disponibles para recibir donaciones de los usuarios.
*   **`RankingPage.jsx`** (Mapeado a `/ranking`): La tabla de líderes o Leaderboard. Muestra a los principales agentes de cambio, ordenados por los Puntos de Impacto o donaciones generadas en la comunidad, fomentando la gamificación.
*   **`SobreNosotrosPage.jsx`** (Mapeado a `/nosotros`): Página corporativa que explica a profundidad quién está detrás de Impact Hub 2026, la visión corporativa y detalles del equipo.
*   **`TiendaPage.jsx`** (Mapeado a `/tienda`): La tienda de recompensas. Aquí los usuarios pueden gastar sus "Puntos de Impacto" para canjear atractivos regalos digitales (skins, insignias) o productos físicos patrocinados.
*   **`UserPage.jsx`** (Mapeado a `/usuario`): El perfil público o panel de control (Dashboard) del usuario activo. Muestra sus insignias, el progreso de sus donaciones, sus contribuciones al ODS 1 y su conexión a LinkedIn.

### 📁 Recursos Media (`/src/assets/`)
*   En esta carpeta se alojan temporal o permanentemente todas las imágenes, vectores, íconos o recursos visuales como el fondo principal (`pexels-hero.jpg`) que importa React en los componentes y páginas.
