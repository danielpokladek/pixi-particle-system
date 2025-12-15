import { ListStep } from "pixi-particle-system";
import { useState } from "react";
import { Input } from "../../base/Input";

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
                        <div style={{ width: "100%" }}></div>
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
                    <button
                        onClick={() => {
                            const newStep: ListStepData = {
                                ID: Date.now(),
                                time: 0,
                                value: 0,
                            };

                            const newList = [...list, newStep];
                            setList(newList);
                            onChange?.(newList);
                        }}
                    >
                        Add New
                    </button>
                </div>
            </details>
        </>
    );
}
