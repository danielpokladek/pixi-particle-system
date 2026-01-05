import { describe, expect, it } from "vitest";
import { EmitterError } from "../../src/error/EmitterError";

describe("EmitterError", () => {
    it("should be an Error and set name to EmitterError", () => {
        const err = new EmitterError("boom");

        expect(err).toBeInstanceOf(Error);
        expect(err).toBeInstanceOf(EmitterError);
        expect(err.name).toBe("EmitterError");
    });

    it("should prefix the message with 'EmitterError: '", () => {
        const err = new EmitterError("something went wrong");
        expect(err.message).toBe("EmitterError: something went wrong");
    });

    it("should work with an empty message", () => {
        const err = new EmitterError("");
        expect(err.message).toBe("EmitterError: ");
        expect(err.name).toBe("EmitterError");
    });
});
