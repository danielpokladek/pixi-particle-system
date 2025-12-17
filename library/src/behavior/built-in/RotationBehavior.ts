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
          mode: "faceDirection";
      }
    | {
          value: number;
          faceDirection?: boolean;
          mode: "static";
      }
    | { listData: ListData<number>; mode: "list" }
    | {
          startRotation: number;
          faceDirection?: boolean;
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

    private _mode: "static" | "list" | "acceleration" | "faceDirection" =
        "static";

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
     * List used to set rotation at different points in the particle's life.
     */
    public get list(): NumberList {
        return this._list;
    }

    /**
     * Behavior mode.
     */
    public get mode(): "static" | "list" | "acceleration" | "faceDirection" {
        return this._mode;
    }
    public set mode(
        value: "static" | "list" | "acceleration" | "faceDirection",
    ) {
        this._mode = value;
    }

    /**
     * Static rotation value.
     */
    public get staticValue(): number {
        return this._staticValue;
    }
    public set staticValue(value: number) {
        this._staticValue = value;
    }

    /**
     * Rotation acceleration value.
     */
    public get acceleration(): number {
        return this._acceleration;
    }
    public set acceleration(value: number) {
        this._acceleration = value;
    }

    /**
     * Starting rotation value (used for acceleration mode).
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
        this._mode = config.mode;

        if (config.mode === "faceDirection") {
            return;
        }

        if (config.mode === "static") {
            this._staticValue = config.value;
            this._list.reset();
            return;
        }

        if (config.mode === "acceleration") {
            this._startRotation = config.startRotation;
            this._acceleration = config.acceleration;

            this._list.reset();
            this._emitter.addToActiveUpdateBehaviors(this);
            return;
        }

        this._list.initialize(config.listData);
        this._emitter.addToActiveUpdateBehaviors(this);
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

        if (this._mode === "static") {
            return {
                value: this._staticValue,
                mode: "static",
            };
        }

        if (this._mode === "list") {
            return {
                mode: "list",
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
    public init(particle: EmitterParticle): void {
        if (this._mode === "list") {
            particle.rotation = this._list.interpolate(0);
            return;
        }

        if (this._mode === "faceDirection") {
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
