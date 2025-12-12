interface HeaderProps {
    fps: number;
    particleCount: number;
    maxParticles: number;
}

export default function Header({
    fps,
    particleCount,
    maxParticles,
}: HeaderProps) {
    return (
        <header className="header">
            <h1>Particle System Editor</h1>
            <div className="stats">
                <span>FPS: {Math.round(fps)}</span>
                <span>
                    Particles: {particleCount} / {maxParticles}
                </span>
            </div>
        </header>
    );
}
