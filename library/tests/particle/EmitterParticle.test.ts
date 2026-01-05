import { Texture } from "pixi.js";
import { describe, expect, it, vi } from "vitest";
import { EmitterParticle } from "../../src";

vi.mock("pixi.js", () => {
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

    return { Texture, Particle };
});

describe("EmitterParticle", () => {
    it("initializes defaults via reset()", async () => {
        const p = new EmitterParticle();

        expect(p.texture).toBe(Texture.EMPTY);

        expect(p.anchorX).toBe(0.5);
        expect(p.anchorY).toBe(0.5);

        expect(p.alpha).toBe(1);

        expect(p.scaleX).toBe(1);
        expect(p.scaleY).toBe(1);

        expect(p.rotation).toBe(0);

        expect(p.data.age).toBe(0);
        expect(p.data.agePercent).toBe(0);
        expect(p.data.maxLifetime).toBe(0);
        expect(p.data.oneOverLifetime).toBe(0);

        expect(p.data.directionVectorX).toBe(0);
        expect(p.data.directionVectorY).toBe(0);

        expect(p.data.accelerationX).toBe(0);
        expect(p.data.accelerationY).toBe(0);

        expect(p.data.velocityX).toBe(0);
        expect(p.data.velocityY).toBe(0);

        expect(Array.isArray(p.data.textureConfig.textures)).toBe(true);
        expect(p.data.textureConfig.textures).toHaveLength(0);
        expect(p.data.textureConfig.duration).toBe(0);
        expect(p.data.textureConfig.elapsed).toBe(0);
        expect(p.data.textureConfig.framerate).toBe(0);
        expect(p.data.textureConfig.loop).toBe(false);
    });

    it("reset() restores defaults after mutation", async () => {
        const p = new EmitterParticle();

        p.texture = Texture.WHITE;

        p.anchorX = 0;
        p.anchorY = 0;

        p.alpha = 0.25;

        p.scaleX = 2;
        p.scaleY = 3;

        p.rotation = 1.23;

        p.data.age = 10;
        p.data.agePercent = 0.5;
        p.data.maxLifetime = 100;
        p.data.oneOverLifetime = 0.01;

        p.data.directionVectorX = 9;
        p.data.directionVectorY = 8;

        p.data.accelerationX = 7;
        p.data.accelerationY = 6;

        p.data.velocityX = 5;
        p.data.velocityY = 4;

        p.data.textureConfig.textures = [Texture.WHITE, Texture.WHITE];
        p.data.textureConfig.duration = 1000;
        p.data.textureConfig.elapsed = 500;
        p.data.textureConfig.framerate = 60;
        p.data.textureConfig.loop = true;

        p.reset();

        expect(p.texture).toBe(Texture.EMPTY);

        expect(p.anchorX).toBe(0.5);
        expect(p.anchorY).toBe(0.5);

        expect(p.alpha).toBe(1);

        expect(p.scaleX).toBe(1);
        expect(p.scaleY).toBe(1);

        expect(p.rotation).toBe(0);

        expect(p.data.age).toBe(0);
        expect(p.data.agePercent).toBe(0);
        expect(p.data.maxLifetime).toBe(0);
        expect(p.data.oneOverLifetime).toBe(0);

        expect(p.data.directionVectorX).toBe(0);
        expect(p.data.directionVectorY).toBe(0);

        expect(p.data.accelerationX).toBe(0);
        expect(p.data.accelerationY).toBe(0);

        expect(p.data.velocityX).toBe(0);
        expect(p.data.velocityY).toBe(0);

        expect(p.data.textureConfig.textures).toHaveLength(0);
        expect(p.data.textureConfig.duration).toBe(0);
        expect(p.data.textureConfig.elapsed).toBe(0);
        expect(p.data.textureConfig.framerate).toBe(0);
        expect(p.data.textureConfig.loop).toBe(false);
    });

    it("reset() does not replace the data or textureConfig objects (mutates in place)", async () => {
        const p = new EmitterParticle();

        const dataRef = p.data;
        const textureConfigRef = p.data.textureConfig;

        p.data.age = 123;
        p.data.textureConfig.loop = true;

        p.reset();

        expect(p.data).toBe(dataRef);
        expect(p.data.textureConfig).toBe(textureConfigRef);

        expect(p.data.age).toBe(0);
        expect(p.data.textureConfig.loop).toBe(false);
    });

    it("reset() always creates an empty textures array", async () => {
        const p = new EmitterParticle();

        p.data.textureConfig.textures.push(Texture.WHITE);
        expect(p.data.textureConfig.textures.length).toBe(1);

        p.reset();
        expect(p.data.textureConfig.textures).toEqual([]);
    });
});
