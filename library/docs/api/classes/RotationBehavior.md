# RotationBehavior

Behavior which handles particle rotation.

## Extends

- [`EmitterBehavior`](EmitterBehavior.md)\<[`RotationBehaviorConfig`](../type-aliases/RotationBehaviorConfig.md)\>

## Implements

- [`InitBehavior`](../interfaces/InitBehavior.md)\<[`RotationBehaviorConfig`](../type-aliases/RotationBehaviorConfig.md)\>
- [`UpdateBehavior`](../interfaces/UpdateBehavior.md)\<[`RotationBehaviorConfig`](../type-aliases/RotationBehaviorConfig.md)\>

## Constructors

### Constructor

```ts
new RotationBehavior(emitter): RotationBehavior;
```

Creates a new RotationBehavior.

#### Parameters

| Parameter | Type                    | Description                                |
| --------- | ----------------------- | ------------------------------------------ |
| `emitter` | [`Emitter`](Emitter.md) | Emitter instance this behavior belongs to. |

#### Returns

`RotationBehavior`

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

### acceleration

#### Get Signature

```ts
get acceleration(): number;
```

Rotation acceleration value.

##### Returns

`number`

#### Set Signature

```ts
set acceleration(value): void;
```

##### Parameters

| Parameter | Type     |
| --------- | -------- |
| `value`   | `number` |

##### Returns

`void`

---

### list

#### Get Signature

```ts
get list(): NumberList;
```

List used to set rotation at different points in the particle's life.

##### Returns

[`NumberList`](NumberList.md)

---

### mode

#### Get Signature

```ts
get mode(): "static" | "list" | "acceleration";
```

Behavior mode.

##### Returns

`"static"` \| `"list"` \| `"acceleration"`

#### Set Signature

```ts
set mode(value): void;
```

##### Parameters

| Parameter | Type                                       |
| --------- | ------------------------------------------ |
| `value`   | `"static"` \| `"list"` \| `"acceleration"` |

##### Returns

`void`

---

### startRotation

#### Get Signature

```ts
get startRotation(): number;
```

Starting rotation value (used for acceleration mode).

##### Returns

`number`

#### Set Signature

```ts
set startRotation(value): void;
```

##### Parameters

| Parameter | Type     |
| --------- | -------- |
| `value`   | `number` |

##### Returns

`void`

---

### staticValue

#### Get Signature

```ts
get staticValue(): number;
```

Static rotation value.

##### Returns

`number`

#### Set Signature

```ts
set staticValue(value): void;
```

##### Parameters

| Parameter | Type     |
| --------- | -------- |
| `value`   | `number` |

##### Returns

`void`

---

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

| Parameter | Type                                                                  | Description             |
| --------- | --------------------------------------------------------------------- | ----------------------- |
| `config`  | [`RotationBehaviorConfig`](../type-aliases/RotationBehaviorConfig.md) | Behavior configuration. |

#### Returns

`void`

#### Implementation of

[`UpdateBehavior`](../interfaces/UpdateBehavior.md).[`applyConfig`](../interfaces/UpdateBehavior.md#applyconfig)

#### Overrides

[`EmitterBehavior`](EmitterBehavior.md).[`applyConfig`](EmitterBehavior.md#applyconfig)

---

### getConfig()

```ts
getConfig(): RotationBehaviorConfig;
```

Retrieves the current behavior properties as a configuration object.

#### Returns

[`RotationBehaviorConfig`](../type-aliases/RotationBehaviorConfig.md)

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
update(particle, deltaTime): void;
```

Updates the particle.

#### Parameters

| Parameter   | Type                                    | Description                                     |
| ----------- | --------------------------------------- | ----------------------------------------------- |
| `particle`  | [`EmitterParticle`](EmitterParticle.md) | Particle to update.                             |
| `deltaTime` | `number`                                | Time elapsed since the last update, in seconds. |

#### Returns

`void`

#### Implementation of

[`UpdateBehavior`](../interfaces/UpdateBehavior.md).[`update`](../interfaces/UpdateBehavior.md#update)
