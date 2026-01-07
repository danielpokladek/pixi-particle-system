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
                label="Mode"
                defaultValue={colorBehavior.mode}
                onChange={(value) => {
                    colorBehavior.mode = value as "static" | "list" | "random";
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
                    label="Static Value"
                    defaultValue={Color.shared
                        .setValue(colorBehavior.staticValue)
                        .toHex()}
                    onChange={(value) => {
                        colorBehavior.staticValue = value;
                    }}
                />
            )}

            {useList && (
                <ColorList
                    label="List"
                    defaultList={colorBehavior.list.list.map((step, index) => ({
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
                    }}
                />
            )}
        </details>
    );
}
