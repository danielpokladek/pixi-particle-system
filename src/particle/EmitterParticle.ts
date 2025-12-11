import { Particle, Texture } from "pixi.js";

/**
 * Type defining the data stored in each particle.
 */
export type BaseParticleData = {
    maxLifetime: number;
    age: number;
    agePercent: number;
    oneOverLifetime: number;

    accelerationX: number;
    accelerationY: number;

    velocityX: number;
    velocityY: number;

    textureConfig: {
        textures: Texture[];
        duration: number;
        elapsed: number;
        framerate: number;
        loop: boolean;
    };
};

/**
 * Interface defining an emitter particle.
 */
export interface IEmitterParticle extends Particle {
    data: BaseParticleData;

    /**
     * Resets the particle data.
     */
    reset(): void;
}

/**
 * Particle class used by the Emitter.
 */
export class EmitterParticle extends Particle implements IEmitterParticle {
    public data: BaseParticleData;

    constructor() {
        super(Texture.EMPTY);

        this.data = {} as BaseParticleData;
        this.data.textureConfig = {} as BaseParticleData["textureConfig"];
        this.reset();
    }

    /**
     * @inheritdoc
     */
    public reset(): void {
        this.texture = Texture.EMPTY;

        this.anchorX = 0.5;
        this.anchorY = 0.5;

        this.alpha = 1;

        this.scaleX = 1;
        this.scaleY = 1;

        this.rotation = 0;

        this.data.age = 0;
        this.data.agePercent = 0;
        this.data.maxLifetime = 0;
        this.data.oneOverLifetime = 0;

        this.data.velocityX = 0;
        this.data.velocityY = 0;

        this.data.textureConfig.textures = [];
        this.data.textureConfig.duration = 0;
        this.data.textureConfig.elapsed = 0;
        this.data.textureConfig.framerate = 0;
        this.data.textureConfig.loop = false;
    }
}
