import { EmitterConfig } from "pixi-particle-system";
import { Texture } from "pixi.js";

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
 * Default config used when app is started.
 * @returns Emitter config.
 */
export function getDefaultConfig(): EmitterConfig {
    return { ...defaultConfig };
}
