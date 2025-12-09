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
    }
  | {
      listData: ValueList<string>;
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

  private _staticColor: ColorSource = "#FFFFFF";
  private _useStaticColor: boolean = true;

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
      this._staticColor = config.staticColor;
      this._useStaticColor = true;
      return;
    }

    this._useStaticColor = false;
    this._list.reset(PropertyNode.createList(config.listData));
  }

  /**
   * @inheritdoc
   */
  public getConfig(): ColorBehaviorConfig {
    if (this._useStaticColor) {
      return {
        staticColor: this._staticColor,
      };
    }

    // TODO DP: Update this to return list.
    return {
      staticColor: this._staticColor,
    };
  }

  /**
   * @inheritdoc
   */
  public init(particle: EmitterParticle): void {
    if (this._useStaticColor) {
      particle.tint = this._staticColor;
      return;
    }
    particle.tint = this._list.interpolate(0);
  }

  /**
   * @inheritdoc
   */
  public update(particle: EmitterParticle): void {
    if (this._useStaticColor) return;

    particle.tint = this._list.interpolate(particle.data.agePercent);
  }

  /**
   * @inheritdoc
   */
  protected reset(): void {
    this._staticColor = "#FFFFFF";
    this._useStaticColor = true;
  }
}
