import { extend, useApplication } from "@pixi/react";
import { Emitter } from "pixi-particle-system";
import { Container, ParticleContainer } from "pixi.js";
import { useEffect } from "react";

extend({
    ParticleContainer,
    Container,
});

/**
 * Props for the PixiStage component.
 */
type Props = {
    particleContainer: ParticleContainer;
    emitter: Emitter;
};

/**
 * PixiStage component that integrates a ParticleContainer and Emitter into the PixiJS application.
 * @param props Component props.
 * @param props.particleContainer ParticleContainer instance.
 * @param props.emitter Emitter instance.
 * @returns JSX.Element
 */
export default function PixiStage({
    particleContainer,
    emitter,
}: Props): JSX.Element {
    const { app } = useApplication();

    useEffect(() => {
        if (!particleContainer || !app.renderer) return;

        /**
         * Repositions the particle container accordingly.
         */
        const handleResize = (): void => {
            particleContainer.position.set(
                app.renderer.width / 2,
                app.renderer.height / 2,
            );
        };

        /**
         * Updates the FPS value on the window object.
         */
        const updateFPS = (): void => {
            window.fps = app.ticker.FPS;
        };

        /**
         * Handles the window gaining focus.
         */
        const handleFocused = (): void => {
            emitter.resume();
        };

        /**
         * Handles the window losing focus.
         */
        const handleBlurred = (): void => {
            emitter.pause();
        };

        app.stage.addChild(particleContainer);
        particleContainer.position.set(
            app.renderer.width / 2,
            app.renderer.height / 2,
        );

        app.ticker.add(updateFPS);
        app.renderer.on("resize", handleResize);

        window.particleEmitter.play();

        window.addEventListener("focus", handleFocused);
        window.addEventListener("blur", handleBlurred);

        return (): void => {
            app.ticker.remove(updateFPS);
            app.stage.removeChild(particleContainer);
            app.renderer.off("resize", handleResize);

            window.removeEventListener("focus", handleFocused);
            window.removeEventListener("blur", handleBlurred);

            window.fps = 0;
        };
    }, [app, app.stage, app.renderer, emitter, particleContainer]);

    return <pixiContainer />;
}
