import { EmitterConfig } from "pixi-particle-system";
import { Texture } from "pixi.js";

const rainConfig: EmitterConfig = {
    emitterVersion: "0.0.0",

    minParticleLifetime: 4,
    maxParticleLifetime: 6,
    spawnChance: 0.5,

    spawnInterval: 0.01,

    spawnBehavior: {
        shape: "line",
        length: 1500,
        direction: { x: 0.7, y: 1 },
        origin: { x: -300, y: -500 },
    },

    movementBehavior: {
        mode: "acceleration",
        space: "local",

        minMoveSpeed: { x: -50, y: 800 },
        maxMoveSpeed: { x: 50, y: 1000 },
    },

    scaleBehavior: {
        mode: "random",
        xListData: {
            list: [
                { time: 0, value: 50 },
                { time: 0.2, value: 80 },
                { time: 0.5, value: 20 },
                { time: 0.7, value: 100 },
                { time: 1, value: 30 },
            ],
        },
        yListData: {
            list: [
                { time: 0, value: 3 },
                { time: 1, value: 3 },
            ],
        },
    },

    alphaBehavior: {
        mode: "random",
        listData: {
            list: [
                { time: 0, value: 0.8 },
                { time: 0.2, value: 0.4 },
                { time: 0.5, value: 0.2 },
                { time: 0.8, value: 0.5 },
                { time: 1, value: 1 },
            ],
        },
    },

    rotationBehavior: {
        mode: "direction",
    },
};

/**
 * Loads the rain config.
 * @returns Emitter config.
 */
export async function getRainConfig(): Promise<EmitterConfig> {
    const config = { ...rainConfig };

    window.particleContainer.texture = Texture.WHITE;

    config.textureBehavior = {
        mode: "static",
        textureConfigs: [
            {
                textures: [Texture.WHITE],
            },
        ],
    };

    return config;
}
