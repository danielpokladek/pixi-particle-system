import { Ease, ListStep } from "pixi-particle-system";
import { useState } from "react";
import { Input } from "../../base/Input";
import { EaseDropdown } from "../../EaseDropdown";
import { Toggle } from "../Toggle";

// ? TODO: Should the list auto sort on change?

type ListStepData = {
    ID: number;
} & ListStep<string>;

type Props = {
    label: string;
    defaultList: ListStepData[];
    onChange?: (
        list: ListStep<string>[],
        ease: Ease,
        isStepped: boolean,
    ) => void;
};

/**
 * Color list control with label.
 * @param props Component props.
 */
export function ColorList({
    label,
    defaultList,
    onChange,
}: Props): JSX.Element {
    const [list, setList] = useState<ListStepData[]>(defaultList);
    const [ease, setEase] = useState<Ease>("linear");
    const [stepped, setStepped] = useState<boolean>(false);

    const changeTimeAtIndex = (index: number, value: number): void => {
        const newList = [...list];
        newList[index].time = value;

        setList(newList);
        onChange?.(newList, ease, stepped);
    };

    const changeColorAtIndex = (index: number, value: string): void => {
        const newList = [...list];
        newList[index].value = value;

        setList(newList);
        onChange?.(newList, ease, stepped);
    };

    const addListEntry = (): void => {
        const newStep: ListStepData = {
            ID: Date.now(),
            time: 0,
            value: defaultList[0].value,
        };

        const newList = [...list, newStep];
        setList(newList);
        onChange?.(newList, ease, stepped);
    };

    const removeListEntryAtIndex = (index: number): void => {
        const newList = [...list];
        newList.splice(index, 1);

        setList(newList);
        onChange?.(newList, ease, stepped);
    };

    const sortList = (): void => {
        const newList = [...list].sort((a, b) => a.time - b.time);

        setList(newList);
        onChange?.(newList, ease, stepped);
    };

    return (
        <>
            <details open>
                <summary>{label}</summary>
                <Toggle
                    label="Is Stepped"
                    defaultValue={stepped}
                    onChange={(value) => {
                        setStepped(value);
                        onChange?.(list, ease, value);
                    }}
                />

                <EaseDropdown
                    label="Ease"
                    defaultValue={"linear"}
                    onChange={(value) => {
                        setEase(value);
                        onChange?.(list, value, stepped);
                    }}
                />
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
                                inputType="color"
                                defaultValue={step.value}
                                onChange={(value) =>
                                    changeColorAtIndex(index, value)
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
