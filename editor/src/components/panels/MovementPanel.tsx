import { MovementSpace } from "pixi-particle-system";
import { useEffect, useState } from "react";
import { PanelProps } from "../../Types";
import { Vector2DControl } from "../ui/controls/Vector2DControl";
import { Select } from "../ui/inputs/Select";
import { ValueList } from "../ui/inputs/list/ValueList";

const spaceOptionToType: Record<string, MovementSpace> = {
    Local: "local",
    Global: "global",
};

const spaceTypeToOption: Record<MovementSpace, string> = {
    local: "Local",
    global: "Global",
};

export function MovementPanel({ emitter, isOpen }: PanelProps) {
    const [useList, setUseList] = useState(emitter.movementBehavior.useList);

    useEffect(() => {
        // if (!emitter.colorBehavior.list.isInitialized) {
        //     emitter.colorBehavior.list.initialize({
        //         list: [
        //             { time: 0, value: "#000000" },
        //             { time: 1, value: "#ffffff" },
        //         ],
        //     });
        // }
    }, [emitter]);

    return (
        <details open={isOpen}>
            <summary>Movement Behavior</summary>

            <Select
                label="Space"
                defaultValue={spaceTypeToOption[emitter.movementBehavior.space]}
                // prettier-ignore
                options={[
                    { label: "Global", key: "global" },
                    { label: "Local" , key: "local"  },
                ]}
                onChange={(value) => {
                    emitter.movementBehavior.space = spaceOptionToType[value];
                }}
            />

            <Select
                label="Mode"
                defaultValue={useList ? "List" : "Static"}
                // prettier-ignore
                options={[
                    { label: "List"  , key: "list"   },
                    { label: "Static", key: "static" },
                ]}
                onChange={(value) => {
                    const newUseList = value === "List";
                    emitter.movementBehavior.useList = newUseList;

                    setUseList(newUseList);
                }}
            />

            <hr />

            {!useList && (
                <>
                    <Vector2DControl
                        label="Min Speed"
                        xDefault={emitter.movementBehavior.minMoveSpeed.x}
                        yDefault={emitter.movementBehavior.minMoveSpeed.y}
                        onChange={(x, y) => {
                            emitter.movementBehavior.minMoveSpeed.x = x;
                            emitter.movementBehavior.minMoveSpeed.y = y;
                        }}
                    />
                    <Vector2DControl
                        label="Max Speed"
                        xDefault={emitter.movementBehavior.maxMoveSpeed.x}
                        yDefault={emitter.movementBehavior.maxMoveSpeed.y}
                        onChange={(x, y) => {
                            emitter.movementBehavior.maxMoveSpeed.x = x;
                            emitter.movementBehavior.maxMoveSpeed.y = y;
                        }}
                    />
                </>
            )}

            {useList && (
                <>
                    <ValueList
                        label="X List"
                        defaultList={emitter.movementBehavior.xList.list.map(
                            (step, index) => ({
                                time: step.time,
                                value: step.value,
                                ID: index,
                            }),
                        )}
                        onChange={(newList) => {
                            emitter.movementBehavior.xList.initialize({
                                list: newList,
                            });
                        }}
                    />
                    <ValueList
                        label="Y List"
                        defaultList={emitter.movementBehavior.yList.list.map(
                            (step, index) => ({
                                time: step.time,
                                value: step.value,
                                ID: index,
                            }),
                        )}
                        onChange={(newList) => {
                            emitter.movementBehavior.yList.initialize({
                                list: newList,
                            });
                        }}
                    />
                </>
            )}
        </details>
    );
}
