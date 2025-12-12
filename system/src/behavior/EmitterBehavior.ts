import { Emitter } from "../Emitter";
import { EmitterParticle } from "../particle/EmitterParticle";
import { BehaviorOrder } from "../util/Types";

/**
 * Abstract base class for emitter behaviors to extend from.
 * @template ConfigType Type defining the configuration for the behavior.
 */
export abstract class EmitterBehavior<ConfigType> {
    protected readonly _emitter: Emitter;

    /**
     * Creates a new instance of the behavior.
     * @param emitter Emitter instance this behavior belongs to.
     */
    constructor(emitter: Emitter) {
        this._emitter = emitter;
    }

    /**
     * Order in which the behavior will be updated.
     * This is useful to ensure certain behaviors are updated before/after others.
     */
    public abstract get updateOrder(): BehaviorOrder;

    /**
     * Apply behavior config to the behavior.
     * Please note, this will reset the behavior to its default state before applying the config.
     * @param config Behavior configuration.
     */
    public applyConfig(config: ConfigType): void {
        if (!config) return;

        this.reset();
    }

    /**
     * Retrieves the current behavior properties as a configuration object.
     * @returns Behavior configuration.
     */
    public abstract getConfig(): ConfigType;

    /**
     * Resets the behavior to its default state.
     */
    protected abstract reset(): void;
}

/**
 * Interface defining behaviors which update particles on initialization.
 * @template Config Type defining the configuration for the behavior.
 */
export interface InitBehavior<ConfigType> extends EmitterBehavior<ConfigType> {
    /**
     * Initializes the particle.
     * @param particle Particle to initialize.
     */
    init(particle: EmitterParticle): void;
}

/**
 * Interface defining behaviors which update particles on each update cycle.
 * @template Config Type defining the configuration for the behavior.
 */
export interface UpdateBehavior<Config> extends EmitterBehavior<Config> {
    /**
     * Updates the particle.
     * @param particle Particle to update.
     * @param deltaTime Time elapsed since the last update, in seconds.
     */
    update(particle: EmitterParticle, deltaTime: number): void;
}
