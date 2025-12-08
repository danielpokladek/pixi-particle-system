/**
 * An error specific to the particle system.
 */
export class EmitterError extends Error {
  /**
   * Creates a new EmitterError.
   * @param message The error message.
   */
  constructor(message: string) {
    super(`EmitterError: ${message}`);
    this.name = "EmitterError";
  }
}
