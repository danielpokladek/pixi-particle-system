import { Emitter, EmitterConfig } from "pixi-particle-system";
import { Application, ParticleContainer } from "pixi.js";

// Create Pixi application
const app = new Application();

await app.init({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x0a0e27,
    resizeTo: window,
});

document.getElementById("app")!.appendChild(app.canvas);

const container = new ParticleContainer();
container.position.set(app.screen.width / 2, app.screen.height / 2);
app.stage.addChild(container);

const config: EmitterConfig = {
    emitterVersion: 0,
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

    movementBehavior: {
        xListData: {
            list: [
                { value: 0, time: 0 },
                { value: 0, time: 1 },
            ],
        },
        yListData: {
            list: [
                { value: -50, time: 0 },
                { value: -450, time: 1 },
            ],
        },
        space: "local",
        mode: "acceleration",
    },

    // rotationBehavior: {
    //     mode: "static",
    //     value: Math.PI / 4,
    // },

    scaleBehavior: {
        mode: "random",
        listData: {
            list: [
                { value: 0, time: 0 },
                { value: 100, time: 0.5 },
                { value: 0, time: 1 },
            ],
        },
    },

    spawnBehavior: {
        shape: "rectangle",
        width: 300,
        height: 300,
        direction: { x: 0, y: 1 },
    },
};

// Create emitter
const emitter = new Emitter(container, config);
emitter.play();

// Stats
const fpsElement = document.getElementById("fps")!;
const particlesElement = document.getElementById("particles")!;

app.ticker.add(() => {
    fpsElement.textContent = `FPS: ${Math.round(app.ticker.FPS)}`;
    particlesElement.textContent = `Particles: ${emitter.particleCount} / ${emitter.maxParticles}`;
});
