# NumberList

List used to interpolate through numeric values.

## Extends

- [`List`](List.md)\<`number`\>

## Constructors

### Constructor

```ts
new NumberList(): NumberList;
```

#### Returns

`NumberList`

#### Inherited from

[`List`](List.md).[`constructor`](List.md#constructor)

## Properties

### \_ease

```ts
protected _ease: SimpleEase | null = null;
```

#### Inherited from

[`List`](List.md).[`_ease`](List.md#ease)

---

### \_first

```ts
protected _first: ListNode<number> | null = null;
```

#### Inherited from

[`List`](List.md).[`_first`](List.md#first)

---

### \_isStepped

```ts
protected _isStepped: boolean = false;
```

#### Inherited from

[`List`](List.md).[`_isStepped`](List.md#isstepped)

---

### \_list

```ts
protected _list: ListStep<number>[] = [];
```

#### Inherited from

[`List`](List.md).[`_list`](List.md#list)

---

### interpolate()

```ts
interpolate: (time) => number;
```

Calculates the interpolated value for the list.

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `time`    | `number` |

#### Returns

`number`

The interpolated value.

#### Inherited from

[`List`](List.md).[`interpolate`](List.md#interpolate)

## Accessors

### ease

#### Get Signature

```ts
get ease(): SimpleEase | null;
```

Gets the ease function for the list.

##### Returns

[`SimpleEase`](../type-aliases/SimpleEase.md) \| `null`

#### Set Signature

```ts
set ease(value): void;
```

##### Parameters

| Parameter | Type                                                    |
| --------- | ------------------------------------------------------- |
| `value`   | [`SimpleEase`](../type-aliases/SimpleEase.md) \| `null` |

##### Returns

`void`

#### Inherited from

[`List`](List.md).[`ease`](List.md#ease)

---

### first

#### Get Signature

```ts
get first(): ListNode<ListDataType>;
```

Gets the first node in the list.

##### Returns

[`ListNode`](../type-aliases/ListNode.md)\<`ListDataType`\>

#### Inherited from

[`List`](List.md).[`first`](List.md#first)

---

### isInitialized

#### Get Signature

```ts
get isInitialized(): boolean;
```

Indicates whether the list has been initialized.

##### Returns

`boolean`

#### Inherited from

[`List`](List.md).[`isInitialized`](List.md#isinitialized)

---

### isStepped

#### Get Signature

```ts
get isStepped(): boolean;
```

Gets whether the list uses stepped interpolation.

##### Returns

`boolean`

#### Set Signature

```ts
set isStepped(value): void;
```

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `boolean` |

##### Returns

`void`

#### Inherited from

[`List`](List.md).[`isStepped`](List.md#isstepped)

---

### list

#### Get Signature

```ts
get list(): ListStep<InputValue>[];
```

Nodes in the list.

##### Returns

[`ListStep`](../type-aliases/ListStep.md)\<`InputValue`\>[]

#### Inherited from

[`List`](List.md).[`list`](List.md#list)

## Methods

### initialize()

```ts
initialize(data): void;
```

Initializes the list with data.

#### Parameters

| Parameter | Type                                                  | Description                       |
| --------- | ----------------------------------------------------- | --------------------------------- |
| `data`    | [`ListData`](../type-aliases/ListData.md)\<`number`\> | Data to initialize the list with. |

#### Returns

`void`

#### Overrides

[`List`](List.md).[`initialize`](List.md#initialize)

---

### initializeList()

```ts
protected initializeList(data): void;
```

Initializes the list nodes from data.

#### Parameters

| Parameter | Type                                                  | Description                       |
| --------- | ----------------------------------------------------- | --------------------------------- |
| `data`    | [`ListData`](../type-aliases/ListData.md)\<`number`\> | Data to initialize the list with. |

#### Returns

`void`

#### Overrides

[`List`](List.md).[`initializeList`](List.md#initializelist)

---

### reset()

```ts
reset(): void;
```

Resets the list to its default uninitialized state.

#### Returns

`void`

#### Inherited from

[`List`](List.md).[`reset`](List.md#reset)
