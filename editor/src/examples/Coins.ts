import { EmitterConfig } from "pixi-particle-system";
import { Assets, Spritesheet, Texture } from "pixi.js";

const coinsConfig: EmitterConfig = {
    emitterVersion: "0.0.0",

    spawnInterval: 0.05,

    minParticleLifetime: 4,
    maxParticleLifetime: 6,

    spawnBehavior: {
        shape: "line",
        length: 500,
        origin: { x: 0, y: -200 },
    },

    movementBehavior: {
        mode: "acceleration",
        space: "local",
        xListData: {
            list: [
                { time: 0, value: 0 },
                { time: 1, value: 0 },
            ],
        },
        yListData: {
            list: [
                { time: 0, value: -100 },
                { time: 0.5, value: 250 },
            ],
        },
    },

    rotationBehavior: {
        mode: "acceleration",
        startRotation: 0,
        acceleration: 2,
    },

    scaleBehavior: {
        mode: "static",
        value: { x: 0.5, y: 0.5 },
    },

    alphaBehavior: {
        mode: "list",
        listData: {
            list: [
                { time: 0, value: 0 },
                { time: 0.3, value: 1 },
            ],
        },
    },
};

/**
 * Loads the coins textures and config.
 * @returns Emitter config.
 */
export async function getCoinConfig(): Promise<EmitterConfig> {
    const config = { ...coinsConfig };

    const coinsTexture = await Assets.load("./spritesheet/coin.png");
    window.particleContainer.texture = coinsTexture;

    const spritesheet = await Assets.load<Spritesheet>("coin");
    const textures: Texture[] = [];

    const frameNames = [
        "coin_00.png",
        "coin_01.png",
        "coin_02.png",
        "coin_03.png",
        "coin_04.png",
        "coin_05.png",
    ];

    for (const name of frameNames) {
        const texture = spritesheet.textures[name];
        if (texture) textures.push(texture);
    }

    config.textureBehavior = {
        mode: "animated",
        textureConfigs: [
            {
                textures,
                framerate: 15,
                loop: true,
            },
        ],
    };

    return config;
}
