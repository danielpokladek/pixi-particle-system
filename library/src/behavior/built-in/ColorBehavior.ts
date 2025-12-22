import { Color, ColorSource } from "pixi.js";
import { ColorList } from "../../data/list/ColorList";
import { Emitter } from "../../Emitter";
import { EmitterParticle } from "../../particle/EmitterParticle";
import {
    BehaviorOrder,
    CommonListConfig,
    CommonStaticConfig,
} from "../../util/Types";
import {
    EmitterBehavior,
    InitBehavior,
    UpdateBehavior,
} from "../EmitterBehavior";

/**
 * Type defining the configuration for ColorBehavior.
 */
export type ColorBehaviorConfig =
    | CommonStaticConfig<string>
    | CommonListConfig<string>;

/**
 * Behavior used to control the color tint of particles over their lifetime.
 *
 * Behavior supports three modes, a `static` mode where a single value is applied to all particles,
 * a `list` mode where values are interpolated over the particle's lifetime based on a provided list,
 * and a `random` mode where a random value from the list is applied to the particle upon initialization.
 * @see {@link CommonStaticConfig} for static configuration options.
 * @see {@link CommonListConfig} for list configuration options.
 * @group Behavior/ColorBehavior
 * @example
 * ```ts
 * // Apply a static tint to all particles.
 * alphaBehavior.applyConfig({
 *     value: "#ff00ff"
 * });
 *
 * // Interpolate particle tint from white to black over lifetime.
 * alphaBehavior.applyConfig({
 *    listData: [
 *         { time: 0.0, value: "#ffffff" },
 *         { time: 1.0, value: "#000000" }
 *    ],
 *   mode: "list"
 * });
 *
 * // Assign a random tint value between the two stops.
 * alphaBehavior.applyConfig({
 *    listData: [
 *         { time: 0.0, value: "#ff00ff" },
 *         { time: 1.0, value: "#00ff00" }
 *    ],
 *   mode: "random"
 * });
 * ```
 */
export class ColorBehavior
    extends EmitterBehavior<ColorBehaviorConfig>
    implements InitBehavior, UpdateBehavior
{
    private readonly _list: ColorList;

    private _staticValue: ColorSource = "#FFFFFF";
    private _mode: "static" | "list" | "random" = "static";

    /**
     * Creates new instance of ColorBehavior.
     * @param emitter Emitter instance this behavior belongs to.
     */
    constructor(emitter: Emitter) {
        super(emitter);

        this._list = new ColorList();
    }

    /**
     * @inheritdoc
     */
    public get updateOrder(): BehaviorOrder {
        return "normal";
    }

    /**
     * Color list used to interpolate tint values over particle lifetime.
     *
     * A behavior will always have a list, even when not using list-based configuration,
     * but the list might not be initialized and will be empty in that case.
     */
    public get list(): ColorList {
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

        if (value === "list") {
            this._emitter.addToActiveUpdateBehaviors(this);
        } else {
            this._emitter.removeFromActiveUpdateBehaviors(this);
        }
    }

    /**
     * Tint value applied to all particles in `static` mode.
     */
    public get staticValue(): ColorSource {
        return this._staticValue;
    }
    public set staticValue(value: ColorSource) {
        this._staticValue = value;
    }

    /**
     * @inheritdoc
     */
    public applyConfig(config: ColorBehaviorConfig): void {
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
    public getConfig(): ColorBehaviorConfig | undefined {
        if (
            !this._emitter.isBehaviorInitActive(this) &&
            !this._emitter.isBehaviorUpdateActive(this)
        ) {
            return undefined;
        }

        if (this._mode === "static") {
            return {
                value: Color.shared.setValue(this._staticValue).toHex(),
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
            particle.tint = this._staticValue;
            return;
        }

        if (this._mode === "random") {
            particle.tint = this._list.interpolate(Math.random());
            return;
        }

        particle.tint = this._list.interpolate(0);
    }

    /**
     * @inheritdoc
     */
    public update(particle: EmitterParticle): void {
        particle.tint = this._list.interpolate(particle.data.agePercent);
    }

    /**
     * @inheritdoc
     */
    protected reset(): void {
        this._staticValue = "#FFFFFF";
        this._mode = "static";

        this._emitter.removeFromActiveInitBehaviors(this);
        this._emitter.removeFromActiveUpdateBehaviors(this);
    }
}
