# ScaleBehavior

Behavior which scales particles over their lifetime.

## Extends

- [`EmitterBehavior`](EmitterBehavior.md)\<[`ScaleBehaviorConfig`](../type-aliases/ScaleBehaviorConfig.md)\>

## Implements

- [`InitBehavior`](../interfaces/InitBehavior.md)\<[`ScaleBehaviorConfig`](../type-aliases/ScaleBehaviorConfig.md)\>
- [`UpdateBehavior`](../interfaces/UpdateBehavior.md)\<[`ScaleBehaviorConfig`](../type-aliases/ScaleBehaviorConfig.md)\>

## Constructors

### Constructor

```ts
new ScaleBehavior(emitter): ScaleBehavior;
```

Creates a new ScaleBehavior.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `emitter` | [`Emitter`](Emitter.md) | Emitter instance this behavior belongs to. |

#### Returns

`ScaleBehavior`

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
| `config` | [`ScaleBehaviorConfig`](../type-aliases/ScaleBehaviorConfig.md) | Config to apply. |

#### Returns

`void`

#### Implementation of

[`UpdateBehavior`](../interfaces/UpdateBehavior.md).[`applyConfig`](../interfaces/UpdateBehavior.md#applyconfig)

#### Overrides

[`EmitterBehavior`](EmitterBehavior.md).[`applyConfig`](EmitterBehavior.md#applyconfig)

***

### getConfig()

```ts
getConfig(): ScaleBehaviorConfig;
```

Returns current behavior settings as a config.

#### Returns

[`ScaleBehaviorConfig`](../type-aliases/ScaleBehaviorConfig.md)

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
