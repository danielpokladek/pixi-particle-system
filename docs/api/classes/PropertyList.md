# PropertyList\<V\>

Singly linked list container for keeping track of interpolated properties for particles.
Each Particle will have one of these for each interpolated property.

## Type Parameters

| Type Parameter |
| -------------- |
| `V`            |

## Constructors

### Constructor

```ts
new PropertyList<V>(isColor): PropertyList<V>;
```

Creates a new PropertyList.

#### Parameters

| Parameter | Type      | Default value | Description                  |
| --------- | --------- | ------------- | ---------------------------- |
| `isColor` | `boolean` | `false`       | If this list manages colors. |

#### Returns

`PropertyList`\<`V`\>

## Properties

### ease

```ts
ease: SimpleEase | null = null;
```

A custom easing method for this list.

#### Param

The interpolation value from 0-1.

#### Returns

The eased value, also from 0-1.

---

### first

```ts
first: PropertyNode<V> | null;
```

The first property node in the linked list.

---

### interpolate()

```ts
interpolate: (lerp) => (number = intValueSimple);
```

Calculates the correct value for the current interpolation value. This method is set in
the reset() method.

#### Parameters

| Parameter | Type     | Description                       |
| --------- | -------- | --------------------------------- |
| `lerp`    | `number` | The interpolation value from 0-1. |

#### Returns

`number`

The interpolated value. Colors are converted to the hex value.

## Methods

### reset()

```ts
reset(first): void;
```

Resets the list for use.

#### Parameters

| Parameter | Type                  | Description                 |
| --------- | --------------------- | --------------------------- |
| `first`   | `PropertyNode`\<`V`\> | The first node in the list. |

#### Returns

`void`
