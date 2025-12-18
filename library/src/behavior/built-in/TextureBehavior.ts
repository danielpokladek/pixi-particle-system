import { Texture } from "pixi.js";
import { EmitterError } from "../../error";
import { EmitterParticle } from "../../particle/EmitterParticle";
import { BehaviorMode, BehaviorOrder } from "../../util/Types";
import {
    EmitterBehavior,
    InitBehavior,
    UpdateBehavior,
} from "../EmitterBehavior";

/**
 * Type describing the texture behavior modes.
 */
type TextureBehaviorMode = Extract<
    BehaviorMode,
    "static" | "random" | "animated"
>;

/**
 * Type defining the configuration for TextureBehavior.
 */
export type TextureConfig = {
    textures: Texture[];
    framerate?: number;
    duration?: number;
    loop?: boolean;
};

/**
 * Type defining the configuration for TextureBehavior.
 */
export type TextureBehaviorConfig = {
    textureConfigs: TextureConfig[];
    mode: TextureBehaviorMode;
};

/**
 * Behavior which handles particle textures.
 */
export class TextureBehavior
    extends EmitterBehavior<TextureBehaviorConfig>
    implements
        InitBehavior<TextureBehaviorConfig>,
        UpdateBehavior<TextureBehaviorConfig>
{
    private _textureConfigs: TextureConfig[] = [];
    private _mode: TextureBehaviorMode = "static";

    /**
     * @inheritdoc
     */
    public get updateOrder(): BehaviorOrder {
        return "initial";
    }

    /**
     * @inheritdoc
     */
    public applyConfig(config: TextureBehaviorConfig): void {
        super.applyConfig(config);

        this._textureConfigs = config.textureConfigs;
        this._mode = config.mode;

        if (this._mode === "animated") {
            this._emitter.addToActiveUpdateBehaviors(this);
        }
    }

    /**
     * @inheritdoc
     */
    public getConfig(): TextureBehaviorConfig | undefined {
        // TODO: Need to figure out a neat way to handle texture configs.
        // TODO:  Textures cannot be serialized, so this will be tricky.
        // TODO:  Could maybe return just the mode and length, and replace textures with placeholders?
        return undefined;
    }

    /**
     * @inheritdoc
     */
    public init(particle: EmitterParticle): void {
        if (this._textureConfigs.length === 0) {
            particle.texture = Texture.WHITE;
            return;
        }

        const config =
            this._textureConfigs[
                Math.floor(Math.random() * this._textureConfigs.length)
            ];

        if (this._mode === "static") {
            particle.texture = config.textures[0];
            return;
        }

        if (this._mode === "random") {
            particle.texture =
                config.textures[
                    Math.floor(Math.random() * config.textures.length)
                ];

            return;
        }

        const particleData = particle.data;

        particleData.textureConfig.textures = config.textures;
        particleData.textureConfig.elapsed = 0;

        if (!config.framerate || !config.duration) {
            particleData.textureConfig.duration = particle.data.maxLifetime;
            particleData.textureConfig.framerate =
                config.textures.length / particle.data.maxLifetime;
        } else {
            particleData.textureConfig.framerate = config.framerate;
            particleData.textureConfig.duration = config.duration;
        }

        const texture = config.textures[0];
        particle.texture = texture;
    }

    /**
     * @inheritdoc
     */
    public update(particle: EmitterParticle, deltaTime: number): void {
        const config = particle.data.textureConfig;
        config.elapsed += deltaTime;

        if (config.elapsed >= config.duration) {
            if (config.loop) {
                config.elapsed = config.elapsed % config.duration;
            } else {
                config.elapsed = config.duration - 0.000001;
            }
        }

        const frameIndex = (config.elapsed * config.framerate + 0.0000001) | 0;
        particle.texture = config.textures[frameIndex];

        if (particle.texture === undefined) {
            throw new EmitterError(
                `Texture undefined in TextureBehavior update ${frameIndex}`,
            );
        }
    }

    /**
     * @inheritdoc
     */
    protected reset(): void {
        this._textureConfigs.length = 0;
        this._mode = "static";

        this._emitter.removeFromActiveUpdateBehaviors(this);
    }
}
