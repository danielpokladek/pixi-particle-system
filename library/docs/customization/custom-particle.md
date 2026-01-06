# Creating Custom Particle

Sometimes, when creating specific visual effects, we need our particles to carry out very specific functionality that is easier to implement using custom particle class. This functionality becomes especially useful, when combined with [Custom Particle Data](./custom-particle-data).

We'll walk through the process of creating a custom particle class and integrating it into the emitter. We will create a custom particle class, with a text element which will display a ID number on the particle; for that we will utilize custom particle data, to store and read our ID value.

You generally only need to create a custom particle class when the built-in particle doesn't provide the functionality you require - for most use cases, custom behaviors combined with custom particle data should be enough.

> [!WARNING]
> This page is intended for advanced use. Before creating custom particles, it's highly recommend that you become familiar with [creating custom behaviors](./custom-behavior) and [creating custom particle data](./custom-particle-data.md), as the guide assumes you are familiar with both.

## Setup

To get started, we will need a few things:

- A custom particle class, which extends PixiJS' `Particle` class and implements `IEmitterParticle` interface.
- A custom type defining the custom data we want to store on particles.

### Custom Data

We'll only skim over the custom data creation, as that is covered separately and more in-depth. For our custom particles, we'll need a single property called `particleID` where we will assign a unique ID to our particles.

```ts
type CustomParticleData = BaseParticleData & {
    particleID: number;
};
```

### Particle Class

Once we have our custom data, we can start with our custom particle class. To achieve the desired functionality, we need to create a text element which will be used to display our particle ID; because the PixiJS `Particle` class is intentionally lightweight class, it doesn't provide the ability to parent elements to it - instead, we will need to manually parent the element.

When creating custom particles, we need to extend PixiJS `Particle` class (as it provides lightweight elements, that directly work with the `ParticleContainer`); on top of that, we need to implement the `IEmitterParticle` interface, which provides us with functionality specific to the particle system library.

`IEmitterParticle` accepts a single generic `<DataType>`, where we can provide the type describing our custom data object.

```ts
import { IEmitterParticle } from "pixi-particle-system";
import { Particle, Text, Texture } from "pixi.js";

class CustomParticle
    extends Particle
    implements IEmitterParticle<CustomParticleData>
{
    public data: CustomParticleData;
    public debugText: Text;

    constructor(data: CustomParticleData) {
        super(Texture.EMPTY);

        this.data = data;

        this.debugText = new Text({
            text: data.particleID,
            style: {
                fill: "#ffffff",
                fontSize: 12,
            },
            anchor: 0.5,
        });
    }

    public onFetch(): void {
        // ...
    }

    public onRecycle(): void {
        resetBaseParticleData(this.data);
    }
}
```

> [!WARNING]
> When custom particles are used, the class is responsible for resetting and cleaning up the **custom data** as well as **base particle data** - a helper method `resetBaseParticleData(data)` is available to help with the cleanup logic. Any other properties such as anchor, texture, etc. need to be cleaned up manually as needed.

## Custom Behavior

As already mentioned, due to the lightweight nature of PixiJS particles, we can't parent anything for them - in order to achieve our desired functionality, we can use a custom behavior to parent and update position of the text elements. This is very inefficient, but it's a good demonstration of the system and debugging.

```ts
class CustomBehavior
    extends EmitterBehavior<unknown, CustomParticleData, CustomParticle>
    implements
        InitBehavior<CustomParticleData, CustomParticle>,
        UpdateBehavior<CustomParticleData, CustomParticle>
{
    public get updateOrder(): BehaviorOrder {
        return "late";
    }

    public applyConfig(): void {
        // ...
    }

    public getConfig(): unknown {
        return undefined;
    }

    public init(particle: CustomParticle): void {
        this._emitter.parent.parent?.addChild(particle.debugText);
    }

    public update(particle: CustomParticle): void {
        particle.debugText.position.set(
            particle.x + this._emitter.parent.x,
            particle.y + this._emitter.parent.y,
        );
    }

    protected reset(): void {
        // ...
    }
}
```

This behavior simply parents the text to the stage (or the parent of particle container) when the particle is initialized, and then updates the position of the text to the particle's position each update cycle. 

Additionally, we've also set the update order to `late`, this is to make sure the text position is updated after the particle has had its position updated.

## Emitter Integration

Now that we have all of our individual pieces, we can integrate them into the emitter so that they can actually be used. In order to integrate the custom particle into the emitter, we will utilize the emitter generics as well as the extra options when creating the emitter.

`Emitter<DataType, ParticleType>`

| Generic        | Description                                              |
| -------------- | -------------------------------------------------------- |
| `DataType`     | Type describing the data object that particles store.    |
| `ParticleType` | Type describing a custom particle class used in emitter. |

---

```ts
const emitter = new Emitter<CustomParticleData, CustomParticle>(
    particleContainer,
    undefined,
    {
        particleFactory: createParticle,
        dataFactory: createData,
    }
);
```

| Property                | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `particleFactory`       | Function used to create a new particle instance.         |
| `dataFactory`           | Function used to create a new instance of particle data. |
| `customDataInitializer` | Function used to initialize the custom particle data.    |

Let's break down the functions one by one.

### Particle Factory

This function will be used by the emitter to create a new particle instance. The emitter provides the particle data as a parameter, which we need to pass into our particle constructor.

```ts
const createParticle = (data: CustomParticleData): CustomParticle => { 
    return new CustomParticle(data);
}
```

### Data Factory

This function will be used by the emitter to create a new data instance. It has no parameters, and should return a new object.

```ts
import { createBaseParticleData } from "pixi-particle-system";

let particleIdCounter = 0;

const createData = (): CustomParticleData => {
    return {
        ...createBaseParticleData(),
        particleID: particleIdCounter++;
    }
}
```

Additionally, outside of the function scope, we declare `particleIdCounter` which we increment when new data is created. Because particles are pooled, this counter only increments when new data objects are created, not when particles are reused.

### Data Initializer

In this example, the data is fully initialized during creation, so a custom initializer isn't strictly required. In other cases, where data needs to be initialized separately, we can utilize the custom data initializer function, which provides particle data as a parameter.

```ts
const initData = (data: CustomParticleData): void {
    // ... initialize data here
}

const emitter = new Emitter<CustomParticleData, CustomParticle>(
    particleContainer,
    undefined,
    {
        customDataInitializer: initData,
    }
);
```

And just like that, you should now see numbers flying around the screen - one for each particle. If you are using `Texture.WHITE`, chances are the numbers are larger than the particles so you will only see the numbers.