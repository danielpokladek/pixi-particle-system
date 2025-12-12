import { AlphaBehaviorConfig } from "./behavior/built-in/AlphaBehavior";
import { ColorBehaviorConfig } from "./behavior/built-in/ColorBehavior";
import { MovementBehaviorConfig } from "./behavior/built-in/MovementBehavior";
import { RotationBehaviorConfig } from "./behavior/built-in/RotationBehavior";
import { ScaleBehaviorConfig } from "./behavior/built-in/ScaleBehavior";
import { SpawnBehaviorConfig } from "./behavior/built-in/SpawnBehavior";
import { TextureBehaviorConfig } from "./behavior/built-in/TextureBehavior";

/**
 * Type defining the configuration for an Emitter.
 */
export type EmitterConfig = {
    /**
     * Emitter version this config was made for.
     */
    emitterVersion: number;

    /**
     * Minimum lifetime of particles emitted, in seconds.
     */
    minParticleLifetime: number;

    /**
     * Maximum lifetime of particles emitted, in seconds.
     */
    maxParticleLifetime: number;

    /**
     * Interval between spawn waves, in seconds.
     */
    spawnInterval: number;

    /**
     * Chance of spawning particles each wave, between 0 and 1.
     */
    spawnChance: number;

    /**
     * Maximum number of particles allowed alive at once.
     */
    maxParticles: number;

    /**
     * Whether new particles are added to the back of the particle list (behind other particles).
     */
    addAtBack: boolean;

    /**
     * Number of particles to spawn each wave.
     */
    particlesPerWave: number;

    /**
     * Configuration for the AlphaBehavior.
     */
    alphaBehavior?: AlphaBehaviorConfig;

    /**
     * Configuration for the ColorBehavior.
     */
    colorBehavior?: ColorBehaviorConfig;

    /**
     * Configuration for the MovementBehavior.
     */
    movementBehavior?: MovementBehaviorConfig;

    /**
     * Configuration for the RotationBehavior.
     */
    rotationBehavior?: RotationBehaviorConfig;

    /**
     * Configuration for the ScaleBehavior.
     */
    scaleBehavior?: ScaleBehaviorConfig;

    /**
     * Configuration for the SpawnBehavior.
     */
    spawnBehavior?: SpawnBehaviorConfig;

    /**
     * Configuration for the TextureBehavior.
     */
    textureBehavior?: TextureBehaviorConfig;
};
