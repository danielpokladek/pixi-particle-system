import { Color } from "pixi.js";
import { useEffect, useState } from "react";
import { PanelProps } from "../../Types";
import { ColorControl } from "../ui/controls/ColorControl";
import { ColorList } from "../ui/controls/list/ColorList";
import { Select } from "../ui/controls/Select";

/**
 * Color Behavior Panel component.
 * @param props Component props.
 */
export function ColorPanel({ isOpen = true }: PanelProps): JSX.Element {
    const colorBehavior = window.particleEmitter.colorBehavior;
    const [useList, setUseList] = useState(colorBehavior.mode !== "static");

    const [behaviorState, setBehaviorState] = useState(() => ({
        mode: colorBehavior.mode,
        staticValue: colorBehavior.staticValue,
        list: colorBehavior.list,
    }));

    const [refreshKey, setRefreshKey] = useState<number>(0);

    useEffect(() => {
        const refreshFromEmitter = (): void => {
            setBehaviorState({
                mode: colorBehavior.mode,
                staticValue: colorBehavior.staticValue,
                list: colorBehavior.list,
            });

            setUseList(colorBehavior.mode !== "static");
            setRefreshKey((key) => key + 1);
        };

        window.addEventListener("emitterConfigApplied", refreshFromEmitter);

        return (): void => {
            window.removeEventListener(
                "emitterConfigApplied",
                refreshFromEmitter,
            );
        };
    }, [colorBehavior]);

    useEffect(() => {
        if (!colorBehavior.list.isInitialized) {
            colorBehavior.list.initialize({
                list: [
                    { time: 0, value: "#000000" },
                    { time: 1, value: "#ffffff" },
                ],
            });
        }
    }, [colorBehavior]);

    return (
        <details open={isOpen}>
            <summary>Color Behavior</summary>

            <Select
                key={`${refreshKey}-colorBehaviorMode}`}
                label="Mode"
                defaultValue={behaviorState.mode}
                onChange={(value) => {
                    colorBehavior.list.initialize({
                        list: behaviorState.list.list,
                        isStepped: behaviorState.list.isStepped,
                    });
                    colorBehavior.mode = value as "static" | "list" | "random";

                    setBehaviorState({
                        ...behaviorState,
                        mode: value as "static" | "list" | "random",
                    });

                    setUseList(value !== "static");
                }}
                options={[
                    { label: "Static", key: "static" },
                    { label: "List", key: "list" },
                    { label: "Random", key: "random" },
                ]}
            />

            <hr />

            {!useList && (
                <ColorControl
                    key={`${refreshKey}-colorBehaviorStaticValue`}
                    label="Static Value"
                    defaultValue={Color.shared
                        .setValue(behaviorState.staticValue)
                        .toHex()}
                    onChange={(value) => {
                        colorBehavior.staticValue = value;

                        setBehaviorState({
                            ...behaviorState,
                            staticValue: value,
                        });
                    }}
                />
            )}

            {useList && (
                <ColorList
                    key={`${refreshKey}-colorBehaviorList`}
                    label="List"
                    defaultList={behaviorState.list.list.map((step, index) => ({
                        time: step.time,
                        value: Color.shared.setValue(step.value).toHex(),
                        ID: index,
                    }))}
                    onChange={(list, ease, isStepped) => {
                        colorBehavior.list.initialize({
                            list,
                            ease,
                            isStepped,
                        });

                        setBehaviorState({
                            ...behaviorState,
                            list: colorBehavior.list,
                        });
                    }}
                />
            )}
        </details>
    );
}
