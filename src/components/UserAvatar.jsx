const getInitials = (name = '', email = '') => {
    const source = name.trim() || email.trim()
    if (!source) return 'IH'

    const parts = source
        .replace(/@.*/, '')
        .split(/\s+|[._-]+/)
        .filter(Boolean)

    return parts
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
}

export default function UserAvatar({ user, size = 'md', className = '', title }) {
    const sizes = {
        sm: 'size-9 text-xs',
        md: 'size-10 text-sm',
        lg: 'size-11 text-sm',
        xl: 'w-28 h-28 text-3xl',
    }

    return (
        <div
            className={`${sizes[size] || sizes.md} rounded-full bg-primary/15 text-primary border-2 border-primary/40 shadow-sm flex items-center justify-center font-black select-none ${className}`}
            title={title || `Perfil de ${user?.name || user?.email || 'usuario'}`}
        >
            {getInitials(user?.name, user?.email)}
        </div>
    )
}
