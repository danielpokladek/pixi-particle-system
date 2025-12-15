import { Emitter } from "pixi-particle-system";

declare global {
    interface Window {
        fps: number;
        error: false | { message: string };
        emitter: Emitter | null;
    }
}

export {};
