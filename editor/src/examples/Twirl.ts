import { EmitterConfig } from "pixi-particle-system";
import { Assets, Texture } from "pixi.js";

const portalConfig: EmitterConfig = {
    emitterVersion: "0.0.0",

    minParticleLifetime: 1,
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
        mode: "random",
        listData: {
            list: [
                { time: 0.0, value: "#0b132b" },
                { time: 0.15, value: "#1c2541" },
                { time: 0.3, value: "#3a506b" },
                { time: 0.45, value: "#2ec4b6" },
                { time: 0.6, value: "#5bc0be" },
                { time: 0.75, value: "#48bfe3" },
                { time: 0.9, value: "#64dfdf" },
                { time: 1.0, value: "#80ffdb" },
            ],
        },
    },

    rotationBehavior: {
        mode: "acceleration",
        startRotation: 0,
        acceleration: -5,
    },

    scaleBehavior: {
        mode: "list",
        xListData: {
            list: [
                { time: 0.0, value: 0.1 },
                { time: 0.5, value: 0.8 },
                { time: 1.0, value: 0.1 },
            ],
            ease: "sine.in",
        },
    },
};

/**
 * Gets the portal emitter configuration.
 * @returns Promise that resolves to the portal emitter configuration.
 */
export async function getPortalConfig(): Promise<EmitterConfig> {
    const config = { ...portalConfig };

    const texture = await Assets.load<Texture>("twirl");

    window.particleContainer.blendMode = "screen";
    window.particleContainer.texture = texture;

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
