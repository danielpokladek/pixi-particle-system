import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";
import { useRef } from "react";
import { BunnySprite } from "./BunnySprite";

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
    Container,
    Graphics,
    Sprite,
});

export default function PixiCanvas() {
    const parentRef = useRef(null);

    return (
        <div ref={parentRef} className="canvas-container">
            <Application resizeTo={parentRef}>
                <BunnySprite />
            </Application>
        </div>
    );
}
