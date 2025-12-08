import { Particle, Texture } from "pixi.js";

export class EmitterParticle extends Particle {
  public data: ParticleData;

  constructor() {
    super(Texture.WHITE);

    this.data = {
      maxLifetime: 1,
      age: 0,
      agePercent: 0,
      oneOverLifetime: 1,
    };
  }

  public reset(): void {
    this.data.age = 0;
    this.data.agePercent = 0;
    this.data.maxLifetime = 1;
    this.data.oneOverLifetime = 1;
  }
}

type ParticleData = {
  maxLifetime: number;
  age: number;
  agePercent: number;
  oneOverLifetime: number;
};
