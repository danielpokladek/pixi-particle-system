# Creating Custom Particle Data

Sometimes when trying to create specific visual effects, we find that we need to store some custom data on the particles. This functionality becomes really useful, when coupled up with [Custom Behaviors](./custom-behavior) which can read and write their own custom data to the particles.

Custom behaviors won't be covered here, please see the already mentioned page if you'd like to learn about those - instead this page will mainly focus on adding custom particle data to the emitter, and using it within existing custom behavior.

## Setup

To get started, we will need few things:

- Custom behavior in which we can read/write data to particles.
- Custom type defining the custom data we want to store on particles.
- Custom data initialization function, used to.. well, initialize the custom data.

### Data Type

This object describes what custom properties we want to add to our particle system, whilst keeping typing, prediction and intellisense support.

Any custom data object needs to extend the `BaseParticleData` object, as the base data is still required on the particles in order to function correctly with the built-in behaviors. In the example below, we're defining two custom properties `customNumber` which will be a randomly generated number when particle is initialized, and `customString` which will always display `"Hello from particle!"`.

```ts
type CustomParticleData = BaseParticleData & {
    customNumber: number;
    customString: string;
}
```

### Custom Data Initialization

We need to initialize our custom data when particle is created, even if it isn't used straight away, as we can end up with a scenario where we try to modify a `undefined` value and the emitter will crash. In our case, we'll simply set `customNumber` to `0` and `customString` to `"Hello from particle!"` as mentioned previously.

```ts
const initializeCustomData = (data): void => {
    data.customNumber = 0;
    data.customString = "Hello from particle!";
}
```

We won't be using this method right now, but we will need it for later.

## Behavior Integration

`EmitterBehavior`, `InitBehavior` and `UpdateBehavior` all accept custom types for custom particle data, and by default they will use `BaseParticleData` so we don't have to provide a type when we just want to use the base data with default particles.

The first type in `EmitterBehavior` is used for custom configs, we have looked at that in [Custom Behaviors](./custom-behavior); the second type is where we provide the custom particle data, and finally the third type is used to provide custom particle.

By default, the `init` and `update` functions will use `IEmitterParticle` which also defaults to the base particle data if custom isn't provided, this means that wherever the `IEmitterParticle` is used, it needs to be updated to provide the custom particle data type.

Below is an example of a very simple behavior which will only be called on particle initialization.

```ts
class CustomInitBehavior 
    extends EmitterBehavior<unknown, CustomParticleData> 
    implements InitBehavior<CustomParticleData> 
{
    public get updateOrder(): BehaviorOrder { 
        return "normal";
    }

    public applyConfig(): void {

    }

    public getConfig(): unknown {
        return undefined;
    }

    public init(particle: IEmitterParticle<CustomParticleData>): void {
        particle.data.customNumber = Math.random();
    }

    protected reset(): void {

    }
}
```

## Emitter Integration

Now that we have our basic setup, we can integrate our data into the emitter. Just like behaviors, `Emitter` accepts two generic types - first allows us to define custom particle data, second allows us to define a custom particle class; additionally, we can set some extra emitter options to provide the custom particle data initializer, and data factory which creates a new instance (object).

### Data Creation

Let's start with creating new instances of our custom data using `dataFactory` - when creating our emitter, we want to provide the parameters as normal, and we can set the default config as `undefined` if we don't have one, as third parameter we can provide the additional options.

```ts
const particleContainer = new ParticleContainer();
const emitter = new Emitter<CustomParticleData>(
    particleContainer, 
    undefined, 
    {
        dataFactory: (): CustomParticleData => {
            return {
                ...createBaseParticleData(),
                customNumber: 0,
                customString: "",
        },
    }
});
```

> [!NOTE]
> Helper function `createBasicParticleData()` can be used to easily create base particle data from anywhere in-code, allowing for easier creation of custom particle data.

Now with the following function set, each time a particle is created the custom function will be used to create the particle data object instead of the default function.

### Data Initialization

Now we need to set the function which will initialize our particle data, this is called when the particle is first created as well as when the particle is recycled to ensure the particle always starts with the correct default values.

```ts
const particleContainer = new ParticleContainer();
const emitter = new Emitter<CustomParticleData>(
    particleContainer, 
    undefined, 
    {
        dataFactory: (): CustomParticleData => {
            return {
                ...createBaseParticleData(),
                customNumber: 0,
                customString: "",
        },
        customDataInitializer: (data: CustomParticleData): void => {
            data.customNumber = 0;
            data.customString = "Hello from particle!";
        }
    }
});
```

Just like with `dataFactory`, we can really easily reset the custom data on the particle with our function.. but wait! Didn't we create a custom function for this, you say? Yes, yes we have.. so let's use it!

```ts
const particleContainer = new ParticleContainer();
const emitter = new Emitter<CustomParticleData>(
    particleContainer, 
    undefined, 
    {
        dataFactory: (): CustomParticleData => {
            return {
                ...createBaseParticleData(),
                customNumber: 0,
                customString: "",
        },
        customDataInitializer: initializeCustomData;
    }
});
```

And just like that, the emitter (and behavior) use the custom data we have defined.