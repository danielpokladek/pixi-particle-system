import { EmitterConfig } from "pixi-particle-system";
import { Assets, Spritesheet, Texture } from "pixi.js";

const confettiConfig: EmitterConfig = {
    emitterVersion: "0.0.0",

    spawnInterval: 0.05,
    minParticleLifetime: 4,
    maxParticleLifetime: 6,

    spawnBehavior: {
        shape: "line",
        length: 1000,
        origin: { x: 0, y: -300 },
    },

    colorBehavior: {
        mode: "random",
        listData: {
            list: [
                { time: 0, value: "#ff0000" },
                { time: 0.4, value: "#00ff00" },
                { time: 0.8, value: "#0000ff" },
            ],
            isStepped: true,
        },
    },

    movementBehavior: {
        mode: "linear",
        space: "global",

        minMoveSpeed: { x: -50, y: 200 },
        maxMoveSpeed: { x: 50, y: 200 },
    },
};

/**
 * Loads the confetti textures and config.
 * @returns Emitter config.
 */
export async function getConfettiConfig(): Promise<EmitterConfig> {
    const config = { ...confettiConfig };

    const confettiTexture = await Assets.load("./spritesheet/confetti.png");
    window.particleContainer.texture = confettiTexture;

    const confettiSpritesheet = await Assets.load<Spritesheet>("confetti");

    const rectangleTextures: Texture[] = [];
    const rhombusTextures: Texture[] = [];
    const flowerTextures: Texture[] = [];
    const starTextures: Texture[] = [];

    const frameNames: string[] = [];

    for (let i = 0; i <= 63; i++) {
        const frame = i.toString().padStart(2, "0");

        rectangleTextures.push(
            confettiSpritesheet.textures[`rectangle_${frame}.png`],
        );

        rhombusTextures.push(
            confettiSpritesheet.textures[`rhombus_${frame}.png`],
        );

        flowerTextures.push(
            confettiSpritesheet.textures[`flower_${frame}.png`],
        );

        starTextures.push(confettiSpritesheet.textures[`star_${frame}.png`]);
    }

    for (const name of frameNames) {
        const texture = confettiSpritesheet.textures[name];
        if (texture) rectangleTextures.push(texture);
    }

    const framerate = 30;
    const loop = true;

    config.textureBehavior = {
        mode: "animated",
        textureConfigs: [
            {
                textures: rectangleTextures,
                framerate,
                loop,
            },
            {
                textures: rhombusTextures,
                framerate,
                loop,
            },
            {
                textures: flowerTextures,
                framerate,
                loop,
            },
            {
                textures: starTextures,
                framerate,
                loop,
            },
        ],
    };

    return config;
}
