# AlphaBehavior

Behavior which manages particle alpha over their lifetime.

## Extends

- [`EmitterBehavior`](EmitterBehavior.md)\<[`AlphaBehaviorConfig`](../type-aliases/AlphaBehaviorConfig.md)\>

## Implements

- [`InitBehavior`](../interfaces/InitBehavior.md)\<[`AlphaBehaviorConfig`](../type-aliases/AlphaBehaviorConfig.md)\>
- [`UpdateBehavior`](../interfaces/UpdateBehavior.md)\<[`AlphaBehaviorConfig`](../type-aliases/AlphaBehaviorConfig.md)\>

## Constructors

### Constructor

```ts
new AlphaBehavior(emitter): AlphaBehavior;
```

Creates new instance of AlphaBehavior.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `emitter` | [`Emitter`](Emitter.md) | Emitter instance this behavior belongs to. |

#### Returns

`AlphaBehavior`

#### Overrides

[`EmitterBehavior`](EmitterBehavior.md).[`constructor`](EmitterBehavior.md#constructor)

## Properties

### \_emitter

```ts
protected readonly _emitter: Emitter;
```

#### Implementation of

[`UpdateBehavior`](../interfaces/UpdateBehavior.md).[`_emitter`](../interfaces/UpdateBehavior.md#_emitter)

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

[`UpdateBehavior`](../interfaces/UpdateBehavior.md).[`behaviorOrder`](../interfaces/UpdateBehavior.md#behaviororder)

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
| `config` | [`AlphaBehaviorConfig`](../type-aliases/AlphaBehaviorConfig.md) | Config to apply. |

#### Returns

`void`

#### Implementation of

[`UpdateBehavior`](../interfaces/UpdateBehavior.md).[`applyConfig`](../interfaces/UpdateBehavior.md#applyconfig)

#### Overrides

[`EmitterBehavior`](EmitterBehavior.md).[`applyConfig`](EmitterBehavior.md#applyconfig)

***

### getConfig()

```ts
getConfig(): AlphaBehaviorConfig;
```

Returns current behavior settings as a config.

#### Returns

[`AlphaBehaviorConfig`](../type-aliases/AlphaBehaviorConfig.md)

#### Implementation of

[`UpdateBehavior`](../interfaces/UpdateBehavior.md).[`getConfig`](../interfaces/UpdateBehavior.md#getconfig)

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

[`UpdateBehavior`](../interfaces/UpdateBehavior.md).[`reset`](../interfaces/UpdateBehavior.md#reset)

#### Overrides

[`EmitterBehavior`](EmitterBehavior.md).[`reset`](EmitterBehavior.md#reset)

***

### update()

```ts
update(particle): void;
```

Updates the particle.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `particle` | [`EmitterParticle`](EmitterParticle.md) | Particle to update. |

#### Returns

`void`

#### Implementation of

[`UpdateBehavior`](../interfaces/UpdateBehavior.md).[`update`](../interfaces/UpdateBehavior.md#update)
