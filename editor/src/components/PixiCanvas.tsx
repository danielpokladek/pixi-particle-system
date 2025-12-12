import { Application, extend, useApplication } from "@pixi/react";
import { Emitter } from "pixi-particle-system";
import { Container, Graphics, ParticleContainer, Sprite } from "pixi.js";
import { useEffect, useRef } from "react";

// const config: EmitterConfig = {
//     emitterVersion: 0,
//     minParticleLifetime: 2,
//     maxParticleLifetime: 2,
//     spawnInterval: 0.01,
//     spawnChance: 1,
//     maxParticles: 1000,
//     addAtBack: true,
//     particlesPerWave: 1,

//     alphaBehavior: {
//         listData: {
//             list: [
//                 { value: 0.0, time: 0.0 },
//                 { value: 0.0, time: 0.2 },
//                 { value: 0.5, time: 0.5 },
//                 { value: 0.0, time: 0.8 },
//                 { value: 0.0, time: 1.0 },
//             ],
//         },
//         mode: "list",
//     },

//     movementBehavior: {
//         xListData: {
//             list: [
//                 { value: 0, time: 0 },
//                 { value: 0, time: 1 },
//             ],
//         },
//         yListData: {
//             list: [
//                 { value: -100, time: 0 },
//                 { value: 450, time: 1 },
//             ],
//         },
//         space: "local",
//         mode: "acceleration",
//     },

//     scaleBehavior: {
//         mode: "list",
//         listData: {
//             list: [
//                 { value: 0, time: 0 },
//                 { value: 100, time: 1 },
//             ],
//         },
//     },

//     spawnBehavior: {
//         shape: "point",
//         direction: { x: 0, y: 1 },
//     },
// };

extend({
    ParticleContainer,
    Container,
    Graphics,
    Sprite,
});

type Props = {
    particleContainer: ParticleContainer | null;
    emitter: Emitter | null;
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

export default function PixiCanvas({ particleContainer, emitter }: Props) {
    const parentRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={parentRef} className="canvas-container">
            <Application resizeTo={parentRef}>
                <EmitterContainer
                    particleContainer={particleContainer}
                    emitter={emitter}
                />
            </Application>
            {emitter && (
                <div className="stats">
                    <span>FPS: {Math.round(0)}</span>
                    <span>
                        Particles: {emitter.particleCount} /{" "}
                        {emitter.maxParticles}
                    </span>
                </div>
            )}
        </div>
    );
}
