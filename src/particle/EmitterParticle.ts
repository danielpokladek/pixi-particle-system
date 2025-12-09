import { Particle, Texture } from "pixi.js";

/**
 * Type defining the data stored in each particle.
 */
export type BaseParticleData = {
  maxLifetime: number;
  age: number;
  agePercent: number;
  oneOverLifetime: number;
};

/**
 * Interface defining an emitter particle.
 */
export interface IEmitterParticle extends Particle {
  data: BaseParticleData;

  /**
   * Resets the particle data.
   */
  reset(): void;
}

/**
 * Particle class used by the Emitter.
 */
export class EmitterParticle extends Particle implements IEmitterParticle {
  public data: BaseParticleData;

  constructor() {
    super(Texture.WHITE);

    this.data = {} as BaseParticleData;
    this.reset();
  }

  /**
   * @inheritdoc
   */
  public reset(): void {
    this.anchorX = 0.5;
    this.anchorY = 0.5;

    this.data.age = 0;
    this.data.agePercent = 0;
    this.data.maxLifetime = 0;
    this.data.oneOverLifetime = 0;
  }
}
