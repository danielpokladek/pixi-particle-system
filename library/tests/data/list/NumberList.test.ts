import { describe, expect, it, test } from "vitest";
import { EmitterError, NumberList } from "../../../src";

test("Default interpolate function throws EmitterError", () => {
    const list = new NumberList();

    expect(() => list.interpolate(0)).toThrow(EmitterError);
});

describe("NumberList simple interpolation", () => {
    const list = new NumberList();
    list.initialize({
        list: [
            { time: 0, value: 10 },
            { time: 1, value: 20 },
        ],
    });

    it("should be 10 at time 0", () => {
        expect(list.interpolate(0)).toBe(10);
    });

    it("should be 15 at time 0.5", () => {
        expect(list.interpolate(0.5)).toBe(15);
    });

    it("should be 20 at time 1", () => {
        expect(list.interpolate(1)).toBe(20);
    });
});

describe("NumberList stepped interpolation", () => {
    const list = new NumberList();
    list.initialize({
        isStepped: true,
        list: [
            { time: 0, value: 10 },
            { time: 0.5, value: 20 },
            { time: 1, value: 30 },
        ],
    });

    it("should be 10 at time 0", () => {
        expect(list.interpolate(0)).toBe(10);
    });

    it("should be 10 at time 0.3", () => {
        expect(list.interpolate(0.3)).toBe(10);
    });

    it("should be 20 at time 0.5", () => {
        expect(list.interpolate(0.5)).toBe(20);
    });

    it("should be 20 at time 0.8", () => {
        expect(list.interpolate(0.8)).toBe(20);
    });

    it("should be 30 at time 1", () => {
        expect(list.interpolate(1)).toBe(30);
    });
});

describe("NumberList complex interpolation", () => {
    const list = new NumberList();
    list.initialize({
        list: [
            { time: 0, value: 10 },
            { time: 0.3, value: 20 },
            { time: 0.7, value: 15 },
            { time: 1, value: 25 },
        ],
    });

    const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

    it("should interpolate within the bracketing segment at time 0", () => {
        const u = (0 - 0) / (0.3 - 0);
        const expected = lerp(10, 20, u);

        expect(list.interpolate(u)).toBeCloseTo(expected, 1);
    });

    it("should interpolate within the bracketing segment at time 0.5", () => {
        const u = (0.5 - 0.3) / (0.7 - 0.3);
        const expected = lerp(20, 15, u);

        expect(list.interpolate(0.5)).toBeCloseTo(expected, 1);
    });

    it("should interpolate within the bracketing segment at time 1", () => {
        const u = (1 - 0.7) / (1 - 0.7);
        const expected = lerp(15, 25, u);

        expect(list.interpolate(1)).toBeCloseTo(expected, 1);
    });
});

describe("NumberList boundary conditions", () => {
    const list = new NumberList();
    list.initialize({
        list: [
            { time: 0.2, value: 10 },
            { time: 0.8, value: 20 },
        ],
    });

    it("should return the first value for lerp < first time", () => {
        expect(list.interpolate(0)).toBe(10);
        expect(list.interpolate(0.1)).toBe(10);
    });

    it("should return the last value for lerp > last time", () => {
        expect(list.interpolate(0.9)).toBe(20);
        expect(list.interpolate(1)).toBe(20);
    });

    it("should return the first value for lerp == first time", () => {
        expect(list.interpolate(0.2)).toBe(10);
    });

    it("should return the last value for lerp == last time", () => {
        expect(list.interpolate(0.8)).toBe(20);
    });
});
