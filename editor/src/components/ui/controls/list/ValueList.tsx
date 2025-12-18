import { ListStep } from "pixi-particle-system";
import { useState } from "react";
import { Input } from "../../base/Input";

// ? TODO: Should the list auto sort on change?

type ListStepData = {
    ID: number;
} & ListStep<number>;

type Props = {
    label: string;
    defaultList: ListStepData[];
    onChange?: (list: ListStep<number>[]) => void;
};

/**
 * UI component for editing a list of values.
 */
export function ValueList({
    label,
    defaultList,
    onChange,
}: Props): JSX.Element {
    const [list, setList] = useState<ListStepData[]>(defaultList);

    const changeTimeAtIndex = (index: number, value: number): void => {
        const newList = [...list];
        newList[index].time = value;

        setList(newList);
        onChange?.(newList);
    };

    const changeValueAtIndex = (index: number, value: number): void => {
        const newList = [...list];
        newList[index].value = value;

        setList(newList);
        onChange?.(newList);
    };

    const addListEntry = (): void => {
        const newStep: ListStepData = {
            ID: Date.now(),
            time: 0,
            value: defaultList[0].value,
        };

        const newList = [...list, newStep];
        setList(newList);
        onChange?.(newList);
    };

    const removeListEntryAtIndex = (index: number): void => {
        const newList = [...list];
        newList.splice(index, 1);

        setList(newList);
        onChange?.(newList);
    };

    const sortList = (): void => {
        const newList = [...list].sort((a, b) => a.time - b.time);

        setList(newList);
        onChange?.(newList);
    };

    return (
        <>
            <details open>
                <summary>{label}</summary>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <label style={{ width: "100%" }}>Time</label>
                        <label style={{ width: "100%" }}>Value</label>
                        <div style={{ width: "70%" }}></div>
                    </div>

                    {list.map((step, index) => (
                        <div role="group" key={step.ID}>
                            <Input
                                inputType="text"
                                defaultValue={step.time.toString()}
                                onChange={(value) =>
                                    changeTimeAtIndex(index, Number(value))
                                }
                            />
                            <Input
                                inputType="text"
                                defaultValue={step.value.toString()}
                                onChange={(value) =>
                                    changeValueAtIndex(index, Number(value))
                                }
                            />
                            <button
                                disabled={list.length <= 2}
                                onClick={() => removeListEntryAtIndex(index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <div role="group">
                        <button onClick={() => addListEntry()}>New</button>
                        <button onClick={() => sortList()}>Sort</button>
                    </div>
                </div>
            </details>
        </>
    );
}
