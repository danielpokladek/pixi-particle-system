import { useEffect, useState } from "react";
import { PanelProps } from "../../Types";
import { ValueList } from "../ui/controls/list/ValueList";
import { Select } from "../ui/controls/Select";
import { Vector2DControl } from "../ui/controls/Vector2DControl";

/**
 * Movement Behavior Panel component.
 * @param props Component props.
 */
export function MovementPanel({ isOpen }: PanelProps): JSX.Element {
    const movementBehavior = window.particleEmitter.movementBehavior;
    const [useList, setUseList] = useState(movementBehavior.useList);

    useEffect(() => {
        if (!movementBehavior.xList.isInitialized) {
            const listStops = [
                { time: 0, value: 0 },
                { time: 1, value: 0 },
            ];

            movementBehavior.xList.initialize({
                list: listStops,
            });

            movementBehavior.yList.initialize({
                list: listStops,
            });
        }
    }, [movementBehavior]);

    return (
        <details open={isOpen}>
            <summary>Movement Behavior</summary>

            <Select
                label="Space"
                defaultValue={movementBehavior.space}
                options={[
                    { label: "Global", key: "global" },
                    { label: "Local", key: "local" },
                ]}
                onChange={(value) => {
                    movementBehavior.space = value as "global" | "local";
                }}
            />

            <Select
                label="Mode"
                defaultValue={useList ? "List" : "Static"}
                options={[
                    { label: "List", key: "list" },
                    { label: "Static", key: "static" },
                ]}
                onChange={(value) => {
                    const newUseList = value === "list";

                    movementBehavior.useList = newUseList;
                    setUseList(newUseList);
                }}
            />

            <hr />

            {!useList && (
                <>
                    <Vector2DControl
                        label="Min Speed"
                        xDefault={movementBehavior.minMoveSpeed.x}
                        yDefault={movementBehavior.minMoveSpeed.y}
                        onChange={(x, y) => {
                            movementBehavior.minMoveSpeed.x = x;
                            movementBehavior.minMoveSpeed.y = y;
                        }}
                    />
                    <Vector2DControl
                        label="Max Speed"
                        xDefault={movementBehavior.maxMoveSpeed.x}
                        yDefault={movementBehavior.maxMoveSpeed.y}
                        onChange={(x, y) => {
                            movementBehavior.maxMoveSpeed.x = x;
                            movementBehavior.maxMoveSpeed.y = y;
                        }}
                    />
                </>
            )}

            {useList && (
                <>
                    <ValueList
                        label="X List"
                        defaultList={movementBehavior.xList.list.map(
                            (step, index) => ({
                                time: step.time,
                                value: step.value,
                                ID: index,
                            }),
                        )}
                        onChange={(newList) => {
                            movementBehavior.xList.initialize({
                                list: newList,
                            });
                        }}
                    />
                    <ValueList
                        label="Y List"
                        defaultList={movementBehavior.yList.list.map(
                            (step, index) => ({
                                time: step.time,
                                value: step.value,
                                ID: index,
                            }),
                        )}
                        onChange={(list, ease, isStepped) => {
                            movementBehavior.yList.initialize({
                                list,
                                ease,
                                isStepped,
                            });
                        }}
                    />
                </>
            )}
        </details>
    );
}
