import { ListData } from "../data";

/**
 * Type describing all possible behavior modes.
 */
export type BehaviorMode = "static" | "list" | "random" | "animated";

/**
 * Type defining the order in which behaviors are applied.
 */
export type BehaviorOrder = "initial" | "normal" | "late";

/**
 * Common type defining static configuration for various behaviors.
 * @template DataType Type of data used for the static value.
 * @group Behavior/Shared
 */
export type CommonStaticConfig<DataType> = {
    /**
     * Static value applied to all particles.
     */
    value: DataType;

    /**
     * Behavior mode - can only be "static" in this configuration.
     */
    mode?: "static";
};

/**
 * Common type defining list-based configuration for various behaviors.
 * @template DataType Type of data contained within the list.
 * @group Behavior/Shared
 */
export type CommonListConfig<DataType> = {
    /**
     * List data defining all properties required for list-based behavior.
     * @see {@link ListData}
     */
    listData: ListData<DataType>;

    /**
     * Behavior mode.
     *
     * `List` mode will interpolate values over the particle's lifetime based on the provided list.
     *
     * `Random` mode will assign a random value from the list upon particle initialization.
     */
    mode: "list" | "random";
};

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
