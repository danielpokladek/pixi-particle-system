# Creating Custom Particle Data

Sometimes, when creating specific visual effects, we need to store additional custom data on the particles. This functionality becomes especially useful, when combined with [Custom Behaviors](./custom-behavior).

We'll walk through the process of creating a custom particle data type, and adding it to our system. We will create a custom object with a number value that is randomly generated when particle is initialized and a string value that never changes.

You generally only need to create a custom particle data when:

- You need to store meta data on particles, such as unique ID.
- You need to store extra data that is used in custom behaviors, such as cached noise values.

> [!NOTE]
> This page focuses purely on defining and writing custom particle data. Creating custom behaviors that consume data is covered separately.

## Setup

To get started, we will need a few things:

- Custom behavior in which we can read/write data to particles.
- Custom type defining the custom data we want to store on particles.
- Custom data initialization function, used to.. well, initialize the custom data.

### Data Type

This object describes what custom properties we want to add to our particle system, while keeping strong typing and IntelliSense support.

Any custom data object needs to extend the `BaseParticleData` object, as the base data is still required on the particles in order to function correctly with the built-in behaviors.

In the example below, we're defining two custom properties `customNumber` which will be a randomly generated number when particle is initialized, and `customString` which will always display `"Hello from particle!"`.

```ts
type CustomParticleData = BaseParticleData & {
    customNumber: number;
    customString: string;
}
```

### Custom Data Initialization

We need to initialize our custom data when particle is created, even if it isn't used straight away, as we can end up with a scenario where we try to modify a `undefined` value and the emitter will crash. In our case, we'll simply set `customNumber` to `0` and `customString` to `"Hello from particle!"` as mentioned previously.

```ts
const initializeCustomData = (data: CustomParticleData): void => {
    data.customNumber = 0;
    data.customString = "Hello from particle!";
}
```

The `data` object provided as parameter is passed into the function by emitter whenever a particle is initialized, so we need to make sure we use the object when initializing our custom data - the base data on particle doesn't need to be manually initialized, as that is already done in the `reset` method on particle.

We won't be using this method right now, but we will need it for later.

## Behavior Integration

To make custom behaviors aware of custom particle data, we need to provide the data type to the relevant generic parameters.

`EmitterBehavior`, `InitBehavior` and `UpdateBehavior` all accept custom types for custom particle data, and 

`EmitterBehavior<ConfigType, DataType, ParticleType>`

`InitBehavior<DataType, ParticleType>`

`UpdateBehavior<DataType, ParticleType>`

| Generic      | Description                                              |
| ------------ | -------------------------------------------------------- |
| ConfigType   | Type describing the configuration used in the behavior.  |
| DataType     | Type describing the data object that particles store.    |
| ParticleType | Type describing a custom particle class used in emitter. |

By default `DataType` uses `BaseParticleData`, and `ParticleType` uses `EmitterParticle` which are both built into the emitter and for general use won't require for the generics to be overridden.

`IEmitterParticle` also defaults to the base particle data if custom isn't provided, this means that wherever the `IEmitterParticle` is used, it needs to be updated to provide the custom particle data type.

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

> [!NOTE]
> Notice that `particle.data` is now strongly typed as `CustomParticleData`, giving full IntelliSense and type safety.

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
        };
    }
});
```

> [!NOTE]
> Helper function `createBaseParticleData()` can be used to easily create base particle data from anywhere in-code, allowing for easier creation of custom particle data.

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

And just like that, the emitter and any compatible behaviors can now use the custom particle data we've defined.