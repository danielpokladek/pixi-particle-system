import { PropertyList, PropertyNode, ValueList } from "../../data/PropertyList";
import { EmitterParticle } from "../../particle/EmitterParticle";
import {
  EmitterBehavior,
  InitBehavior,
  UpdateBehavior,
} from "../EmitterBehavior";

/**
 * Type defining the configuration for AlphaBehavior.
 */
type AlphaBehaviorConfig =
  | {
      staticAlpha: number;
    }
  | {
      listData: ValueList<number>;
    };

/**
 * Behavior which manages particle alpha over their lifetime.
 */
export class AlphaBehavior
  extends EmitterBehavior<AlphaBehaviorConfig>
  implements
    InitBehavior<AlphaBehaviorConfig>,
    UpdateBehavior<AlphaBehaviorConfig>
{
  private readonly _list: PropertyList<number>;

  private _staticValue: number = 1.0;
  private _useStaticValue: boolean = true;

  constructor() {
    super();

    this._list = new PropertyList<number>();
  }

  /**
   * @inheritdoc
   */
  public applyConfig(config: AlphaBehaviorConfig): void {
    super.applyConfig(config);

    if ("staticAlpha" in config) {
      this._staticValue = config.staticAlpha;
      this._useStaticValue = true;
      return;
    }

    this._useStaticValue = false;
    this._list.reset(PropertyNode.createList(config.listData));
  }

  /**
   * @inheritdoc
   */
  public getConfig(): AlphaBehaviorConfig {
    if (this._useStaticValue) {
      return {
        staticAlpha: this._staticValue,
      };
    }

    // TODO DP: Update this to return list.
    return {
      staticAlpha: this._staticValue,
    };
  }

  /**
   * @inheritdoc
   */
  public init(particle: EmitterParticle): void {
    if (this._useStaticValue) {
      particle.alpha = this._staticValue;
      return;
    }

    particle.alpha = this._list.interpolate(0);
  }

  /**
   * @inheritdoc
   */
  public update(particle: EmitterParticle): void {
    if (this._useStaticValue) {
      particle.alpha = this._staticValue;
      return;
    }

    particle.alpha = this._list.interpolate(particle.data.agePercent);
  }

  /**
   * @inheritdoc
   */
  protected reset(): void {
    this._staticValue = 1.0;
    this._useStaticValue = true;
  }
}
