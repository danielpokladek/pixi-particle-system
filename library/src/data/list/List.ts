import { EmitterError } from "../../error";
import { SimpleEase } from "../../util";

/**
 * Default interpolate function that throws an error.
 */
export function defaultInterpolateFunction<ValueType>(): ValueType {
    throw new EmitterError(
        "Interpolate method not set! Did you forget to initialize the List?",
    );
}

/**
 * Type describing a value step in a list.
 */
export type ListStep<ValueType> = {
    value: ValueType;
    time: number;
};

/**
 * Type defining the data used to initialize a list.
 */
export type ListData<ValueType> = {
    list: ListStep<ValueType>[];
    ease?: SimpleEase;
    isStepped?: boolean;
};

/**
 * Type defining a node in a list.
 */
export type ListNode<ValueType> = {
    value: ValueType;
    time: number;
    next: ListNode<ValueType> | null;
};

/**
 * Abstract base class for lists that provide value interpolation over time.
 * @template ValueType The type of values stored in the list.
 */
export abstract class List<
    OutputValue,
    InputValue = OutputValue,
    ListDataType = OutputValue,
> {
    protected _first: ListNode<ListDataType> | null = null;
    protected _ease: SimpleEase | null = null;
    protected _list: ListStep<InputValue>[] = [];

    protected _isStepped = false;

    /**
     * Gets the first node in the list.
     */
    public get first(): ListNode<ListDataType> {
        if (this._first === null) {
            throw new EmitterError(
                "List not initialized properly! First is null.",
            );
        }

        return this._first;
    }

    /**
     * Nodes in the list.
     */
    public get list(): ListStep<InputValue>[] {
        return this._list;
    }

    /**
     * Indicates whether the list has been initialized.
     */
    public get isInitialized(): boolean {
        return this._first !== null;
    }

    /**
     * Gets the ease function for the list.
     */
    public get ease(): SimpleEase | null {
        return this._ease;
    }
    public set ease(value: SimpleEase | null) {
        this._ease = value;
    }

    /**
     * Gets whether the list uses stepped interpolation.
     */
    public get isStepped(): boolean {
        return this._isStepped;
    }
    public set isStepped(value: boolean) {
        this._isStepped = value;
    }

    /**
     * Calculates the interpolated value for the list.
     * @returns The interpolated value.
     */
    public interpolate: (time: number) => OutputValue = () =>
        defaultInterpolateFunction<OutputValue>();

    /**
     * Initializes the list with data.
     * @param data Data to initialize the list with.
     */
    public initialize(data: ListData<InputValue>): void {
        this.initializeList(data);

        this._list = data.list;

        this._isStepped = !!data.isStepped;
        this._ease = data.ease || null;
    }

    /**
     * Resets the list to its default uninitialized state.
     */
    public reset(): void {
        this._first = null;
        this._isStepped = false;
        this._ease = null;

        this.interpolate = (): OutputValue =>
            defaultInterpolateFunction<OutputValue>();
    }

    /**
     * Initializes the list nodes from data.
     * @param data Data to initialize the list with.
     */
    protected abstract initializeList(data: ListData<InputValue>): void;
}
