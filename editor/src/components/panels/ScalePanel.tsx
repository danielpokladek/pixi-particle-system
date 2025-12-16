import { useState } from "react";
import { PanelProps } from "../../Types";
import { Vector2DControl } from "../ui/controls/Vector2DControl";
import { Select } from "../ui/inputs/Select";
import { ValueList } from "../ui/inputs/list/ValueList";

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

export function ScalePanel({ emitter, isOpen }: PanelProps) {
    const [showList, setShowList] = useState(
        emitter.scaleBehavior.mode !== "static",
    );

    return (
        <details open={isOpen}>
            <summary>Scale Behavior</summary>

            <Select
                label="Mode"
                defaultValue={typeToLabel[emitter.scaleBehavior.mode]}
                onChange={(value) => {
                    const newMode = labelToType[value];
                    emitter.scaleBehavior.mode = newMode;

                    setShowList(newMode !== "static");
                }}
                options={[
                    { label: "Static", key: "static" },
                    { label: "List", key: "list" },
                    { label: "Random", key: "random" },
                ]}
            />

            {!showList && (
                <Vector2DControl
                    label="Static Value"
                    xDefault={emitter.scaleBehavior.staticValue.x}
                    yDefault={emitter.scaleBehavior.staticValue.y}
                    onChange={(x, y) => {
                        emitter.scaleBehavior.staticValue.x = x;
                        emitter.scaleBehavior.staticValue.y = y;
                    }}
                />
            )}

            {showList && (
                <>
                    <ValueList
                        label="X List"
                        defaultList={emitter.scaleBehavior.xList.list.map(
                            (step, index) => ({
                                time: step.time,
                                value: step.value,
                                ID: index,
                            }),
                        )}
                        onChange={(newList) => {
                            emitter.scaleBehavior.xList.initialize({
                                list: newList,
                            });
                        }}
                    />
                    <ValueList
                        label="Y List"
                        defaultList={emitter.scaleBehavior.yList.list.map(
                            (step, index) => ({
                                time: step.time,
                                value: step.value,
                                ID: index,
                            }),
                        )}
                        onChange={(newList) => {
                            emitter.scaleBehavior.yList.initialize({
                                list: newList,
                            });
                        }}
                    />
                </>
            )}
        </details>
    );
}
