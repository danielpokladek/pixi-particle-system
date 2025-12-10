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

Creates a new EmitterBehavior.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
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

### behaviorOrder

#### Get Signature

```ts
get behaviorOrder(): BehaviorOrder;
```

Returns the order in which this behavior is applied.

##### Returns

`BehaviorOrder`

#### Implementation of

[`InitBehavior`](../interfaces/InitBehavior.md).[`behaviorOrder`](../interfaces/InitBehavior.md#behaviororder)

#### Overrides

[`EmitterBehavior`](EmitterBehavior.md).[`behaviorOrder`](EmitterBehavior.md#behaviororder)

## Methods

### applyConfig()

```ts
applyConfig(config): void;
```

Applies the config to behavior.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`SpawnBehaviorConfig`](../type-aliases/SpawnBehaviorConfig.md) | Config to apply. |

#### Returns

`void`

#### Implementation of

[`InitBehavior`](../interfaces/InitBehavior.md).[`applyConfig`](../interfaces/InitBehavior.md#applyconfig)

#### Overrides

[`EmitterBehavior`](EmitterBehavior.md).[`applyConfig`](EmitterBehavior.md#applyconfig)

***

### getConfig()

```ts
getConfig(): SpawnBehaviorConfig;
```

Returns current behavior settings as a config.

#### Returns

[`SpawnBehaviorConfig`](../type-aliases/SpawnBehaviorConfig.md)

#### Implementation of

[`InitBehavior`](../interfaces/InitBehavior.md).[`getConfig`](../interfaces/InitBehavior.md#getconfig)

#### Overrides

[`EmitterBehavior`](EmitterBehavior.md).[`getConfig`](EmitterBehavior.md#getconfig)

***

### init()

```ts
init(particle): void;
```

Initializes the particle.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `particle` | [`EmitterParticle`](EmitterParticle.md) | Particle to initialize. |

#### Returns

`void`

#### Implementation of

[`InitBehavior`](../interfaces/InitBehavior.md).[`init`](../interfaces/InitBehavior.md#init)

***

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
