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
 * Type defining the configuration for ScaleBehavior.
 */
export type ScaleBehaviorConfig =
    | {
          value: PointData;
          mode?: "static";
      }
    | {
          xListData: ListData<number>;
          yListData?: ListData<number>;
          mode: "list" | "random";
      };

/**
 * Behavior which scales particles over their lifetime.
 */
export class ScaleBehavior
    extends EmitterBehavior<ScaleBehaviorConfig>
    implements
        InitBehavior<ScaleBehaviorConfig>,
        UpdateBehavior<ScaleBehaviorConfig>
{
    private readonly _xList: NumberList;
    private readonly _yList: NumberList;

    private _mode: "static" | "list" | "random" = "static";
    private _staticValue: PointData = { x: 1, y: 1 };

    /**
     * Creates a new ScaleBehavior.
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
        return "normal";
    }

    /**
     * Static scale value.
     */
    public get staticValue(): PointData {
        return this._staticValue;
    }

    /**
     * List used for the X scale values.
     */
    public get xList(): NumberList {
        return this._xList;
    }

    /**
     * List used for the Y scale values.
     */
    public get yList(): NumberList {
        return this._yList;
    }

    /**
     * Behavior mode.
     */
    public get mode(): "static" | "list" | "random" {
        return this._mode;
    }
    public set mode(value: "static" | "list" | "random") {
        this._mode = value;

        if (this._mode === "list") {
            this._emitter.addToActiveUpdateBehaviors(this);
        } else {
            this._emitter.removeFromActiveUpdateBehaviors(this);
        }
    }

    /**
     * @inheritdoc
     */
    public applyConfig(config: ScaleBehaviorConfig): void {
        super.applyConfig(config);

        this._emitter.addToActiveInitBehaviors(this);

        if ("value" in config) {
            this._mode = "static";
            this._staticValue = config.value;
            return;
        }

        this._mode = config.mode;
        this._xList.initialize(config.xListData);
        this._yList.initialize(
            config.yListData ? config.yListData : config.xListData,
        );

        if (this._mode === "list") {
            this._emitter.addToActiveUpdateBehaviors(this);
        }
    }

    /**
     * @inheritdoc
     */
    public getConfig(): ScaleBehaviorConfig | undefined {
        if (
            !this._emitter.isBehaviorInitActive(this) &&
            !this._emitter.isBehaviorUpdateActive(this)
        ) {
            return undefined;
        }

        if (this._mode === "static") {
            return {
                value: this._staticValue,
            };
        }

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
        };
    }

    /**
     * @inheritdoc
     */
    public init(particle: EmitterParticle): void {
        if (this._mode === "static") {
            particle.scaleX = this._staticValue.x;
            particle.scaleY = this._staticValue.y;
            return;
        }

        const i = this._mode === "random" ? Math.random() : 0;
        const xScale = this._xList.interpolate(i);
        const yScale = this._yList.interpolate(i);

        particle.scaleX = xScale;
        particle.scaleY = yScale;
    }

    /**
     * @inheritdoc
     */
    public update(particle: EmitterParticle): void {
        const xScale = this._xList.interpolate(particle.data.agePercent);
        const yScale = this._yList.interpolate(particle.data.agePercent);

        particle.scaleX = xScale;
        particle.scaleY = yScale;
    }

    /**
     * @inheritdoc
     */
    protected reset(): void {
        this._mode = "static";
        this._staticValue.x = 1;
        this._staticValue.y = 1;

        this._emitter.removeFromActiveInitBehaviors(this);
        this._emitter.removeFromActiveUpdateBehaviors(this);
    }
}
