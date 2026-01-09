import { Emitter } from "pixi-particle-system";
import { Application, ParticleContainer } from "pixi.js";

declare global {
    interface Window {
        fps: number;
        error: false | { message: string };

        __PIXI_APP__: Application;

        application: Application;
        particleContainer: ParticleContainer;
        particleEmitter: Emitter;
    }
}

export {};
