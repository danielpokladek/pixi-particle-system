import { Emitter } from "../Emitter";
import { EmitterParticle } from "../particle/EmitterParticle";

/**
 * Abstract behavior class which all behaviors inherit from.
 */
export abstract class EmitterBehavior<Config> {
  protected readonly _emitter: Emitter;

  /**
   * Creates a new EmitterBehavior.
   * @param emitter Emitter instance this behavior belongs to.
   */
  constructor(emitter: Emitter) {
    this._emitter = emitter;
  }

  /**
   * Applies the config to behavior.
   * @param config Config to apply.
   */
  public applyConfig(config: Config): void {
    if (!config) return;

    this.reset();
  }

  /**
   * Returns current behavior settings as a config.
   */
  public abstract getConfig(): Config;

  /**
   * Resets the behavior to its default state.
   */
  protected abstract reset(): void;
}

/**
 * Interface for behaviors which initialize particles.
 */
export interface InitBehavior<Config> extends EmitterBehavior<Config> {
  /**
   * Initializes the particle.
   * @param particle Particle to initialize.
   */
  init(particle: EmitterParticle): void;
}

/**
 * Interface for behaviors which update particles.
 */
export interface UpdateBehavior<Config> extends EmitterBehavior<Config> {
  /**
   * Updates the particle.
   * @param particle Particle to update.
   * @param deltaTime Time elapsed since last update (in seconds).
   */
  update(particle: EmitterParticle, deltaTime: number): void;
}
