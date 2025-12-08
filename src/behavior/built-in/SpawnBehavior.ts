import { EmitterParticle } from "../../particle/EmitterParticle";
import { InitBehavior } from "../EmitterBehavior";

/**
 * Type defining the configuration for SpawnBehavior.
 */
export type SpawnBehaviorConfig =
  | {
      shape: "point";
    }
  | {
      shape: "line";
      width: number;
    }
  | {
      shape: "rectangle";
      width: number;
      height: number;
    }
  | {
      shape: "circle";
      outerRadius: number;
      innerRadius?: number;
    };

/**
 * Behavior which spawns particles within a defined shape.
 */
export class SpawnBehavior extends InitBehavior<SpawnBehaviorConfig> {
  private _shape: "point" | "line" | "rectangle" | "circle" = "point";

  private _width: number = 0;
  private _height: number = 0;

  private _innerRadius: number = 0;
  private _outerRadius: number = 0;

  /**
   * @inheritdoc
   */
  public applyConfig(config: SpawnBehaviorConfig): void {
    super.applyConfig(config);

    if (config.shape === "point") {
      this._shape = "point";
      return;
    }

    if (config.shape === "line") {
      this._shape = "line";
      this._width = config.width;
      return;
    }

    if (config.shape === "rectangle") {
      this._shape = "rectangle";
      this._width = config.width;
      this._height = config.height;
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
        width: this._width,
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

    throw new Error("Invalid spawn shape.");
  }

  /**
   * @inheritdoc
   */
  public init(particle: EmitterParticle): void {
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
