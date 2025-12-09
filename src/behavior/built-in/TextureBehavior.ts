import { Texture } from "pixi.js";
import { EmitterParticle } from "../../particle/EmitterParticle";
import {
  EmitterBehavior,
  InitBehavior,
  UpdateBehavior,
} from "../EmitterBehavior";

export type TextureConfig = {
  textures: Texture[];
  framerate?: number;
  duration?: number;
  loop?: boolean;
};

export type TextureBehaviorConfig = {
  textureConfigs: TextureConfig[];
  mode: "animated" | "static";
};

export class TextureBehavior
  extends EmitterBehavior<TextureBehaviorConfig>
  implements
    InitBehavior<TextureBehaviorConfig>,
    UpdateBehavior<TextureBehaviorConfig>
{
  private _textureConfigs: TextureConfig[] = [];
  private _mode: "animated" | "static" = "static";

  /**
   * @inheritdoc
   */
  public applyConfig(config: TextureBehaviorConfig): void {
    super.applyConfig(config);

    // this._emitter.parent.texture = config.textureConfigs[0].textures[0];
    this._textureConfigs = config.textureConfigs;
    this._mode = config.mode;

    if (config.mode === "animated") {
      this._emitter.addToActiveUpdateBehaviors(this);
    }
  }

  public getConfig(): TextureBehaviorConfig {
    // TODO DP: Handle this properly.
    return null as unknown as TextureBehaviorConfig;
  }

  public init(particle: EmitterParticle): void {
    if (this._textureConfigs.length === 0) {
      particle.texture = Texture.WHITE;
      return;
    }

    const config =
      this._textureConfigs[
        Math.floor(Math.random() * this._textureConfigs.length)
      ];

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

    // this._emitter.parent.texture = texture;
    particle.texture = texture;

    // particle.texture = Texture.WHITE;
  }

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
      throw new Error(
        `Texture undefined in TextureBehavior update ${frameIndex}`,
      );
    }
  }

  protected reset(): void {
    this._textureConfigs.length = 0;
    this._mode = "static";

    this._emitter.removeFromActiveUpdateBehaviors(this);
  }
}
