import { useState } from "react";
import Header from "./components/Header";
import PixiCanvas from "./components/PixiCanvas";
import Sidebar from "./components/Sidebar";

export default function App() {
    const [maxParticles, setMaxParticles] = useState(1000);
    const [spawnRate, setSpawnRate] = useState(0.01);
    const [lifetime, setLifetime] = useState(2);
    const [isPaused, setIsPaused] = useState(false);
    const [fps, setFps] = useState(0);
    const [particleCount, setParticleCount] = useState(0);

    return (
        <div className="editor">
            <Header
                fps={fps}
                particleCount={particleCount}
                maxParticles={maxParticles}
            />

            <div className="main">
                <Sidebar
                    maxParticles={maxParticles}
                    setMaxParticles={setMaxParticles}
                    spawnRate={spawnRate}
                    setSpawnRate={setSpawnRate}
                    lifetime={lifetime}
                    setLifetime={setLifetime}
                    isPaused={isPaused}
                    setIsPaused={setIsPaused}
                />

                <PixiCanvas />
            </div>
        </div>
    );
}
