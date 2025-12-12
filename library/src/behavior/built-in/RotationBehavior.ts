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
 * Type defining the configuration for RotationBehavior.
 */
export type RotationBehaviorConfig =
    | {
          value: number;
          mode: "static";
      }
    | { listData: ListData<number>; mode: "list" }
    | {
          startRotation: number;
          acceleration: number;
          mode: "acceleration";
      };

/**
 * Behavior which handles particle rotation.
 */
export class RotationBehavior
    extends EmitterBehavior<RotationBehaviorConfig>
    implements
        InitBehavior<RotationBehaviorConfig>,
        UpdateBehavior<RotationBehaviorConfig>
{
    private readonly _list: NumberList;

    private _mode: "static" | "list" | "acceleration" = "static";

    private _staticValue: number = 0;
    private _startRotation: number = 0;
    private _acceleration: number = 0;

    /**
     * Creates a new RotationBehavior.
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
    public applyConfig(config: RotationBehaviorConfig): void {
        super.applyConfig(config);

        this._emitter.addToActiveInitBehaviors(this);

        if (config.mode === "static") {
            this._staticValue = config.value;
            this._mode = "static";
            this._list.reset();

            return;
        }

        if (config.mode === "acceleration") {
            this._startRotation = config.startRotation;
            this._acceleration = config.acceleration;

            this._mode = "acceleration";
            this._list.reset();

            this._emitter.addToActiveUpdateBehaviors(this);
            return;
        }

        this._list.initialize(config.listData);
        this._mode = "list";

        this._emitter.addToActiveUpdateBehaviors(this);
    }

    /**
     * @inheritdoc
     */
    public getConfig(): RotationBehaviorConfig {
        return {
            value: 0,
            mode: "static",
        };
    }

    /**
     * @inheritdoc
     */
    public init(particle: EmitterParticle): void {
        if (this._mode === "static") {
            particle.rotation = this._staticValue;
            return;
        }

        if (this._mode === "list") {
            particle.rotation = this._list.interpolate(0);
            return;
        }

        particle.rotation = this._startRotation;
    }

    /**
     * @inheritdoc
     */
    public update(particle: EmitterParticle, deltaTime: number): void {
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
