// Interactivity logic for Impact Hub 2026
document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const themeToggle = document.getElementById('theme-toggle');
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileNav = document.getElementById('mobile-nav');

    // Theme logic
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Mobile Menu logic
    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileNav.classList.toggle('mobile-active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileNav.classList.remove('mobile-active');
            }
        });

        // Close menu on resize if moving to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                mobileNav.classList.remove('mobile-active');
            }
        });
    }

    // Initialize
    initTheme();
    console.log('Impact Hub 2026 Ready');
});
