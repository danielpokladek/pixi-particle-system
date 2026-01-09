import { useEffect, useState } from "react";
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

    const [behaviorState, setBehaviorState] = useState(() => ({
        mode: scaleBehavior.mode,
        staticValue: scaleBehavior.staticValue,
        xList: scaleBehavior.xList,
        yList: scaleBehavior.yList,
    }));

    const [refreshKey, setRefreshKey] = useState<number>(0);

    useEffect(() => {
        const refreshFromEmitter = (): void => {
            setBehaviorState({
                mode: scaleBehavior.mode,
                staticValue: scaleBehavior.staticValue,
                xList: scaleBehavior.xList,
                yList: scaleBehavior.yList,
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
    }, [scaleBehavior, emitter]);

    return (
        <details open={isOpen}>
            <summary>Scale Behavior</summary>

            <Select
                key={`${refreshKey}-scaleBehaviorMode`}
                label="Mode"
                defaultValue={behaviorState.mode}
                onChange={(value) => {
                    const newMode = value as "static" | "list" | "random";
                    emitter.scaleBehavior.mode = newMode;

                    setBehaviorState({
                        ...behaviorState,
                        mode: newMode,
                    });
                }}
                options={[
                    { label: "Static", key: "static" },
                    { label: "List", key: "list" },
                    { label: "Random", key: "random" },
                ]}
            />

            {behaviorState.mode === "static" && (
                <Vector2DControl
                    key={`${refreshKey}-scaleBehaviorStaticValue`}
                    label="Static Value"
                    xDefault={behaviorState.staticValue.x}
                    yDefault={behaviorState.staticValue.y}
                    onChange={(x, y) => {
                        scaleBehavior.staticValue.x = x;
                        scaleBehavior.staticValue.y = y;

                        setBehaviorState({
                            ...behaviorState,
                            staticValue: { x, y },
                        });
                    }}
                />
            )}

            {behaviorState.mode !== "static" && (
                <>
                    <ValueList
                        key={`${refreshKey}-scaleBehaviorXList`}
                        label="X List"
                        defaultList={behaviorState.xList.list.map(
                            (step, index) => ({
                                time: step.time,
                                value: step.value,
                                ID: index,
                            }),
                        )}
                        onChange={(list, ease, isStepped) => {
                            scaleBehavior.xList.initialize({
                                list,
                                ease,
                                isStepped,
                            });

                            setBehaviorState({
                                ...behaviorState,
                                xList: scaleBehavior.xList,
                            });
                        }}
                    />
                    <ValueList
                        key={`${refreshKey}-scaleBehaviorYList`}
                        label="Y List"
                        defaultList={behaviorState.yList.list.map(
                            (step, index) => ({
                                time: step.time,
                                value: step.value,
                                ID: index,
                            }),
                        )}
                        onChange={(list, ease, isStepped) => {
                            scaleBehavior.yList.initialize({
                                list,
                                ease,
                                isStepped,
                            });

                            setBehaviorState({
                                ...behaviorState,
                                yList: scaleBehavior.yList,
                            });
                        }}
                    />
                </>
            )}
        </details>
    );
}
