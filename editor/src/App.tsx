import "@picocss/pico/css/pico.pink.min.css";
import { extend } from "@pixi/react";
import { Emitter, EmitterConfig } from "pixi-particle-system";
import { ParticleContainer } from "pixi.js";
import { useEffect, useState } from "react";
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

    alphaBehavior: {
        listData: {
            list: [
                { value: 0.0, time: 0.0 },
                { value: 0.0, time: 0.2 },
                { value: 0.5, time: 0.5 },
                { value: 0.0, time: 0.8 },
                { value: 0.0, time: 1.0 },
            ],
        },
        mode: "list",
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
                { value: -450, time: 1 },
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
        listData: {
            list: [
                { value: 0, time: 0 },
                { value: 100, time: 0.5 },
                { value: 0, time: 1 },
            ],
        },
    },

    spawnBehavior: {
        shape: "rectangle",
        width: 300,
        height: 300,
        direction: { x: 0, y: 1 },
    },
};

extend({
    ParticleContainer,
});

export default function App() {
    const [container, setContainer] = useState<ParticleContainer | null>(null);
    const [emitter, setEmitter] = useState<Emitter | null>(null);

    useEffect(() => {
        console.log("App mounted");

        const container = new ParticleContainer();
        setContainer(container);

        const emitter = new Emitter(container, config);
        emitter.play();
        setEmitter(emitter);

        return () => {
            console.log("App unmounted");
            container.destroy();
        };
    }, []);

    return (
        <div className="editor">
            <Header />
            <div className="main">
                <Sidebar />

                {container && emitter && (
                    <PixiCanvas
                        particleContainer={container}
                        emitter={emitter}
                    />
                )}
            </div>
        </div>
    );
}
