import { Particle, Texture } from "pixi.js";

/**
 * Base data structure for emitter particles.
 * @group Particle/
 */
export type BaseParticleData = {
    /**
     * Maximum lifetime of the particle in milliseconds.
     */
    maxLifetime: number;
    /**
     * Current age of the particle in milliseconds.
     */
    age: number;
    /**
     * Age percent of the particle's lifetime (0.0 to 1.0).
     */
    agePercent: number;
    /**
     * One over the lifetime of the particle (1.0 / maxLifetime).
     */
    oneOverLifetime: number;

    /**
     * Direction vector components of the particle.
     */
    directionVectorX: number;
    /**
     * Direction vector Y component of the particle.
     */
    directionVectorY: number;

    /**
     * Acceleration components of the particle.
     */
    accelerationX: number;
    /**
     * Acceleration Y component of the particle.
     */
    accelerationY: number;

    /**
     * Velocity components of the particle.
     */
    velocityX: number;
    /**
     *
     */
    velocityY: number;

    /**
     * Texture animation configuration for the particle.
     */
    textureConfig: {
        /**
         * Array of textures used for the particle.
         */
        textures: Texture[];
        /**
         * Duration of the texture animation in milliseconds.
         */
        duration: number;
        /**
         * Elapsed time of the texture animation in milliseconds.
         */
        elapsed: number;
        /**
         * Frame rate of the texture animation (frames per second).
         */
        framerate: number;
        /**
         * Whether the texture animation should loop.
         */
        loop: boolean;
    };
};

/**
 * Base interface for particles used by the Emitter.
 * @template Data Type describing the particle data structure.
 * @group Particle/
 */
export interface IEmitterParticle<
    Data extends BaseParticleData = BaseParticleData,
> extends Particle {
    /**
     * Particle data used by emitter behaviors.
     * @see {@link BaseParticleData} for the structure of the data.
     */
    data: Data;

    /**
     * Resets the particle to its initial state.
     */
    reset(): void;
}

/**
 * Creates a new instance of BaseParticleData with default values.
 * @returns A new BaseParticleData object with default values.
 * @group Particle/
 */
export function createBaseParticleData(): BaseParticleData {
    return {
        age: 0,
        agePercent: 0,
        maxLifetime: 0,
        oneOverLifetime: 0,
        directionVectorX: 0,
        directionVectorY: 0,
        accelerationX: 0,
        accelerationY: 0,
        velocityX: 0,
        velocityY: 0,
        textureConfig: {
            textures: [],
            duration: 0,
            elapsed: 0,
            framerate: 0,
            loop: false,
        },
    };
}

/**
 * Default implementation of a particle used by the Emitter.
 * @template Data Type describing the particle data structure. Any custom data structure must extend {@link BaseParticleData}.
 * Any custom data will also need to be manually reset, as the default particle will only reset the base data.
 * @group Particle
 */
export class EmitterParticle<Data extends BaseParticleData = BaseParticleData>
    extends Particle
    implements IEmitterParticle
{
    public data: Data;

    /**
     * Creates a new EmitterParticle instance.
     * @param data Particle data used by emitter behaviors.
     */
    constructor(data: Data) {
        super(Texture.EMPTY);

        this.data = data;
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

        this.data.directionVectorX = 0;
        this.data.directionVectorY = 0;

        this.data.accelerationX = 0;
        this.data.accelerationY = 0;

        this.data.velocityX = 0;
        this.data.velocityY = 0;

        this.data.textureConfig.textures = [];
        this.data.textureConfig.duration = 0;
        this.data.textureConfig.elapsed = 0;
        this.data.textureConfig.framerate = 0;
        this.data.textureConfig.loop = false;
    }
}
