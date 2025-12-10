# ValueList\<T\>

Configuration for an interpolated or stepped list of numeric or color particle values.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Properties

### ease?

```ts
optional ease: EaseSegment[] | SimpleEase;
```

Easing that should be applied to this list, in order to alter how quickly the steps progress.

***

### isStepped?

```ts
optional isStepped: boolean;
```

If the list is stepped. Stepped lists don't determine any in-between values, instead sticking with each value
until its time runs out.

***

### list

```ts
list: ValueStep<T>[];
```

The ordered list of values.
