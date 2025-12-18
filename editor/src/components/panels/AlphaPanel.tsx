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
                label="Behavior Mode"
                defaultValue={alphaBehavior.mode}
                onChange={(value) => {
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
                    label="Static Value"
                    defaultValue={alphaBehavior.staticValue}
                    onChange={(value) => {
                        window.particleEmitter.alphaBehavior.staticValue =
                            value;
                    }}
                />
            )}

            {useList && (
                <ValueList
                    label="Alpha List"
                    defaultList={alphaBehavior.list.list.map((step) => ({
                        time: step.time,
                        value: step.value,
                        ID: idCounter++,
                    }))}
                    onChange={(newList) => {
                        alphaBehavior.list.initialize({
                            list: newList,
                        });
                    }}
                />
            )}
        </details>
    );
}
