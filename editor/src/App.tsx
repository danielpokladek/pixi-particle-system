import "@picocss/pico/css/pico.pink.min.css";
import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

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

    useEffect(() => {
        if (!canvasContainerRef.current) return;

        const app = window.application;
        const emitter = window.particleEmitter;

        app.resizeTo = canvasContainerRef.current as HTMLElement;
        canvasContainerRef.current.appendChild(window.application.canvas);

        /**
         * Repositions the particle container accordingly.
         */
        const handleResize = (): void => {
            particleContainer.position.set(
                app.renderer.width / 2,
                app.renderer.height / 2,
            );
        };

        /**
         * Updates the FPS value on the window object.
         */
        const updateFPS = (): void => {
            window.fps = app.ticker.FPS;
        };

        /**
         * Handles the window gaining focus.
         */
        const handleFocused = (): void => {
            emitter.resume();
        };

        /**
         * Handles the window losing focus.
         */
        const handleBlurred = (): void => {
            emitter.pause();
        };

        app.stage.addChild(particleContainer);
        particleContainer.position.set(
            app.renderer.width / 2,
            app.renderer.height / 2,
        );

        app.ticker.add(updateFPS);
        app.renderer.on("resize", handleResize);

        window.particleEmitter.play();

        window.__PIXI_APP__ = app;

        window.addEventListener("focus", handleFocused);
        window.addEventListener("blur", handleBlurred);

        return (): void => {
            app.ticker.remove(updateFPS);
            app.stage.removeChild(particleContainer);
            app.renderer.off("resize", handleResize);

            window.removeEventListener("focus", handleFocused);
            window.removeEventListener("blur", handleBlurred);

            window.fps = 0;
        };
    }, [particleContainer]);

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
                        />
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
