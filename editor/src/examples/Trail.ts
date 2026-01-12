import { EmitterConfig } from "pixi-particle-system";
import { Assets, Texture } from "pixi.js";

const trailConfig: EmitterConfig = {
    emitterVersion: "0.0.0",

    spawnInterval: 0.01,
    minParticleLifetime: 3,
    maxParticleLifetime: 5,

    scaleBehavior: {
        mode: "list",
        xListData: {
            list: [
                { time: 0, value: 0.3 },
                { time: 1, value: 0.8 },
            ],
        },
    },

    colorBehavior: {
        mode: "list",
        listData: {
            list: [
                { time: 0.0, value: "#ffffff" },
                { time: 0.5, value: "#00ffff" },
                { time: 1.0, value: "#ff00ff" },
            ],
        },
    },

    alphaBehavior: {
        mode: "list",
        listData: {
            list: [
                { time: 0.0, value: 1 },
                { time: 0.8, value: 1 },
                { time: 1.0, value: 0 },
            ],
        },
    },
};

/**
 * Gets the trail emitter configuration.
 * @returns Promise that resolves to the trail emitter configuration.
 */
export async function getTrailConfig(): Promise<EmitterConfig> {
    const config = { ...trailConfig };

    const circleTexture = await Assets.load<Texture>("circle");

    window.particleContainer.blendMode = "screen";
    window.particleContainer.texture = circleTexture;

    config.textureBehavior = {
        mode: "static",
        textureConfigs: [
            {
                textures: [circleTexture],
            },
        ],
    };

    return config;
}
