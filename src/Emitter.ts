import { ParticleContainer, Ticker } from "pixi.js";
import { AlphaBehavior } from "./behavior/built-in/AlphaBehavior";
import { ColorBehavior } from "./behavior/built-in/ColorBehavior";
import { RotationBehavior } from "./behavior/built-in/RotationBehavior";
import { ScaleBehavior } from "./behavior/built-in/ScaleBehavior";
import { SpawnBehavior } from "./behavior/built-in/SpawnBehavior";
import { TextureBehavior } from "./behavior/built-in/TextureBehavior";
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
    private readonly _textureBehavior: TextureBehavior;
    // *** ---            --- *** //

    private _minLifetime: number = 1;
    private _maxLifetime: number = 3;

    private _spawnInterval: number = 0.01;
    private _spawnChance: number = 1.0;

    private _maxParticles: number = 500;
    private _addAtBack: boolean = true;

    private _particlesPerWave: number = 1;

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
        this._alphaBehavior = new AlphaBehavior(this);
        this._colorBehavior = new ColorBehavior(this);
        this._scaleBehavior = new ScaleBehavior(this);
        this._rotationBehavior = new RotationBehavior(this);
        this._textureBehavior = new TextureBehavior(this);

        // Spawn behavior is always active.
        this._initBehaviors.push(this._spawnBehavior, this._textureBehavior);

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
     * Texture behavior of the emitter.
     */
    public get textureBehavior(): TextureBehavior {
        return this._textureBehavior;
    }

    /**
     * Parent ParticleContainer of the emitter.
     */
    public get parent(): ParticleContainer {
        return this._parent;
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

        if (config.textureBehavior) {
            this._textureBehavior.applyConfig(config.textureBehavior);
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
     * Stops the emitter.
     * @param instant Whether to stop instantly or let existing particles die out.
     */
    public stop(instant: boolean = false): void {
        this._emit = false;

        if (instant) {
            Ticker.shared.remove(this.update, this);

            for (const particle of this._particles) {
                this.recycleParticle(particle);
            }

            this._particles.length = 0;
            this._particleCount = 0;

            this._onComplete?.();
            this._onComplete = null;

            return;
        }
    }

    /**
     * Prewarms the emitter by simulating particle spawning and updating for a given time.
     * @param time Time in seconds to prewarm the emitter.
     */
    public prewarm(time: number): void {
        if (time <= 0 || this._emit === true) return;

        const spawnCycles = Math.floor(time / this._spawnInterval);
        const maxCycles = Math.min(spawnCycles, this._maxParticles);

        for (let cycle = 0; cycle < maxCycles; cycle++) {
            const particleAge = cycle * this._spawnInterval;

            if (particleAge > this._maxLifetime) continue;

            if (Math.random() > this._spawnChance) continue;

            const lifetime =
                this._minLifetime === this._maxLifetime
                    ? this._maxLifetime
                    : Math.random() * (this._maxLifetime - this._minLifetime);

            if (particleAge >= lifetime) continue;

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
            particleData.age = particleAge;
            particleData.agePercent = particleAge / lifetime;

            for (const behavior of this._initBehaviors) {
                behavior.init(particle);
            }

            for (const behavior of this._updateBehaviors) {
                behavior.update(particle, particleAge);
            }

            if (this._addAtBack) {
                this._parent.addParticle(particle);
            } else {
                this._parent.addParticleAt(particle, 0);
            }

            for (const behavior of this._initBehaviors) {
                behavior.init(particle);
            }

            for (const behavior of this._updateBehaviors) {
                behavior.update(particle, 0);
            }

            this._particles.push(particle);
            ++this._particleCount;

            if (this._particleCount >= this._maxParticles) break;
        }

        this.play();
    }

    /**
     * Adds a behavior to the active init behaviors.
     * @param behavior Behavior to add.
     */
    public addToActiveInitBehaviors(behavior: InitBehavior<unknown>): void {
        this._initBehaviors.push(behavior);

        this._initBehaviors.sort((a, b) => {
            const orderA = a.updateOrder;
            const orderB = b.updateOrder;

            if (orderA === orderB) return 0;
            if (orderA === "initial") return -1;
            if (orderB === "initial") return 1;
            if (orderA === "normal" && orderB === "late") return -1;
            if (orderA === "late" && orderB === "normal") return 1;

            return 0;
        });
    }

    /**
     * Adds a behavior to the active update behaviors.
     * @param behavior Behavior to add.
     */
    public addToActiveUpdateBehaviors(behavior: UpdateBehavior<unknown>): void {
        this._updateBehaviors.push(behavior);

        this._updateBehaviors.sort((a, b) => {
            const orderA = a.updateOrder;
            const orderB = b.updateOrder;

            if (orderA === orderB) return 0;
            if (orderA === "initial") return -1;
            if (orderB === "initial") return 1;
            if (orderA === "normal" && orderB === "late") return -1;
            if (orderA === "late" && orderB === "normal") return 1;

            return 0;
        });
    }

    /**
     * Removes a behavior from the active init behaviors.
     * @param behavior Behavior to remove.
     */
    public removeFromActiveInitBehaviors(
        behavior: InitBehavior<unknown>,
    ): void {
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

        for (let i = this._particles.length - 1; i >= 0; i--) {
            const particle = this._particles[i];
            const particleData = particle.data;

            particleData.age += deltaTime;
            particleData.agePercent =
                particleData.age / particleData.maxLifetime;

            if (
                particleData.age > particleData.maxLifetime ||
                particleData.age < 0
            ) {
                this._particles[i] =
                    this._particles[this._particles.length - 1];
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
                            Math.random() *
                                (this._maxLifetime - this._minLifetime) +
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

                    if (this._addAtBack) {
                        this._parent.addParticle(particle);
                    } else {
                        this._parent.addParticleAt(particle, 0);
                    }

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
        }
    }

    /**
     * Recycles a particle back into the pool.
     * @param particle Particle to recycle.
     */
    private recycleParticle(particle: EmitterParticle): void {
        this._parent.removeParticle(particle);

        particle.reset();

        this._pooledParticles.push(particle);
    }
}
