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

    const snowflake = "./snowflake.png";

    Assets.add({ alias: "snowflake", src: snowflake });

    const particleContainer = new ParticleContainer();
    app.stage.addChild(particleContainer);

    const defaultConfig = await getDefaultConfig();

    const particleEmitter = new Emitter(particleContainer, defaultConfig);

    window.application = app;
    window.__PIXI_APP__ = app;
    window.particleContainer = particleContainer;
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
