import { ColorSource } from "pixi.js";
import { ColorList } from "../../data/list/ColorList";
import { ListData } from "../../data/list/List";
import { Emitter } from "../../Emitter";
import { EmitterParticle } from "../../particle/EmitterParticle";
import { BehaviorOrder } from "../../util/Types";
import {
    EmitterBehavior,
    InitBehavior,
    UpdateBehavior,
} from "../EmitterBehavior";

/**
 * Type defining the configuration for ColorBehavior.
 */
export type ColorBehaviorConfig =
    | {
          value: ColorSource;
          mode?: "static";
      }
    | {
          listData: ListData<string>;
          mode: "list" | "random";
      };

/**
 * Behavior which manages particle color over their lifetime.
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
     * List used for color interpolation.
     */
    public get list(): ColorList {
        return this._list;
    }

    /**
     * Behavior mode determining how color is applied.
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
     * Static color value used in "static" mode.
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
