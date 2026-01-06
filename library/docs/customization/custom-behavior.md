# Creating Custom Behaviors

Often when working with visual effects, we find that certain effects require very specific functionality to achieve the desired look. The built-in behaviors provide a powerful framework to get anyone up and running with the system, but when that functionality isn’t enough, a custom behavior can be created to do exactly what we need.

We'll walk through the process of creating a custom behavior and adding it to our system. We will create a behavior that sets an initial scale when a particle is initialized, and then scales the particle up at a linear rate throughout its lifetime.

You generally only need to create a custom behavior when:

- The effect can't be expressed using existing built-in behaviors.
- You want tighter control over per-particle logic.

> [!WARNING]
> This page is designed for advanced use, before creating custom behaviors I'd highly recommend getting familiar with the [behavior system](../first-steps/behavior-system) as the guide assumes you are familiar with the behavior architecture.

## Class Setup

To get started, we will need two things:

- A type or interface that describes the configuration our behavior will accept and return.
- Our custom class which extends the abstract [`EmitterBehavior`](../api/classes/EmitterBehavior) - it provides the structure for all behaviors used by the emitter.

```ts
type CustomBehaviorConfig = { };

class CustomBehavior extends EmitterBehavior<CustomBehaviorConfig> {
    public get updateOrder(): BehaviorOrder {
        return "normal";
    }

    public getConfig(): CustomBehaviorConfig | undefined {
        return undefined;
    }

    public applyConfig(config: CustomBehaviorConfig): void {
        super.applyConfig(config);
    }

    protected reset(): void {
        
    }
}

const customBehavior = new CustomBehavior(emitter);
```

::: tip
In practice, built-in behaviors manage their active state internally during `applyConfig()`, but for custom behaviors we need to manually add or remove them as needed.
:::

### Update Order

This property is used to tell the emitter in which order the behaviors should be updated, we can set it to:

- `initial` which is the earliest possible update, useful for setting properties that will be used by other behaviors.
- `normal` which is the normal update, it is used by most of the behaviors in the emitter.
- `late` which is the latest possible update, useful when reading properties set by previous behaviors.

Depending on what functionality is required by your behavior, you might find that you need to set the order to `initial` in order for the custom behavior to be updated before other behaviors, or if you're creating some effect that should be happening at the end you'd set it to `late`.

In our case, we can leave it as normal, as we’ll only be manipulating the scale of the particles.

### Get/Apply Config

Each behavior defines what its configuration object should look like. In the above example we're leaving it empty for now and we'll fill it out when we know exactly what our behavior will look like.

Each behavior can return it's current state using `getConfig()` function, which is later combined into the main emitter config, or it can have a config applied to it to update it's current state using `applyConfig()`.

::: warning
When we call `getConfig()` on the [`Emitter`](../api/classes/Emitter.md), it will not return any custom behavior configs as it isn't aware of them. This means that any custom behavior will need to have it's config retrieved/applied manually.
:::

### Reset Method

As the name suggests, this is a reset method for the behavior - currently this is only called when `applyConfig()` is called, but in the future it might be used in other scenarios to ensure clean state for the behavior.

## Update Flow

Now we need to define whether our behavior will initialize or update (or both) the particles.

If we want to set something on the particle when its first created, we can do that using the [`InitBehavior`](./api/interfaces/InitBehavior.md) interface. On the other hand, if we want to set something on the particle each frame when the emitter updates, we can do that using the [`UpdateBehavior`](../api/interfaces/UpdateBehavior.md) interface.

In our case, we will both set the scale during initialization and update, so we want to implement both interfaces and their functions.

```ts
class CustomBehavior 
    extends EmitterBehavior<CustomBehaviorConfig> 
    implements InitBehavior, UpdateBehavior
{
    // .. remaining code

    // Required by `InitBehavior` interface.        
    public init(particle: EmitterParticle): void { }

    // Required by `UpdateBehavior` interface.
    public update(particle: EmitterParticle, deltaTime: number): void { }

    // .. remaining code
}
```

The reason we have two interfaces is that behaviors are added to two arrays which we loop over when working with the particles, one array for `InitBehavior` and one array for `UpdateBehavior`; this provides a more flexible and easier to understand API, whilst also avoiding updates of behaviors which don't need it (for example calling `update` just to instantly return).

## Modifying Particles

### Initializing Particles

Now that our class is fully set up and we have defined the required functions, we can start modifying the particles - the behavior is already in a state where we can plug it into the emitter, so let's do that first; we can simply call `addToActiveInitBehaviors(behavior)` and `addToActiveUpdateBehaviors(behavior)`, on the emitter itself, to have the emitter use the `init` and `update` functions from our behavior.

Let's start with the `init` function first - we want to set the particle’s scale when it is first initialized and as you have probably noticed the particle is passed as the method parameter, this means we can just simply set the scale of the particle like we would with any other Pixi element:

```ts
public init(particle: EmitterParticle): void {
    particle.scaleX = 10;
    particle.scaleY = 10;
}
```

If set up correctly, you will notice that the particles now show with the scale we've set in the `init` function - quite simple, right? 

### Updating Particles

Now lets update them! You will notice that in the update method the particle is passed in again, just like in the init method, but additionally we now hav access to another parameter: `deltaTime`.

If we animated our particles without using `deltaTime`, you would find that on slower devices that run at 30FPS the animation would appear slow but on newer devices that run at 120FPS the animation would appear super fast - `deltaTime` prevents this. Sometimes in other libraries/engines, you might see it referred to as `dT` as well, or just `delta`.

```ts
public update(particle: EmitterParticle, deltaTime: number): void {
    particle.scaleX += deltaTime * 50;
    particle.scaleY += deltaTime * 50;
}
```

As you can see, just like with `init` we can really easily modify the scale of the particles each frame. If you have followed the steps above, you'll have a behavior that does exactly what we set out to do in the beginning - it initializes particles with `foo` scale, and then scales them up by `bar` value each frame.

::: warning
Any logic inside of `update()` method should be written with performance in mind - this function gets called each frame, which means it can cause performance issues when the logic becomes too complex.
:::

## Custom Config

Remember the config we created earlier? Currently our values are hardcoded, and it's fine for testing but it makes it really difficult to tweak the values or when we want to have multiple emitters with the same behavior, but different values. Let's add some parameters to our custom config, and apply the values from it.

First let's add some properties to our config type - for now, let's add a `initialScale`, which we'll use when initializing the particle, and `scaleRatio` when updating the particle each frame.

```ts
type CustomBehaviorConfig = {
    initialScale: number; // [!code ++]
    scaleRate: number; // [!code ++]
};
```

Next, lets create variables in the class where we can cache the values passed in the config - keep in mind, we want to provide the variables with some defaults, otherwise if we try to run init/update without the default values we'll get a null exception (or ESLint will scream at you, if you're in strict mode). These cached values allow the behavior to operate safely even if a config is not immediately applied.

```ts
class CustomBehavior
    extends EmitterBehavior<CustomBehaviorConfig>
    implements InitBehavior, UpdateBehavior
{
    private _initialScale: number = 10; // [!code ++]
    private _scaleRate: number = 50; // [!code ++]

    // ...

    public applyConfig(config: CustomBehaviorConfig): void {
        super.applyConfig(config);

        this._initialScale = config.initialScale; // [!code ++]
        this._scaleRate = config.scaleRate; // [!code ++]
    }

    // ...
}
```

Finally, we want to use our cached variables.

```ts
    // ...

    public init(particle: EmitterParticle): void {
        particle.scaleX = 10; // [!code --]
        particle.scaleX = this._initialScale; // [!code ++]
        particle.scaleY = 10; // [!code --]
        particle.scaleY = this._initialScale; // [!code ++]
    }

    public update(particle: EmitterParticle, deltaTime: number): void {
        particle.scaleX += deltaTime * 50; // [!code --]
        particle.scaleX += deltaTime * this._scaleRate; // [!code ++]
        particle.scaleY += deltaTime * 50; // [!code --]
        particle.scaleY += deltaTime * this._scaleRate; // [!code ++]
    }

    // ...
}
```

If you have done everything correctly, you should notice that nothing has changed (unless the default values you set are different from the hardcoded values) - now we can use the `applyConfig` function to set some values on our behavior.

```ts
customBehavior.applyConfig({
    initialScale: 0,
    scaleRate: 10
})
```

## Next Steps

Now that we have created our first custom behavior, you have the knowledge to create your own behaviors! If you think you have an idea for a behavior that would benefit being part of the built-in behavior, you're always welcome to reach out in [discussions](https://github.com/danielpokladek/pixi-particle-system/discussions), raise a ticket in [issues](https://github.com/danielpokladek/pixi-particle-system/issues), or just create a pull request!

### Update Optimization
For example, you can add the behavior to the update loop in emitter only when required by making `initialScale` / `scaleRate` optional; this is done in quite few built-in behaviors, where they only add themselves to the relevant arrays if they require it.

```ts
type CustomBehaviorConfig = {
    initialScale?: number; 
    scaleRate?: number; 
};

// ...

public applyConfig(config: CustomBehaviorConfig): void {
    super.applyConfig(config);

    if (config.initialScale) {
        this._initialScale = config.initialScale; 
        this._emitter.addToActiveInitBehaviors(this);
    }

    if (config.scaleRate) {
        this._scaleRate = config.scaleRate;
        this._emitter.addToActiveUpdateBehaviors(this);
    }
}

protected reset(): void {
    this._emitter.removeFromActiveInitBehaviors(this);
    this._emitter.removeFromActiveUpdateBehaviors(this);
}
```
### Branching Configs

You can also use discriminated union types for when you want your behavior to support multiple modes of operation. For example, we can have a `initialScale` with a linear `scaleRate`, or users can provide a list and we scale the particles by value provided in the list based on particle's current lifetime (`age / maxAge`).

```ts
type CustomBehaviorConfig = { initialScale: number } & (
    | { scaleRate: number }
    | { listData: ListData<number> }
);
```