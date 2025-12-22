import { NumberList } from "../../data/list/NumberList";
import { Emitter } from "../../Emitter";
import { EmitterParticle } from "../../particle/EmitterParticle";
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
 * Type defining the configuration for AlphaBehavior.
 */
export type AlphaBehaviorConfig =
    | BehaviorStaticConfig<number>
    | BehaviorSingleListConfig<number>;

/**
 * Behavior used to control the transparency of particles over their lifetime.
 *
 * Behavior supports three modes, a `static` mode where a single value is applied to all particles,
 * a `list` mode where values are interpolated over the particle's lifetime based on a provided list,
 * and a `random` mode where a random value from the list is applied to the particle upon initialization.
 * @see {@link BehaviorStaticConfig} for static configuration options.
 * @see {@link BehaviorSingleListConfig} for list configuration options.
 * @group Behavior/AlphaBehavior
 * @example
 * ```ts
 * // Apply a static alpha value of 0.5 to all particles.
 * alphaBehavior.applyConfig({
 *     value: 0.5
 * });
 *
 * // Interpolate particle alpha from 0.0 to 1.0 over lifetime.
 * alphaBehavior.applyConfig({
 *    listData: [
 *         { time: 0.0, value: 0.0 },
 *         { time: 1.0, value: 1.0 }
 *    ],
 *   mode: "list"
 * });
 *
 * // Assign a random alpha value between 0.2 and 0.8.
 * alphaBehavior.applyConfig({
 *    listData: [
 *         { time: 0.0, value: 0.2 },
 *         { time: 1.0, value: 0.8 }
 *    ],
 *   mode: "random"
 * });
 * ```
 */
export class AlphaBehavior
    extends EmitterBehavior<AlphaBehaviorConfig>
    implements InitBehavior, UpdateBehavior
{
    private readonly _list: NumberList;

    private _staticValue: number = 1.0;
    private _mode: "static" | "list" | "random" = "static";

    /**
     * Creates new instance of AlphaBehavior.
     * @param emitter Emitter instance this behavior belongs to.
     */
    constructor(emitter: Emitter) {
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
     * Number list used to interpolate alpha values over particle lifetime.
     *
     * A behavior will always have a list, even when not using list-based configuration,
     * but the list might not be initialized and will be empty in that case.
     */
    public get list(): NumberList {
        return this._list;
    }

    /**
     * Mode currently used by the behavior.
     */
    public get mode(): "static" | "list" | "random" {
        return this._mode;
    }
    public set mode(value: "static" | "list" | "random") {
        this._mode = value;

        if (value === "random" || value === "static") {
            this._emitter.removeFromActiveUpdateBehaviors(this);
        } else {
            this._emitter.addToActiveUpdateBehaviors(this);
        }
    }

    /**
     * Alpha value applied to all particles in `static` mode.
     */
    public get staticValue(): number {
        return this._staticValue;
    }
    public set staticValue(value: number) {
        this._staticValue = value;
    }

    /**
     * @inheritdoc
     */
    public applyConfig(config: AlphaBehaviorConfig): void {
        super.applyConfig(config);

        this._emitter.addToActiveInitBehaviors(this);

        if ("value" in config) {
            this._staticValue = config.value;
            this._mode = "static";
            this._list.reset();

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
    public getConfig(): AlphaBehaviorConfig | undefined {
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
            mode: this._mode,
            listData: {
                list: this._list.list,
                isStepped: this._list.isStepped ? true : undefined,
            },
        };
    }

    /**
     * @inheritdoc
     */
    public init(particle: EmitterParticle): void {
        if (this._mode === "static") {
            particle.alpha = this._staticValue;
            return;
        }

        if (this._mode === "random") {
            particle.alpha = this._list.interpolate(Math.random());
            return;
        }

        particle.alpha = this._list.interpolate(0);
    }

    /**
     * @inheritdoc
     */
    public update(particle: EmitterParticle): void {
        particle.alpha = this._list.interpolate(particle.data.agePercent);
    }

    /**
     * @inheritdoc
     */
    protected reset(): void {
        this._staticValue = 1.0;
        this._mode = "static";

        this._emitter.removeFromActiveInitBehaviors(this);
        this._emitter.removeFromActiveUpdateBehaviors(this);
    }
}
