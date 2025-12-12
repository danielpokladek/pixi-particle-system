# convertHexToRGB()

```ts
function convertHexToRGB(color, output?): RGBAColor;
```

Converts a hex string from "#AARRGGBB", "#RRGGBB", "0xAARRGGBB", "0xRRGGBB",
"AARRGGBB", or "RRGGBB" to an object of ints of 0-255, as
{r, g, b, (a)}.

## Parameters

| Parameter | Type                                        | Description                                                          |
| --------- | ------------------------------------------- | -------------------------------------------------------------------- |
| `color`   | `string`                                    | The input color string.                                              |
| `output?` | [`RGBAColor`](../type-aliases/RGBAColor.md) | An object to put the output in. If omitted, a new object is created. |

## Returns

[`RGBAColor`](../type-aliases/RGBAColor.md)

The object with r, g, and b properties, possibly with an a property.
