import { Emitter } from "pixi-particle-system";
import { ParticleContainer } from "pixi.js";

declare global {
    interface Window {
        fps: number;
        error: false | { message: string };

        particleContainer: ParticleContainer;
        particleEmitter: Emitter;
    }
}

export {};
