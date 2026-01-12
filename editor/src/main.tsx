import { Emitter } from "pixi-particle-system";
import { Application, Assets, ParticleContainer } from "pixi.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { EditorError } from "./error/EditorError";
import { getDefaultConfig } from "./examples/Default";
import "./style.css";

/**
 * Bootstraps the application.
 */
async function bootstrap(): Promise<void> {
    const app = new Application();
    await app.init({
        antialias: true,
        resolution: 1,
        preference: "webgl",
    });

    Assets.add({ alias: "snowflake", src: "./snowflake.png" });
    Assets.add({ alias: "circle", src: "./circle_05.png" });
    Assets.add({ alias: "circle4", src: "./circle_04.png" });
    Assets.add({ alias: "twirl", src: "./twirl_03.png" });
    Assets.add({ alias: "smoke", src: "./smoke_04.png" });
    Assets.add({ alias: "window4", src: "./window_04.png" });
    Assets.add({
        alias: "coin",
        src: "./spritesheet/coin.json",
        data: {
            imageFilename: "coin.png",
        },
    });
    Assets.add({
        alias: "confetti",
        src: "./spritesheet/confetti.json",
        data: {
            imageFilename: "confetti.png",
        },
    });

    const particleContainer = new ParticleContainer();
    app.stage.addChild(particleContainer);
    window.particleContainer = particleContainer;

    const defaultConfig = await getDefaultConfig();

    const particleEmitter = new Emitter(particleContainer, defaultConfig);

    window.application = app;
    window.__PIXI_APP__ = app;
    window.particleEmitter = particleEmitter;

    const root = document.getElementById("root");

    if (!root) {
        throw new EditorError("Root element not found!");
    }

    createRoot(root).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
}

bootstrap().catch((error) => {
    throw new EditorError(`Failed to bootstrap the application - ${error}`);
});
