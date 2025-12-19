import { PointData } from "pixi.js";
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
 * Type defining the possible movement spaces.
 */
export type MovementSpace = "local" | "global";

/**
 * Type defining the configuration for MovementBehavior.
 */
export type MovementBehaviorConfig =
    | {
          minMoveSpeed: PointData;
          maxMoveSpeed: PointData;
          mode?: "linear" | "acceleration";
          space?: MovementSpace;
      }
    | {
          xListData: ListData<number>;
          yListData?: ListData<number>;
          mode?: "linear" | "acceleration";
          space?: MovementSpace;
      };

/**
 * Behavior used to control the movement of particles over their lifetime.
 */
export class MovementBehavior
    extends EmitterBehavior<MovementBehaviorConfig>
    implements InitBehavior, UpdateBehavior
{
    private readonly _xList: NumberList;
    private readonly _yList: NumberList;

    private _mode: "acceleration" | "linear" = "linear";
    private _space: MovementSpace = "local";

    private _useList: boolean = false;

    private _minMoveSpeed: PointData = { x: 0, y: 0 };
    private _maxMoveSpeed: PointData = { x: 0, y: 0 };

    /**
     * Creates new instance of MovementBehavior.
     * @param emitter Emitter instance this behavior belongs to.
     */
    constructor(emitter: Emitter) {
        super(emitter);

        this._xList = new NumberList();
        this._yList = new NumberList();
    }

    /**
     * @inheritdoc
     */
    public get updateOrder(): BehaviorOrder {
        return "late";
    }

    /**
     * X-axis movement list.
     */
    public get xList(): NumberList {
        return this._xList;
    }

    /**
     * Y-axis movement list.
     */
    public get yList(): NumberList {
        return this._yList;
    }

    /**
     * Space in which movement is applied.
     */
    public get space(): "local" | "global" {
        return this._space;
    }
    public set space(value: "local" | "global") {
        this._space = value;
    }

    /**
     * Movement mode.
     */
    public get mode(): "acceleration" | "linear" {
        return this._mode;
    }
    public set mode(value: "acceleration" | "linear") {
        this._mode = value;
    }

    /**
     * Whether to use lists for movement values.
     */
    public get useList(): boolean {
        return this._useList;
    }
    public set useList(value: boolean) {
        this._useList = value;
    }

    /**
     * Minimum movement speed (used when not using lists).
     */
    public get minMoveSpeed(): PointData {
        return this._minMoveSpeed;
    }
    public set minMoveSpeed(value: PointData) {
        this._minMoveSpeed.x = value.x;
        this._minMoveSpeed.y = value.y;
    }

    /**
     * Maximum movement speed (used when not using lists).
     */
    public get maxMoveSpeed(): PointData {
        return this._maxMoveSpeed;
    }
    public set maxMoveSpeed(value: PointData) {
        this._maxMoveSpeed.x = value.x;
        this._maxMoveSpeed.y = value.y;
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
            this._xList.initialize(config.xListData);
            this._yList.initialize(config.yListData ?? config.xListData);
            this._useList = true;
        }

        this._mode = config.mode ?? "linear";
        this._space = config.space ?? "global";

        this._emitter.addToActiveInitBehaviors(this);
        this._emitter.addToActiveUpdateBehaviors(this);
    }

    /**
     * @inheritdoc
     */
    public getConfig(): MovementBehaviorConfig | undefined {
        if (
            !this._emitter.isBehaviorInitActive(this) &&
            !this._emitter.isBehaviorUpdateActive(this)
        ) {
            return undefined;
        }

        if (this._useList) {
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
                space: this._space,
            };
        }

        return {
            minMoveSpeed: this._minMoveSpeed,
            maxMoveSpeed: this._maxMoveSpeed,
            mode: this._mode,
            space: this._space,
        };
    }

    /**
     * @inheritdoc
     */
    public init(particle: EmitterParticle): void {
        const particleData = particle.data;

        let xVelocity: number;
        let yVelocity: number;

        if (this._useList) {
            xVelocity = this._xList.interpolate(0);
            yVelocity = this._yList.interpolate(0);
        } else {
            xVelocity =
                Math.random() * (this._maxMoveSpeed.x - this._minMoveSpeed.x) +
                this._minMoveSpeed.x;

            yVelocity =
                Math.random() * (this._maxMoveSpeed.y - this._minMoveSpeed.y) +
                this._minMoveSpeed.y;
        }

        // TODO: Make particles rotation aware.
        // TODO: Add logic to SpawnBehavior where direction vector can be set.

        if (this._space === "local") {
            const dirX = particleData.directionVectorX;
            const dirY = particleData.directionVectorY;
            const length = Math.sqrt(dirX * dirX + dirY * dirY);
            const forwardX = dirX / length;
            const forwardY = dirY / length;
            const perpX = -forwardY;
            const perpY = forwardX;

            const finalX = forwardX * yVelocity + perpX * xVelocity;
            const finalY = forwardY * yVelocity + perpY * xVelocity;

            particleData.accelerationX = finalX;
            particleData.accelerationY = finalY;

            particleData.velocityX = finalX;
            particleData.velocityY = finalY;
            return;
        }

        particleData.accelerationX = xVelocity;
        particleData.accelerationY = yVelocity;

        particleData.velocityX = xVelocity;
        particleData.velocityY = yVelocity;
    }

    /**
     * @inheritdoc
     */
    public update(particle: EmitterParticle, deltaTime: number): void {
        const particleData = particle.data;

        if (this._mode === "acceleration") {
            let xAcceleration: number;
            let yAcceleration: number;

            if (this._useList) {
                const xValue = this._xList.interpolate(particleData.agePercent);
                const yValue = this._yList.interpolate(particleData.agePercent);

                if (this._space === "local") {
                    const dirX = particleData.directionVectorX;
                    const dirY = particleData.directionVectorY;
                    const length = Math.sqrt(dirX * dirX + dirY * dirY);
                    const forwardX = dirX / length;
                    const forwardY = dirY / length;
                    const perpX = -forwardY;
                    const perpY = forwardX;

                    xAcceleration = forwardX * yValue + perpX * xValue;
                    yAcceleration = forwardY * yValue + perpY * xValue;
                } else {
                    xAcceleration = xValue;
                    yAcceleration = yValue;
                }
            } else {
                xAcceleration = particleData.accelerationX;
                yAcceleration = particleData.accelerationY;
            }

            particleData.velocityX += xAcceleration * deltaTime;
            particleData.velocityY += yAcceleration * deltaTime;
        }

        particle.x += particleData.velocityX * deltaTime;
        particle.y += particleData.velocityY * deltaTime;
    }

    /**
     * @inheritdoc
     */
    protected reset(): void {
        this._mode = "linear";
        this._space = "global";

        this._minMoveSpeed.x = 0;
        this._minMoveSpeed.y = 0;
        this._maxMoveSpeed.x = 0;
        this._maxMoveSpeed.y = 0;

        this._useList = false;
    }
}
