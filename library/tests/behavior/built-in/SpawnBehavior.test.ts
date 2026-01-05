import { ParticleContainer } from "pixi.js";
import { describe, expect, it, vi } from "vitest";
import {
    CircleConfig,
    Emitter,
    LineConfig,
    PointConfig,
    RectangleConfig,
    SpawnBehavior,
} from "../../../src";

vi.mock("pixi.js", () => {
    /**
     * Mock ParticleContainer class
     */
    class ParticleContainer {
        constructor() {}
    }

    /**
     * Mock Texture class
     */
    class Texture {
        static EMPTY = new Texture("EMPTY");
        static WHITE = new Texture("WHITE");

        /**
         * Creates a new Texture.
         * @param id Texture identifier.
         */
        constructor(public readonly id: string = "TEX") {}
    }

    /**
     * Mock Particle class
     */
    class Particle {
        public texture: Texture;

        public anchorX = 0;
        public anchorY = 0;

        public alpha = 1;

        public scaleX = 1;
        public scaleY = 1;

        public rotation = 0;

        /**
         * Creates a new Particle.
         * @param texture The texture of the particle.
         */
        constructor(texture: Texture) {
            this.texture = texture;
        }
    }

    return { ParticleContainer, Particle };
});

vi.mock("../../../src/Emitter", () => {
    /**
     * Mock Emitter class
     */
    class Emitter {
        constructor() {}
    }

    return { Emitter };
});

describe("SpawnBehavior config application/retrieving", () => {
    const container = new ParticleContainer();
    const emitter = new Emitter(container);

    it("retrieves default config", () => {
        const behavior = new SpawnBehavior(emitter);
        const config = behavior.getConfig();

        expect(config.shape).toBe("point");
        expect(config.direction).toEqual({ x: 0, y: 0 });
    });

    it("applies and retrieves point config", () => {
        const behavior = new SpawnBehavior(emitter);
        behavior.applyConfig({ shape: "point" });

        const config = behavior.getConfig() as PointConfig;
        expect(config.shape).toBe("point");
    });

    it("applies and retrieves line config", () => {
        const behavior = new SpawnBehavior(emitter);
        behavior.applyConfig({ shape: "line", length: 100 });

        const config = behavior.getConfig() as LineConfig;
        expect(config.shape).toBe("line");
        expect(config.length).toBe(100);
    });

    it("applies and retrieves rectangle config", () => {
        const behavior = new SpawnBehavior(emitter);
        behavior.applyConfig({ shape: "rectangle", width: 80, height: 40 });

        const config = behavior.getConfig() as RectangleConfig;
        expect(config.shape).toBe("rectangle");
        expect(config.width).toBe(80);
        expect(config.height).toBe(40);
    });

    it("applies and retrieves circle config", () => {
        const behavior = new SpawnBehavior(emitter);
        behavior.applyConfig({
            shape: "circle",
            outerRadius: 50,
            innerRadius: 10,
        });

        const config = behavior.getConfig() as CircleConfig;
        expect(config.shape).toBe("circle");
        expect(config.outerRadius).toBe(50);
        expect(config.innerRadius).toBe(10);
    });
});
