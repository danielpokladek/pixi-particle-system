# AlphaBehavior

Behavior used to control the opacity of particles over their lifetime.
Behavior can be configured using a static value, a list of values to interpolate over time, or a random value from a list.

## Example

```typescript
// Interpolate alpha from 0 to 1 and back to 0 over the particle's lifetime.
alphaBehavior.applyConfig({
    listData: [
        { time: 0.0, value: 0.0 },
        { time: 0.5, value: 1.0 },
        { time: 1.0, value: 0.0 },
    ],
    mode: "list",
});
```

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

| Parameter | Type                    | Description                                |
| --------- | ----------------------- | ------------------------------------------ |
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

[`UpdateBehavior`](../interfaces/UpdateBehavior.md).[`updateOrder`](../interfaces/UpdateBehavior.md#updateorder)

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
| `config`  | [`AlphaBehaviorConfig`](../type-aliases/AlphaBehaviorConfig.md) | Behavior configuration. |

#### Returns

`void`

#### Implementation of

[`UpdateBehavior`](../interfaces/UpdateBehavior.md).[`applyConfig`](../interfaces/UpdateBehavior.md#applyconfig)

#### Overrides

[`EmitterBehavior`](EmitterBehavior.md).[`applyConfig`](EmitterBehavior.md#applyconfig)

---

### getConfig()

```ts
getConfig(): AlphaBehaviorConfig;
```

Retrieves the current behavior properties as a configuration object.

#### Returns

[`AlphaBehaviorConfig`](../type-aliases/AlphaBehaviorConfig.md)

Behavior configuration.

#### Implementation of

[`UpdateBehavior`](../interfaces/UpdateBehavior.md).[`getConfig`](../interfaces/UpdateBehavior.md#getconfig)

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

[`UpdateBehavior`](../interfaces/UpdateBehavior.md).[`reset`](../interfaces/UpdateBehavior.md#reset)

#### Overrides

[`EmitterBehavior`](EmitterBehavior.md).[`reset`](EmitterBehavior.md#reset)

---

### update()

```ts
update(particle): void;
```

Updates the particle.

#### Parameters

| Parameter  | Type                                    | Description         |
| ---------- | --------------------------------------- | ------------------- |
| `particle` | [`EmitterParticle`](EmitterParticle.md) | Particle to update. |

#### Returns

`void`

#### Implementation of

[`UpdateBehavior`](../interfaces/UpdateBehavior.md).[`update`](../interfaces/UpdateBehavior.md#update)
