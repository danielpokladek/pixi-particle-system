import { ParticleContainer, Ticker } from "pixi.js";
import pkg from "../package.json";
import { AlphaBehavior } from "./behavior/built-in/AlphaBehavior";
import { ColorBehavior } from "./behavior/built-in/ColorBehavior";
import { MovementBehavior } from "./behavior/built-in/MovementBehavior";
import { RotationBehavior } from "./behavior/built-in/RotationBehavior";
import { ScaleBehavior } from "./behavior/built-in/ScaleBehavior";
import { SpawnBehavior } from "./behavior/built-in/SpawnBehavior";
import { TextureBehavior } from "./behavior/built-in/TextureBehavior";
import { InitBehavior, UpdateBehavior } from "./behavior/EmitterBehavior";
import { Ease, EaseFunction, getEaseFunction } from "./data/easing/Ease";
import { EmitterConfig } from "./EmitterConfig";
import {
    BaseParticleData,
    createBaseParticleData,
    EmitterParticle,
    IEmitterParticle,
} from "./particle/EmitterParticle";

/**
 * Extra emitter options allowing for custom particles/particle data.
 * @template DataType Type describing the data object stored on particles.
 * @template ParticleType Type describing the particle used within the emitter.
 * @group Emitter/
 */
export type EmitterOptions<
    DataType extends BaseParticleData = BaseParticleData,
    ParticleType extends IEmitterParticle<DataType> =
        IEmitterParticle<DataType>,
> = {
    /**
     * Creates and returns object containing particle data. By default,
     * uses {@link BaseParticleData} object to store particle data.
     * @returns New particle data object.
     */
    dataFactory?: () => DataType;

    /**
     * Creates and returns new instance of a particle. By default,
     * uses {@link EmitterParticle} as the base particle class.
     * @param data Data used by the particle.
     * @returns New particle instance.
     */
    particleFactory?: (data: DataType) => ParticleType;

    /**
     * Initializes any custom data for the particles. By default,
     * does nothing, as there is no custom data.
     * @param data Data used by the particle.
     */
    customDataInitializer?: (data: DataType) => void;
};

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
 * @template DataType Type describing the data object stored on particles.
 * @template ParticleType Type describing the particle used within the emitter.
 * @group Emitter
 */
export class Emitter<
    DataType extends BaseParticleData = BaseParticleData,
    ParticleType extends IEmitterParticle<DataType> = EmitterParticle<DataType>,
> {
    private readonly _version: string = pkg.version;

    private readonly _dataFactory: () => DataType;
    private readonly _particleFactory: (data: DataType) => ParticleType;
    private readonly _customDataInitializer: (data: DataType) => void;

    private readonly _parent: ParticleContainer;

    private readonly _particles: ParticleType[] = [];
    private readonly _pooledParticles: ParticleType[] = [];

    // prettier-ignore
    private readonly _initBehaviors: InitBehavior<DataType, ParticleType>[] = [];
    // prettier-ignore
    private readonly _updateBehaviors: UpdateBehavior<DataType, ParticleType>[] = [];

    // prettier-ignore
    private readonly _alphaBehavior: AlphaBehavior<DataType, ParticleType>;
    // prettier-ignore
    private readonly _colorBehavior: ColorBehavior<DataType, ParticleType>;
    // prettier-ignore
    private readonly _movementBehavior: MovementBehavior<DataType, ParticleType>;
    // prettier-ignore
    private readonly _rotationBehavior: RotationBehavior<DataType, ParticleType>;
    // prettier-ignore
    private readonly _scaleBehavior: ScaleBehavior<DataType, ParticleType>;
    // prettier-ignore
    private readonly _spawnBehavior: SpawnBehavior<DataType, ParticleType>;
    // prettier-ignore
    private readonly _textureBehavior: TextureBehavior<DataType, ParticleType>;

    private _ease: Ease = "linear";
    private _easeFunction: EaseFunction | null = null;

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
     * @param options Optional factories and initializers for custom particle data and particles.
     */
    constructor(
        parent: ParticleContainer,
        initialConfig?: EmitterConfig,
        options?: EmitterOptions<DataType, ParticleType>,
    ) {
        this._parent = parent;

        this._dataFactory =
            options?.dataFactory ??
            ((): DataType => createBaseParticleData() as DataType);

        this._particleFactory =
            options?.particleFactory ??
            ((data: DataType): ParticleType =>
                new EmitterParticle<DataType>(data) as ParticleType);

        this._customDataInitializer =
            options?.customDataInitializer ?? ((): void => undefined);

        this._alphaBehavior = new AlphaBehavior(this);
        this._colorBehavior = new ColorBehavior(this);
        this._movementBehavior = new MovementBehavior(this);
        this._rotationBehavior = new RotationBehavior(this);
        this._scaleBehavior = new ScaleBehavior(this);
        this._spawnBehavior = new SpawnBehavior(this);
        this._textureBehavior = new TextureBehavior(this);

        // ! These are always active.
        this._initBehaviors.push(this._spawnBehavior, this._textureBehavior);

        if (initialConfig != null) {
            this.applyConfig(initialConfig);
        }
    }

    //#region Getters and Setters
    /**
     * Current version of the emitter.
     */
    public get version(): string {
        return this._version;
    }

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
     * Ease applied to particle lifetime.
     */
    public get ease(): Ease {
        return this._ease;
    }
    public set ease(value: Ease) {
        this._ease = value;
        this._easeFunction = getEaseFunction(this._ease);
    }

    /**
     * Alpha behavior of the emitter.
     */
    public get alphaBehavior(): AlphaBehavior<DataType, ParticleType> {
        return this._alphaBehavior;
    }

    /**
     * Color behavior of the emitter.
     */
    public get colorBehavior(): ColorBehavior<DataType, ParticleType> {
        return this._colorBehavior;
    }

    /**
     * Movement behavior of the emitter.
     */
    public get movementBehavior(): MovementBehavior<DataType, ParticleType> {
        return this._movementBehavior;
    }

    /**
     * Rotation behavior of the emitter.
     */
    public get rotationBehavior(): RotationBehavior<DataType, ParticleType> {
        return this._rotationBehavior;
    }

    /**
     * Scale behavior of the emitter.
     */
    public get scaleBehavior(): ScaleBehavior<DataType, ParticleType> {
        return this._scaleBehavior;
    }

    /**
     * Spawn behavior of the emitter.
     */
    public get spawnBehavior(): SpawnBehavior<DataType, ParticleType> {
        return this._spawnBehavior;
    }

    /**
     * Texture behavior of the emitter.
     */
    public get textureBehavior(): TextureBehavior<DataType, ParticleType> {
        return this._textureBehavior;
    }
    //#endregion

    /**
     * Applies a configuration to the emitter.
     * @param config Configuration to apply.
     */
    public applyConfig(config: EmitterConfig): void {
        this.checkCompatibility(config.emitterVersion);

        this._minLifetime = config.minParticleLifetime ?? 0.2;
        this._maxLifetime = config.maxParticleLifetime ?? 0.5;
        this._spawnInterval = config.spawnInterval ?? 0.1;
        this._spawnChance = config.spawnChance ?? 1;
        this._maxParticles = config.maxParticles ?? 500;
        this._addAtBack = config.addAtBack ?? true;
        this._particlesPerWave = config.particlesPerWave ?? 1;

        if (config.ease) {
            this._ease = config.ease;
            this._easeFunction = getEaseFunction(config.ease);
        } else {
            this._ease = "linear";
            this._easeFunction = null;
        }

        if (config.alphaBehavior) {
            this._alphaBehavior.applyConfig(config.alphaBehavior);
        } else {
            this.removeFromActiveInitBehaviors(this._alphaBehavior);
            this.removeFromActiveUpdateBehaviors(this._alphaBehavior);
        }

        if (config.colorBehavior) {
            this._colorBehavior.applyConfig(config.colorBehavior);
        } else {
            this.removeFromActiveInitBehaviors(this._colorBehavior);
            this.removeFromActiveUpdateBehaviors(this._colorBehavior);
        }

        if (config.movementBehavior) {
            this._movementBehavior.applyConfig(config.movementBehavior);
        } else {
            this.removeFromActiveInitBehaviors(this._movementBehavior);
            this.removeFromActiveUpdateBehaviors(this._movementBehavior);
        }

        if (config.rotationBehavior) {
            this._rotationBehavior.applyConfig(config.rotationBehavior);
        } else {
            this.removeFromActiveInitBehaviors(this._rotationBehavior);
            this.removeFromActiveUpdateBehaviors(this._rotationBehavior);
        }

        if (config.scaleBehavior) {
            this._scaleBehavior.applyConfig(config.scaleBehavior);
        } else {
            this.removeFromActiveInitBehaviors(this._scaleBehavior);
            this.removeFromActiveUpdateBehaviors(this._scaleBehavior);
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
            emitterVersion: this._version,
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

            let particle: ParticleType;

            if (this._pooledParticles.length > 0) {
                particle = this._pooledParticles.pop()!;
                particle.onFetch();
            } else {
                const particleData = this._dataFactory();
                particle = this._particleFactory(particleData);
            }

            this._customDataInitializer(particle.data);

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
    public isBehaviorInitActive(
        behavior: InitBehavior<DataType, ParticleType>,
    ): boolean {
        return this._initBehaviors.indexOf(behavior) !== -1;
    }

    /**
     * Checks if a behavior is currently active in the emitter's update behaviors.
     * @param behavior Behavior to check.
     * @returns Whether the behavior is active.
     */
    public isBehaviorUpdateActive(
        behavior: UpdateBehavior<DataType, ParticleType>,
    ): boolean {
        return this._updateBehaviors.indexOf(behavior) !== -1;
    }

    /**
     * Adds a behavior to the active init behaviors.
     * @param behavior Behavior to add.
     */
    public addToActiveInitBehaviors(
        behavior: InitBehavior<DataType, ParticleType>,
    ): void {
        if (this.isBehaviorInitActive(behavior)) return;

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
    public addToActiveUpdateBehaviors(
        behavior: UpdateBehavior<DataType, ParticleType>,
    ): void {
        if (this.isBehaviorUpdateActive(behavior)) return;

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
        behavior: InitBehavior<DataType, ParticleType>,
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
        behavior: UpdateBehavior<DataType, ParticleType>,
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
                let lerp = particle.data.age * particle.data.oneOverLifetime;

                if (this._easeFunction) {
                    lerp = this._easeFunction(lerp);
                }

                particle.data.agePercent = lerp;

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

                const newParticles: ParticleType[] = [];

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

                    let particle: ParticleType;

                    if (this._pooledParticles.length > 0) {
                        particle = this._pooledParticles.pop()!;
                        particle.onFetch();
                    } else {
                        const particleData = this._dataFactory();
                        particle = this._particleFactory(particleData);
                    }

                    this._customDataInitializer(particle.data);

                    const particleData = particle.data;
                    particleData.maxLifetime = lifetime;
                    particleData.oneOverLifetime = 1 / lifetime;

                    let lerp =
                        particle.data.age * particle.data.oneOverLifetime;

                    if (this._easeFunction) {
                        lerp = this._easeFunction(lerp);
                    }

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
    private recycleParticle(particle: ParticleType): void {
        this._parent.removeParticle(particle);

        particle.onRecycle();

        this._pooledParticles.push(particle);
    }

    /**
     * Parses a version string into major/minor/patch components.
     * @param version Version string to parse.
     * @returns Parsed version components.
     */
    private parseVersionString(version: string): {
        major: number;
        minor: number;
        patch: number;
    } {
        const parts = version.split(".").map((part) => parseInt(part, 10));

        return {
            major: parts[0] || 0,
            minor: parts[1] || 0,
            patch: parts[2] || 0,
        };
    }

    /**
     * Checks compatibility between the emitter version and config version.
     * @param configVersion Config version to check.
     */
    private checkCompatibility(configVersion: string): void {
        if (this._version === "dev") return;

        const current = this.parseVersionString(this._version);
        const config = this.parseVersionString(configVersion);

        if (current.major !== config.major) {
            // eslint-disable-next-line no-console
            console.error(
                `Emitter config major version (${config.major}) does not match emitter major version (${current.major}).`,
                "This will most likely result in unexpected behavior, or outright failure.",
            );

            return;
        }

        if (current.minor !== config.minor) {
            // eslint-disable-next-line no-console
            console.warn(
                `Emitter config minor version (${config.minor}) does not match emitter minor version (${current.minor}).`,
                "This may result in unexpected behavior.",
            );
        }

        // Patch version differences are ignored, as they should only contain bug fixes.
        // ? If needed, a log can be added here for patch version differences.
    }
}
