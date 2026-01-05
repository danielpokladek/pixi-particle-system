import { Emitter } from "../Emitter";
import {
    BaseParticleData,
    IEmitterParticle,
} from "../particle/EmitterParticle";
import { BehaviorOrder } from "../util/Types";

/**
 * Abstract base for all behavior to build upon.
 *
 * This class provides the foundational structure and methods that all
 * emitter behaviors must implement, ensuring consistency and interoperability.
 *
 * In addition to the core functionality, this class also defines interfaces
 * for behaviors that initialize particles ({@link InitBehavior}) and
 * those that update particles ({@link UpdateBehavior}) during the emitter's update cycle.
 * @group Behavior/EmitterBehavior
 */
export abstract class EmitterBehavior<
    ConfigType,
    DataType extends BaseParticleData = BaseParticleData,
    ParticleType extends IEmitterParticle<DataType> =
        IEmitterParticle<DataType>,
> {
    /**
     * @hidden
     */
    protected readonly _emitter: Emitter<DataType, ParticleType>;

    /**
     * Creates a new instance of the behavior.
     * @param emitter Emitter instance this behavior belongs to.
     */
    constructor(emitter: Emitter<DataType, ParticleType>) {
        this._emitter = emitter;
    }

    /**
     * Defines at which step of the update cycle the behavior is applied.
     *
     * - `initial`: Earliest step, useful when other behaviors depend on this behavior.
     * - `normal`: Default step for most behaviors.
     * - `late`: Latest step, useful for behaviors that should override others or depend on their properties.
     */
    public abstract get updateOrder(): BehaviorOrder;

    /**
     * Reset the behavior and apply the provided configuration.
     * @param config Behavior configuration.
     */
    public applyConfig(config: ConfigType): void {
        if (!config) return;

        this.reset();
    }

    /**
     * Retrieve the current behavior properties as a configuration object.
     * If the behavior is inactive, `undefined` is returned.
     * @returns Behavior configuration object or `undefined` if inactive.
     */
    public abstract getConfig(): ConfigType | undefined;

    /**
     * Reset the behavior to its default state.
     */
    protected abstract reset(): void;
}

/**
 * Interface defining behaviors which update particles when they are first created.
 * @template DataType Type of particle data used in the particle system.
 * @template ParticleType Type of particle used in the particle system.
 * @group Behavior/EmitterBehavior/
 */
export interface InitBehavior<
    DataType extends BaseParticleData = BaseParticleData,
    ParticleType extends IEmitterParticle<DataType> =
        IEmitterParticle<DataType>,
> extends EmitterBehavior<unknown, DataType, ParticleType> {
    /**
     * Initialize the particle.
     * @param particle Particle to initialize.
     */
    init(particle: ParticleType): void;
}

/**
 * Interface defining behaviors which update particles on each update cycle.
 * @template DataType Type of particle data used in the particle system.
 * @template ParticleType Type of particle used in the particle system.
 * @group Behavior/EmitterBehavior/
 */
export interface UpdateBehavior<
    DataType extends BaseParticleData = BaseParticleData,
    ParticleType extends IEmitterParticle<DataType> =
        IEmitterParticle<DataType>,
> extends EmitterBehavior<unknown, DataType, ParticleType> {
    /**
     * Updates the particle.
     * @param particle Particle to update.
     * @param deltaTime Time elapsed since the last update, in seconds.
     */
    update(particle: ParticleType, deltaTime: number): void;
}
