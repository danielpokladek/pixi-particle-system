import "@picocss/pico/css/pico.pink.min.css";
import { Application, extend } from "@pixi/react";
import { ParticleContainer } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import PixiStage from "./components/PixiStage";
import Sidebar from "./components/Sidebar";

extend({
    ParticleContainer,
});

/**
 * Main application component.
 * @returns JSX.Element
 */
export default function App(): JSX.Element {
    const canvasContainerRef = useRef<HTMLDivElement | null>(null);

    const [particleCount, setParticleCount] = useState(0);
    const [maxParticleCount, setMaxParticleCount] = useState(0);

    const particleEmitter = window.particleEmitter;
    const particleContainer = window.particleContainer;

    useEffect(() => {
        const updateIntervalId = setInterval(() => {
            setParticleCount(particleEmitter.particleCount);
            setMaxParticleCount(particleEmitter.maxParticles);
        }, 100);

        return (): void => {
            particleEmitter.stop(true);
            clearInterval(updateIntervalId);
        };
    }, [particleEmitter]);

    return (
        <>
            {window.error && (
                <dialog open>
                    <article>
                        <header>
                            <p>
                                <strong>There has been an error!</strong>
                            </p>
                        </header>
                        <p>{window.error.message}</p>
                        <p>
                            We apologize for the inconvenience; please refresh
                            the page to resume the editor.
                        </p>
                    </article>
                </dialog>
            )}
            <Header />

            {particleEmitter && particleContainer && (
                <div className="editor">
                    <div className="main">
                        <Sidebar />

                        <div
                            ref={canvasContainerRef}
                            className="canvas-container"
                        >
                            <Application resizeTo={canvasContainerRef}>
                                <PixiStage
                                    particleContainer={particleContainer}
                                    emitter={particleEmitter}
                                />
                            </Application>
                        </div>
                    </div>
                </div>
            )}

            {particleEmitter && (
                <div className="stats">
                    <span>FPS: {Math.round(window.fps)}</span>
                    <span>
                        Particles: {particleCount} / {maxParticleCount}
                    </span>
                    <span>Version: {window.particleEmitter.version}</span>
                </div>
            )}
        </>
    );
}
