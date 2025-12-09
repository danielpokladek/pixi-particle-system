/**
 * Type describing all possible behavior modes.
 */
export type BehaviorMode = "static" | "list" | "random" | "animated";

/**
 * Type defining the order in which behaviors are applied.
 */
export type BehaviorOrder = "initial" | "normal" | "late";

/**
 * Color type representing RGBA values.
 */
export type RGBAColor = {
    /**
     * Red component (0-255).
     */
    r: number;

    /**
     * Green component (0-255).
     */
    g: number;

    /**
     * Blue component (0-255).
     */
    b: number;

    /**
     * Alpha component (0-255).
     */
    a?: number;
};

/**
 * Type defining an ease segment.
 */
export type EaseSegment = {
    /**
     * Control point for the ease segment.
     */
    cp: number;

    /**
     * Start value of the ease segment.
     */
    s: number;

    /**
     * End value of the ease segment.
     */
    e: number;
};

/**
 * Basic easing function type.
 */
export type SimpleEase = (time: number) => number;

/**
 * Generates a custom ease function, based on the GreenSock custom ease, as demonstrated
 * by the related tool at http://www.greensock.com/customease/.
 * @param segments An array of segments, as created by http://www.greensock.com/customease/.
 * @returns A function that calculates the percentage of change at a given point in time (0-1 inclusive).
 */
export function generateEase(segments: EaseSegment[]): SimpleEase {
    const qty = segments.length;
    const oneOverQty = 1 / qty;

    /**
     * Calculates the percentage of change at a given point in time (0-1 inclusive).
     * @param time The time of the ease, 0-1 inclusive.
     * @returns The percentage of the change, 0-1 inclusive (unless your ease goes outside those bounds).
     */
    return function (time: number): number {
        // Quick floor operation.
        const i = (qty * time) | 0;

        const t = (time - i * oneOverQty) * qty;
        const s = segments[i] || segments[qty - 1];

        return s.s + t * (2 * (1 - t) * (s.cp - s.s) + t * (s.e - s.s));
    };
}

/**
 * Type describing a basic tweenable object.
 */
export type BasicTweenable<T> = {
    start: T;
    end: T;
};
