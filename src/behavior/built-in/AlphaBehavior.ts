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
 * Type defining the configuration for AlphaBehavior.
 */
export type AlphaBehaviorConfig =
    | {
          value: number;
          mode?: "static";
      }
    | {
          listData: ListData<number>;
          mode: "list" | "random";
      };

/**
 * Behavior used to control the opacity of particles over their lifetime.
 * Behavior can be configured using a static value, a list of values to interpolate over time, or a random value from a list.
 * @example
 * ```typescript
 * // Interpolate alpha from 0 to 1 and back to 0 over the particle's lifetime.
 * alphaBehavior.applyConfig({
 *    listData: [
 *         { time: 0.0, value: 0.0 },
 *         { time: 0.5, value: 1.0 },
 *         { time: 1.0, value: 0.0 }
 *    ],
 *   mode: "list"
 * });
 * ```
 */
export class AlphaBehavior
    extends EmitterBehavior<AlphaBehaviorConfig>
    implements
        InitBehavior<AlphaBehaviorConfig>,
        UpdateBehavior<AlphaBehaviorConfig>
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
    public getConfig(): AlphaBehaviorConfig {
        if (this._mode === "static") {
            return {
                value: this._staticValue,
            };
        }

        // TODO DP: Update this to return list.
        return {
            value: this._staticValue,
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
