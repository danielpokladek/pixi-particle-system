import { NumberList } from "../../data/list/NumberList";
import { Emitter } from "../../Emitter";
import {
    BaseParticleData,
    IEmitterParticle,
} from "../../particle/EmitterParticle";
import {
    BehaviorOrder,
    BehaviorSingleListConfig,
    BehaviorStaticConfig,
} from "../../util/Types";
import {
    EmitterBehavior,
    InitBehavior,
    UpdateBehavior,
} from "../EmitterBehavior";

/**
 * Type defining the configuration for direction mode.
 * @group Behavior/RotationBehavior/
 */
export type DirectionConfigType = {
    /**
     * Particles will have their rotation set on initialization based on their movement direction.
     */
    mode: "direction";
};

/**
 * Type defining the configuration for acceleration mode.
 * @group Behavior/RotationBehavior/
 */
export type AccelerationConfigType = {
    /**
     * Initial rotation value for the particle.
     */
    startRotation: number;
    /**
     * Rotation acceleration applied over time.
     */
    acceleration: number;
    /**
     * Acceleration mode will rotate particles over time based on the acceleration value.
     */
    mode: "acceleration";
};

/**
 * Type defining the configuration for RotationBehavior.
 */
export type RotationBehaviorConfig =
    | DirectionConfigType
    | BehaviorStaticConfig<number>
    | BehaviorSingleListConfig<number>
    | AccelerationConfigType;

/**
 * Behavior used to control the rotation of particles over their lifetime.
 *
 * Behavior supports four modes, a `static` mode where a single value is applied to all particles,
 * a `list` mode where values are interpolated over the particle's lifetime based on a provided list,
 * a `direction` mode where the rotation is set based on the particle's movement direction,
 * and an `acceleration` mode where the rotation changes over time based on an acceleration value.
 * @see {@link DirectionConfigType} for direction configuration options.
 * @see {@link AccelerationConfigType} for acceleration configuration options.
 * @see {@link BehaviorStaticConfig} for static configuration options.
 * @see {@link BehaviorSingleListConfig} for list configuration options.
 * @template DataType Type describing the data object stored on particles.
 * @template ParticleType Type describing the particle used within the emitter.
 * @group Behavior/RotationBehavior
 * @example
 * ```ts
 * // Apply a static rotation of 45 degrees to all particles.
 * rotationBehavior.applyConfig({
 *     value: Math.PI / 4
 * });
 *
 * // Interpolate particle rotation from 0 to 360 degrees over lifetime.
 * rotationBehavior.applyConfig({
 *    listData: [
 *         { time: 0.0, value: 0 },
 *         { time: 1.0, value: Math.PI * 2 }
 *    ],
 *   mode: "list"
 * });
 * ```
 */
export class RotationBehavior<
    DataType extends BaseParticleData,
    ParticleType extends IEmitterParticle<DataType> =
        IEmitterParticle<DataType>,
>
    extends EmitterBehavior<RotationBehaviorConfig, DataType, ParticleType>
    implements
        InitBehavior<DataType, ParticleType>,
        UpdateBehavior<DataType, ParticleType>
{
    private readonly _list: NumberList;

    private _mode: "static" | "list" | "random" | "acceleration" | "direction" =
        "static";

    private _staticValue: number = 0;
    private _startRotation: number = 0;
    private _acceleration: number = 0;

    /**
     * Creates a new RotationBehavior.
     * @param emitter Emitter instance this behavior belongs to.
     */
    constructor(emitter: Emitter<DataType, ParticleType>) {
        super(emitter);

        this._list = new NumberList();
    }

    /**
     * @inheritdoc
     */
    public get updateOrder(): BehaviorOrder {
        return "normal";
    }

    /**
     * Number list used to interpolate rotation values over particle lifetime.
     *
     * A behavior will always have a list, even when not using list-based configuration,
     * but the list might not be initialized and will be empty in that case.
     */
    public get list(): NumberList {
        return this._list;
    }

    /**
     * Current mode used by the behavior.
     */
    public get mode():
        | "static"
        | "list"
        | "random"
        | "acceleration"
        | "direction" {
        return this._mode;
    }
    public set mode(value: "static" | "list" | "acceleration" | "direction") {
        this._mode = value;
    }

    /**
     * Static rotation value applied to all particles.
     */
    public get staticValue(): number {
        return this._staticValue;
    }
    public set staticValue(value: number) {
        this._staticValue = value;
    }

    /**
     * Rotation acceleration applied over time (used for acceleration mode).
     */
    public get acceleration(): number {
        return this._acceleration;
    }
    public set acceleration(value: number) {
        this._acceleration = value;
    }

    /**
     * Initial rotation value for the particle (used for acceleration mode).
     */
    public get startRotation(): number {
        return this._startRotation;
    }
    public set startRotation(value: number) {
        this._startRotation = value;
    }

    /**
     * @inheritdoc
     */
    public applyConfig(config: RotationBehaviorConfig): void {
        super.applyConfig(config);

        this._emitter.addToActiveInitBehaviors(this);

        if (config.mode === "direction") {
            this._mode = "direction";
            return;
        }

        if (config.mode === "static") {
            this._mode = "static";
            this._staticValue = config.value;
            this._list.reset();
            return;
        }

        if (config.mode === "acceleration") {
            this._mode = "acceleration";
            this._startRotation = config.startRotation;
            this._acceleration = config.acceleration;

            this._list.reset();
            this._emitter.addToActiveUpdateBehaviors(this);
            return;
        }

        this._mode = config.mode;
        this._list.initialize(config.listData);

        if (this._mode === "list") {
            this._emitter.addToActiveUpdateBehaviors(this);
        }
    }

    /**
     * @inheritdoc
     */
    public getConfig(): RotationBehaviorConfig | undefined {
        if (
            !this._emitter.isBehaviorInitActive(this) &&
            !this._emitter.isBehaviorUpdateActive(this)
        ) {
            return undefined;
        }

        if (this._mode === "direction") {
            return { mode: "direction" };
        }

        if (this._mode === "static") {
            return {
                value: this._staticValue,
                mode: "static",
            };
        }

        if (this._mode === "list" || this._mode === "random") {
            return {
                mode: this._mode,
                listData: {
                    list: this._list.list,
                    isStepped: this._list.isStepped ? true : undefined,
                },
            };
        }

        return {
            startRotation: this._startRotation,
            acceleration: this._acceleration,
            mode: "acceleration",
        };
    }

    /**
     * @inheritdoc
     */
    public init(particle: ParticleType): void {
        if (this._mode === "list") {
            particle.rotation = this._list.interpolate(0);
            return;
        }

        if (this._mode === "random") {
            particle.rotation = this._list.interpolate(Math.random());
            return;
        }

        if (this._mode === "direction") {
            particle.rotation = Math.atan2(
                particle.data.directionVectorY,
                particle.data.directionVectorX,
            );

            return;
        }

        if (this._mode === "static") {
            particle.rotation = this._staticValue;
            return;
        }

        particle.rotation = this._startRotation;
    }

    /**
     * @inheritdoc
     */
    public update(particle: ParticleType, deltaTime: number): void {
        if (this._mode === "list") {
            particle.rotation = this._list.interpolate(
                particle.data.agePercent,
            );
            return;
        }

        particle.rotation += this._acceleration * deltaTime;
    }

    /**
     * @inheritdoc
     */
    protected reset(): void {
        this._staticValue = 0;
        this._mode = "static";

        this._emitter.removeFromActiveInitBehaviors(this);
        this._emitter.removeFromActiveUpdateBehaviors(this);
    }
}
