import { ParticleContainer, Ticker } from "pixi.js";
import { AlphaBehavior } from "./behavior/built-in/AlphaBehavior";
import { ColorBehavior } from "./behavior/built-in/ColorBehavior";
import { MovementBehavior } from "./behavior/built-in/MovementBehavior";
import { RotationBehavior } from "./behavior/built-in/RotationBehavior";
import { ScaleBehavior } from "./behavior/built-in/ScaleBehavior";
import { SpawnBehavior } from "./behavior/built-in/SpawnBehavior";
import { TextureBehavior } from "./behavior/built-in/TextureBehavior";
import { InitBehavior, UpdateBehavior } from "./behavior/EmitterBehavior";
import { EmitterConfig } from "./EmitterConfig";
import { EmitterParticle } from "./particle/EmitterParticle";

/**
 * Class responsible for spawning and managing particles using various behaviors.
 *
 * Emitter is the core class of the particle system, handling particle creation, updating,
 * and recycling. It utilizes a set of behaviors to define how particles are initialized
 * and updated over their lifetime.
 * @example
 * ```ts
 * const emitter = new Emitter(particleContainer, {
 *   emitterVersion: 0,
 *   minParticleLifetime: 1,
 *   maxParticleLifetime: 3,
 *   spawnInterval: 0.1,
 *   maxParticles: 500,
 *   alphaBehavior: {
 *     mode: "list",
 *     list: [1, 0]
 *   },
 *   scaleBehavior: {
 *     mode: "random",
 *     xList: [0.5, 1],
 *     yList: [0.5, 1]
 *   }
 * });
 *
 * emitter.play();
 * ```
 * @group Emitter
 */
export class Emitter {
    private readonly _emitterVersion: number = 0;

    private readonly _parent: ParticleContainer;

    private readonly _particles: EmitterParticle[] = [];
    private readonly _pooledParticles: EmitterParticle[] = [];

    private readonly _initBehaviors: InitBehavior[] = [];
    private readonly _updateBehaviors: UpdateBehavior[] = [];

    // *** Built-In Behaviors *** //
    private readonly _alphaBehavior: AlphaBehavior;
    private readonly _colorBehavior: ColorBehavior;
    private readonly _movementBehavior: MovementBehavior;
    private readonly _rotationBehavior: RotationBehavior;
    private readonly _scaleBehavior: ScaleBehavior;
    private readonly _spawnBehavior: SpawnBehavior;
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

    private _spawnTimer: number = 0;
    private _emitterLife: number = -1;

    private _onComplete: (() => void) | null = null;

    private _isActive: boolean = false;
    private _isEmitting: boolean = false;
    private _isPaused: boolean = false;

    /**
     * Creates a new Emitter.
     * @param parent Parent ParticleContainer to which particles will be added.
     * @param initialConfig Optional initial configuration for the emitter.
     */
    constructor(parent: ParticleContainer, initialConfig?: EmitterConfig) {
        this._parent = parent;

        this._alphaBehavior = new AlphaBehavior(this);
        this._colorBehavior = new ColorBehavior(this);
        this._movementBehavior = new MovementBehavior(this);
        this._rotationBehavior = new RotationBehavior(this);
        this._scaleBehavior = new ScaleBehavior(this);
        this._spawnBehavior = new SpawnBehavior(this);
        this._textureBehavior = new TextureBehavior(this);

        // Spawn behavior is always active.
        this._initBehaviors.push(this._spawnBehavior, this._textureBehavior);

        if (initialConfig != null) {
            this.applyConfig(initialConfig);
        }
    }

    //#region Getters and Setters
    /**
     * Parent ParticleContainer of the emitter.
     */
    public get parent(): ParticleContainer {
        return this._parent;
    }

    /**
     * Number of active particles in the emitter.
     */
    public get particleCount(): number {
        return this._particleCount;
    }

    /**
     * Whether the emitter is currently emitting new particles.
     */
    public get isEmitting(): boolean {
        return this._isEmitting;
    }

    /**
     * Whether the emitter is currently paused.
     */
    public get isPaused(): boolean {
        return this._isPaused;
    }

    /**
     * Minimum lifetime of particles in seconds.
     */
    public get minLifetime(): number {
        return this._minLifetime;
    }
    public set minLifetime(value: number) {
        this._minLifetime = value;
    }

    /**
     * Maximum lifetime of particles in seconds.
     */
    public get maxLifetime(): number {
        return this._maxLifetime;
    }
    public set maxLifetime(value: number) {
        this._maxLifetime = value;
    }

    /**
     * Interval between particle spawns in seconds.
     */
    public get spawnInterval(): number {
        return this._spawnInterval;
    }
    public set spawnInterval(value: number) {
        this._spawnInterval = value;
    }

    /**
     * Chance of spawning a particle (0.0 - 1.0).
     */
    public get spawnChance(): number {
        return this._spawnChance;
    }
    public set spawnChance(value: number) {
        this._spawnChance = value;
    }

    /**
     * Maximum number of particles allowed in the emitter.
     */
    public get maxParticles(): number {
        return this._maxParticles;
    }
    public set maxParticles(value: number) {
        this._maxParticles = value;
    }

    /**
     * Whether to add new particles at the back of the container.
     */
    public get addAtBack(): boolean {
        return this._addAtBack;
    }
    public set addAtBack(value: boolean) {
        this._addAtBack = value;
    }

    /**
     * Number of particles to spawn per wave.
     */
    public get particlesPerWave(): number {
        return this._particlesPerWave;
    }
    public set particlesPerWave(value: number) {
        this._particlesPerWave = value;
    }

    /**
     * Alpha behavior of the emitter.
     */
    public get alphaBehavior(): AlphaBehavior {
        return this._alphaBehavior;
    }

    /**
     * Color behavior of the emitter.
     */
    public get colorBehavior(): ColorBehavior {
        return this._colorBehavior;
    }

    /**
     * Movement behavior of the emitter.
     */
    public get movementBehavior(): MovementBehavior {
        return this._movementBehavior;
    }

    /**
     * Rotation behavior of the emitter.
     */
    public get rotationBehavior(): RotationBehavior {
        return this._rotationBehavior;
    }

    /**
     * Scale behavior of the emitter.
     */
    public get scaleBehavior(): ScaleBehavior {
        return this._scaleBehavior;
    }

    /**
     * Spawn behavior of the emitter.
     */
    public get spawnBehavior(): SpawnBehavior {
        return this._spawnBehavior;
    }

    /**
     * Texture behavior of the emitter.
     */
    public get textureBehavior(): TextureBehavior {
        return this._textureBehavior;
    }
    //#endregion

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

        this._minLifetime = config.minParticleLifetime ?? 0.2;
        this._maxLifetime = config.maxParticleLifetime ?? 0.5;
        this._spawnInterval = config.spawnInterval ?? 0.1;
        this._spawnChance = config.spawnChance ?? 1;
        this._maxParticles = config.maxParticles ?? 500;
        this._addAtBack = config.addAtBack ?? true;
        this._particlesPerWave = config.particlesPerWave ?? 1;

        if (config.alphaBehavior) {
            this._alphaBehavior.applyConfig(config.alphaBehavior);
        }

        if (config.colorBehavior) {
            this._colorBehavior.applyConfig(config.colorBehavior);
        }

        if (config.movementBehavior) {
            this._movementBehavior.applyConfig(config.movementBehavior);
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
     * Retrieves the current configuration for emitter and its behaviors.
     * @returns Current configuration object.
     */
    public getConfig(): EmitterConfig {
        return {
            emitterVersion: this._emitterVersion,
            minParticleLifetime: this._minLifetime,
            maxParticleLifetime: this._maxLifetime,
            spawnInterval: this._spawnInterval,
            spawnChance: this._spawnChance,
            maxParticles: this._maxParticles,
            addAtBack: this._addAtBack,
            particlesPerWave: this._particlesPerWave,

            alphaBehavior: this._alphaBehavior.getConfig(),
            colorBehavior: this._colorBehavior.getConfig(),
            movementBehavior: this._movementBehavior.getConfig(),
            rotationBehavior: this._rotationBehavior.getConfig(),
            scaleBehavior: this._scaleBehavior.getConfig(),
            spawnBehavior: this._spawnBehavior.getConfig(),
            textureBehavior: this._textureBehavior.getConfig(),
        };
    }

    /**
     * Starts the emitter and hooks into the shared ticker.
     */
    public play(): void {
        this._isEmitting = true;

        if (!this._isActive) {
            this._isActive = true;
            Ticker.shared.add(this.update, this);
        }
    }

    /**
     * Pauses the emitter by unhooking from the shared ticker.
     */
    public pause(): void {
        if (!this._isActive || this._isPaused) return;

        this._isPaused = true;
        Ticker.shared.remove(this.update, this);
    }

    /**
     * Resumes the emitter by rehooking into the shared ticker.
     */
    public resume(): void {
        if (!this._isActive || !this._isPaused) return;

        this._isPaused = false;
        Ticker.shared.add(this.update, this);
    }

    /**
     * Stops new particles from spawning, and lets existing particles die naturally.
     * @param instant When true, particles are removed instantly.
     */
    public stop(instant: boolean = false): void {
        if (!this._isActive) return;

        this._isEmitting = false;

        if (instant) {
            // TODO: Move this to shared method since it's duplicated in update().
            Ticker.shared.remove(this.update, this);

            for (const particle of this._particles) {
                this.recycleParticle(particle);
            }

            this._particles.length = 0;
            this._particleCount = 0;

            this._onComplete?.();
            this._onComplete = null;

            this._isActive = false;

            return;
        }
    }

    /**
     * Prewarms the emitter by simulating particle spawning and updating for a given time.
     * @param time Time in seconds to prewarm the emitter.
     */
    public prewarm(time: number): void {
        if (this._isEmitting === true) {
            // eslint-disable-next-line no-console
            console.warn(
                "Emitter: Cannot prewarm an emitter that is already playing!",
            );
            return;
        }

        if (time <= 0) {
            // eslint-disable-next-line no-console
            console.warn("Emitter: Prewarm time must be greater than zero!");
            return;
        }

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

            this._particles.push(particle);
            ++this._particleCount;

            if (this._particleCount >= this._maxParticles) break;
        }

        this.play();
    }

    /**
     * Checks if a behavior is currently active in the emitter's init behaviors.
     * @param behavior Behavior to check.
     * @returns Whether the behavior is active.
     */
    public isBehaviorInitActive(behavior: InitBehavior): boolean {
        return this._initBehaviors.indexOf(behavior) !== -1;
    }

    /**
     * Checks if a behavior is currently active in the emitter's update behaviors.
     * @param behavior Behavior to check.
     * @returns Whether the behavior is active.
     */
    public isBehaviorUpdateActive(behavior: UpdateBehavior): boolean {
        return this._updateBehaviors.indexOf(behavior) !== -1;
    }

    /**
     * Adds a behavior to the active init behaviors.
     * @param behavior Behavior to add.
     */
    public addToActiveInitBehaviors(behavior: InitBehavior): void {
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
    public addToActiveUpdateBehaviors(behavior: UpdateBehavior): void {
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
    public removeFromActiveInitBehaviors(behavior: InitBehavior): void {
        const index = this._initBehaviors.indexOf(behavior);

        if (index !== -1) {
            this._initBehaviors.splice(index, 1);
        }
    }

    /**
     * Removes a behavior from the active update behaviors.
     * @param behavior Behavior to remove.
     */
    public removeFromActiveUpdateBehaviors(behavior: UpdateBehavior): void {
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
                // TODO: Lifetime ease implementation.

                for (const behavior of this._updateBehaviors) {
                    behavior.update(particle, deltaTime);
                }
            }
        }

        if (this._isEmitting) {
            this._spawnTimer -= deltaTime < 0 ? 0 : deltaTime;

            while (this._spawnTimer <= 0) {
                if (this._emitterLife >= 0) {
                    this._emitterLife -= this._spawnInterval;

                    if (this._emitterLife <= 0) {
                        this._spawnTimer = 0;
                        this._emitterLife = 0;
                        this._isEmitting = false;

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
                        this._parent.addParticleAt(particle, 0);
                    } else {
                        this._parent.addParticle(particle);
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

        this._parent.update();

        if (!this._isEmitting && this._particleCount === 0) {
            this._onComplete?.();
            this._onComplete = null;

            Ticker.shared.remove(this.update, this);

            this._isPaused = false;
            this._isActive = false;
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
