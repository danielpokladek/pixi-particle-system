import { describe, expect, it, test } from "vitest";
import { ColorList, EmitterError, RGBAColor } from "../../../src";

const hexToUint24 = (hex: string): number => {
    const string = hex.trim().toLowerCase();
    const normalized = string.startsWith("#") ? string.slice(1) : string;

    return parseInt(normalized, 16) & 0xffffff;
};

test("Default interpolate function throws EmitterError", () => {
    const list = new ColorList();

    expect(() => list.interpolate(0)).toThrow(EmitterError);
});

describe("ColorList simple interpolation", () => {
    const list = new ColorList();
    list.initialize({
        list: [
            { time: 0, value: "#ff0000" },
            { time: 1, value: "#0000ff" },
        ],
    });

    it("should be #ff0000 at time 0", () => {
        expect(list.interpolate(0)).toBe(hexToUint24("#ff0000"));
    });

    it("should be #800080 at time 0.5", () => {
        expect(list.interpolate(0.5)).toBe(hexToUint24("#800080"));
    });

    it("should be #0000ff at time 1", () => {
        expect(list.interpolate(1)).toBe(hexToUint24("#0000ff"));
    });
});

describe("ColorList stepped interpolation", () => {
    const list = new ColorList();
    list.initialize({
        isStepped: true,
        list: [
            { time: 0, value: "#ff0000" },
            { time: 0.5, value: "#00ff00" },
            { time: 1, value: "#0000ff" },
        ],
    });

    it("should be #ff0000 at time 0", () => {
        expect(list.interpolate(0)).toBe(hexToUint24("#ff0000"));
    });

    it("should be #ff0000 at time 0.3", () => {
        expect(list.interpolate(0.3)).toBe(hexToUint24("#ff0000"));
    });

    it("should be #00ff00 at time 0.5", () => {
        expect(list.interpolate(0.5)).toBe(hexToUint24("#00ff00"));
    });

    it("should be #00ff00 at time 0.8", () => {
        expect(list.interpolate(0.8)).toBe(hexToUint24("#00ff00"));
    });

    it("should be #0000ff at time 1", () => {
        expect(list.interpolate(1)).toBe(hexToUint24("#0000ff"));
    });
});

describe("ColorList complex interpolation", () => {
    const list = new ColorList();
    list.initialize({
        list: [
            { time: 0, value: "#ff0000" },
            { time: 0.3, value: "#00ff00" },
            { time: 0.7, value: "#0000ff" },
            { time: 1, value: "#ffff00" },
        ],
    });

    const lerp = (first: RGBAColor, second: RGBAColor, t: number): number => {
        const r = Math.round((second.r - first.r) * t + first.r);
        const g = Math.round((second.g - first.g) * t + first.g);
        const b = Math.round((second.b - first.b) * t + first.b);

        return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
    };

    it("should be #ff0000 at time 0", () => {
        expect(list.interpolate(0)).toBe(hexToUint24("#ff0000"));
    });

    it("should interpolate within the bracketing segment at time 0.5", () => {
        const u = (0.5 - 0.3) / (0.7 - 0.3);
        const expected = lerp(
            { r: 0, g: 255, b: 0, a: 255 },
            { r: 0, g: 0, b: 255, a: 255 },
            u,
        );

        expect(list.interpolate(0.5)).toBe(expected);
    });

    it("should interpolate within the bracketing segment at time 1", () => {
        const u = (1 - 0.7) / (1 - 0.7);
        const expected = lerp(
            { r: 0, g: 0, b: 255, a: 255 },
            { r: 255, g: 255, b: 0, a: 255 },
            u,
        );

        expect(list.interpolate(1)).toBe(expected);
    });
});

describe("ColorList boundary conditions", () => {
    const list = new ColorList();
    list.initialize({
        list: [
            { time: 0.2, value: "#ff0000" },
            { time: 0.8, value: "#0000ff" },
        ],
    });

    it("should return the first color for lerp < first time", () => {
        expect(list.interpolate(0)).toBe(hexToUint24("#ff0000"));
    });

    it("should return the last color for lerp > last time", () => {
        expect(list.interpolate(1)).toBe(hexToUint24("#0000ff"));
    });

    it("should return the first color for lerp == first time", () => {
        expect(list.interpolate(0.2)).toBe(hexToUint24("#ff0000"));
    });

    it("should return the last color for lerp == last time", () => {
        expect(list.interpolate(0.8)).toBe(hexToUint24("#0000ff"));
    });
});
