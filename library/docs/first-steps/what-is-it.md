# What is a Particle System?

A particle system is a graphics technique that uses a collection of small elements to create visual effects such as clouds, smoke, fire, and more.

These complex effects are controlled by a single brain — a particle emitter — which orchestrates what particles should be doing at any given moment.

If you’ve played video games, visited interactive websites, or watched movies, you’ve most likely already seen particle systems in action.

::: tip 
If you want to get started right away, head over to [Getting Started](./getting-started.md) to learn how to install the package. Alternatively, head over to [Editor](https://danielpokladek.github.io/pixi-particle-system/editor/) to start using the web-based editor to see changes reflected in real-time.
:::

## Use Cases

Particle systems are often used where a complex visual effect should be achieved, but animating individual objects by hand would be too complex. 

### Steam Train 🚂

We can use a steam train and its chimney as a good example. If we tried to animate the smoke coming out of the chimney by hand, we would be in a world of pain. With a particle system we can define a few properties such as scale, color, and position over time to achieve a convincing smoke effect with no manual animation.

### Rain 🌧️

Another good example is rain/snow, we can easily create the effect of falling rain/snow by placing our emitter at the top of the camera viewport and animating our particles down towards the ground.

## TypeScript First

This library has been written from ground up with TypeScript-first approach in order to provide a great developer experience.

Emphasis is placed on clean code, high-quality documentation, and strict typing making the API predictable, easy to read, and a breeze to integrate into new or existing projects.

## Performance

This library is aiming to be fast and lightweight, allowing it to be used on the latest flagship devices as well as older hardware. It is taking advantage of PixiJS' [ParticleContainer](https://pixijs.com/8.x/guides/components/scene-objects/particle-container) and [Particle](https://pixijs.download/dev/docs/scene.Particle.html) classes to provide blazing fast performance.

::: warning
Please note, the library is still under early development and the performance can vary; please raise a ticket or open a discussion if you have encountered any performance issues! All information will help with the development of this library.
:::

## What About Pixi Particle Emitter?

[Pixi Particle Emitter](https://github.com/pixijs-userland/particle-emitter) is a great library, but it hasn’t seen any updates or active maintenance in a long time and isn’t compatible with the latest version of Pixi. 

With that said, I greatly appreciate the work that has been put into the original library, as it has been the building blocks for this library and I see it as a spiritual successor ❤️