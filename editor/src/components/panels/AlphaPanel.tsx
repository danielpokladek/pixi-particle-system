import { useEffect, useState } from "react";
import { PanelProps } from "../../Types";
import { NumberControl } from "../ui/controls/NumberControl";
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

    useEffect(() => {
        // TODO: Fix this initialization logic.
        // if (!emitter.colorBehavior.list.isInitialized) {
        //     emitter.alphaBehavior.list.initialize({
        //         list: [
        //             { time: 0, value: 1 },
        //             { time: 1, value: 0 },
        //         ],
        //     });
        // }
    }, [emitter]);

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

            <hr />

            {!useList && (
                <NumberControl
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
                    defaultList={emitter.alphaBehavior.list.list.map(
                        (step, index) => ({
                            time: step.time,
                            value: step.value,
                            ID: Date.now() + index,
                        }),
                    )}
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
