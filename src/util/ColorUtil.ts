import { RGBAColor } from "./Type";

/**
 * Combines separate color components (0-255) into a single uint color.
 * @param r The red value of the color
 * @param g The green value of the color
 * @param b The blue value of the color
 * @returns The color in the form of `0xRRGGBB`
 */
export function convertRgbToUint(r: number, g: number, b: number): number {
  return (r << 16) | (g << 8) | b;
}

/**
 * Converts a hex string from "#AARRGGBB", "#RRGGBB", "0xAARRGGBB", "0xRRGGBB",
 * "AARRGGBB", or "RRGGBB" to an object of ints of 0-255, as
 * {r, g, b, (a)}.
 * @param color The input color string.
 * @param output An object to put the output in. If omitted, a new object is created.
 * @returns The object with r, g, and b properties, possibly with an a property.
 */
export function convertHexToRGB(color: string, output?: RGBAColor): RGBAColor {
  if (!output) {
    output = {} as RGBAColor;
  }

  if (color.charAt(0) === "#") {
    color = color.substr(1);
  } else if (color.indexOf("0x") === 0) {
    color = color.substr(2);
  }

  let alpha;

  if (color.length === 8) {
    alpha = color.substr(0, 2);
    color = color.substr(2);
  }

  output.r = parseInt(color.substr(0, 2), 16); // Red
  output.g = parseInt(color.substr(2, 2), 16); // Green
  output.b = parseInt(color.substr(4, 2), 16); // Blue

  if (alpha) {
    output.a = parseInt(alpha, 16);
  }

  return output;
}
