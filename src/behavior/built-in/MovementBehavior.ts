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
 * Type defining the configuration for MovementBehavior.
 */
export type MovementBehaviorConfig =
    | {
          minMoveSpeed: number;
          maxMoveSpeed: number;
          mode?: "linear" | "acceleration";
      }
    | {
          listData: ListData<number>;
          mode?: "linear" | "acceleration";
      };

/**
 * Behavior used to control the movement of particles over their lifetime.
 */
export class MovementBehavior
    extends EmitterBehavior<MovementBehaviorConfig>
    implements
        InitBehavior<MovementBehaviorConfig>,
        UpdateBehavior<MovementBehaviorConfig>
{
    private readonly _list: NumberList;

    private _mode: "acceleration" | "linear" = "linear";
    private _useList: boolean = false;

    private _minMoveSpeed: number = 0;
    private _maxMoveSpeed: number = 0;

    /**
     * Creates new instance of MovementBehavior.
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
        return "late";
    }

    /**
     * @inheritdoc
     */
    public applyConfig(config: MovementBehaviorConfig): void {
        super.applyConfig(config);

        if ("minMoveSpeed" in config && "maxMoveSpeed" in config) {
            this._minMoveSpeed = config.minMoveSpeed;
            this._maxMoveSpeed = config.maxMoveSpeed;
            this._useList = false;
        } else {
            this._list.initialize(config.listData);
            this._useList = true;
        }

        this._mode = config.mode ?? "linear";

        this._emitter.addToActiveInitBehaviors(this);
        this._emitter.addToActiveUpdateBehaviors(this);
    }

    /**
     * @inheritdoc
     */
    public getConfig(): MovementBehaviorConfig {
        // TODO DP: Implement the getter.
        return {} as MovementBehaviorConfig;
    }

    /**
     * @inheritdoc
     */
    public init(particle: EmitterParticle): void {
        let velocity = 0;

        if (this._useList) {
            velocity = this._list.interpolate(0);
        } else {
            velocity =
                Math.random() * (this._maxMoveSpeed - this._minMoveSpeed) +
                this._minMoveSpeed;
        }

        // TODO DP: Make particles rotation aware.
        // TODO DP: Add logic to SpawnBehavior where direction vector can be set.
        particle.data.velocityX = velocity;
        particle.data.velocityY = velocity;
    }

    /**
     * @inheritdoc
     */
    public update(particle: EmitterParticle, deltaTime: number): void {
        const particleData = particle.data;
        const velocity = this._useList
            ? this._list.interpolate(particleData.agePercent)
            : particleData.velocityX;

        if (this._mode === "acceleration") {
            particleData.velocityX += velocity * deltaTime;
            particleData.velocityY += velocity * deltaTime;
        }

        particle.x += particleData.velocityX * deltaTime;
        particle.y += particleData.velocityY * deltaTime;
    }

    /**
     * @inheritdoc
     */
    protected reset(): void {
        this._minMoveSpeed = 0;
        this._maxMoveSpeed = 0;
    }
}
