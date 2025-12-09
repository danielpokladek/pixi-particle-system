# PixiJS Particle System

[![Build Status](https://github.com/danielpokladek/pixi-particle-system/workflows/Build/badge.svg)](https://github.com/danielpokladek/pixi-particle-system/actions)
[![Latest Release](https://img.shields.io/github/v/release/danielpokladek/pixi-particle-system)](https://github.com/danielpokladek/pixi-particle-system/releases)

Based on the original [Particle Emitter](https://github.com/pixijs-userland/particle-emitter/tree/master), this library aims to deliver a easy to use particle system that satisfies all of your visual effect needs.

- 🚀 Built specifically for PixiJS, with support for particle container. 
- 📐 TypeScript first with strong typing for ease of use.
- 🪄 Behavior orientated design, for plug-n-play custom functionality.
- 🎨 Easy to use API, with system that is capable of complex effects.

### Setup

TODO: Add setup notes here.

### Usage

```typescript
import { Emitter } from "pixi-particle-system";

// ---
// Standard setup for PixiJS project.
// ---

// Create a container for the particles.
const container = new ParticleContainer();
app.stage.addChild(container);

// Create the emitter, aka the brains of the system.
const emitter = new Emitter(container);
emitter.play();
```

### Contribute

TODO: Add instructions on how to contribute.

### License

This content is released under the [MIT License](https://opensource.org/license/MIT).

### Change Log

[Releases](https://github.com/danielpokladek/pixi-particle-system/releases)