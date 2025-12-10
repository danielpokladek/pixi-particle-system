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
    implements
        InitBehavior<ColorBehaviorConfig>,
        UpdateBehavior<ColorBehaviorConfig>
{
    private readonly _list: ColorList;

    private _staticValue: ColorSource = "#FFFFFF";
    private _behaviorMode: "static" | "list" | "random" = "static";

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
     * @inheritdoc
     */
    public applyConfig(config: ColorBehaviorConfig): void {
        super.applyConfig(config);

        this._emitter.addToActiveInitBehaviors(this);

        if ("value" in config) {
            this._staticValue = config.value;
            this._behaviorMode = "static";
            this._list.reset();

            return;
        }

        this._behaviorMode = config.mode;
        this._list.initialize(config.listData);

        if (this._behaviorMode === "list") {
            this._emitter.addToActiveUpdateBehaviors(this);
        }
    }

    /**
     * @inheritdoc
     */
    public getConfig(): ColorBehaviorConfig {
        if (this._behaviorMode === "static") {
            return {
                value: this._staticValue,
            };
        }

        // TODO DP: Update this to return list.
        return {
            value: this._staticValue,
            mode: "static",
        };
    }

    /**
     * @inheritdoc
     */
    public init(particle: EmitterParticle): void {
        if (this._behaviorMode === "static") {
            particle.tint = this._staticValue;
            return;
        }

        if (this._behaviorMode === "random") {
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
        this._behaviorMode = "static";

        this._emitter.removeFromActiveInitBehaviors(this);
        this._emitter.removeFromActiveUpdateBehaviors(this);
    }
}
