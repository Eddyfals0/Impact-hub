import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

export default function JuegoPage() {
    const canvasRef = useRef(null)
    const [score, setScore] = useState(0)
    const [altitude, setAltitude] = useState(0)
    const [gameState, setGameState] = useState('idle') // idle | playing | over

    const gameLoop = useRef(null)
    const balloonY = useRef(300)
    const balloonVelocity = useRef(0)
    const obstacles = useRef([])
    const frameCount = useRef(0)
    const altRef = useRef(0)

    const startGame = useCallback(() => {
        setScore(0)
        setAltitude(0)
        setGameState('playing')
        balloonY.current = 300
        balloonVelocity.current = 0
        obstacles.current = []
        frameCount.current = 0
        altRef.current = 0
    }, [])

    const handleClick = useCallback(() => {
        if (gameState === 'playing') {
            balloonVelocity.current = -6
        }
    }, [gameState])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        canvas.width = 500
        canvas.height = 600

        const drawBalloon = (y) => {
            ctx.save()
            ctx.fillStyle = '#00d26a'
            ctx.beginPath()
            ctx.ellipse(250, y, 25, 32, 0, 0, Math.PI * 2)
            ctx.fill()
            ctx.strokeStyle = '#fff'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(250, y + 32)
            ctx.lineTo(248, y + 50)
            ctx.lineTo(252, y + 50)
            ctx.closePath()
            ctx.stroke()
            ctx.restore()
        }

        const tick = () => {
            if (gameState !== 'playing') return

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Sky gradient
            const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
            grad.addColorStop(0, '#87CEEB')
            grad.addColorStop(1, '#E0F7FA')
            ctx.fillStyle = grad
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Clouds
            frameCount.current++
            altRef.current += 0.5
            setAltitude(Math.floor(altRef.current))

            const cloudOffset = (frameCount.current * 0.3) % 600
            ctx.fillStyle = 'rgba(255,255,255,0.6)'
            ctx.beginPath(); ctx.arc(100 - cloudOffset / 3, 80, 30, 0, Math.PI * 2); ctx.fill()
            ctx.beginPath(); ctx.arc(350 + cloudOffset / 4, 150, 25, 0, Math.PI * 2); ctx.fill()

            // Balloon physics
            balloonVelocity.current += 0.2
            balloonY.current += balloonVelocity.current

            if (balloonY.current < 10) balloonY.current = 10
            if (balloonY.current > canvas.height - 10) {
                setGameState('over')
                return
            }

            // Obstacles
            if (frameCount.current % 100 === 0) {
                const gapY = 150 + Math.random() * 300
                obstacles.current.push({ x: 520, gapY, width: 40, gapH: 140 })
            }

            obstacles.current.forEach((obs) => {
                obs.x -= 2
                ctx.fillStyle = 'rgba(0,0,0,0.15)'
                // Top pipe
                ctx.fillRect(obs.x, 0, obs.width, obs.gapY - obs.gapH / 2)
                // Bottom pipe
                ctx.fillRect(obs.x, obs.gapY + obs.gapH / 2, obs.width, canvas.height)

                // Collision check
                if (250 > obs.x && 250 < obs.x + obs.width) {
                    if (balloonY.current < obs.gapY - obs.gapH / 2 + 25 || balloonY.current > obs.gapY + obs.gapH / 2 - 25) {
                        setGameState('over')
                    }
                }

                if (obs.x + obs.width < 245 && !obs.scored) {
                    obs.scored = true
                    setScore((s) => s + 1)
                }
            })

            obstacles.current = obstacles.current.filter((o) => o.x > -50)

            drawBalloon(balloonY.current)

            gameLoop.current = requestAnimationFrame(tick)
        }

        if (gameState === 'playing') {
            gameLoop.current = requestAnimationFrame(tick)
        }

        return () => {
            if (gameLoop.current) cancelAnimationFrame(gameLoop.current)
        }
    }, [gameState])

    return (
        <div className="flex flex-col items-center">
            {/* Hero */}
            <section className="w-full max-w-[1280px] px-4 md:px-10 py-12 md:py-20">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-primary text-sm font-bold uppercase tracking-wider">
                            <span className="material-symbols-outlined text-sm">stadia_controller</span>
                            Minijuego Interactivo
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-text-main dark:text-text-light leading-tight">
                            Juego del <span className="text-primary">Globo</span> Solidario
                        </h1>
                        <p className="text-lg text-text-muted dark:text-gray-400 leading-relaxed max-w-xl">
                            ¡Lanza tu globo lo más alto posible! Cada metro que alcances desbloquea fondos corporativos reales para combatir la pobreza. Compite en la clasificación mundial y gana puntos de impacto canjeables en la tienda.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                id="start-game-btn"
                                onClick={startGame}
                                className="flex items-center justify-center gap-2 rounded-xl h-14 px-8 bg-primary hover:bg-green-400 text-[#111813] font-bold text-lg transition-all active:scale-95 shadow-lg shadow-primary/20"
                            >
                                <span className="material-symbols-outlined">play_arrow</span>
                                <span>{gameState === 'over' ? 'Reintentar' : 'Jugar Ahora'}</span>
                            </button>
                            <Link to="/ranking">
                                <button className="flex items-center justify-center gap-2 rounded-xl h-14 px-8 bg-transparent border-2 border-border-light dark:border-border-dark text-text-main dark:text-text-light font-bold text-lg hover:border-primary transition-all">
                                    <span className="material-symbols-outlined">leaderboard</span>
                                    <span>Ver Ranking</span>
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Game Canvas */}
                    <div className="flex-1 w-full max-w-[550px]">
                        <div className="relative w-full bg-gradient-to-b from-blue-100 to-blue-200 dark:from-slate-800 dark:to-slate-900 rounded-3xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl">
                            <canvas
                                ref={canvasRef}
                                onClick={handleClick}
                                className="w-full h-auto cursor-pointer block"
                                style={{ aspectRatio: '500/600' }}
                            />
                            {/* Overlay for idle or over state */}
                            {gameState !== 'playing' && (
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
                                    {gameState === 'over' ? (
                                        <>
                                            <p className="text-white text-sm uppercase font-bold tracking-wider">Fin del juego</p>
                                            <p className="text-5xl font-black text-primary">{score} pts</p>
                                            <p className="text-white/80 text-sm">Altitud: {altitude}m</p>
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-6xl text-primary animate-bounce">flight</span>
                                            <p className="text-white text-lg font-bold">Haz clic en "Jugar" para comenzar</p>
                                        </>
                                    )}
                                </div>
                            )}
                            {/* Score HUD */}
                            {gameState === 'playing' && (
                                <div className="absolute top-4 left-4 right-4 flex justify-between">
                                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg">
                                        <p className="text-[10px] uppercase font-bold text-text-muted">Puntos</p>
                                        <p className="text-lg font-black text-text-main dark:text-text-light">{score}</p>
                                    </div>
                                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg">
                                        <p className="text-[10px] uppercase font-bold text-text-muted">Altitud</p>
                                        <p className="text-lg font-black text-text-main dark:text-text-light">{altitude}m</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Game Stats */}
            <section className="w-full max-w-[1280px] px-4 md:px-10 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: 'emoji_events', label: 'Tu Mejor Puntuación', value: `${score} pts`, color: 'text-yellow-500', bg: 'bg-yellow-400/10' },
                        { icon: 'public', label: 'Fondos Desbloqueados', value: `$${(score * 2.5).toFixed(0)}`, color: 'text-primary', bg: 'bg-primary/10' },
                        { icon: 'leaderboard', label: 'Posición Global', value: '#4,231', color: 'text-blue-500', bg: 'bg-blue-400/10' },
                    ].map((stat) => (
                        <div key={stat.label} className="flex items-center gap-4 p-6 bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm">
                            <div className={`size-14 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                                <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
                            </div>
                            <div>
                                <p className="text-[10px] text-text-muted font-black uppercase tracking-wider">{stat.label}</p>
                                <p className="text-2xl font-black text-text-main dark:text-text-light">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
