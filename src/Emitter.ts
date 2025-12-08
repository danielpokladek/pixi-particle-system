import { ParticleContainer, Ticker } from "pixi.js";
import { SpawnBehavior } from "./behavior/built-in/SpawnBehavior";
import { InitBehavior, UpdateBehavior } from "./behavior/EmitterBehavior";
import { EmitterParticle } from "./particle/EmitterParticle";

/**
 * Emitter class which handles particle spawning and updating.
 */
export class Emitter {
  private readonly _parent: ParticleContainer;

  private readonly _particles: EmitterParticle[] = [];
  private readonly _pooledParticles: EmitterParticle[] = [];

  private readonly _minLifetime: number = 1;
  private readonly _maxLifetime: number = 3;

  private readonly _spawnInterval: number = 0.01;
  private readonly _spawnChance: number = 1.0;

  private readonly _maxParticles: number = 500;
  private readonly _addAtBack: boolean = true;

  private readonly _particlesPerWave: number = 1;

  private readonly _initBehaviors: InitBehavior<unknown>[] = [];
  private readonly _updateBehaviors: UpdateBehavior<unknown>[] = [];

  // *** Built-In Behaviors *** //
  private readonly _spawnBehavior: SpawnBehavior;
  // *** ---            --- *** //

  private _particleCount: number = 0;

  private _emit: boolean = false;

  private _spawnTimer: number = 0;
  private _emitterLife: number = -1;

  private _onComplete: (() => void) | null = null;

  /**
   * Creates a new Emitter instance.
   * @param parent Parent ParticleContainer for the emitter.
   */
  constructor(parent: ParticleContainer) {
    this._parent = parent;

    this._spawnBehavior = new SpawnBehavior();
    this._spawnBehavior.applyConfig({
      shape: "rectangle",
      width: 300,
      height: 300,
    });
    this._initBehaviors.push(this._spawnBehavior);
  }

  /**
   * Current number of active particles in the emitter.
   */
  public get particleCount(): number {
    return this._particleCount;
  }

  /**
   * Maximum number of particles allowed in the emitter.
   */
  public get maxParticles(): number {
    return this._maxParticles;
  }

  /**
   * Starts the emitter.
   */
  public play(): void {
    this._emit = true;
    Ticker.shared.add(this.update, this);
  }

  /**
   * Updates the emitter.
   * @param ticker Ticker instance.
   */
  private update(ticker: Ticker): void {
    const deltaTime = ticker.elapsedMS * 0.001;

    // *** Update Existing Particles First *** //

    for (let i = this._particles.length - 1; i >= 0; i--) {
      const particle = this._particles[i];
      const particleData = particle.data;

      particleData.age += deltaTime;
      particleData.agePercent = particleData.age / particleData.maxLifetime;

      if (particleData.age > particleData.maxLifetime || particleData.age < 0) {
        this._particles[i] = this._particles[this._particles.length - 1];
        this._particles.pop();
        this._particleCount--;

        this.recycleParticle(particle);
      } else {
        const lerp = particleData.age * particleData.maxLifetime;

        // TODO DP: Custom ease implementation.

        particleData.agePercent = lerp;

        // TODO DP: Loop through update behaviors and update particle.
      }
    }

    if (this._emit) {
      this._spawnTimer -= deltaTime < 0 ? 0 : deltaTime;

      while (this._spawnTimer <= 0) {
        if (this._emitterLife >= 0) {
          this._emitterLife -= this._spawnInterval;

          if (this._emitterLife <= 0) {
            this._spawnTimer = 0;
            this._emitterLife = 0;
            this._emit = false;

            console.debug("Emitter lifetime ended.");
            break;
          }
        }

        // Particles are maxed out, continue to next frame.
        if (this._particleCount >= this._maxParticles) {
          this._spawnTimer += this._spawnInterval;
          continue;
        }

        const newParticles: EmitterParticle[] = [];

        for (let i = 0; i < this._particlesPerWave; i++) {
          if (Math.random() > this._spawnChance) continue;

          let lifetime;

          if (this._minLifetime === this._maxLifetime) {
            lifetime = this._maxLifetime;
          } else {
            lifetime =
              Math.random() * (this._maxLifetime - this._minLifetime) +
              this._minLifetime;
          }

          // Skip spawning if particle was to die instantly.
          if (-this._spawnTimer >= lifetime) {
            continue;
          }

          let particle: EmitterParticle;

          if (this._pooledParticles.length > 0) {
            particle = this._pooledParticles.pop()!;
            particle.reset();
          } else {
            particle = new EmitterParticle();
          }

          const particleData = particle.data;
          particleData.maxLifetime = lifetime;
          particleData.oneOverLifetime = 1 / lifetime;

          // TODO DP: Debug, remove when behaviors are added.
          particle.scaleX = 10;
          particle.scaleY = 10;
          particle.alpha = 1;

          if (this._addAtBack) {
            this._parent.addParticle(particle);
          } else {
            this._parent.addParticleAt(particle, 0);
          }

          // this._particles.push(particle);
          newParticles.push(particle);
          ++this._particleCount;
        }

        // TODO DP: Loop through initialize behaviors and initialize newParticles.
        // TODO DP: Loop through update behaviors and update newParticles for first frame.

        for (const particle of newParticles) {
          for (const behavior of this._initBehaviors) {
            behavior.init(particle);
          }
        }

        this._particles.push(...newParticles);
        this._spawnTimer += this._spawnInterval;
      }
    }

    if (!this._emit && this._particleCount === 0) {
      this._onComplete?.();
      this._onComplete = null;

      Ticker.shared.remove(this.update, this);

      console.debug("Emitter has completed emitting.");
    }
  }

  /**
   * Recycles a particle back into the pool.
   * @param particle Particle to recycle.
   */
  private recycleParticle(particle: EmitterParticle): void {
    particle.reset();
    particle.alpha = 0;
    this._pooledParticles.push(particle);
  }
}
