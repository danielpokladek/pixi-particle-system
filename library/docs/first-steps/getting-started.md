# Getting Started

## Browser Editor

You can try the particle system using the browser based [Editor](https://danielpokladek.github.io/pixi-particle-system/editor/)! It supports all of the built-in behaviors, and allows you to see the changes in real-time.

::: warning
Editor is still in early development and might be unstable and bugs might occur - if you spot any issues, please raise a ticket and I will fix it as soon as possible ❤️
:::

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en) version 18 or higher.
- A [PixiJS application](https://pixijs.com/8.x/guides/getting-started/quick-start), where you can create the emitter.
- Terminal access to build/link the particle system<sup>1</sup>.
- [Git](https://git-scm.com/) source control<sup>1</sup>.

::: warning
<sup>1</sup> As the library isn't ready for NPM release yet, it is currently required to manually clone and build the particle system locally. Once the library is stable enough, it will be published on NPM as any other package.
:::

### Installation

Clone the repository and build the library:

```bash
git clone git@github.com:danielpokladek/pixi-particle-system.git
cd pixi-particle-system/library
pnpm install
pnpm build:lib # This builds to root/library/dist
```

Next you can link it from your project:

```bash
pnpm link <absolute-path-to-particle-system>/library
```

Additionally, you can start a dev server which will hot-reload any changes you make:

```bash
pnpm dev:lib
```

### Quick Start

Here's the minimum required to get particles on the screen:

```ts
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

::: warning
Particles default to a 1x1 white texture. If you don't see anything, you can try assigning a custom texture using TextureBehavior or custom scale using ScaleBehavior.
:::
