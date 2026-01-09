import { EmitterConfig } from "pixi-particle-system";
import { Assets, Texture } from "pixi.js";

const snowConfig: EmitterConfig = {
    emitterVersion: "0.0.0",

    maxParticles: 500,
    spawnInterval: 0.01,

    minParticleLifetime: 2,
    maxParticleLifetime: 4,

    alphaBehavior: {
        mode: "list",
        listData: {
            list: [
                { time: 0.0, value: 0 },
                { time: 0.2, value: 1 },
                { time: 0.8, value: 1 },
                { time: 1.0, value: 0 },
            ],
        },
    },

    colorBehavior: {
        mode: "static",
        value: "#ffffff",
    },

    movementBehavior: {
        space: "local",
        minMoveSpeed: { x: -50, y: 150 },
        maxMoveSpeed: { x: 50, y: 200 },
    },

    scaleBehavior: {
        mode: "random",
        xListData: {
            list: [
                { time: 0, value: 0.05 },
                { time: 0.5, value: 0.1 },
                { time: 1, value: 0.2 },
            ],
        },
    },

    rotationBehavior: {
        mode: "acceleration",
        startRotation: 0,
        acceleration: 1,
    },

    spawnBehavior: {
        origin: { x: 0, y: -500 },
        shape: "line",
        length: 1000,
    },
};

/**
 * Loads the snowflake texture, and returns config with texture behavior.
 * @returns Emitter config.
 */
export async function getSnowConfig(): Promise<EmitterConfig> {
    const config: EmitterConfig = { ...snowConfig };

    const snowflakeTexture = await Assets.load<Texture>("snowflake");
    window.particleEmitter.parent.texture = snowflakeTexture;

    config.textureBehavior = {
        mode: "static",
        textureConfigs: [
            {
                textures: [snowflakeTexture],
            },
        ],
    };

    return config;
}
