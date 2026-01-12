import { EmitterConfig } from "pixi-particle-system";
import { Assets, Texture } from "pixi.js";

const flameConfig: EmitterConfig = {
    emitterVersion: "0.0.0",

    minParticleLifetime: 2,
    maxParticleLifetime: 3,

    addAtBack: true,

    alphaBehavior: {
        mode: "list",
        listData: {
            list: [
                { time: 0.0, value: 0 },
                { time: 0.3, value: 1 },
                { time: 0.5, value: 1 },
                { time: 1.0, value: 0 },
            ],
        },
    },

    colorBehavior: {
        mode: "list",
        listData: {
            list: [
                { time: 0.0, value: "#ffaa00" },
                { time: 0.5, value: "#ff0000" },
                { time: 0.8, value: "#888888" },
            ],
        },
    },

    movementBehavior: {
        minMoveSpeed: { x: -20, y: -100 },
        maxMoveSpeed: { x: 20, y: -200 },
    },

    scaleBehavior: {
        mode: "list",
        xListData: {
            list: [
                { time: 0.0, value: 0.5 },
                { time: 0.5, value: 0.8 },
            ],
            ease: "sine.in",
        },
    },

    spawnBehavior: {
        shape: "point",
        origin: { x: 0, y: 200 },
    },

    rotationBehavior: {
        mode: "acceleration",
        startRotation: 0,
        acceleration: 0.5,
    },
};

/**
 * Gets the flame emitter configuration.
 * @returns Promise that resolves to the flame emitter configuration.
 */
export async function getFlameConfig(): Promise<EmitterConfig> {
    const config = { ...flameConfig };

    const texture = await Assets.load<Texture>("smoke");
    window.particleContainer.texture = texture;
    window.particleContainer.blendMode = "screen";

    config.textureBehavior = {
        mode: "static",
        textureConfigs: [
            {
                textures: [texture],
            },
        ],
    };

    return config;
}
