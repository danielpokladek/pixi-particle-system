import { EmitterError } from "../../error";
import { Ease, EaseFunction, getEaseFunction } from "../Ease";

/**
 * Default interpolate function that throws an error indicating it has not been set.
 * @throws {EmitterError} Indicates that the interpolate method has not been set.
 */
export function defaultInterpolateFunction<ValueType>(): ValueType {
    throw new EmitterError(
        "Interpolate method not set! Did you forget to initialize the List?",
    );
}

/**
 * Type defining a step in a list.
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
    ease?: Ease;
    isStepped?: boolean;
};

/**
 * Type defining a node in a linked list.
 */
export type ListNode<ValueType> = {
    value: ValueType;
    time: number;
    next: ListNode<ValueType> | null;
};

/**
 * Abstract base class for lists used in particle behaviors.
 * @template OutputValue Type of value produced by the list.
 * @template InputValue Type of value used to initialize the list.
 * @template ListDataType Type of data contained within the list nodes.
 * @group Data/List
 */
export abstract class List<
    OutputValue,
    InputValue = OutputValue,
    ListDataType = OutputValue,
> {
    protected _first: ListNode<ListDataType> | null = null;

    protected _list: ListStep<InputValue>[] = [];
    protected _easeFunction: EaseFunction | null = null;
    protected _isStepped = false;

    /**
     * First node in the list.
     * @throws {EmitterError} If the list has not been initialized.
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
     * Gets the list steps.
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
     * Indicates whether the list uses stepped interpolation.
     */
    public get isStepped(): boolean {
        return this._isStepped;
    }
    public set isStepped(value: boolean) {
        this._isStepped = value;
    }

    /**
     * Function to interpolate values from the list.
     * @throws {EmitterError} If the interpolate method has not been set.
     * @returns Interpolated value.
     */
    public interpolate: (time: number) => OutputValue = () =>
        defaultInterpolateFunction<OutputValue>();

    /**
     * Initializes the list from data.
     * @param data Data to initialize the list with.
     */
    public initialize(data: ListData<InputValue>): void {
        this.initializeList(data);

        this._list = data.list;
        this._isStepped = !!data.isStepped;

        if (data.ease) {
            this._easeFunction = getEaseFunction(data.ease);
        } else {
            this._easeFunction = null;
        }
    }

    /**
     * Resets the list to an uninitialized state.
     */
    public reset(): void {
        this._first = null;
        this._isStepped = false;
        this._easeFunction = null;

        this.interpolate = (): OutputValue =>
            defaultInterpolateFunction<OutputValue>();
    }

    /**
     * Initializes the list from data.
     * @param data Data to initialize the list with.
     */
    protected abstract initializeList(data: ListData<InputValue>): void;
}
