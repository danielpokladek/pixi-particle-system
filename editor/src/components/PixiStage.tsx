import { extend, useApplication } from "@pixi/react";
import { Emitter } from "pixi-particle-system";
import { Container, ParticleContainer } from "pixi.js";
import { useEffect } from "react";

extend({
    ParticleContainer,
    Container,
});

type Props = {
    particleContainer: ParticleContainer;
    emitter: Emitter;
};

export default function PixiStage({ particleContainer, emitter }: Props) {
    const { app } = useApplication();

    const updateFPS = () => {
        window.fps = app.ticker.FPS;
    };

    const handleFocused = () => {
        emitter.resume();
    };

    const handleBlurred = () => {
        emitter.pause();
    };

    const handleResize = () => {
        particleContainer.x = app.renderer.width / 2;
        particleContainer.y = app.renderer.height / 2;
    };

    useEffect(() => {
        console.log(`EmitterContainer mounted - ${particleContainer}`);

        if (!particleContainer || !app.renderer) return;

        app.stage.addChild(particleContainer);
        particleContainer.x = app.renderer.width / 2;
        particleContainer.y = app.renderer.height / 2;

        app.ticker.add(updateFPS);
        app.renderer.on("resize", handleResize);

        window.addEventListener("focus", handleFocused);
        window.addEventListener("blur", handleBlurred);

        console.log("ParticleContainer added to stage");

        return () => {
            console.log("EmitterContainer unmounted");

            app.ticker.remove(updateFPS);
            app.stage.removeChild(particleContainer);
            app.renderer.off("resize", handleResize);

            window.fps = 0;

            window.removeEventListener("focus", handleFocused);
            window.removeEventListener("blur", handleBlurred);
        };
    }, [app.renderer, particleContainer]);

    return <pixiContainer />;
}
