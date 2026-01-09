# PixiJS Particle System

<p align="center">
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220" />
    <img src="https://img.shields.io/badge/pixijs-%23e72264.svg?style=for-the-badge">
</p>

<p align="center">
    <img src="https://img.shields.io/github/license/danielpokladek/pixi-particle-system.svg?style=for-the-badge" />
    <img src="https://img.shields.io/github/actions/workflow/status/danielpokladek/pixi-particle-system/release.yml?style=for-the-badge" />
    <a href="https://www.npmjs.com/package/pixi-particle-system">
      <img src="https://img.shields.io/npm/v/pixi-particle-system?style=for-the-badge">
    </a>
</p>

<p align="center">
      <a href="https://danielpokladek.github.io/pixi-particle-system/first-steps/what-is-it.html">Documentation</a> 
    | <a href="https://danielpokladek.github.io/pixi-particle-system/editor/">Interactive Editor</a> 
    | <a href="https://danielpokladek.github.io/pixi-particle-system/api/classes/Emitter.html">API Reference</a>
</p>

A modern, flexible particle system for **PixiJS** - a spiritual successor to [Particle Emitter](https://github.com/pixijs-userland/particle-emitter/tree/master), but rebuilt with a clean TypeScript-first architecture and more expressive API.

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

## Getting Started

Add the library to existing PixiJS project:

```bash
npm i pixi-particle-system
```

### Usage

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

Emitter automatically attaches itself to the PixiJS shared ticker, so you just need to tell it when to start/stop and everything else is handled for you!

By default particles will spawn in a single point, and they are using a 1x1 white texture (`Texture.WHITE`) - depending on your setup, you might need to either use a custom texture, or increase scale using `ScaleBehavior` to see them better.

## Contributing

Contributions are what make the open source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this project better, please fork the repo and create a pull request. You can also simply open an issue with the relevant tag. Don't forget to give the project a star! Thank you! ❤️

See [CONTRIBUTING](/CONTRIBUTING.md) for more information about contributions.

## Releases

Visit [RELEASES](https://github.com/danielpokladek/pixi-particle-system/releases) to see previous releases, changelog, and the latest release.

## License

Distributed under the MIT License. See [LICENSE](/LICENSE) for more information.

## Acknowledgements

Thank you to the PixiJS team, and it's contributors, for making a great web graphics framework. Thank you to CloudKid, and all of the contributors, for creating the original `particle-emitter` package - this one wouldn't exist without it.