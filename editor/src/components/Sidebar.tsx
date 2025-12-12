import { EmitterPanel } from "./panels/EmitterPanel";

interface SidebarProps {
    maxParticles: number;
    setMaxParticles: (value: number) => void;
    spawnRate: number;
    setSpawnRate: (value: number) => void;
    lifetime: number;
    setLifetime: (value: number) => void;
    isPaused: boolean;
    setIsPaused: (value: boolean) => void;
}

export default function Sidebar({
    maxParticles,
    setMaxParticles,
    spawnRate,
    setSpawnRate,
    lifetime,
    setLifetime,
    isPaused,
    setIsPaused,
}: SidebarProps) {
    return (
        <aside className="sidebar">
            <h2>Controls</h2>

            <EmitterPanel />

            <details open>
                <summary>Actions</summary>

                <div className="control-group">
                    <button onClick={() => setIsPaused(!isPaused)}>
                        {isPaused ? "Resume" : "Pause"}
                    </button>
                </div>
            </details>
        </aside>
    );
}
