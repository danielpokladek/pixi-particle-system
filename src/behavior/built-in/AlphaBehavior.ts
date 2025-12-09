import { PropertyList, PropertyNode, ValueList } from "../../data/PropertyList";
import { Emitter } from "../../Emitter";
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
      mode?: "static";
    }
  | {
      listData: ValueList<number>;
      mode: "list" | "random";
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
  private _mode: "static" | "list" | "random" = "static";

  /**
   * Creates new instance of AlphaBehavior.
   * @param emitter Emitter instance this behavior belongs to.
   */
  constructor(emitter: Emitter) {
    super(emitter);

    this._list = new PropertyList<number>();
  }

  /**
   * @inheritdoc
   */
  public applyConfig(config: AlphaBehaviorConfig): void {
    super.applyConfig(config);

    this._emitter.addToActiveInitBehaviors(this);

    if ("staticAlpha" in config) {
      this._staticValue = config.staticAlpha;
      this._mode = "static";
      return;
    }

    this._mode = config.mode;
    this._list.reset(PropertyNode.createList(config.listData));

    if (this._mode === "list") {
      this._emitter.addToActiveUpdateBehaviors(this);
    }
  }

  /**
   * @inheritdoc
   */
  public getConfig(): AlphaBehaviorConfig {
    if (this._mode === "static") {
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
    if (this._mode === "static") {
      particle.alpha = this._staticValue;
      return;
    }

    if (this._mode === "random") {
      particle.alpha = this._list.interpolate(Math.random());
      return;
    }

    particle.alpha = this._list.interpolate(0);
  }

  /**
   * @inheritdoc
   */
  public update(particle: EmitterParticle): void {
    particle.alpha = this._list.interpolate(particle.data.agePercent);
  }

  /**
   * @inheritdoc
   */
  protected reset(): void {
    this._staticValue = 1.0;
    this._mode = "static";

    this._emitter.removeFromActiveInitBehaviors(this);
    this._emitter.removeFromActiveUpdateBehaviors(this);
  }
}
