import { EmitterParticle } from "../particle/EmitterParticle";

/**
 * Abstract behavior class which all behaviors inherit from.
 */
abstract class EmitterBehavior<Config> {
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
 * Abstract behavior class for behaviors which initialize particles.
 */
export abstract class InitBehavior<Config> extends EmitterBehavior<Config> {
  /**
   * Initializes the particle.
   * @param particle Particle to initialize.
   */
  public abstract init(particle: EmitterParticle): void;
}

/**
 * Abstract behavior class for behaviors which update particles.
 */
export abstract class UpdateBehavior<Config> extends EmitterBehavior<Config> {
  /**
   * Updates the particle.
   * @param particle Particle to update.
   * @param deltaTime Time elapsed since last update (in seconds).
   */
  public abstract update(particle: EmitterParticle, deltaTime: number): void;
}
