/**
 * Error class representing emitter-related errors.
 * @group Error
 */
export class EmitterError extends Error {
    /**
     * Creates a new EmitterError instance.
     * @param message Error message.
     */
    constructor(message: string) {
        super(`EmitterError: ${message}`);
        this.name = "EmitterError";
    }
}
