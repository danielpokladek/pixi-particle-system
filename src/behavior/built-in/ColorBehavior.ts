import { ColorSource } from "pixi.js";
import { PropertyList, PropertyNode, ValueList } from "../../data/PropertyList";
import { EmitterParticle } from "../../particle/EmitterParticle";
import { RGBAColor } from "../../util/Type";
import {
  EmitterBehavior,
  InitBehavior,
  UpdateBehavior,
} from "../EmitterBehavior";

/**
 * Type defining the configuration for ColorBehavior.
 */
type ColorBehaviorConfig =
  | {
      staticColor: ColorSource;
      mode?: "static";
    }
  | {
      listData: ValueList<string>;
      mode: "list" | "random";
    };

/**
 * Behavior which manages particle color over their lifetime.
 */
export class ColorBehavior
  extends EmitterBehavior<ColorBehaviorConfig>
  implements
    InitBehavior<ColorBehaviorConfig>,
    UpdateBehavior<ColorBehaviorConfig>
{
  private readonly _list: PropertyList<RGBAColor>;

  private _staticValue: ColorSource = "#FFFFFF";
  private _behaviorMode: "static" | "list" | "random" = "static";

  constructor() {
    super();

    this._list = new PropertyList<RGBAColor>(true);
  }

  /**
   * @inheritdoc
   */
  public applyConfig(config: ColorBehaviorConfig): void {
    super.applyConfig(config);

    if ("staticColor" in config) {
      this._staticValue = config.staticColor;
      this._behaviorMode = "static";
      return;
    }

    this._behaviorMode = config.mode;
    this._list.reset(PropertyNode.createList(config.listData));
  }

  /**
   * @inheritdoc
   */
  public getConfig(): ColorBehaviorConfig {
    if (this._behaviorMode === "static") {
      return {
        staticColor: this._staticValue,
      };
    }

    // TODO DP: Update this to return list.
    return {
      staticColor: this._staticValue,
      mode: "static",
    };
  }

  /**
   * @inheritdoc
   */
  public init(particle: EmitterParticle): void {
    if (this._behaviorMode === "static") {
      particle.tint = this._staticValue;
      return;
    }

    if (this._behaviorMode === "random") {
      particle.tint = this._list.interpolate(Math.random());
      return;
    }

    particle.tint = this._list.interpolate(0);
  }

  /**
   * @inheritdoc
   */
  public update(particle: EmitterParticle): void {
    if (this._behaviorMode === "static" || this._behaviorMode === "random")
      return;

    particle.tint = this._list.interpolate(particle.data.agePercent);
  }

  /**
   * @inheritdoc
   */
  protected reset(): void {
    this._staticValue = "#FFFFFF";
    this._behaviorMode = "static";
  }
}
