import { Color } from "pixi.js";
import { useEffect, useState } from "react";
import { PanelProps } from "../../Types";
import { ColorInput } from "../ui/inputs/ColorInput";
import { Select } from "../ui/inputs/Select";

const labelToType: Record<string, "static" | "list" | "random"> = {
    Static: "static",
    List: "list",
    Random: "random",
};

const typeToLabel: Record<"static" | "list" | "random", string> = {
    static: "Static",
    list: "List",
    random: "Random",
};

export function ColorPanel({ emitter, isOpen = true }: PanelProps) {
    const [useList, setUseList] = useState(
        emitter.colorBehavior.mode !== "static",
    );

    useEffect(() => {
        if (!emitter.colorBehavior.list.isInitialized) {
            emitter.colorBehavior.list.initialize({
                list: [
                    { time: 0, value: "#000000" },
                    { time: 1, value: "#ffffff" },
                ],
            });
        }
    }, [emitter]);

    return (
        <details open={isOpen}>
            <summary>Color Behavior</summary>

            <Select
                label="Mode"
                defaultValue={typeToLabel[emitter.colorBehavior.mode]}
                onChange={(value) => {
                    const newMode = labelToType[value];
                    emitter.colorBehavior.mode = newMode;

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
                <ColorInput
                    label="Static Value"
                    defaultValue={Color.shared
                        .setValue(emitter.colorBehavior.staticValue)
                        .toHex()}
                    onChange={(value) => {
                        console.log(value);
                        emitter.colorBehavior.staticValue = value;
                    }}
                />
            )}

            {/* {useList && (
                <ValueList
                    label="List"
                    defaultList={emitter.colorBehavior.list.list.map(
                        (step, index) => ({
                            time: step.time,
                            value: Color.shared.setValue(step.value).toHex(),
                            ID: index,
                        }),
                    )}
                    onChange={(newList) => {
                        emitter.colorBehavior.list.initialize({
                            list: newList,
                        });
                    }}
                />
            )} */}
        </details>
    );
}
