import { EmitterError } from "../error/EmitterError";
import { convertHexToRGB, convertRgbToUint } from "../util/ColorUtil";
import {
  BasicTweenable,
  EaseSegment,
  generateEase,
  RGBAColor,
  SimpleEase,
} from "../util/Type";

// TODO DP: Split out value and color lists into separate files?

/**
 * Calculates the interpolated value for a simple numeric PropertyList.
 * @param this List to interpolate.
 * @param lerp The interpolation value from 0-1.
 * @returns The interpolated value.
 */
function intValueSimple(this: PropertyList<number>, lerp: number): number {
  if (this.first === null || this.first.next === null) {
    throw new EmitterError(
      "PropertyList not initialized properly! First or first.next is null.",
    );
  }

  if (this.ease) lerp = this.ease(lerp);

  return (this.first.next.value - this.first.value) * lerp + this.first.value;
}

/**
 * Calculates the interpolated color value for a simple color PropertyList.
 * @param this List to interpolate.
 * @param lerp The interpolation value from 0-1.
 * @returns The interpolated color as a uint.
 */
function intColorSimple(this: PropertyList<RGBAColor>, lerp: number): number {
  if (this.first === null || this.first.next === null) {
    throw new EmitterError(
      "PropertyList not initialized properly! First or first.next is null.",
    );
  }

  if (this.ease) lerp = this.ease(lerp);

  const curVal = this.first.value;
  const nextVal = this.first.next.value;
  const r = (nextVal.r - curVal.r) * lerp + curVal.r;
  const g = (nextVal.g - curVal.g) * lerp + curVal.g;
  const b = (nextVal.b - curVal.b) * lerp + curVal.b;

  return convertRgbToUint(r, g, b);
}

/**
 * Calculates the interpolated value for a complex numeric PropertyList.
 * @param this List to interpolate.
 * @param lerp The interpolation value from 0-1.
 * @returns The interpolated value.
 */
function intValueComplex(this: PropertyList<number>, lerp: number): number {
  if (this.ease) lerp = this.ease(lerp);

  // make sure we are on the right segment
  let current = this.first;

  if (current === null || current.next === null) {
    throw new EmitterError(
      "PropertyList not initialized properly! First or first.next is null.",
    );
  }

  let next = current.next;

  while (lerp > next.time) {
    current = next;

    // TODO DP: Handle error better?
    next = next.next!;
  }

  // Convert the lerp value to the segment range.
  lerp = (lerp - current.time) / (next.time - current.time);

  return (next.value - current.value) * lerp + current.value;
}

/**
 * Calculates the interpolated color value for a complex color PropertyList.
 * @param this List to interpolate.
 * @param lerp The interpolation value from 0-1.
 * @returns The interpolated color as a uint.
 */
function intColorComplex(this: PropertyList<RGBAColor>, lerp: number): number {
  if (this.ease) lerp = this.ease(lerp);

  // make sure we are on the right segment
  let current = this.first;

  if (current === null || current.next === null) {
    throw new EmitterError(
      "PropertyList not initialized properly! First or first.next is null.",
    );
  }

  let next = current.next;

  while (next) {
    if (lerp > next.time) break;
    if (!next.next) break;

    current = next;
    next = next.next;
  }

  // Convert the lerp value to the segment range.
  lerp = (lerp - current.time) / (next.time - current.time);

  const curVal = current.value;
  const nextVal = next.value;
  const r = (nextVal.r - curVal.r) * lerp + curVal.r;
  const g = (nextVal.g - curVal.g) * lerp + curVal.g;
  const b = (nextVal.b - curVal.b) * lerp + curVal.b;

  return convertRgbToUint(r, g, b);
}

/**
 * Calculates the stepped value for a numeric PropertyList.
 * @param this List to interpolate.
 * @param lerp The interpolation value from 0-1.
 * @returns The stepped value.
 */
function intValueStepped(this: PropertyList<number>, lerp: number): number {
  if (this.ease) lerp = this.ease(lerp);

  let current = this.first;

  if (current === null) {
    throw new EmitterError(
      "PropertyList not initialized properly! First is null.",
    );
  }

  while (current.next && lerp > current.next.time) {
    current = current.next;
  }

  return current.value;
}

/**
 * Calculates the stepped color value for a color PropertyList.
 * @param this List to interpolate.
 * @param lerp The interpolation value from 0-1.
 * @returns The stepped color as a uint.
 */
function intColorStepped(this: PropertyList<RGBAColor>, lerp: number): number {
  if (this.ease) lerp = this.ease(lerp);

  let current = this.first;

  if (current === null || current.next === null) {
    throw new EmitterError(
      "PropertyList not initialized properly! First or first.next is null.",
    );
  }

  while (current.next && lerp > current.next.time) {
    current = current.next;
  }
  const curVal = current.value;

  return convertRgbToUint(curVal.r, curVal.g, curVal.b);
}

/**
 * A single step of a ValueList.
 */
export interface ValueStep<T> {
  /**
   * The color or number to use at this step.
   */
  value: T;
  /**
   * The percentage time of the particle's lifespan that this step happens at.
   * Values are between 0 and 1, inclusive.
   */
  time: number;
}

/**
 * Configuration for an interpolated or stepped list of numeric or color particle values.
 */
export interface ValueList<T> {
  /**
   * The ordered list of values.
   */
  list: ValueStep<T>[];
  /**
   * If the list is stepped. Stepped lists don't determine any in-between values, instead sticking with each value
   * until its time runs out.
   */
  isStepped?: boolean;
  /**
   * Easing that should be applied to this list, in order to alter how quickly the steps progress.
   */
  ease?: SimpleEase | EaseSegment[];
}
/**
 * A single node in a PropertyList.
 */
export class PropertyNode<V> {
  /**
   * Value for the node.
   */
  public value: V;
  /**
   * Time value for the node. Between 0-1.
   */
  public time: number;
  /**
   * The next node in line.
   */
  public next: PropertyNode<V> | null;
  /**
   * If this is the first node in the list, controls if the entire list is stepped or not.
   */
  public isStepped: boolean;

  /**
   * Custom ease for this list.
   */
  public ease: SimpleEase | null;

  /**
   * @param value The value for this node
   * @param time The time for this node, between 0-1
   * @param [ease] Custom ease for this list. Only relevant for the first node.
   */
  constructor(value: V, time: number, ease?: SimpleEase | EaseSegment[]) {
    this.value = value;
    this.time = time;
    this.next = null;
    this.isStepped = false;
    if (ease) {
      this.ease = typeof ease === "function" ? ease : generateEase(ease);
    } else {
      this.ease = null;
    }
  }

  /**
   * Creates a list of property values from a data object {list, isStepped} with a list of objects in
   * the form {value, time}. Alternatively, the data object can be in the deprecated form of
   * {start, end}.
   * @param data The data for the list.
   * @returns The first node in the list
   */
  public static createList<T extends string | number>(
    data: ValueList<T> | BasicTweenable<T>,
  ): PropertyNode<T extends string ? RGBAColor : T> {
    if ("list" in data) {
      const array = data.list;
      let node;
      const { value, time } = array[0];

      const first = (node = new PropertyNode(
        typeof value === "string" ? convertHexToRGB(value) : value,
        time,
        data.ease,
      ));

      // only set up subsequent nodes if there are a bunch or the 2nd one is different from the first
      if (
        array.length > 2 ||
        (array.length === 2 && array[1].value !== value)
      ) {
        for (let i = 1; i < array.length; ++i) {
          const { value, time } = array[i];

          node.next = new PropertyNode(
            typeof value === "string" ? convertHexToRGB(value) : value,
            time,
          );
          node = node.next;
        }
      }
      first.isStepped = !!data.isStepped;

      return first as PropertyNode<T extends string ? RGBAColor : T>;
    }

    // Handle deprecated version here
    const start = new PropertyNode(
      typeof data.start === "string" ? convertHexToRGB(data.start) : data.start,
      0,
    );
    // only set up a next value if it is different from the starting value

    if (data.end !== data.start) {
      start.next = new PropertyNode(
        typeof data.end === "string" ? convertHexToRGB(data.end) : data.end,
        1,
      );
    }

    return start as PropertyNode<T extends string ? RGBAColor : T>;
  }
}

/**
 * Singly linked list container for keeping track of interpolated properties for particles.
 * Each Particle will have one of these for each interpolated property.
 */
export class PropertyList<V> {
  /**
   * Calculates the correct value for the current interpolation value. This method is set in
   * the reset() method.
   * @param lerp The interpolation value from 0-1.
   * @returns The interpolated value. Colors are converted to the hex value.
   */
  public interpolate: (lerp: number) => number = intValueSimple;

  /**
   * A custom easing method for this list.
   * @param lerp The interpolation value from 0-1.
   * @returns The eased value, also from 0-1.
   */
  public ease: SimpleEase | null = null;

  /**
   * The first property node in the linked list.
   */
  public first: PropertyNode<V> | null;

  /**
   * If this list manages colors, which requires a different method for interpolation.
   */
  private readonly _isColor: boolean;

  /**
   * Creates a new PropertyList.
   * @param isColor If this list manages colors.
   */
  constructor(isColor = false) {
    this.first = null;
    this._isColor = !!isColor;
    this.ease = null;
  }

  /**
   * Resets the list for use.
   * @param first The first node in the list.
   * @param first.isStepped If the values should be stepped instead of interpolated linearly.
   */
  public reset(first: PropertyNode<V>): void {
    this.first = first;
    const isSimple = first.next && first.next.time >= 1;

    if (isSimple) {
      this.interpolate = this._isColor ? intColorSimple : intValueSimple;
    } else if (first.isStepped) {
      this.interpolate = this._isColor ? intColorStepped : intValueStepped;
    } else {
      this.interpolate = this._isColor ? intColorComplex : intValueComplex;
    }
    this.ease = this.first.ease;
  }
}
