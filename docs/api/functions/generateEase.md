# generateEase()

```ts
function generateEase(segments): SimpleEase;
```

Generates a custom ease function, based on the GreenSock custom ease, as demonstrated
by the related tool at http://www.greensock.com/customease/.

## Parameters

| Parameter  | Type                                              | Description                                                               |
| ---------- | ------------------------------------------------- | ------------------------------------------------------------------------- |
| `segments` | [`EaseSegment`](../type-aliases/EaseSegment.md)[] | An array of segments, as created by http://www.greensock.com/customease/. |

## Returns

[`SimpleEase`](../type-aliases/SimpleEase.md)

A function that calculates the percentage of change at a given point in time (0-1 inclusive).
