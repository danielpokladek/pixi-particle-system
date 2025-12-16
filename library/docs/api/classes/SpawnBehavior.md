# SpawnBehavior

Behavior which spawns particles within a defined shape.

## Extends

- [`EmitterBehavior`](EmitterBehavior.md)\<[`SpawnBehaviorConfig`](../type-aliases/SpawnBehaviorConfig.md)\>

## Implements

- [`InitBehavior`](../interfaces/InitBehavior.md)\<[`SpawnBehaviorConfig`](../type-aliases/SpawnBehaviorConfig.md)\>

## Constructors

### Constructor

```ts
new SpawnBehavior(emitter): SpawnBehavior;
```

Creates a new instance of the behavior.

#### Parameters

| Parameter | Type                    | Description                                |
| --------- | ----------------------- | ------------------------------------------ |
| `emitter` | [`Emitter`](Emitter.md) | Emitter instance this behavior belongs to. |

#### Returns

`SpawnBehavior`

#### Inherited from

[`EmitterBehavior`](EmitterBehavior.md).[`constructor`](EmitterBehavior.md#constructor)

## Properties

### \_emitter

```ts
protected readonly _emitter: Emitter;
```

#### Implementation of

[`InitBehavior`](../interfaces/InitBehavior.md).[`_emitter`](../interfaces/InitBehavior.md#_emitter)

#### Inherited from

[`EmitterBehavior`](EmitterBehavior.md).[`_emitter`](EmitterBehavior.md#emitter)

## Accessors

### direction

#### Get Signature

```ts
get direction(): PointData;
```

Direction vector applied to spawned particles.

##### Returns

`PointData`

#### Set Signature

```ts
set direction(value): void;
```

##### Parameters

| Parameter | Type        |
| --------- | ----------- |
| `value`   | `PointData` |

##### Returns

`void`

---

### height

#### Get Signature

```ts
get height(): number;
```

Height of the spawn shape (for rectangle shape).

##### Returns

`number`

#### Set Signature

```ts
set height(value): void;
```

##### Parameters

| Parameter | Type     |
| --------- | -------- |
| `value`   | `number` |

##### Returns

`void`

---

### innerRadius

#### Get Signature

```ts
get innerRadius(): number;
```

Inner radius of the spawn shape (for circle shape).

##### Returns

`number`

#### Set Signature

```ts
set innerRadius(value): void;
```

##### Parameters

| Parameter | Type     |
| --------- | -------- |
| `value`   | `number` |

##### Returns

`void`

---

### outerRadius

#### Get Signature

```ts
get outerRadius(): number;
```

Outer radius of the spawn shape (for circle shape).

##### Returns

`number`

#### Set Signature

```ts
set outerRadius(value): void;
```

##### Parameters

| Parameter | Type     |
| --------- | -------- |
| `value`   | `number` |

##### Returns

`void`

---

### shape

#### Get Signature

```ts
get shape(): SpawnShape;
```

Shape used for spawning particles.

##### Returns

[`SpawnShape`](../type-aliases/SpawnShape.md)

#### Set Signature

```ts
set shape(value): void;
```

##### Parameters

| Parameter | Type                                          |
| --------- | --------------------------------------------- |
| `value`   | [`SpawnShape`](../type-aliases/SpawnShape.md) |

##### Returns

`void`

---

### updateOrder

#### Get Signature

```ts
get updateOrder(): BehaviorOrder;
```

Order in which the behavior will be updated.
This is useful to ensure certain behaviors are updated before/after others.

##### Returns

[`BehaviorOrder`](../type-aliases/BehaviorOrder.md)

#### Implementation of

[`InitBehavior`](../interfaces/InitBehavior.md).[`updateOrder`](../interfaces/InitBehavior.md#updateorder)

#### Overrides

[`EmitterBehavior`](EmitterBehavior.md).[`updateOrder`](EmitterBehavior.md#updateorder)

---

### width

#### Get Signature

```ts
get width(): number;
```

Width of the spawn shape (for rectangle and line shapes).

##### Returns

`number`

#### Set Signature

```ts
set width(value): void;
```

##### Parameters

| Parameter | Type     |
| --------- | -------- |
| `value`   | `number` |

##### Returns

`void`

## Methods

### applyConfig()

```ts
applyConfig(config): void;
```

Apply behavior config to the behavior.
Please note, this will reset the behavior to its default state before applying the config.

#### Parameters

| Parameter | Type                                                            | Description             |
| --------- | --------------------------------------------------------------- | ----------------------- |
| `config`  | [`SpawnBehaviorConfig`](../type-aliases/SpawnBehaviorConfig.md) | Behavior configuration. |

#### Returns

`void`

#### Implementation of

[`InitBehavior`](../interfaces/InitBehavior.md).[`applyConfig`](../interfaces/InitBehavior.md#applyconfig)

#### Overrides

[`EmitterBehavior`](EmitterBehavior.md).[`applyConfig`](EmitterBehavior.md#applyconfig)

---

### getConfig()

```ts
getConfig(): SpawnBehaviorConfig;
```

Retrieves the current behavior properties as a configuration object.

#### Returns

[`SpawnBehaviorConfig`](../type-aliases/SpawnBehaviorConfig.md)

Behavior configuration.

#### Implementation of

[`InitBehavior`](../interfaces/InitBehavior.md).[`getConfig`](../interfaces/InitBehavior.md#getconfig)

#### Overrides

[`EmitterBehavior`](EmitterBehavior.md).[`getConfig`](EmitterBehavior.md#getconfig)

---

### init()

```ts
init(particle): void;
```

Initializes the particle.

#### Parameters

| Parameter  | Type                                    | Description             |
| ---------- | --------------------------------------- | ----------------------- |
| `particle` | [`EmitterParticle`](EmitterParticle.md) | Particle to initialize. |

#### Returns

`void`

#### Implementation of

[`InitBehavior`](../interfaces/InitBehavior.md).[`init`](../interfaces/InitBehavior.md#init)

---

### reset()

```ts
protected reset(): void;
```

Resets the behavior to its default state.

#### Returns

`void`

#### Implementation of

[`InitBehavior`](../interfaces/InitBehavior.md).[`reset`](../interfaces/InitBehavior.md#reset)

#### Overrides

[`EmitterBehavior`](EmitterBehavior.md).[`reset`](EmitterBehavior.md#reset)
