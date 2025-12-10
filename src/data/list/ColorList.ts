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

    const curVal = this.first.value;
    const nextVal = this.first.next.value;
    const r = (nextVal.r - curVal.r) * lerp + curVal.r;
    const g = (nextVal.g - curVal.g) * lerp + curVal.g;
    const b = (nextVal.b - curVal.b) * lerp + curVal.b;

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

    let next = current.next;

    while (next.next && lerp > next.time) {
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

    while (current.next && lerp > current.next.time) {
        current = current.next;
    }
    const curVal = current.value;

    return convertRgbToUint(curVal.r, curVal.g, curVal.b);
}

/**
 * List used to interpolate through numeric values.
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
