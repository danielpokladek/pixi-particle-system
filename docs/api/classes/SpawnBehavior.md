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

### updateOrder

#### Get Signature

```ts
get updateOrder(): BehaviorOrder;
```

Order in which the behavior will be updated.
This is useful to ensure certain behaviors are updated before/after others.

##### Returns

`BehaviorOrder`

#### Implementation of

[`InitBehavior`](../interfaces/InitBehavior.md).[`updateOrder`](../interfaces/InitBehavior.md#updateorder)

#### Overrides

[`EmitterBehavior`](EmitterBehavior.md).[`updateOrder`](EmitterBehavior.md#updateorder)

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
