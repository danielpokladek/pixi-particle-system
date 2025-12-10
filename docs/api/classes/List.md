# List\<OutputValue, InputValue, ListDataType\>

Abstract base class for lists that provide value interpolation over time.

## Template

The type of values stored in the list.

## Extended by

- [`ColorList`](ColorList.md)
- [`NumberList`](NumberList.md)

## Type Parameters

| Type Parameter | Default type  |
| -------------- | ------------- |
| `OutputValue`  | -             |
| `InputValue`   | `OutputValue` |
| `ListDataType` | `OutputValue` |

## Constructors

### Constructor

```ts
new List<OutputValue, InputValue, ListDataType>(): List<OutputValue, InputValue, ListDataType>;
```

#### Returns

`List`\<`OutputValue`, `InputValue`, `ListDataType`\>

## Properties

### \_ease

```ts
protected _ease: SimpleEase | null = null;
```

---

### \_first

```ts
protected _first: ListNode<ListDataType> | null = null;
```

---

### \_isStepped

```ts
protected _isStepped: boolean = false;
```

---

### interpolate()

```ts
interpolate: (time) => OutputValue;
```

Calculates the interpolated value for the list.

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `time`    | `number` |

#### Returns

`OutputValue`

The interpolated value.

## Accessors

### ease

#### Get Signature

```ts
get ease(): SimpleEase | null;
```

Gets the ease function for the list.

##### Returns

[`SimpleEase`](../type-aliases/SimpleEase.md) \| `null`

---

### first

#### Get Signature

```ts
get first(): ListNode<ListDataType>;
```

Gets the first node in the list.

##### Returns

[`ListNode`](../type-aliases/ListNode.md)\<`ListDataType`\>

---

### isStepped

#### Get Signature

```ts
get isStepped(): boolean;
```

Gets whether the list uses stepped interpolation.

##### Returns

`boolean`

## Methods

### initialize()

```ts
initialize(data): void;
```

Initializes the list with data.

#### Parameters

| Parameter | Type                                                      | Description                       |
| --------- | --------------------------------------------------------- | --------------------------------- |
| `data`    | [`ListData`](../type-aliases/ListData.md)\<`InputValue`\> | Data to initialize the list with. |

#### Returns

`void`

---

### initializeList()

```ts
abstract protected initializeList(data): void;
```

Initializes the list nodes from data.

#### Parameters

| Parameter | Type                                                      | Description                       |
| --------- | --------------------------------------------------------- | --------------------------------- |
| `data`    | [`ListData`](../type-aliases/ListData.md)\<`InputValue`\> | Data to initialize the list with. |

#### Returns

`void`

---

### reset()

```ts
reset(): void;
```

Resets the list to its default uninitialized state.

#### Returns

`void`
