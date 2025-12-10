# TextureBehavior

Behavior which handles particle textures.

## Extends

- [`EmitterBehavior`](EmitterBehavior.md)\<[`TextureBehaviorConfig`](../type-aliases/TextureBehaviorConfig.md)\>

## Implements

- [`InitBehavior`](../interfaces/InitBehavior.md)\<[`TextureBehaviorConfig`](../type-aliases/TextureBehaviorConfig.md)\>
- [`UpdateBehavior`](../interfaces/UpdateBehavior.md)\<[`TextureBehaviorConfig`](../type-aliases/TextureBehaviorConfig.md)\>

## Constructors

### Constructor

```ts
new TextureBehavior(emitter): TextureBehavior;
```

Creates a new EmitterBehavior.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `emitter` | [`Emitter`](Emitter.md) | Emitter instance this behavior belongs to. |

#### Returns

`TextureBehavior`

#### Inherited from

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
| `config` | [`TextureBehaviorConfig`](../type-aliases/TextureBehaviorConfig.md) | Config to apply. |

#### Returns

`void`

#### Implementation of

[`UpdateBehavior`](../interfaces/UpdateBehavior.md).[`applyConfig`](../interfaces/UpdateBehavior.md#applyconfig)

#### Overrides

[`EmitterBehavior`](EmitterBehavior.md).[`applyConfig`](EmitterBehavior.md#applyconfig)

***

### getConfig()

```ts
getConfig(): TextureBehaviorConfig;
```

Returns current behavior settings as a config.

#### Returns

[`TextureBehaviorConfig`](../type-aliases/TextureBehaviorConfig.md)

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
update(particle, deltaTime): void;
```

Updates the particle.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `particle` | [`EmitterParticle`](EmitterParticle.md) | Particle to update. |
| `deltaTime` | `number` | Time elapsed since last update (in seconds). |

#### Returns

`void`

#### Implementation of

[`UpdateBehavior`](../interfaces/UpdateBehavior.md).[`update`](../interfaces/UpdateBehavior.md#update)
