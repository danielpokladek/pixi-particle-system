import { EmitterError } from "../../error";
import { List, ListData, ListNode } from "./List";

/**
 * Calculates the simple interpolated value for the list.
 * @param this The list instance.
 * @param lerp The lerp value.
 * @returns The interpolated value.
 */
function simpleValue(this: List<number>, lerp: number): number {
    if (this.first === null || this.first.next === null) {
        throw new EmitterError(
            "PropertyList not initialized properly! First or first.next is null.",
        );
    }

    if (this._easeFunction) lerp = this._easeFunction(lerp);

    if (lerp <= 0) return this.first.value;
    if (lerp >= 1) return this.first.next.value;

    return (this.first.next.value - this.first.value) * lerp + this.first.value;
}

/**
 * Calculates the complex interpolated value for the list.
 * @param this The list instance.
 * @param lerp The lerp value.
 * @returns The interpolated value.
 */
function complexValue(this: List<number>, lerp: number): number {
    if (this._easeFunction) lerp = this._easeFunction(lerp);

    // make sure we are on the right segment
    let current = this.first;

    if (current === null || current.next === null) {
        throw new EmitterError(
            "PropertyList not initialized properly! First or first.next is null.",
        );
    }

    if (lerp <= current.time) return current.value;

    while (current.next && lerp > current.next.time) {
        current = current.next;
    }

    if (!current.next) return current.value;

    const next = current.next;
    const denom = next.time - current.time;

    if (denom === 0) return current.value;

    // Convert the lerp value to the segment range.
    const t = (lerp - current.time) / denom;
    return (next.value - current.value) * t + current.value;
}

/**
 * Calculates the stepped interpolated value for the list.
 * @param this The list instance.
 * @param lerp The lerp value.
 * @returns The interpolated value.
 */
function steppedValue(this: List<number>, lerp: number): number {
    if (this._easeFunction) lerp = this._easeFunction(lerp);

    let current = this.first;

    if (current === null) {
        throw new EmitterError(
            "PropertyList not initialized properly! First is null.",
        );
    }

    while (current.next && lerp >= current.next.time) {
        current = current.next;
    }

    return current.value;
}

/**
 * Implementation of a `List` specifically for managing number values.
 * @see {@link List} for the base `List` implementation.
 * @group Data/List/
 */
export class NumberList extends List<number> {
    /**
     * @inheritdoc
     */
    public initialize(data: ListData<number>): void {
        super.initialize(data);

        const isSimple = this.first.next && this.first.next.time >= 1;

        if (isSimple) {
            this.interpolate = simpleValue;
            return;
        }

        if (this._isStepped) {
            this.interpolate = steppedValue;
            return;
        }

        this.interpolate = complexValue;
    }

    /**
     * @inheritdoc
     */
    protected initializeList(data: ListData<number>): void {
        let node: ListNode<number> | null = null;
        let first: ListNode<number> | null = null;

        for (const datum of data.list) {
            const newNode: ListNode<number> = {
                value: datum.value,
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
