# EmitterBehavior\<ConfigType\>

Abstract base class for emitter behaviors to extend from.

## Extended by

- [`InitBehavior`](../interfaces/InitBehavior.md)
- [`UpdateBehavior`](../interfaces/UpdateBehavior.md)
- [`AlphaBehavior`](AlphaBehavior.md)
- [`ColorBehavior`](ColorBehavior.md)
- [`MovementBehavior`](MovementBehavior.md)
- [`RotationBehavior`](RotationBehavior.md)
- [`ScaleBehavior`](ScaleBehavior.md)
- [`SpawnBehavior`](SpawnBehavior.md)
- [`TextureBehavior`](TextureBehavior.md)

## Type Parameters

| Type Parameter | Description                                       |
| -------------- | ------------------------------------------------- |
| `ConfigType`   | Type defining the configuration for the behavior. |

## Constructors

### Constructor

```ts
new EmitterBehavior<ConfigType>(emitter): EmitterBehavior<ConfigType>;
```

Creates a new instance of the behavior.

#### Parameters

| Parameter | Type                    | Description                                |
| --------- | ----------------------- | ------------------------------------------ |
| `emitter` | [`Emitter`](Emitter.md) | Emitter instance this behavior belongs to. |

#### Returns

`EmitterBehavior`\<`ConfigType`\>

## Properties

### \_emitter

```ts
protected readonly _emitter: Emitter;
```

## Accessors

### updateOrder

#### Get Signature

```ts
get abstract updateOrder(): BehaviorOrder;
```

Order in which the behavior will be updated.
This is useful to ensure certain behaviors are updated before/after others.

##### Returns

`BehaviorOrder`

## Methods

### applyConfig()

```ts
applyConfig(config): void;
```

Apply behavior config to the behavior.
Please note, this will reset the behavior to its default state before applying the config.

#### Parameters

| Parameter | Type         | Description             |
| --------- | ------------ | ----------------------- |
| `config`  | `ConfigType` | Behavior configuration. |

#### Returns

`void`

---

### getConfig()

```ts
abstract getConfig(): ConfigType;
```

Retrieves the current behavior properties as a configuration object.

#### Returns

`ConfigType`

Behavior configuration.

---

### reset()

```ts
abstract protected reset(): void;
```

Resets the behavior to its default state.

#### Returns

`void`
