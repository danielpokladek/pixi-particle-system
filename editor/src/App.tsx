import "@picocss/pico/css/pico.pink.min.css";
import { Application, extend } from "@pixi/react";
import { Emitter } from "pixi-particle-system";
import { ParticleContainer } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import PixiStage from "./components/PixiStage";
import Sidebar from "./components/Sidebar";

/**
 * Props for the main App component.
 */
type Props = {
    particleContainer: ParticleContainer;
    emitter: Emitter;
};

extend({
    ParticleContainer,
});

/**
 * Main application component.
 * @param props Component props.
 * @param props.emitter Emitter instance.
 * @param props.particleContainer Particle container instance.
 * @returns JSX.Element
 */
export default function App({
    emitter,
    particleContainer,
}: Props): JSX.Element {
    const canvasContainerRef = useRef<HTMLDivElement | null>(null);

    const [particleCount, setParticleCount] = useState(0);
    const [maxParticleCount, setMaxParticleCount] = useState(0);

    useEffect(() => {
        window.particleEmitter = emitter;

        const updateIntervalId = setInterval(() => {
            setParticleCount(emitter.particleCount);
            setMaxParticleCount(emitter.maxParticles);
        }, 100);

        return (): void => {
            emitter.stop(true);
            clearInterval(updateIntervalId);
        };
    }, [emitter, particleContainer]);

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

            {emitter && particleContainer && (
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
                                    emitter={emitter}
                                />
                            </Application>
                        </div>
                    </div>
                </div>
            )}

            {emitter && (
                <div className="stats">
                    <span>FPS: {Math.round(window.fps)}</span>
                    <span>
                        Particles: {particleCount} / {maxParticleCount}
                    </span>
                    <span>Version: 0.0.0</span>
                </div>
            )}
        </>
    );
}
