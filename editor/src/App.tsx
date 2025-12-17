import "@picocss/pico/css/pico.pink.min.css";
import { Application, extend } from "@pixi/react";
import { Emitter, EmitterConfig } from "pixi-particle-system";
import { ParticleContainer } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import PixiCanvas from "./components/PixiCanvas";
import Sidebar from "./components/Sidebar";

const config: EmitterConfig = {
    emitterVersion: 0,
    minParticleLifetime: 2,
    maxParticleLifetime: 2,
    spawnInterval: 0.01,
    spawnChance: 1,
    maxParticles: 1000,
    addAtBack: true,
    particlesPerWave: 1,

    // alphaBehavior: {
    //     listData: {
    //         list: [
    //             { value: 1.0, time: 0.0 },
    //             // { value: 0.0, time: 0.2 },
    //             { value: 1.0, time: 0.5 },
    //             // { value: 0.0, time: 0.8 },
    //             { value: 1.0, time: 1.0 },
    //         ],
    //     },
    //     mode: "list",
    // },

    colorBehavior: {
        listData: {
            list: [
                { value: "#ff0000", time: 0 },
                { value: "#00ff00", time: 0.5 },
                { value: "#0000ff", time: 1 },
            ],
        },
        mode: "random",
    },

    movementBehavior: {
        xListData: {
            list: [
                { value: 0, time: 0 },
                { value: 0, time: 1 },
            ],
        },
        yListData: {
            list: [
                { value: -50, time: 0 },
                { value: -50, time: 1 },
            ],
        },
        space: "local",
        mode: "acceleration",
    },

    // rotationBehavior: {
    //     mode: "static",
    //     value: Math.PI / 4,
    // },

    scaleBehavior: {
        mode: "random",
        xListData: {
            list: [
                { value: 0, time: 0 },
                { value: 100, time: 0.5 },
                { value: 0, time: 1 },
            ],
        },
        yListData: {
            list: [
                { value: 0, time: 0 },
                { value: 10, time: 0.2 },
                { value: 10, time: 0.8 },
                { value: 0, time: 1 },
            ],
        },
    },

    spawnBehavior: {
        shape: "point",
        // width: 300,
        // height: 300,
        direction: { x: 0, y: 1 },
    },
};

extend({
    ParticleContainer,
});

export default function App() {
    const canvasContainerRef = useRef<HTMLDivElement | null>(null);
    const [container, setContainer] = useState<ParticleContainer | null>(null);
    const [emitter, setEmitter] = useState<Emitter | null>(null);

    const [particleCount, setParticleCount] = useState(0);
    const [maxParticleCount, setMaxParticleCount] = useState(0);

    useEffect(() => {
        console.log("App mounted");

        const container = new ParticleContainer();
        setContainer(container);

        const emitter = new Emitter(container, config);
        emitter.play();
        setEmitter(emitter);

        window.emitter = emitter;

        const updateIntervalId = setInterval(() => {
            setParticleCount(emitter.particleCount);
            setMaxParticleCount(emitter.maxParticles);
        }, 100);

        return () => {
            console.log("App unmounted");

            emitter.stop(true);
            window.emitter = null;

            container.destroy();
            clearInterval(updateIntervalId);
        };
    }, []);

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

            {emitter && container && (
                <div className="editor">
                    <div className="main">
                        <Sidebar emitter={emitter} />

                        <div
                            ref={canvasContainerRef}
                            className="canvas-container"
                        >
                            <Application resizeTo={canvasContainerRef}>
                                <PixiCanvas
                                    particleContainer={container}
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
