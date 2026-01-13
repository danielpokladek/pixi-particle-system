import { PointData } from "pixi.js";
import { NumberList } from "../../data/list/NumberList";
import { Emitter } from "../../Emitter";
import {
    BaseParticleData,
    IEmitterParticle,
} from "../../particle/EmitterParticle";
import {
    BehaviorOrder,
    BehaviorStaticConfig,
    BehaviorXYListConfig,
} from "../../util/Types";
import {
    EmitterBehavior,
    InitBehavior,
    UpdateBehavior,
} from "../EmitterBehavior";

/**
 * Type defining the configuration for ScaleBehavior.
 */
export type ScaleBehaviorConfig =
    | BehaviorStaticConfig<PointData>
    | BehaviorXYListConfig<number>;

/**
 * Behavior used to control the scale of particles over their lifetime.
 *
 * Behavior supports three modes, a `static` mode where a single value is applied to all particles,
 * a `list` mode where values are interpolated over the particle's lifetime based on provided lists,
 * and a `random` mode where random values from the lists are applied to the particle upon initialization.
 * @see {@link BehaviorStaticConfig} for static configuration options.
 * @see {@link BehaviorXYListConfig} for list configuration options.
 * @template DataType Type describing the data object stored on particles.
 * @template ParticleType Type describing the particle used within the emitter.
 * @group Behavior/ScaleBehavior
 * @example
 * ```ts
 * // Apply a static scale of 2x on both axes to all particles.
 * scaleBehavior.applyConfig({
 *     value: { x: 2, y: 2 }
 * });
 *
 * // Interpolate particle scale from 0.5x to 1.5x on X axis and 1.0x to 2.0x on Y axis over lifetime.
 * scaleBehavior.applyConfig({
 *    xListData: [
 *         { time: 0.0, value: 0.5 },
 *         { time: 1.0, value: 1.5 }
 *    ],
 *    yListData: [
 *         { time: 0.0, value: 1.0 },
 *         { time: 1.0, value: 2.0 }
 *    ],
 *   mode: "list"
 * });
 *
 * // Assign a random scale between 1.0x and 3.0x on X axis and between 0.5x and 2.5x on Y axis.
 * scaleBehavior.applyConfig({
 *    xListData: [
 *         { time: 0.0, value: 1.0 },
 *         { time: 1.0, value: 3.0 }
 *    ],
 *    yListData: [
 *         { time: 0.0, value: 0.5 },
 *         { time: 1.0, value: 2.5 }
 *    ],
 *   mode: "random"
 * });
 * ```
 */
export class ScaleBehavior<
    DataType extends BaseParticleData,
    ParticleType extends IEmitterParticle<DataType> =
        IEmitterParticle<DataType>,
>
    extends EmitterBehavior<ScaleBehaviorConfig, DataType, ParticleType>
    implements
        InitBehavior<DataType, ParticleType>,
        UpdateBehavior<DataType, ParticleType>
{
    private readonly _xList: NumberList;
    private readonly _yList: NumberList;

    private _mode: "static" | "list" | "random" = "static";
    private _staticValue: PointData = { x: 1, y: 1 };

    /**
     * Creates a new ScaleBehavior.
     * @param emitter Emitter instance this behavior belongs to.
     */
    constructor(emitter: Emitter<DataType, ParticleType>) {
        super(emitter);

        this._xList = new NumberList();
        this._yList = new NumberList();
    }

    /**
     * @inheritdoc
     */
    public get updateOrder(): BehaviorOrder {
        return "normal";
    }

    /**
     * Static scale value applied to all particles.
     */
    public get staticValue(): PointData {
        return this._staticValue;
    }

    /**
     * Number list used to interpolate X-axis scale values over particle lifetime.
     *
     * A behavior will always have a list, even when not using list-based configuration,
     * but the list might not be initialized and will be empty in that case.
     */
    public get xList(): NumberList {
        return this._xList;
    }

    /**
     * Number list used to interpolate Y-axis scale values over particle lifetime.
     *
     * A behavior will always have a list, even when not using list-based configuration,
     * but the list might not be initialized and will be empty in that case.
     */
    public get yList(): NumberList {
        return this._yList;
    }

    /**
     * Current mode used by the behavior.
     */
    public get mode(): "static" | "list" | "random" {
        return this._mode;
    }
    public set mode(value: "static" | "list" | "random") {
        this._mode = value;

        if (this._mode === "list") {
            this._emitter.addToActiveUpdateBehaviors(this);
        } else {
            this._emitter.removeFromActiveUpdateBehaviors(this);
        }
    }

    /**
     * @inheritdoc
     */
    public applyConfig(config: ScaleBehaviorConfig): void {
        super.applyConfig(config);

        this._emitter.addToActiveInitBehaviors(this);

        if ("value" in config) {
            this._mode = "static";
            this._staticValue = config.value;
            return;
        }

        this._mode = config.mode;
        this._xList.initialize(config.xListData);
        this._yList.initialize(
            config.yListData ? config.yListData : config.xListData,
        );

        if (this._mode === "list") {
            this._emitter.addToActiveUpdateBehaviors(this);
        }
    }

    /**
     * @inheritdoc
     */
    public getConfig(): ScaleBehaviorConfig | undefined {
        if (
            !this._emitter.isBehaviorInitActive(this) &&
            !this._emitter.isBehaviorUpdateActive(this)
        ) {
            return undefined;
        }

        if (this._mode === "static") {
            return {
                value: this._staticValue,
                mode: "static",
            };
        }

        return {
            xListData: {
                list: this._xList.list,
                isStepped: this._xList.isStepped ? true : undefined,
            },
            yListData: {
                list: this._yList.list,
                isStepped: this._xList.isStepped ? true : undefined,
            },
            mode: this._mode,
        };
    }

    /**
     * @inheritdoc
     */
    public init(particle: ParticleType): void {
        if (this._mode === "static") {
            particle.scaleX = this._staticValue.x;
            particle.scaleY = this._staticValue.y;
            return;
        }

        const i = this._mode === "random" ? Math.random() : 0;
        const xScale = this._xList.interpolate(i);
        const yScale = this._yList.interpolate(i);

        particle.scaleX = xScale;
        particle.scaleY = yScale;
    }

    /**
     * @inheritdoc
     */
    public update(particle: ParticleType): void {
        const xScale = this._xList.interpolate(particle.data.agePercent);
        const yScale = this._yList.interpolate(particle.data.agePercent);

        particle.scaleX = xScale;
        particle.scaleY = yScale;
    }

    /**
     * @inheritdoc
     */
    public reset(): void {
        this._mode = "static";
        this._staticValue.x = 1;
        this._staticValue.y = 1;

        this._emitter.removeFromActiveInitBehaviors(this);
        this._emitter.removeFromActiveUpdateBehaviors(this);
    }
}
