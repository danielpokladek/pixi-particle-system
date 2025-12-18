import { useState } from "react";
import { PanelProps } from "../../Types";
import { ValueList } from "../ui/controls/list/ValueList";
import { Select } from "../ui/controls/Select";
import { Vector2DControl } from "../ui/controls/Vector2DControl";

/**
 * Scale Behavior Panel component.
 * @param props Component props.
 */
export function ScalePanel({ isOpen }: PanelProps): JSX.Element {
    const emitter = window.particleEmitter;
    const scaleBehavior = emitter.scaleBehavior;
    const [showList, setShowList] = useState(scaleBehavior.mode !== "static");

    return (
        <details open={isOpen}>
            <summary>Scale Behavior</summary>

            <Select
                label="Mode"
                defaultValue={emitter.scaleBehavior.mode}
                onChange={(value) => {
                    const newMode = value as "static" | "list" | "random";
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
                    xDefault={scaleBehavior.staticValue.x}
                    yDefault={scaleBehavior.staticValue.y}
                    onChange={(x, y) => {
                        scaleBehavior.staticValue.x = x;
                        scaleBehavior.staticValue.y = y;
                    }}
                />
            )}

            {showList && (
                <>
                    <ValueList
                        label="X List"
                        defaultList={scaleBehavior.xList.list.map(
                            (step, index) => ({
                                time: step.time,
                                value: step.value,
                                ID: index,
                            }),
                        )}
                        onChange={(newList) => {
                            scaleBehavior.xList.initialize({
                                list: newList,
                            });
                        }}
                    />
                    <ValueList
                        label="Y List"
                        defaultList={scaleBehavior.yList.list.map(
                            (step, index) => ({
                                time: step.time,
                                value: step.value,
                                ID: index,
                            }),
                        )}
                        onChange={(newList) => {
                            scaleBehavior.yList.initialize({
                                list: newList,
                            });
                        }}
                    />
                </>
            )}
        </details>
    );
}
