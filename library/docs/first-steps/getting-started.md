# Getting Started

## Web Based Editor

You can try the particle system directly in the browser using the web-based [Editor](https://danielpokladek.github.io/pixi-particle-system/editor/)! It supports all of the built-in behaviors, and allows you to see the changes in real-time.

::: warning
The editor is still in early development and may be unstable. Bugs might occur — if you spot any issues, please raise a ticket and I’ll fix it as soon as possible.
:::

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en) version 18 or higher.
- A [PixiJS application](https://pixijs.com/8.x/guides/getting-started/quick-start), where you can create the emitter.
- Terminal access to build and link the particle system<sup>1</sup>.
- [Git](https://git-scm.com/) source control installed<sup>1</sup>.

::: warning
<sup>1</sup> Since the library isn’t ready for an NPM release yet, you’ll need to manually clone and build it locally. Once the library is stable enough, it will be published on NPM like any other package.
:::

### Installation

1) Clone the repository using Git

```bash
git clone git@github.com:danielpokladek/pixi-particle-system.git
cd pixi-particle-system/library
```
2) Install the dependencies, and build the library (particle system) so we can link it

```bash
pnpm install
pnpm build:lib # This builds to root/library/dist
```

3) Inside your project, link the library

```bash
pnpm link <absolute-path>/pixi-particle-system/library
```

4) Additionally, you can start a dev server that hot-reloads any changes you make to the library

```bash
pnpm dev:lib
```

### Quick Start


This guide assumes you already have a PixiJS Application instance ready, for guide on setting up Pixi see the official [docs](https://pixijs.com/8.x/guides/getting-started/quick-start).

Here's the minimum required to get particles on the screen

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
Particles default to a 1×1 white texture, which can be hard to see depending on your setup. If you don't see anything, you can try assigning a custom texture using TextureBehavior or custom scale using ScaleBehavior.
:::
