import { ListData } from "../../data/list/List";
import { NumberList } from "../../data/list/NumberList";
import { Emitter } from "../../Emitter";
import { EmitterParticle } from "../../particle/EmitterParticle";
import { BehaviorOrder } from "../../util/Types";
import {
    EmitterBehavior,
    InitBehavior,
    UpdateBehavior,
} from "../EmitterBehavior";

/**
 * Type defining the configuration for ScaleBehavior.
 */
export type ScaleBehaviorConfig =
    | {
          value: number;
          mode?: "static";
      }
    | {
          listData: ListData<number>;
          mode: "list" | "random";
      };

/**
 * Behavior which scales particles over their lifetime.
 */
export class ScaleBehavior
    extends EmitterBehavior<ScaleBehaviorConfig>
    implements
        InitBehavior<ScaleBehaviorConfig>,
        UpdateBehavior<ScaleBehaviorConfig>
{
    private readonly _list: NumberList;

    private _mode: "static" | "list" | "random" = "static";
    private _staticValue: number = 1;

    /**
     * Creates a new ScaleBehavior.
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
        this._list.initialize(config.listData);

        if (this._mode === "list") {
            this._emitter.addToActiveUpdateBehaviors(this);
        }
    }

    /**
     * @inheritdoc
     */
    public getConfig(): ScaleBehaviorConfig {
        return {
            value: 1,
            mode: "static",
        };
    }

    /**
     * @inheritdoc
     */
    public init(particle: EmitterParticle): void {
        if (this._mode === "static") {
            particle.scaleX = this._staticValue;
            particle.scaleY = this._staticValue;
            return;
        }

        const i = this._mode === "random" ? Math.random() : 0;
        const scale = this._list.interpolate(i);

        particle.scaleX = scale;
        particle.scaleY = scale;
    }

    /**
     * @inheritdoc
     */
    public update(particle: EmitterParticle): void {
        const scale = this._list.interpolate(particle.data.agePercent);

        particle.scaleX = scale;
        particle.scaleY = scale;
    }

    /**
     * @inheritdoc
     */
    protected reset(): void {
        this._mode = "static";
        this._staticValue = 1;

        this._emitter.removeFromActiveInitBehaviors(this);
        this._emitter.removeFromActiveUpdateBehaviors(this);
    }
}
