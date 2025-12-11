import { Application, ParticleContainer } from "pixi.js";
import { Emitter } from "../../src/Emitter";
import { EmitterConfig } from "../../src/EmitterConfig";

// Create Pixi application
const app = new Application();

await app.init({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1a1a1a,
    resizeTo: window,
});

document.getElementById("app")!.appendChild(app.canvas);

const container = new ParticleContainer();
container.position.set(app.screen.width / 2, app.screen.height / 2);
app.stage.addChild(container);

const config: EmitterConfig = {
    emitterVersion: 0,
    // minParticleLifetime: 0.4,
    // maxParticleLifetime: 0.4,
    minParticleLifetime: 2,
    maxParticleLifetime: 2,
    spawnInterval: 0.01,
    spawnChance: 1,
    maxParticles: 1000,
    addAtBack: true,
    particlesPerWave: 1,

    alphaBehavior: {
        listData: {
            list: [
                { value: 0.0, time: 0.0 },
                { value: 0.0, time: 0.2 },
                { value: 0.5, time: 0.5 },
                { value: 0.0, time: 0.8 },
                { value: 0.0, time: 1.0 },
            ],
        },
        mode: "list",
    },

    // colorBehavior: {
    //     listData: {
    //         list: [
    //             { value: "#ff0000", time: 0 },
    //             { value: "#00ff00", time: 0.5 },
    //             { value: "#0000ff", time: 1 },
    //         ],
    //     },
    //     mode: "random",
    // },

    // movementBehavior: {
    //     minMoveSpeed: -50,
    //     maxMoveSpeed: -50,
    //     mode: "acceleration",
    // },

    movementBehavior: {
        xListData: {
            list: [
                { value: 50, time: 0 },
                { value: 150, time: 1 },
            ],
        },
        yListData: {
            list: [
                { value: -100, time: 0 },
                { value: 450, time: 1 },
            ],
        },
        space: "local",
        mode: "acceleration",
    },

    // rotationBehavior: {
    //     mode: "static",
    //     value: Math.PI / 4,
    // },

    // scaleBehavior: {
    //     mode: "random",
    //     listData: {
    //         list: [
    //             { value: 0, time: 0 },
    //             { value: 100, time: 0.5 },
    //             { value: 0, time: 1 },
    //         ],
    //     },
    // },

    scaleBehavior: {
        mode: "list",
        listData: {
            list: [
                { value: 0, time: 0 },
                { value: 100, time: 1 },
            ],
        },
    },

    // scaleBehavior: {
    //     value: 100,
    // },

    // spawnBehavior: {
    //     shape: "point",
    // },

    spawnBehavior: {
        shape: "point",
        // width: 400,
        // height: 400,
        direction: { x: 0, y: 1 },
    },
};

// Create a simple particle system
const emitter = new Emitter(container, config);
emitter.play();

function setupDebug(): void {
    const fpsElement = document.getElementById("fps")!;
    const particlesElement = document.getElementById("particles")!;

    app.ticker.add(() => {
        fpsElement.textContent = `${Math.round(app.ticker.FPS)}`;
        particlesElement.textContent = `${emitter.particleCount} / ${emitter.maxParticles}`;
    });
}

setupDebug();
