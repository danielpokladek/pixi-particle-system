import { PointData } from "pixi.js";
import { EmitterError } from "../../error";
import { EmitterParticle } from "../../particle/EmitterParticle";
import { BehaviorOrder } from "../../util/Types";
import { EmitterBehavior, InitBehavior } from "../EmitterBehavior";

/**
 * Type defining the possible spawn shapes.
 */
export type SpawnShape = "point" | "line" | "rectangle" | "circle";

/**
 * Type defining the configuration for SpawnBehavior.
 */
export type SpawnBehaviorConfig = {
    shape: SpawnShape;
    direction?: PointData;
} & (
    | {
          shape: "point";
      }
    | {
          shape: "line";
          length: number;
      }
    | {
          shape: "rectangle";
          width: number;
          height?: number;
      }
    | {
          shape: "circle";
          outerRadius: number;
          innerRadius?: number;
      }
);

/**
 * Behavior which spawns particles within a defined shape.
 */
export class SpawnBehavior
    extends EmitterBehavior<SpawnBehaviorConfig>
    implements InitBehavior<SpawnBehaviorConfig>
{
    private _shape: "point" | "line" | "rectangle" | "circle" = "point";

    private _width: number = 0;
    private _height: number = 0;

    private _innerRadius: number = 0;
    private _outerRadius: number = 0;

    private _directionVector: PointData = { x: 0, y: 0 };

    /**
     * @inheritdoc
     */
    public get updateOrder(): BehaviorOrder {
        return "initial";
    }

    /**
     * Direction vector applied to spawned particles.
     */
    public get direction(): PointData {
        return this._directionVector;
    }
    public set direction(value: PointData) {
        this._directionVector.x = value.x;
        this._directionVector.y = value.y;
    }

    /**
     * Shape used for spawning particles.
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

        this._directionVector = config.direction ?? { x: 0, y: 0 };

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
        if (this._shape === "point") {
            return {
                shape: "point",
            };
        }

        if (this._shape === "line") {
            return {
                shape: "line",
                length: this._width,
            };
        }

        if (this._shape === "rectangle") {
            return {
                shape: "rectangle",
                width: this._width,
                height: this._height,
            };
        }

        if (this._shape === "circle") {
            return {
                shape: "circle",
                outerRadius: this._outerRadius,
                innerRadius: this._innerRadius,
            };
        }

        throw new EmitterError("Invalid spawn shape.");
    }

    /**
     * @inheritdoc
     */
    public init(particle: EmitterParticle): void {
        const particleData = particle.data;

        particleData.directionVectorX = this._directionVector.x;
        particleData.directionVectorY = this._directionVector.y;

        if (this._shape === "point") {
            particle.x = 0;
            particle.y = 0;
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

        particle.x = x;
        particle.y = y;
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
