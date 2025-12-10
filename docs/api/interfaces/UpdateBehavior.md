# UpdateBehavior\<Config\>

Interface defining behaviors which update particles on each update cycle.

## Extends

- [`EmitterBehavior`](../classes/EmitterBehavior.md)\<`Config`\>

## Type Parameters

| Type Parameter | Description                                       |
| -------------- | ------------------------------------------------- |
| `Config`       | Type defining the configuration for the behavior. |

## Properties

### \_emitter

```ts
protected readonly _emitter: Emitter;
```

#### Inherited from

[`EmitterBehavior`](../classes/EmitterBehavior.md).[`_emitter`](../classes/EmitterBehavior.md#_emitter)

## Accessors

### updateOrder

#### Get Signature

```ts
get abstract updateOrder(): BehaviorOrder;
```

Order in which the behavior will be updated.
This is useful to ensure certain behaviors are updated before/after others.

##### Returns

[`BehaviorOrder`](../type-aliases/BehaviorOrder.md)

#### Inherited from

[`EmitterBehavior`](../classes/EmitterBehavior.md).[`updateOrder`](../classes/EmitterBehavior.md#updateorder)

## Methods

### applyConfig()

```ts
applyConfig(config): void;
```

Apply behavior config to the behavior.
Please note, this will reset the behavior to its default state before applying the config.

#### Parameters

| Parameter | Type     | Description             |
| --------- | -------- | ----------------------- |
| `config`  | `Config` | Behavior configuration. |

#### Returns

`void`

#### Inherited from

[`EmitterBehavior`](../classes/EmitterBehavior.md).[`applyConfig`](../classes/EmitterBehavior.md#applyconfig)

---

### getConfig()

```ts
abstract getConfig(): Config;
```

Retrieves the current behavior properties as a configuration object.

#### Returns

`Config`

Behavior configuration.

#### Inherited from

[`EmitterBehavior`](../classes/EmitterBehavior.md).[`getConfig`](../classes/EmitterBehavior.md#getconfig)

---

### reset()

```ts
abstract protected reset(): void;
```

Resets the behavior to its default state.

#### Returns

`void`

#### Inherited from

[`EmitterBehavior`](../classes/EmitterBehavior.md).[`reset`](../classes/EmitterBehavior.md#reset)

---

### update()

```ts
update(particle, deltaTime): void;
```

Updates the particle.

#### Parameters

| Parameter   | Type                                               | Description                                     |
| ----------- | -------------------------------------------------- | ----------------------------------------------- |
| `particle`  | [`EmitterParticle`](../classes/EmitterParticle.md) | Particle to update.                             |
| `deltaTime` | `number`                                           | Time elapsed since the last update, in seconds. |

#### Returns

`void`
