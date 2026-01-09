import { useEffect, useState } from "react";
import { PanelProps } from "../../Types";
import { ValueList } from "../ui/controls/list/ValueList";
import { NumberControl } from "../ui/controls/NumberControl";
import { Select } from "../ui/controls/Select";

let idCounter = 0;

/**
 * Alpha Behavior Panel component.
 * @param props Component props.
 */
export function AlphaPanel({ isOpen = true }: PanelProps): JSX.Element {
    const alphaBehavior = window.particleEmitter.alphaBehavior;
    const [useList, setUseList] = useState(alphaBehavior.mode !== "static");

    const [behaviorState, setBehaviorState] = useState(() => ({
        mode: alphaBehavior.mode,
        staticValue: alphaBehavior.staticValue,
        list: alphaBehavior.list,
    }));

    const [refreshKey, setRefreshKey] = useState<number>(0);

    useEffect(() => {
        const refreshFromEmitter = (): void => {
            setBehaviorState({
                mode: alphaBehavior.mode,
                staticValue: alphaBehavior.staticValue,
                list: alphaBehavior.list,
            });

            setUseList(alphaBehavior.mode !== "static");
            setRefreshKey((key) => key + 1);
        };

        window.addEventListener("emitterConfigApplied", refreshFromEmitter);

        return (): void => {
            window.removeEventListener(
                "emitterConfigApplied",
                refreshFromEmitter,
            );
        };
    }, [alphaBehavior]);

    useEffect(() => {
        if (!alphaBehavior.list.isInitialized) {
            alphaBehavior.list.initialize({
                list: [
                    { time: 0, value: 1 },
                    { time: 1, value: 0 },
                ],
            });
        }
    }, [alphaBehavior]);

    return (
        <details open={isOpen}>
            <summary>Alpha Behavior</summary>

            <Select
                key={`${refreshKey}-alphaBehaviorMode`}
                label="Behavior Mode"
                defaultValue={behaviorState.mode}
                onChange={(value) => {
                    alphaBehavior.list.initialize({
                        list: behaviorState.list.list,
                        isStepped: behaviorState.list.isStepped,
                    });
                    alphaBehavior.mode = value as "static" | "list" | "random";
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
                <NumberControl
                    key={`${refreshKey}-alphaStaticValue`}
                    label="Static Value"
                    defaultValue={behaviorState.staticValue}
                    onChange={(value) => {
                        window.particleEmitter.alphaBehavior.staticValue =
                            value;
                    }}
                />
            )}

            {useList && (
                <ValueList
                    key={`${refreshKey}-alphaValueList`}
                    label="Alpha List"
                    defaultList={behaviorState.list.list.map((step) => ({
                        time: step.time,
                        value: step.value,
                        ID: idCounter++,
                    }))}
                    onChange={(list, ease, isStepped) => {
                        alphaBehavior.list.initialize({
                            list,
                            ease,
                            isStepped,
                        });
                    }}
                />
            )}
        </details>
    );
}
