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
 * @group Behavior/Shared/
 */
export type BehaviorStaticConfig<DataType> = {
    /**
     * Static value applied to all particles.
     */
    value: DataType;

    /**
     * Behavior mode - can only be "static" in this configuration.
     */
    mode: "static";
};

/**
 * Common type defining list-based configuration for various behaviors.
 * @template DataType Type of data contained within the list.
 * @group Behavior/Shared/
 */
export type BehaviorSingleListConfig<DataType> = {
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
 * Common type defining XY list-based configuration for various behaviors.
 * @template DataType Type of data contained within the lists.
 * @group Behavior/Shared/
 */
export type BehaviorXYListConfig<DataType> = {
    /**
     * List data defining X-axis values.
     * @see {@link ListData}
     */
    xListData: ListData<DataType>;

    /**
     * List data defining Y-axis values.
     * @see {@link ListData}
     */
    yListData?: ListData<DataType>;

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
