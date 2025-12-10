# EmitterBehavior\<Config\>

Abstract behavior class which all behaviors inherit from.

## Extended by

- [`InitBehavior`](../interfaces/InitBehavior.md)
- [`UpdateBehavior`](../interfaces/UpdateBehavior.md)
- [`AlphaBehavior`](AlphaBehavior.md)
- [`ColorBehavior`](ColorBehavior.md)
- [`RotationBehavior`](RotationBehavior.md)
- [`ScaleBehavior`](ScaleBehavior.md)
- [`SpawnBehavior`](SpawnBehavior.md)
- [`TextureBehavior`](TextureBehavior.md)

## Type Parameters

| Type Parameter |
| ------ |
| `Config` |

## Constructors

### Constructor

```ts
new EmitterBehavior<Config>(emitter): EmitterBehavior<Config>;
```

Creates a new EmitterBehavior.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `emitter` | [`Emitter`](Emitter.md) | Emitter instance this behavior belongs to. |

#### Returns

`EmitterBehavior`\<`Config`\>

## Properties

### \_emitter

```ts
protected readonly _emitter: Emitter;
```

## Accessors

### behaviorOrder

#### Get Signature

```ts
get abstract behaviorOrder(): BehaviorOrder;
```

Returns the order in which this behavior is applied.

##### Returns

`BehaviorOrder`

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

***

### getConfig()

```ts
abstract getConfig(): Config;
```

Returns current behavior settings as a config.

#### Returns

`Config`

***

### reset()

```ts
abstract protected reset(): void;
```

Resets the behavior to its default state.

#### Returns

`void`
