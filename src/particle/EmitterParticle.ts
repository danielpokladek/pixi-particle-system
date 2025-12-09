import { Particle, Texture } from "pixi.js";

/**
 * Particle class used by the Emitter.
 */
export class EmitterParticle extends Particle {
  public data: BaseParticleData;

  constructor() {
    super(Texture.WHITE);

    this.data = {
      maxLifetime: 1,
      age: 0,
      agePercent: 0,
      oneOverLifetime: 1,
    };
  }

  /**
   * Resets the particle data.
   */
  public reset(): void {
    this.data.age = 0;
    this.data.agePercent = 0;
    this.data.maxLifetime = 0;
    this.data.oneOverLifetime = 0;
  }
}

/**
 * Type defining the data stored in each particle.
 */
type BaseParticleData = {
  maxLifetime: number;
  age: number;
  agePercent: number;
  oneOverLifetime: number;
};
