// Tailwind Configuration
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#00d26a",
                "primary-dark": "#00a855",
                "secondary": "#1e293b",
                "background-light": "#f8fafc",
                "background-dark": "#0f172a",
                "text-main": "#1e293b",
                "text-muted": "#64748b",
                "text-light": "#f1f5f9",
                "surface-light": "#ffffff",
                "surface-dark": "#1e293b",
                "border-light": "#f1f5f9",
                "border-dark": "#334155",
                "rarity-common": "#94a3b8",
                "rarity-rare": "#3b82f6",
                "rarity-epic": "#a855f7",
                "rarity-legendary": "#eab308",
                "brand-lol": "#0ac8b9",
                "brand-fortnite": "#9d4dbb",
                "brand-roblox": "#de3537",
                "brand-minecraft": "#558b2f",
            },
            fontFamily: {
                "display": ["Exo 2", "Manrope", "sans-serif"],
                "body": ["Manrope", "Noto Sans", "sans-serif"],
            },
            boxShadow: {
                "soft": "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
                "hover": "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
                "glow": "0 0 15px rgba(0, 210, 106, 0.3)",
            }
        },
    },
};
