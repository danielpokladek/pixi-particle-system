import { PointData } from "pixi.js";
import { EmitterError } from "../../error";
import {
    BaseParticleData,
    IEmitterParticle,
} from "../../particle/EmitterParticle";
import { BehaviorOrder } from "../../util/Types";
import { EmitterBehavior, InitBehavior } from "../EmitterBehavior";

/**
 * Type defining the possible spawn shapes for SpawnBehavior.
 *
 * - `point`: Particles spawn from a single point at the origin position.
 * - `line`: Particles spawn along a line centered at the origin position.
 * - `rectangle`: Particles spawn within a rectangle centered at the origin position.
 * - `circle`: Particles spawn within a circle centered at the origin position.
 * @group Behavior/SpawnBehavior/
 */
export type SpawnShape = "point" | "line" | "rectangle" | "circle";

/**
 * Type defining the point spawn configuration.
 * @group Behavior/SpawnBehavior/
 */
export type PointConfig = {
    /**
     * Particles spawn from single point at the origin position.
     */
    shape: "point";
};

/**
 * Type defining the line spawn configuration.
 * @group Behavior/SpawnBehavior/
 */
export type LineConfig = {
    /**
     * Particles spawn along a line centered at the origin position.
     */
    shape: "line";
    /**
     * Length of the line along which particles will spawn.
     */
    length: number;
};

/**
 * Type defining the rectangle spawn configuration.
 * @group Behavior/SpawnBehavior/
 */
export type RectangleConfig = {
    /**
     * Particles spawn within a rectangle centered at the origin position.
     */
    shape: "rectangle";
    /**
     * Width of the rectangle.
     */
    width: number;
    /**
     * Height of the rectangle. If not provided, the height will be equal to the width.
     */
    height?: number;
};

/**
 * Type defining the circle spawn configuration.
 * @group Behavior/SpawnBehavior/
 */
export type CircleConfig = {
    /**
     * Particles spawn within a circle centered at the origin position.
     */
    shape: "circle";
    /**
     * Outer radius of the circle.
     */
    outerRadius: number;
    /**
     * Inner radius of the circle. If not provided, the inner radius will be 0.
     */
    innerRadius?: number;
};

/**
 * Type defining the configuration for SpawnBehavior.
 */
export type SpawnBehaviorConfig = {
    /**
     * Direction in which the particles will be moving.
     */
    direction?: PointData;

    /**
     * Origin (parent-local) position used as the center/offset for particle spawning.
     *
     * This value is added to the shape-generated spawn coordinates in {@link init}.
     * For the `point` shape, particles spawn exactly at this position.
     *
     * This is relative to the parent transform (not a world-space position).
     */
    origin?: PointData;
} & (PointConfig | LineConfig | RectangleConfig | CircleConfig);

/**
 * Behavior used to control the spawning shape and initial direction of particles.
 *
 * Behavior supports four shapes, a `point` shape where particles spawn from a single point,
 * a `line` shape where particles spawn along a line,
 * a `rectangle` shape where particles spawn within a rectangle area,
 * and a `circle` shape where particles spawn within a circular area.
 * @see {@link SpawnBehaviorConfig} for configuration options.
 * @template DataType Type describing the data object stored on particles.
 * @template ParticleType Type describing the particle used within the emitter.
 * @group Behavior/SpawnBehavior
 * @example
 * ```ts
 * // Spawn particles from a point with an initial upward direction.
 * spawnBehavior.applyConfig({
 *     shape: "point",
 *     direction: { x: 0, y: -1 }
 * });
 * ```
 * @example
 * ```ts
 * // Spawn particles along a horizontal line of
 * //  length 200 with no initial direction.
 * spawnBehavior.applyConfig({
 *     shape: "line",
 *     length: 200,
 *     direction: { x: 0, y: 0 }
 * });
 * ```
 * @example
 * ```ts
 * // Spawn particles within a rectangle of width 100 and
 * //  height 50 with an initial rightward direction.
 * spawnBehavior.applyConfig({
 *     shape: "rectangle",
 *     width: 100,
 *     height: 50,
 *     direction: { x: 1, y: 0 }
 * });
 * ```
 * @example
 * ```ts
 * // Spawn particles within a circle of outer radius 75 and
 * //  inner radius 25 with no initial direction.
 * spawnBehavior.applyConfig({
 *     shape: "circle",
 *     outerRadius: 75,
 *     innerRadius: 25,
 *     direction: { x: 0, y: 0 }
 * });
 * ```
 */
export class SpawnBehavior<
    DataType extends BaseParticleData = BaseParticleData,
    ParticleType extends IEmitterParticle<DataType> =
        IEmitterParticle<DataType>,
>
    extends EmitterBehavior<SpawnBehaviorConfig, DataType, ParticleType>
    implements InitBehavior<DataType, ParticleType>
{
    private readonly _origin: PointData = { x: 0, y: 0 };
    private readonly _directionVector: PointData = { x: 0, y: 0 };

    private _shape: "point" | "line" | "rectangle" | "circle" = "point";

    private _width: number = 0;
    private _height: number = 0;

    private _innerRadius: number = 0;
    private _outerRadius: number = 0;

    /**
     * @inheritdoc
     */
    public get updateOrder(): BehaviorOrder {
        return "initial";
    }

    /**
     * Initial direction vector for spawned particles.
     */
    public get direction(): PointData {
        return this._directionVector;
    }
    public set direction(value: PointData) {
        this._directionVector.x = value.x;
        this._directionVector.y = value.y;
    }

    /**
     * Origin (parent-local) position used as the center/offset for particle spawning.
     *
     * This value is added to the shape-generated spawn coordinates in {@link init}.
     * For the `point` shape, particles spawn exactly at this position.
     *
     * This is relative to the parent transform (not a world-space position).
     */
    public get origin(): PointData {
        return this._origin;
    }
    public set origin(value: PointData) {
        this._origin.x = value.x;
        this._origin.y = value.y;
    }

    /**
     * Current spawn shape used by the behavior.
     */
    public get shape(): SpawnShape {
        return this._shape;
    }
    public set shape(value: SpawnShape) {
        this._shape = value;
    }

    /**
     * Width of the spawn shape (for rectangle and line shapes).
     */
    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;
    }

    /**
     * Height of the spawn shape (for rectangle shape).
     */
    public get height(): number {
        return this._height;
    }
    public set height(value: number) {
        this._height = value;
    }

    /**
     * Inner radius of the spawn shape (for circle shape).
     */
    public get innerRadius(): number {
        return this._innerRadius;
    }
    public set innerRadius(value: number) {
        this._innerRadius = value;
    }

    /**
     * Outer radius of the spawn shape (for circle shape).
     */
    public get outerRadius(): number {
        return this._outerRadius;
    }
    public set outerRadius(value: number) {
        this._outerRadius = value;
    }

    /**
     * @inheritdoc
     */
    public applyConfig(config: SpawnBehaviorConfig): void {
        super.applyConfig(config);

        this._directionVector.x = config.direction?.x ?? 0;
        this._directionVector.y = config.direction?.y ?? 1;

        this._origin.x = config.origin?.x ?? 0;
        this._origin.y = config.origin?.y ?? 0;

        if (config.shape === "point") {
            this._shape = "point";
            return;
        }

        if (config.shape === "line") {
            this._shape = "line";
            this._width = config.length;
            return;
        }

        if (config.shape === "rectangle") {
            this._shape = "rectangle";
            this._width = config.width;
            this._height = config.height ?? config.width;
            return;
        }

        if (config.shape === "circle") {
            this._shape = "circle";
            this._outerRadius = config.outerRadius;
            this._innerRadius = config.innerRadius ?? 0;
            return;
        }
    }

    /**
     * @inheritdoc
     */
    public getConfig(): SpawnBehaviorConfig {
        let origin: PointData | undefined = undefined;

        if (this._origin.x !== 0 || this._origin.y !== 0) {
            origin = { x: this._origin.x, y: this._origin.y };
        }

        if (this._shape === "point") {
            return {
                origin,
                shape: "point",
                direction: this._directionVector,
            };
        }

        if (this._shape === "line") {
            return {
                origin,
                shape: "line",
                length: this._width,
                direction: this._directionVector,
            };
        }

        if (this._shape === "rectangle") {
            return {
                origin,
                shape: "rectangle",
                width: this._width,
                height: this._height === this._width ? undefined : this._height,
                direction: this._directionVector,
            };
        }

        if (this._shape === "circle") {
            return {
                origin,
                shape: "circle",
                outerRadius: this._outerRadius,
                innerRadius:
                    this._innerRadius === this._outerRadius
                        ? undefined
                        : this._innerRadius,
                direction: this._directionVector,
            };
        }

        throw new EmitterError("Invalid spawn shape, cannot get config.");
    }

    /**
     * @inheritdoc
     */
    public init(particle: ParticleType): void {
        const particleData = particle.data;

        particleData.directionVectorX = this._directionVector.x;
        particleData.directionVectorY = this._directionVector.y;

        if (this._shape === "point") {
            particle.x = this._origin.x;
            particle.y = this._origin.y;
            return;
        }

        let x = 0;
        let y = 0;

        if (this._shape === "rectangle") {
            x = Math.random() * this._width - this._width * 0.5;
            y = Math.random() * this._height - this._height * 0.5;
        }

        if (this._shape === "circle") {
            const theta = Math.random() * 2 * Math.PI;

            const radius = Math.sqrt(
                this._innerRadius * this._innerRadius +
                    (this._outerRadius * this._outerRadius -
                        this._innerRadius * this._innerRadius) *
                        Math.random(),
            );

            x = radius * Math.cos(theta);
            y = radius * Math.sin(theta);
        }

        if (this._shape === "line") {
            x = Math.random() * this._width - this._width * 0.5;
            y = 0;
        }

        particle.x = x + this._origin.x;
        particle.y = y + this._origin.y;
    }

    /**
     * @inheritdoc
     */
    protected reset(): void {
        this._shape = "point";

        this._width = 0;
        this._height = 0;

        this._innerRadius = 0;
        this._outerRadius = 0;
    }
}
