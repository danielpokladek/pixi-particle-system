import { ParticleContainer } from "pixi.js";
import { describe, expect, it, vi } from "vitest";
import { Emitter, ScaleBehavior } from "../../../src";

vi.mock("pixi.js", () => {
    class ParticleContainer {
        constructor() {}
    }

    class Texture {
        static EMPTY = new Texture("EMPTY");
        static WHITE = new Texture("WHITE");

        constructor(public readonly id: string = "TEX") {}
    }

    class Particle {
        public texture: Texture;

        public anchorX = 0;
        public anchorY = 0;

        public alpha = 1;

        public scaleX = 1;
        public scaleY = 1;

        public rotation = 0;

        constructor(texture: Texture) {
            this.texture = texture;
        }
    }

    return { ParticleContainer, Particle };
});

vi.mock("../../../src/Emitter", () => {
    class Emitter {
        private _initActive = false;
        private _updateActive = false;

        constructor() {}

        public isBehaviorInitActive(): boolean {
            return this._initActive;
        }
        public isBehaviorUpdateActive(): boolean {
            return this._updateActive;
        }

        public addToActiveInitBehaviors(): void {
            this._initActive = true;
        }
        public addToActiveUpdateBehaviors(): void {
            this._updateActive = true;
        }

        public removeFromActiveInitBehaviors(): void {
            this._initActive = false;
        }
        public removeFromActiveUpdateBehaviors(): void {
            this._updateActive = false;
        }
    }

    return { Emitter };
});

describe("AlphaBehavior config application/retrieving", () => {
    const container = new ParticleContainer();
    const emitter = new Emitter(container);

    it("retrieves undefined by default", () => {
        const behavior = new ScaleBehavior(emitter);
        const config = behavior.getConfig();

        expect(config).toBeUndefined();
    });

    it("applies and retrieves static config", () => {
        const behavior = new ScaleBehavior(emitter);
        behavior.applyConfig({ mode: "static", value: { x: 5, y: 5 } });

        const config = behavior.getConfig();
        expect(config).toEqual({ mode: "static", value: { x: 5, y: 5 } });

        expect(emitter.isBehaviorInitActive(behavior)).toBe(true);
        expect(emitter.isBehaviorUpdateActive(behavior)).toBe(false);
    });

    it("applies and retrieves list config", () => {
        const behavior = new ScaleBehavior(emitter);
        behavior.applyConfig({
            mode: "list",
            xListData: {
                list: [
                    { time: 0, value: 1 },
                    { time: 0.5, value: 2 },
                    { time: 1, value: 3 },
                ],
            },
            yListData: {
                list: [
                    { time: 0, value: 4 },
                    { time: 0.5, value: 5 },
                    { time: 1, value: 6 },
                ],
            },
        });

        const config = behavior.getConfig();
        expect(config).toEqual({
            mode: "list",
            xListData: {
                list: [
                    { time: 0, value: 1 },
                    { time: 0.5, value: 2 },
                    { time: 1, value: 3 },
                ],
            },
            yListData: {
                list: [
                    { time: 0, value: 4 },
                    { time: 0.5, value: 5 },
                    { time: 1, value: 6 },
                ],
            },
        });

        expect(emitter.isBehaviorInitActive(behavior)).toBe(true);
        expect(emitter.isBehaviorUpdateActive(behavior)).toBe(true);
    });

    it("applies and retrieves random config", () => {
        const behavior = new ScaleBehavior(emitter);
        behavior.applyConfig({
            mode: "random",
            xListData: {
                list: [
                    { time: 0, value: 1 },
                    { time: 0.5, value: 2 },
                    { time: 1, value: 3 },
                ],
            },
            yListData: {
                list: [
                    { time: 0, value: 1 },
                    { time: 0.5, value: 2 },
                    { time: 1, value: 3 },
                ],
            },
        });

        const config = behavior.getConfig();
        expect(config).toEqual({
            mode: "random",
            xListData: {
                list: [
                    { time: 0, value: 1 },
                    { time: 0.5, value: 2 },
                    { time: 1, value: 3 },
                ],
            },
            yListData: {
                list: [
                    { time: 0, value: 1 },
                    { time: 0.5, value: 2 },
                    { time: 1, value: 3 },
                ],
            },
        });

        expect(emitter.isBehaviorInitActive(behavior)).toBe(true);
        expect(emitter.isBehaviorUpdateActive(behavior)).toBe(false);
    });
});
