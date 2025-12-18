/**
 * Custom error class for editor-related errors.
 */
export class EditorError extends Error {
    /**
     * Creates a new EditorError.
     * @param message Error message.
     */
    constructor(message: string) {
        super(message);
        this.name = "EditorError";

        window.error = { message };
    }
}
