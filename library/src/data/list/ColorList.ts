import { EmitterError } from "../../error";
import { convertHexToRGB, convertRgbToUint, RGBAColor } from "../../util";
import { List, ListData, ListNode } from "./List";

/**
 * Calculates the simple interpolated color for the list.
 * @param this The list instance.
 * @param lerp The lerp value.
 * @returns The interpolated color.
 */
function simpleColor(this: List<RGBAColor>, lerp: number): number {
    if (this.first === null || this.first.next === null) {
        throw new EmitterError(
            "PropertyList not initialized properly! First or first.next is null.",
        );
    }

    if (this.ease) lerp = this.ease(lerp);

    if (lerp <= 0) {
        return convertRgbToUint(
            this.first.value.r,
            this.first.value.g,
            this.first.value.b,
        );
    }

    if (lerp >= 1) {
        return convertRgbToUint(
            this.first.next.value.r,
            this.first.next.value.g,
            this.first.next.value.b,
        );
    }

    const curVal = this.first.value;
    const nextVal = this.first.next.value;

    const r = Math.round((nextVal.r - curVal.r) * lerp + curVal.r);
    const g = Math.round((nextVal.g - curVal.g) * lerp + curVal.g);
    const b = Math.round((nextVal.b - curVal.b) * lerp + curVal.b);

    return convertRgbToUint(r, g, b);
}

/**
 * Calculates the complex interpolated color for the list.
 * @param this The list instance.
 * @param lerp The lerp value.
 * @returns The interpolated color.
 */
function complexColor(this: List<RGBAColor>, lerp: number): number {
    if (this.ease) lerp = this.ease(lerp);

    // make sure we are on the right segment
    let current = this.first;

    if (current === null || current.next === null) {
        throw new EmitterError(
            "PropertyList not initialized properly! First or first.next is null.",
        );
    }

    if (lerp <= current.time) {
        return convertRgbToUint(
            current.value.r,
            current.value.g,
            current.value.b,
        );
    }

    while (current.next && lerp > current.next.time) {
        current = current.next;
    }

    if (!current.next) {
        return convertRgbToUint(
            current.value.r,
            current.value.g,
            current.value.b,
        );
    }

    const next = current.next;
    const denom = next.time - current.time;

    if (denom === 0) {
        return convertRgbToUint(
            current.value.r,
            current.value.g,
            current.value.b,
        );
    }

    // Convert the lerp value to the segment range.
    const t = (lerp - current.time) / denom;

    const curVal = current.value;
    const nextVal = next.value;

    const r = Math.round((nextVal.r - curVal.r) * t + curVal.r);
    const g = Math.round((nextVal.g - curVal.g) * t + curVal.g);
    const b = Math.round((nextVal.b - curVal.b) * t + curVal.b);

    return convertRgbToUint(r, g, b);
}

/**
 * Calculates the stepped color for the list.
 * @param this The list instance.
 * @param lerp The lerp value.
 * @returns The interpolated color.
 */
function steppedColor(this: List<RGBAColor>, lerp: number): number {
    if (this.ease) lerp = this.ease(lerp);

    let current = this.first;

    if (current === null || current.next === null) {
        throw new EmitterError(
            "PropertyList not initialized properly! First or first.next is null.",
        );
    }

    while (current.next && lerp >= current.next.time) {
        current = current.next;
    }
    const currentValue = current.value;

    return convertRgbToUint(currentValue.r, currentValue.g, currentValue.b);
}

/**
 * Implementation of `List` specifically for managing colors.
 * @see {@link List} for the base `List` implementation.
 * @group Data/List/
 */
export class ColorList extends List<number, string, RGBAColor> {
    /**
     * @inheritdoc
     */
    public initialize(data: ListData<string>): void {
        super.initialize(data);

        const isSimple = this.first.next && this.first.next.time >= 1;

        if (isSimple) {
            this.interpolate = simpleColor;
            return;
        }

        if (this._isStepped) {
            this.interpolate = steppedColor;
            return;
        }

        this.interpolate = complexColor;
    }

    /**
     * @inheritdoc
     */
    protected initializeList(data: ListData<string>): void {
        let node: ListNode<RGBAColor> | null = null;
        let first: ListNode<RGBAColor> | null = null;

        for (const datum of data.list) {
            const newNode: ListNode<RGBAColor> = {
                value: convertHexToRGB(datum.value),
                time: datum.time,
                next: null,
            };

            if (node) {
                node.next = newNode;
                node = newNode;
            }

            if (!first) {
                first = newNode;
                node = newNode;
            }
        }

        this._first = first;
    }
}
