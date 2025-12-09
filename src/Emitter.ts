import { ParticleContainer, Ticker } from "pixi.js";
import { AlphaBehavior } from "./behavior/built-in/AlphaBehavior";
import { ColorBehavior } from "./behavior/built-in/ColorBehavior";
import { RotationBehavior } from "./behavior/built-in/RotationBehavior";
import { ScaleBehavior } from "./behavior/built-in/ScaleBehavior";
import { SpawnBehavior } from "./behavior/built-in/SpawnBehavior";
import { InitBehavior, UpdateBehavior } from "./behavior/EmitterBehavior";
import { EmitterConfig } from "./EmitterConfig";
import { EmitterParticle } from "./particle/EmitterParticle";

/**
 * Emitter class which handles particle spawning and updating.
 */
export class Emitter {
  private readonly _emitterVersion: number = 0;

  private readonly _parent: ParticleContainer;

  private readonly _particles: EmitterParticle[] = [];
  private readonly _pooledParticles: EmitterParticle[] = [];

  private readonly _initBehaviors: InitBehavior<unknown>[] = [];
  private readonly _updateBehaviors: UpdateBehavior<unknown>[] = [];

  // *** Built-In Behaviors *** //
  private readonly _spawnBehavior: SpawnBehavior;
  private readonly _colorBehavior: ColorBehavior;
  private readonly _alphaBehavior: AlphaBehavior;
  private readonly _scaleBehavior: ScaleBehavior;
  private readonly _rotationBehavior: RotationBehavior;

  private _minLifetime: number = 1;
  private _maxLifetime: number = 3;

  private _spawnInterval: number = 0.01;
  private _spawnChance: number = 1.0;

  private _maxParticles: number = 500;
  private _addAtBack: boolean = true;

  private _particlesPerWave: number = 1;

  // *** ---            --- *** //

  private _particleCount: number = 0;

  private _emit: boolean = false;

  private _spawnTimer: number = 0;
  private _emitterLife: number = -1;

  private _onComplete: (() => void) | null = null;

  /**
   * Creates a new Emitter instance.
   * @param parent Parent ParticleContainer for the emitter.
   * @param initialConfig Optional initial configuration for the emitter.
   */
  constructor(parent: ParticleContainer, initialConfig?: EmitterConfig) {
    this._parent = parent;

    this._spawnBehavior = new SpawnBehavior(this);
    this._spawnBehavior.applyConfig({
      shape: "rectangle",
      width: 300,
      height: 300,
    });

    this._alphaBehavior = new AlphaBehavior(this);
    this._colorBehavior = new ColorBehavior(this);
    this._scaleBehavior = new ScaleBehavior(this);
    this._rotationBehavior = new RotationBehavior(this);

    // Spawn behavior is always active.
    this._initBehaviors.push(this._spawnBehavior);

    if (initialConfig) {
      this.applyConfig(initialConfig);
    }
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
   * Applies a configuration to the emitter.
   * @param config Configuration to apply.
   */
  public applyConfig(config: EmitterConfig): void {
    if (config.emitterVersion !== this._emitterVersion) {
      // eslint-disable-next-line no-console
      console.warn(
        `Emitter config version (${config.emitterVersion}) does not match emitter version (${this._emitterVersion}).`,
        "This may result in unexpected behavior.",
      );
    }

    this._minLifetime = config.minParticleLifetime;
    this._maxLifetime = config.maxParticleLifetime;
    this._spawnInterval = config.spawnInterval;
    this._spawnChance = config.spawnChance;
    this._maxParticles = config.maxParticles;
    this._addAtBack = config.addAtBack;
    this._particlesPerWave = config.particlesPerWave;

    if (config.alphaBehavior) {
      this._alphaBehavior.applyConfig(config.alphaBehavior);
    }

    if (config.colorBehavior) {
      this._colorBehavior.applyConfig(config.colorBehavior);
    }

    if (config.rotationBehavior) {
      this._rotationBehavior.applyConfig(config.rotationBehavior);
    }

    if (config.scaleBehavior) {
      this._scaleBehavior.applyConfig(config.scaleBehavior);
    }

    if (config.spawnBehavior) {
      this._spawnBehavior.applyConfig(config.spawnBehavior);
    }
  }

  /**
   * Starts the emitter.
   */
  public play(): void {
    this._emit = true;
    Ticker.shared.add(this.update, this);
  }

  /**
   * Adds a behavior to the active init behaviors.
   * @param behavior Behavior to add.
   */
  public addToActiveInitBehaviors(behavior: InitBehavior<unknown>): void {
    this._initBehaviors.push(behavior);
  }

  /**
   * Adds a behavior to the active update behaviors.
   * @param behavior Behavior to add.
   */
  public addToActiveUpdateBehaviors(behavior: UpdateBehavior<unknown>): void {
    this._updateBehaviors.push(behavior);
  }

  /**
   * Removes a behavior from the active init behaviors.
   * @param behavior Behavior to remove.
   */
  public removeFromActiveInitBehaviors(behavior: InitBehavior<unknown>): void {
    const index = this._initBehaviors.indexOf(behavior);
    if (index !== -1) {
      this._initBehaviors.splice(index, 1);
    }
  }

  /**
   * Removes a behavior from the active update behaviors.
   * @param behavior Behavior to remove.
   */
  public removeFromActiveUpdateBehaviors(
    behavior: UpdateBehavior<unknown>,
  ): void {
    const index = this._updateBehaviors.indexOf(behavior);
    if (index !== -1) {
      this._updateBehaviors.splice(index, 1);
    }
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
        // TODO DP: Custom ease implementation.

        for (const behavior of this._updateBehaviors) {
          behavior.update(particle, deltaTime);
        }
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

        for (const particle of newParticles) {
          for (const behavior of this._initBehaviors) {
            behavior.init(particle);
          }

          for (const behavior of this._updateBehaviors) {
            behavior.update(particle, -this._spawnTimer);
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
