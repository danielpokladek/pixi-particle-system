import { Emitter, EmitterConfig } from "pixi-particle-system";
import { Application, Assets, ParticleContainer, Texture } from "pixi.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { EditorError } from "./error/EditorError";
import "./style.css";

/**
 * Default emitter configuration.
 */
const defaultConfig: EmitterConfig = {
    emitterVersion: "dev",
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
                { value: 1.0, time: 0.2 },
                { value: 0.0, time: 1.0 },
            ],
        },
        mode: "list",
    },

    colorBehavior: {
        mode: "random",
        listData: {
            list: [
                { value: "#AEEBFF", time: 0 },
                { value: "#4FA3E3", time: 0.5 },
                { value: "#1B2A4A", time: 1 },
            ],
        },
    },

    movementBehavior: {
        minMoveSpeed: { x: -50, y: -100 },
        maxMoveSpeed: { x: 50, y: -100 },
        mode: "linear",
    },

    scaleBehavior: {
        mode: "list",
        xListData: {
            list: [
                { value: 0.5, time: 0.0 },
                { value: 3.0, time: 0.5 },
                { value: 0.5, time: 1.0 },
            ],
        },
    },

    spawnBehavior: {
        shape: "circle",
        outerRadius: 100,
        innerRadius: 50,
        direction: { x: 0, y: 1 },
    },

    textureBehavior: {
        mode: "static",
        textureConfigs: [
            {
                textures: [Texture.WHITE],
            },
        ],
    },
};

/**
 * Bootstraps the application.
 */
async function bootstrap(): Promise<void> {
    const app = new Application();
    await app.init({
        antialias: true,
        resolution: 1,
        preference: "webgl",
    });

    const snowflake = "./snowflake.png";

    Assets.add({ alias: "snowflake", src: snowflake });

    const particleContainer = new ParticleContainer();
    app.stage.addChild(particleContainer);

    const particleEmitter = new Emitter(particleContainer, defaultConfig);

    window.application = app;
    window.__PIXI_APP__ = app;
    window.particleContainer = particleContainer;
    window.particleEmitter = particleEmitter;

    const root = document.getElementById("root");

    if (!root) {
        throw new EditorError("Root element not found!");
    }

    createRoot(root).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
}

bootstrap().catch((error) => {
    throw new EditorError(`Failed to bootstrap the application - ${error}`);
});
