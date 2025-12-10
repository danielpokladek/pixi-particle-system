# Emitter

Emitter class which handles particle spawning and updating.

## Constructors

### Constructor

```ts
new Emitter(parent, initialConfig?): Emitter;
```

Creates a new Emitter instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parent` | `ParticleContainer` | Parent ParticleContainer for the emitter. |
| `initialConfig?` | [`EmitterConfig`](../type-aliases/EmitterConfig.md) | Optional initial configuration for the emitter. |

#### Returns

`Emitter`

## Accessors

### maxParticles

#### Get Signature

```ts
get maxParticles(): number;
```

Maximum number of particles allowed in the emitter.

##### Returns

`number`

***

### parent

#### Get Signature

```ts
get parent(): ParticleContainer;
```

Parent ParticleContainer of the emitter.

##### Returns

`ParticleContainer`

***

### particleCount

#### Get Signature

```ts
get particleCount(): number;
```

Current number of active particles in the emitter.

##### Returns

`number`

***

### textureBehavior

#### Get Signature

```ts
get textureBehavior(): TextureBehavior;
```

Texture behavior of the emitter.

##### Returns

[`TextureBehavior`](TextureBehavior.md)

## Methods

### addToActiveInitBehaviors()

```ts
addToActiveInitBehaviors(behavior): void;
```

Adds a behavior to the active init behaviors.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `behavior` | [`InitBehavior`](../interfaces/InitBehavior.md)\<`unknown`\> | Behavior to add. |

#### Returns

`void`

***

### addToActiveUpdateBehaviors()

```ts
addToActiveUpdateBehaviors(behavior): void;
```

Adds a behavior to the active update behaviors.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `behavior` | [`UpdateBehavior`](../interfaces/UpdateBehavior.md)\<`unknown`\> | Behavior to add. |

#### Returns

`void`

***

### applyConfig()

```ts
applyConfig(config): void;
```

Applies a configuration to the emitter.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`EmitterConfig`](../type-aliases/EmitterConfig.md) | Configuration to apply. |

#### Returns

`void`

***

### play()

```ts
play(): void;
```

Starts the emitter.

#### Returns

`void`

***

### prewarm()

```ts
prewarm(time): void;
```

Prewarms the emitter by simulating particle spawning and updating for a given time.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `time` | `number` | Time in seconds to prewarm the emitter. |

#### Returns

`void`

***

### removeFromActiveInitBehaviors()

```ts
removeFromActiveInitBehaviors(behavior): void;
```

Removes a behavior from the active init behaviors.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `behavior` | [`InitBehavior`](../interfaces/InitBehavior.md)\<`unknown`\> | Behavior to remove. |

#### Returns

`void`

***

### removeFromActiveUpdateBehaviors()

```ts
removeFromActiveUpdateBehaviors(behavior): void;
```

Removes a behavior from the active update behaviors.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `behavior` | [`UpdateBehavior`](../interfaces/UpdateBehavior.md)\<`unknown`\> | Behavior to remove. |

#### Returns

`void`

***

### stop()

```ts
stop(instant): void;
```

Stops the emitter.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `instant` | `boolean` | `false` | Whether to stop instantly or let existing particles die out. |

#### Returns

`void`
