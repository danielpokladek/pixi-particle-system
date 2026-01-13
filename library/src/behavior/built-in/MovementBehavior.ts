import { PointData } from "pixi.js";
import { ListData } from "../../data/list/List";
import { NumberList } from "../../data/list/NumberList";
import { Emitter } from "../../Emitter";
import {
    BaseParticleData,
    IEmitterParticle,
} from "../../particle/EmitterParticle";
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
 * Type defining the configuration for movement behavior using min/max speeds.
 * @group Behavior/MovementBehavior/
 */
export type MinMaxConfigType = {
    /**
     * Minimum movement speed for X and Y axes.
     */
    minMoveSpeed: PointData;
    /**
     * Maximum movement speed for X and Y axes.
     */
    maxMoveSpeed: PointData;
    /**
     * Movement mode. In `linear` mode particles move at a constant speed, while in
     * `acceleration` mode particles accelerate over time based on initial speed.
     */
    mode?: "linear" | "acceleration";

    /**
     * Space in which movement is applied. In `local` space, movement is relative to the particle's
     * initial direction, while in `global` space movement is applied relative to the container.
     */
    space?: MovementSpace;
};

/**
 * Type defining the configuration for movement behavior using lists.
 * @group Behavior/MovementBehavior/
 */
export type ListConfigType = {
    /**
     * X axis list data defining all properties required for list-based behavior.
     * @see {@link ListData}
     */
    xListData: ListData<number>;
    /**
     * Y axis list data defining all properties required for list-based behavior.
     * If not provided, `xListData` will be used for both axes.
     * @see {@link ListData}
     */
    yListData?: ListData<number>;
    /**
     * Movement mode. In `linear` mode particles move at a constant speed, while in
     * `acceleration` mode particles accelerate over time based on initial speed.
     */
    mode?: "linear" | "acceleration";
    /**
     * Space in which movement is applied. In `local` space, movement is relative to the particle's
     * initial direction, while in `global` space movement is applied relative to the container.
     */
    space?: MovementSpace;
};

/**
 * Type defining the configuration for MovementBehavior.
 */
export type MovementBehaviorConfig = MinMaxConfigType | ListConfigType;

/**
 * Behavior used to control particle movement over their lifetime.
 *
 * This behavior supports two configuration modes, either by specifying minimum and maximum
 * movement speeds for the X and Y axes, or by providing list data to define movement values
 * over the particle's lifetime.
 * @see {@link MinMaxConfigType} for min/max speed configuration options.
 * @see {@link ListConfigType} for list-based configuration options.
 * @template DataType Type describing the data object stored on particles.
 * @template ParticleType Type describing the particle used within the emitter.
 * @group Behavior/MovementBehavior
 * @example
 * ```ts
 * // Configure movement using min/max speeds.
 * movementBehavior.applyConfig({
 *     minMoveSpeed: { x: -50, y: -100 },
 *     maxMoveSpeed: { x: 50, y: 100 },
 *     mode: "linear",
 *     space: "global"
 * });
 *
 * // Configure movement using lists.
 * movementBehavior.applyConfig({
 *     xListData: {
 *         list: [
 *             { time: 0.0, value: 0 },
 *             { time: 1.0, value: 100 }
 *         ]
 *     },
 *     yListData: {
 *         list: [
 *             { time: 0.0, value: 0 },
 *             { time: 1.0, value: -100 }
 *         ]
 *     },
 *     mode: "acceleration",
 *     space: "local"
 * });
 * ```
 */
export class MovementBehavior<
    DataType extends BaseParticleData,
    ParticleType extends IEmitterParticle<DataType> =
        IEmitterParticle<DataType>,
>
    extends EmitterBehavior<MovementBehaviorConfig, DataType, ParticleType>
    implements
        InitBehavior<DataType, ParticleType>,
        UpdateBehavior<DataType, ParticleType>
{
    private readonly _xList: NumberList;
    private readonly _yList: NumberList;

    private readonly _maxMoveSpeed: PointData = { x: 0, y: 0 };
    private readonly _minMoveSpeed: PointData = { x: 0, y: 0 };

    private _mode: "acceleration" | "linear" = "linear";
    private _space: MovementSpace = "local";

    private _useList: boolean = false;

    /**
     * Creates new instance of MovementBehavior.
     * @param emitter Emitter instance this behavior belongs to.
     */
    constructor(emitter: Emitter<DataType, ParticleType>) {
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
     * Number list used to interpolate X-axis movement values over particle lifetime.
     *
     * A behavior will always have a list, even when not using list-based configuration,
     * but the list might not be initialized and will be empty in that case.
     */
    public get xList(): NumberList {
        return this._xList;
    }

    /**
     * Number list used to interpolate Y-axis movement values over particle lifetime.
     *
     * A behavior will always have a list, even when not using list-based configuration,
     * but the list might not be initialized and will be empty in that case.
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
     * Movement mode currently used by the behavior.
     */
    public get mode(): "acceleration" | "linear" {
        return this._mode;
    }
    public set mode(value: "acceleration" | "linear") {
        this._mode = value;
    }

    /**
     * Whether to use list-based movement configuration.
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
            this._minMoveSpeed.x = config.minMoveSpeed.x;
            this._minMoveSpeed.y = config.minMoveSpeed.y;

            this._maxMoveSpeed.x = config.maxMoveSpeed.x;
            this._maxMoveSpeed.y = config.maxMoveSpeed.y;

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
    public init(particle: ParticleType): void {
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
    public update(particle: ParticleType, deltaTime: number): void {
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
    public reset(): void {
        this._mode = "linear";
        this._space = "global";

        this._minMoveSpeed.x = 0;
        this._minMoveSpeed.y = 0;
        this._maxMoveSpeed.x = 0;
        this._maxMoveSpeed.y = 0;

        this._useList = false;

        this._emitter.removeFromActiveInitBehaviors(this);
        this._emitter.removeFromActiveUpdateBehaviors(this);
    }
}
