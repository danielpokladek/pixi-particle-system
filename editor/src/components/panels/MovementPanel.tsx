import { useEffect, useState } from "react";
import { PanelProps } from "../../Types";
import { ValueList } from "../ui/controls/list/ValueList";
import { Select } from "../ui/controls/Select";
import { Toggle } from "../ui/controls/Toggle";
import { Vector2DControl } from "../ui/controls/Vector2DControl";

/**
 * Movement Behavior Panel component.
 * @param props Component props.
 */
export function MovementPanel({ isOpen }: PanelProps): JSX.Element {
    const movementBehavior = window.particleEmitter.movementBehavior;

    const [behaviorState, setBehaviorState] = useState(() => ({
        mode: movementBehavior.mode,
        space: movementBehavior.space,
        useList: movementBehavior.useList,
        staticMinSpeed: {
            x: movementBehavior.minMoveSpeed.x,
            y: movementBehavior.minMoveSpeed.y,
        },
        staticMaxSpeed: {
            x: movementBehavior.maxMoveSpeed.x,
            y: movementBehavior.maxMoveSpeed.y,
        },
        xList: movementBehavior.xList,
        yList: movementBehavior.yList,
    }));

    const [refreshKey, setRefreshKey] = useState<number>(0);

    useEffect(() => {
        const refreshFromEmitter = (): void => {
            setBehaviorState({
                mode: movementBehavior.mode,
                space: movementBehavior.space,
                useList: movementBehavior.useList,
                staticMinSpeed: {
                    x: movementBehavior.minMoveSpeed.x,
                    y: movementBehavior.minMoveSpeed.y,
                },
                staticMaxSpeed: {
                    x: movementBehavior.maxMoveSpeed.x,
                    y: movementBehavior.maxMoveSpeed.y,
                },
                xList: movementBehavior.xList,
                yList: movementBehavior.yList,
            });

            setRefreshKey((key) => key + 1);
        };

        window.addEventListener("emitterConfigApplied", refreshFromEmitter);

        return (): void => {
            window.removeEventListener(
                "emitterConfigApplied",
                refreshFromEmitter,
            );
        };
    }, [movementBehavior]);

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
                key={`${refreshKey}-movementBehaviorSpace`}
                label="Space"
                defaultValue={behaviorState.space}
                options={[
                    { label: "Global", key: "global" },
                    { label: "Local", key: "local" },
                ]}
                onChange={(value) => {
                    const newValue = value as "global" | "local";

                    movementBehavior.space = newValue;

                    setBehaviorState({
                        ...behaviorState,
                        space: newValue,
                    });
                }}
            />

            <Select
                key={`${refreshKey}-movementBehaviorMode`}
                label="Mode"
                defaultValue={behaviorState.mode}
                options={[
                    { label: "Acceleration", key: "acceleration" },
                    { label: "Linear", key: "linear" },
                ]}
                onChange={(value) => {
                    const newValue = value as "acceleration" | "linear";

                    movementBehavior.mode = newValue;

                    setBehaviorState({
                        ...behaviorState,
                        mode: newValue,
                    });
                }}
            />

            <Toggle
                label="Use List"
                defaultValue={behaviorState.useList}
                onChange={(value) => {
                    movementBehavior.useList = value;

                    setBehaviorState({
                        ...behaviorState,
                        useList: value,
                    });
                }}
            />

            <hr />

            {!behaviorState.useList && (
                <>
                    <Vector2DControl
                        key={`${refreshKey}-movementBehaviorStaticMinSpeed`}
                        label="Min Speed"
                        xDefault={behaviorState.staticMinSpeed.x}
                        yDefault={behaviorState.staticMinSpeed.y}
                        onChange={(x, y) => {
                            movementBehavior.minMoveSpeed.x = x;
                            movementBehavior.minMoveSpeed.y = y;

                            setBehaviorState({
                                ...behaviorState,
                                staticMinSpeed: { x, y },
                            });
                        }}
                    />
                    <Vector2DControl
                        key={`${refreshKey}-movementBehaviorStaticMaxSpeed`}
                        label="Max Speed"
                        xDefault={behaviorState.staticMaxSpeed.x}
                        yDefault={behaviorState.staticMaxSpeed.y}
                        onChange={(x, y) => {
                            movementBehavior.maxMoveSpeed.x = x;
                            movementBehavior.maxMoveSpeed.y = y;

                            setBehaviorState({
                                ...behaviorState,
                                staticMaxSpeed: { x, y },
                            });
                        }}
                    />
                </>
            )}

            {behaviorState.useList && (
                <>
                    <ValueList
                        key={`${refreshKey}-movementBehaviorXList`}
                        label="X List"
                        defaultList={behaviorState.xList.list.map(
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

                            setBehaviorState({
                                ...behaviorState,
                                xList: movementBehavior.xList,
                            });
                        }}
                    />
                    <ValueList
                        key={`${refreshKey}-movementBehaviorYList`}
                        label="Y List"
                        defaultList={behaviorState.yList.list.map(
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

                            setBehaviorState({
                                ...behaviorState,
                                yList: movementBehavior.yList,
                            });
                        }}
                    />
                </>
            )}
        </details>
    );
}
