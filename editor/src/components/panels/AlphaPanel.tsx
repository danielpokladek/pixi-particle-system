import { useState } from "react";
import { PanelProps } from "../../Types";
import { NumberInput } from "../ui/inputs/NumberInput";
import { Select } from "../ui/inputs/Select";
import { ValueList } from "../ui/inputs/list/ValueList";

const alphaLabelToType: Record<string, "static" | "list" | "random"> = {
    Static: "static",
    List: "list",
    Random: "random",
};

const alphaTypeToLabel: Record<"static" | "list" | "random", string> = {
    static: "Static",
    list: "List",
    random: "Random",
};

export function AlphaPanel({ emitter, isOpen = true }: PanelProps) {
    const [useList, setUseList] = useState(
        emitter.alphaBehavior.mode !== "static",
    );

    return (
        <details open={isOpen}>
            <summary>Alpha Behavior</summary>

            <Select
                label="Behavior Mode"
                defaultValue={alphaTypeToLabel[emitter.alphaBehavior.mode]}
                onChange={(value) => {
                    const newMode = alphaLabelToType[value];
                    emitter.alphaBehavior.mode = newMode;

                    setUseList(newMode !== "static");
                }}
                options={[
                    { label: "Static", key: "static" },
                    { label: "List", key: "list" },
                    { label: "Random", key: "random" },
                ]}
            />

            <hr></hr>

            {!useList && (
                <NumberInput
                    label="Static Value"
                    defaultValue={emitter.alphaBehavior.staticValue}
                    onChange={(value) => {
                        emitter.alphaBehavior.staticValue = value;
                    }}
                />
            )}

            {useList && (
                <ValueList
                    label="Alpha List"
                    defaultList={[
                        { value: 0.0, time: 0.0, ID: 1 },
                        { value: 1.0, time: 0.5, ID: 2 },
                        { value: 0.0, time: 1.0, ID: 3 },
                    ]}
                    onChange={(newList) => {
                        emitter.alphaBehavior.list.initialize({
                            list: newList,
                        });
                    }}
                />
            )}
        </details>
    );
}
