# UpdateBehavior\<Config\>

Interface for behaviors which update particles.

## Extends

- [`EmitterBehavior`](../classes/EmitterBehavior.md)\<`Config`\>

## Type Parameters

| Type Parameter |
| ------ |
| `Config` |

## Properties

### \_emitter

```ts
protected readonly _emitter: Emitter;
```

#### Inherited from

[`EmitterBehavior`](../classes/EmitterBehavior.md).[`_emitter`](../classes/EmitterBehavior.md#_emitter)

## Accessors

### behaviorOrder

#### Get Signature

```ts
get abstract behaviorOrder(): BehaviorOrder;
```

Returns the order in which this behavior is applied.

##### Returns

`BehaviorOrder`

#### Inherited from

[`EmitterBehavior`](../classes/EmitterBehavior.md).[`behaviorOrder`](../classes/EmitterBehavior.md#behaviororder)

## Methods

### applyConfig()

```ts
applyConfig(config): void;
```

Applies the config to behavior.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | `Config` | Config to apply. |

#### Returns

`void`

#### Inherited from

[`EmitterBehavior`](../classes/EmitterBehavior.md).[`applyConfig`](../classes/EmitterBehavior.md#applyconfig)

***

### getConfig()

```ts
abstract getConfig(): Config;
```

Returns current behavior settings as a config.

#### Returns

`Config`

#### Inherited from

[`EmitterBehavior`](../classes/EmitterBehavior.md).[`getConfig`](../classes/EmitterBehavior.md#getconfig)

***

### reset()

```ts
abstract protected reset(): void;
```

Resets the behavior to its default state.

#### Returns

`void`

#### Inherited from

[`EmitterBehavior`](../classes/EmitterBehavior.md).[`reset`](../classes/EmitterBehavior.md#reset)

***

### update()

```ts
update(particle, deltaTime): void;
```

Updates the particle.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `particle` | [`EmitterParticle`](../classes/EmitterParticle.md) | Particle to update. |
| `deltaTime` | `number` | Time elapsed since last update (in seconds). |

#### Returns

`void`
