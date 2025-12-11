# PixiJS Particle System

A modern, flexible particle system for **PixiJS** - inspired by the original [Particle Emitter](https://github.com/pixijs-userland/particle-emitter/tree/master), but rebuilt with a clean TypeScript-first architecture and more expressive API.

## Features
- Built for PixiJS, provides seamless integration with V8's `ParticleContainer` and `Particle` objects.  
- Provides strong typing, great IntelliSense and predictable API.
- Behavior orientated design allows for pluggable behaviors for custom effects.
- Flexible yet simple API, start small and scale up to advanced usage.
- Optimized for real-time effects.
- Comes with built-in behaviors to get started immediately:
  - `AlphaBehavior`
  - `ColorBehavior`
  - `MovementBehavior`
  - `RotationBehavior`
  - `ScaleBehavior`
  - `SpawnBehavior`
  - `TextureBehavior`

### Installation

> ⚠️ This library is still under active development and not yet published to NPM.

You can clone the repo and install it locally:

```bash
git clone git@github.com:danielpokladek/pixi-particle-system.git
cd pixi-particle-system
pnpm install
pnpm build
```
Or add it directly as a GitHub dependency:
```bash
pnpm add github:danielpokladek/pixi-particle-system
```

### Quick Start

Here's the minimum required to get particles on the screen:

```typescript
import { Emitter } from "pixi-particle-system";
import { ParticleContainer } from "pixi.js";

// Create a particle container and add it to your app/stage
const container = new ParticleContainer();
app.stage.addChild(container);

// Create an emitter (the "brain" of the particle system)
const emitter = new Emitter(container);

// Start emitting particles
emitter.play();
```

> ⚠️ Particles default to a 1x1 white texture.
> If you don't see anything, assign a custom texture using `TextureBehavior` or custom scale using `ScaleBehavior`.

### Configuration Example

```typescript
const emitter = new Emitter(container, {
    emitterVersion: 0,
    minParticleLifetime: 0.4,
    maxParticleLifetime: 0.4,
    spawnInterval: 0.01,
    spawnChance: 1,
    maxParticles: 50,
    addAtBack: true,
    particlesPerWave: 1,

    alphaBehavior: {
        listData: {
            list: [
                { value: 0.0, time: 0.0 },
                { value: 1.0, time: 0.5 },
                { value: 0.0, time: 1.0 }
            ]
        },
        mode: "list"
    },

    colorBehavior: {
        listData: {
            list: [
                { value: "#ff0000", time: 0 },
                { value: "#00ff00", time: 0.5 },
                { value: "#0000ff", time: 1 },
            ],
        },
        mode: "random",
    },

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

    scaleBehavior: {
        mode: "list",
        listData: {
            list: [
                { value: 0, time: 0 },
                { value: 100, time: 1 },
            ],
        },
    },

    spawnBehavior: {
        shape: "rectangle",
        width: 400,
        height: 400,
    },
});

emitter.play();
```

### Documentation

Full documentation, API reference, and guides: **TBA**
(Will be linked once GitHub Pages deployment is live.)

### Development

```bash
git clone git@github.com:danielpokladek/pixi-particle-system.git
git cd pixi-particle-system
pnpm install
```

Build (production)
```bash
pnpm build
```

Build & Watch (development)
```bash
pnpm dev
```

Generate Documentation
```bash
pnpm docs:build
```

### Contribute

Contributions are welcome!

If you'd like to help:

1. Fork the repo.
2. Create a feature/bugfix branch.
3. Submit a PR with your changes.

Contribution guidelines will be added soon.

### Change Log

[Releases](https://github.com/danielpokladek/pixi-particle-system/releases)

### License

This content is released under the [MIT License](https://opensource.org/license/MIT).
