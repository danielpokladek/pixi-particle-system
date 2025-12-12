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

    useEffect(() => {
        console.log(`EmitterContainer mounted - ${particleContainer}`);

        if (!particleContainer || !app.renderer) return;

        app.stage.addChild(particleContainer);
        particleContainer.x = app.renderer.width / 2;
        particleContainer.y = app.renderer.height / 2;

        console.log("ParticleContainer added to stage");

        return () => {
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
