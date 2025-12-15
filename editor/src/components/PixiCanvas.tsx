import { Application, extend, useApplication } from "@pixi/react";
import { Container, Graphics, ParticleContainer, Sprite } from "pixi.js";
import { useEffect, useRef } from "react";

extend({
    ParticleContainer,
    Container,
    Graphics,
    Sprite,
});

type Props = {
    particleContainer: ParticleContainer | null;
};

function EmitterContainer({ particleContainer }: Props) {
    const { app } = useApplication();

    const updateFPS = () => {
        window.fps = app.ticker.FPS;
    };

    useEffect(() => {
        console.log(`EmitterContainer mounted - ${particleContainer}`);

        if (!particleContainer || !app.renderer) return;

        app.stage.addChild(particleContainer);
        particleContainer.x = app.renderer.width / 2;
        particleContainer.y = app.renderer.height / 2;

        app.ticker.add(updateFPS);

        console.log("ParticleContainer added to stage");

        return () => {
            console.log("EmitterContainer unmounted");

            app.ticker.remove(updateFPS);
            window.fps = 0;
            app.stage.removeChild(particleContainer);
        };
    }, [app.renderer, particleContainer]);

    return <pixiContainer></pixiContainer>;
}

export default function PixiCanvas({ particleContainer }: Props) {
    const parentRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={parentRef} className="canvas-container">
            <Application resizeTo={parentRef}>
                <EmitterContainer particleContainer={particleContainer} />
            </Application>
        </div>
    );
}
