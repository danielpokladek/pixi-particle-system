# Emitter

Emitter class which handles particle spawning and updating.

## Constructors

### Constructor

```ts
new Emitter(parent, initialConfig?): Emitter;
```

Creates a new Emitter instance.

#### Parameters

| Parameter        | Type                                                | Description                                     |
| ---------------- | --------------------------------------------------- | ----------------------------------------------- |
| `parent`         | `ParticleContainer`                                 | Parent ParticleContainer for the emitter.       |
| `initialConfig?` | [`EmitterConfig`](../type-aliases/EmitterConfig.md) | Optional initial configuration for the emitter. |

#### Returns

`Emitter`

## Accessors

### addAtBack

#### Get Signature

```ts
get addAtBack(): boolean;
```

Whether to add new particles at the back of the container.

##### Returns

`boolean`

#### Set Signature

```ts
set addAtBack(value): void;
```

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `boolean` |

##### Returns

`void`

---

### alphaBehavior

#### Get Signature

```ts
get alphaBehavior(): AlphaBehavior;
```

Alpha behavior of the emitter.

##### Returns

[`AlphaBehavior`](AlphaBehavior.md)

---

### colorBehavior

#### Get Signature

```ts
get colorBehavior(): ColorBehavior;
```

Color behavior of the emitter.

##### Returns

[`ColorBehavior`](ColorBehavior.md)

---

### maxLifetime

#### Get Signature

```ts
get maxLifetime(): number;
```

Maximum lifetime of particles in seconds.

##### Returns

`number`

#### Set Signature

```ts
set maxLifetime(value): void;
```

##### Parameters

| Parameter | Type     |
| --------- | -------- |
| `value`   | `number` |

##### Returns

`void`

---

### maxParticles

#### Get Signature

```ts
get maxParticles(): number;
```

Maximum number of particles allowed in the emitter.

##### Returns

`number`

#### Set Signature

```ts
set maxParticles(value): void;
```

##### Parameters

| Parameter | Type     |
| --------- | -------- |
| `value`   | `number` |

##### Returns

`void`

---

### minLifetime

#### Get Signature

```ts
get minLifetime(): number;
```

Minimum lifetime of particles in seconds.

##### Returns

`number`

#### Set Signature

```ts
set minLifetime(value): void;
```

##### Parameters

| Parameter | Type     |
| --------- | -------- |
| `value`   | `number` |

##### Returns

`void`

---

### movementBehavior

#### Get Signature

```ts
get movementBehavior(): MovementBehavior;
```

Movement behavior of the emitter.

##### Returns

[`MovementBehavior`](MovementBehavior.md)

---

### parent

#### Get Signature

```ts
get parent(): ParticleContainer;
```

Parent ParticleContainer of the emitter.

##### Returns

`ParticleContainer`

---

### particleCount

#### Get Signature

```ts
get particleCount(): number;
```

Current number of active particles in the emitter.

##### Returns

`number`

---

### particlesPerWave

#### Get Signature

```ts
get particlesPerWave(): number;
```

Number of particles to spawn per wave.

##### Returns

`number`

#### Set Signature

```ts
set particlesPerWave(value): void;
```

##### Parameters

| Parameter | Type     |
| --------- | -------- |
| `value`   | `number` |

##### Returns

`void`

---

### rotationBehavior

#### Get Signature

```ts
get rotationBehavior(): RotationBehavior;
```

Rotation behavior of the emitter.

##### Returns

[`RotationBehavior`](RotationBehavior.md)

---

### scaleBehavior

#### Get Signature

```ts
get scaleBehavior(): ScaleBehavior;
```

Scale behavior of the emitter.

##### Returns

[`ScaleBehavior`](ScaleBehavior.md)

---

### spawnBehavior

#### Get Signature

```ts
get spawnBehavior(): SpawnBehavior;
```

##### Returns

[`SpawnBehavior`](SpawnBehavior.md)

---

### spawnChance

#### Get Signature

```ts
get spawnChance(): number;
```

Chance of spawning a particle (0.0 - 1.0).

##### Returns

`number`

#### Set Signature

```ts
set spawnChance(value): void;
```

##### Parameters

| Parameter | Type     |
| --------- | -------- |
| `value`   | `number` |

##### Returns

`void`

---

### spawnInterval

#### Get Signature

```ts
get spawnInterval(): number;
```

Interval between particle spawns in seconds.

##### Returns

`number`

#### Set Signature

```ts
set spawnInterval(value): void;
```

##### Parameters

| Parameter | Type     |
| --------- | -------- |
| `value`   | `number` |

##### Returns

`void`

---

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

| Parameter  | Type                                                         | Description      |
| ---------- | ------------------------------------------------------------ | ---------------- |
| `behavior` | [`InitBehavior`](../interfaces/InitBehavior.md)\<`unknown`\> | Behavior to add. |

#### Returns

`void`

---

### addToActiveUpdateBehaviors()

```ts
addToActiveUpdateBehaviors(behavior): void;
```

Adds a behavior to the active update behaviors.

#### Parameters

| Parameter  | Type                                                             | Description      |
| ---------- | ---------------------------------------------------------------- | ---------------- |
| `behavior` | [`UpdateBehavior`](../interfaces/UpdateBehavior.md)\<`unknown`\> | Behavior to add. |

#### Returns

`void`

---

### applyConfig()

```ts
applyConfig(config): void;
```

Applies a configuration to the emitter.

#### Parameters

| Parameter | Type                                                | Description             |
| --------- | --------------------------------------------------- | ----------------------- |
| `config`  | [`EmitterConfig`](../type-aliases/EmitterConfig.md) | Configuration to apply. |

#### Returns

`void`

---

### getConfig()

```ts
getConfig(): EmitterConfig;
```

Retrieves the current configuration for emitter and its behaviors.

#### Returns

[`EmitterConfig`](../type-aliases/EmitterConfig.md)

Current configuration object.

---

### play()

```ts
play(): void;
```

Starts the emitter.

#### Returns

`void`

---

### prewarm()

```ts
prewarm(time): void;
```

Prewarms the emitter by simulating particle spawning and updating for a given time.

#### Parameters

| Parameter | Type     | Description                             |
| --------- | -------- | --------------------------------------- |
| `time`    | `number` | Time in seconds to prewarm the emitter. |

#### Returns

`void`

---

### removeFromActiveInitBehaviors()

```ts
removeFromActiveInitBehaviors(behavior): void;
```

Removes a behavior from the active init behaviors.

#### Parameters

| Parameter  | Type                                                         | Description         |
| ---------- | ------------------------------------------------------------ | ------------------- |
| `behavior` | [`InitBehavior`](../interfaces/InitBehavior.md)\<`unknown`\> | Behavior to remove. |

#### Returns

`void`

---

### removeFromActiveUpdateBehaviors()

```ts
removeFromActiveUpdateBehaviors(behavior): void;
```

Removes a behavior from the active update behaviors.

#### Parameters

| Parameter  | Type                                                             | Description         |
| ---------- | ---------------------------------------------------------------- | ------------------- |
| `behavior` | [`UpdateBehavior`](../interfaces/UpdateBehavior.md)\<`unknown`\> | Behavior to remove. |

#### Returns

`void`

---

### stop()

```ts
stop(instant): void;
```

Stops the emitter.

#### Parameters

| Parameter | Type      | Default value | Description                                                  |
| --------- | --------- | ------------- | ------------------------------------------------------------ |
| `instant` | `boolean` | `false`       | Whether to stop instantly or let existing particles die out. |

#### Returns

`void`
