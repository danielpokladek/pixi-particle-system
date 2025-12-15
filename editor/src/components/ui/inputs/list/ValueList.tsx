import { ListStep } from "pixi-particle-system";
import { useState } from "react";
import { Input } from "../../base/Input";

// ? TODO: Should the list auto sort on change?

type ListStepData = {
    ID: number;
} & ListStep<any>;

type Props = {
    label: string;
    defaultList: ListStepData[];
    onChange?: (list: ListStep<any>[]) => void;
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
                                defaultValue={step.time}
                                onChange={(value) => {
                                    list[index].time = value;
                                    onChange?.(list);
                                }}
                            />
                            <Input
                                inputType="text"
                                defaultValue={step.value}
                                onChange={(value) => {
                                    list[index].value = value;
                                    onChange?.(list);
                                }}
                            />
                            <button
                                disabled={list.length <= 2}
                                onClick={() => {
                                    const newList = [...list];
                                    newList.splice(index, 1);

                                    setList(newList);
                                    onChange?.(newList);
                                }}
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <div role="group">
                        <button
                            onClick={() => {
                                const newStep: ListStepData = {
                                    ID: Date.now(),
                                    time: 0,
                                    value: defaultList[0].value,
                                };

                                const newList = [...list, newStep];
                                setList(newList);
                                onChange?.(newList);
                            }}
                        >
                            New
                        </button>

                        {/* <hr /> */}

                        <button
                            onClick={() => {
                                const newList = [...list].sort(
                                    (a, b) => a.time - b.time,
                                );

                                setList(newList);
                                onChange?.(newList);
                            }}
                        >
                            Sort
                        </button>
                    </div>
                </div>
            </details>
        </>
    );
}
