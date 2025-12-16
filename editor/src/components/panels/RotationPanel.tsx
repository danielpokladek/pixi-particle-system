import { useEffect, useState } from "react";
import { PanelProps } from "../../Types";
import { NumberControl } from "../ui/controls/NumberControl";
import { Select } from "../ui/inputs/Select";
import { Toggle } from "../ui/inputs/Toggle";
import { ValueList } from "../ui/inputs/list/ValueList";

const modeLabelToType: Record<string, "static" | "list" | "acceleration"> = {
    Static: "static",
    List: "list",
    Acceleration: "acceleration",
};

const modeTypeToLabel: Record<"static" | "list" | "acceleration", string> = {
    static: "Static",
    list: "List",
    acceleration: "Acceleration",
};

export function RotationPanel({ emitter, isOpen }: PanelProps) {
    const [mode, setMode] = useState(emitter.rotationBehavior.mode);
    const [initializeEnabled, setInitializeEnabled] = useState(false);
    const [updateEnabled, setUpdateEnabled] = useState(false);

    useEffect(() => {
        if (!emitter.rotationBehavior.list.isInitialized) {
            emitter.rotationBehavior.list.initialize({
                list: [
                    { time: 0, value: 0 },
                    { time: 1, value: Math.PI * 2 },
                ],
            });
        }
    }, [emitter]);

    return (
        <details open={isOpen}>
            <summary>Rotation Behavior</summary>

            <Toggle
                label="Initialize Particles"
                defaultValue={initializeEnabled}
                onChange={(value) => {
                    setInitializeEnabled(value);

                    if (value) {
                        emitter.addToActiveInitBehaviors(
                            emitter.rotationBehavior,
                        );
                    } else {
                        emitter.removeFromActiveInitBehaviors(
                            emitter.rotationBehavior,
                        );
                    }
                }}
            />

            <Toggle
                label="Update Particles"
                defaultValue={updateEnabled}
                onChange={(value) => {
                    setUpdateEnabled(value);

                    if (value) {
                        emitter.addToActiveUpdateBehaviors(
                            emitter.rotationBehavior,
                        );
                    } else {
                        emitter.removeFromActiveUpdateBehaviors(
                            emitter.rotationBehavior,
                        );
                    }
                }}
            />

            <hr />

            <Select
                label="Mode"
                defaultValue={modeTypeToLabel[emitter.rotationBehavior.mode]}
                // prettier-ignore
                options={[
                    { label: "List"  , key: "list"   },
                    { label: "Static", key: "static" },
                    { label: "Acceleration", key: "acceleration" },
                ]}
                onChange={(value) => {
                    setMode(modeLabelToType[value]);
                    emitter.rotationBehavior.mode = modeLabelToType[value];
                }}
            />

            <hr />

            {mode === "static" && (
                <NumberControl
                    label="Static Value"
                    disabled={!initializeEnabled}
                    defaultValue={emitter.rotationBehavior.staticValue}
                    onChange={(value) => {
                        emitter.rotationBehavior.staticValue = value;
                    }}
                />
            )}

            {mode === "acceleration" && (
                <>
                    <NumberControl
                        label="Start Rotation"
                        disabled={!initializeEnabled}
                        defaultValue={emitter.rotationBehavior.startRotation}
                        onChange={(value) => {
                            emitter.rotationBehavior.startRotation = value;
                        }}
                    />
                    <NumberControl
                        label="Acceleration"
                        disabled={!updateEnabled}
                        defaultValue={emitter.rotationBehavior.acceleration}
                        onChange={(value) => {
                            emitter.rotationBehavior.acceleration = value;
                        }}
                    />
                </>
            )}

            {mode === "list" && (
                <ValueList
                    label="Rotation List"
                    defaultList={emitter.rotationBehavior.list.list.map(
                        (step, index) => ({
                            time: step.time,
                            value: step.value,
                            ID: index,
                        }),
                    )}
                    onChange={(newList) => {
                        emitter.rotationBehavior.list.initialize({
                            list: newList,
                        });
                    }}
                />
            )}
        </details>
    );
}
