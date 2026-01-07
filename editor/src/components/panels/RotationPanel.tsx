import { useEffect, useState } from "react";
import { PanelProps } from "../../Types";
import { ValueList } from "../ui/controls/list/ValueList";
import { NumberControl } from "../ui/controls/NumberControl";
import { Select } from "../ui/controls/Select";
import { Toggle } from "../ui/controls/Toggle";

/**
 * Rotation Behavior Panel component.
 * @param props Component props.
 */
export function RotationPanel({ isOpen }: PanelProps): JSX.Element {
    const emitter = window.particleEmitter;
    const rotationBehavior = emitter.rotationBehavior;

    const [mode, setMode] = useState(rotationBehavior.mode);
    const [initializeEnabled, setInitializeEnabled] = useState(false);
    const [updateEnabled, setUpdateEnabled] = useState(false);

    useEffect(() => {
        if (!rotationBehavior.list.isInitialized) {
            rotationBehavior.list.initialize({
                list: [
                    { time: 0, value: 0 },
                    { time: 1, value: Math.PI * 2 },
                ],
            });
        }
    }, [rotationBehavior]);

    return (
        <details open={isOpen}>
            <summary>Rotation Behavior</summary>

            <Toggle
                label="Initialize Particles"
                defaultValue={initializeEnabled}
                onChange={(value) => {
                    setInitializeEnabled(value);

                    if (value) {
                        emitter.addToActiveInitBehaviors(rotationBehavior);
                    } else {
                        emitter.removeFromActiveInitBehaviors(rotationBehavior);
                    }
                }}
            />

            <Toggle
                label="Update Particles"
                defaultValue={updateEnabled}
                onChange={(value) => {
                    setUpdateEnabled(value);

                    if (value) {
                        emitter.addToActiveUpdateBehaviors(rotationBehavior);
                    } else {
                        emitter.removeFromActiveUpdateBehaviors(
                            rotationBehavior,
                        );
                    }
                }}
            />

            <hr />

            <Select
                label="Mode"
                defaultValue={rotationBehavior.mode}
                options={[
                    { label: "List", key: "list" },
                    { label: "Static", key: "static" },
                    { label: "Acceleration", key: "acceleration" },
                    { label: "Direction", key: "faceDirection" },
                ]}
                onChange={(value) => {
                    const newMode = value as
                        | "static"
                        | "list"
                        | "acceleration"
                        | "direction";

                    setMode(newMode);
                    rotationBehavior.mode = newMode;
                }}
            />

            <hr />

            {mode === "static" && (
                <NumberControl
                    label="Static Value"
                    disabled={!initializeEnabled}
                    defaultValue={rotationBehavior.staticValue}
                    onChange={(value) => {
                        rotationBehavior.staticValue = value;
                    }}
                />
            )}

            {mode === "acceleration" && (
                <>
                    <NumberControl
                        label="Start Rotation"
                        disabled={!initializeEnabled}
                        defaultValue={rotationBehavior.startRotation}
                        onChange={(value) => {
                            rotationBehavior.startRotation = value;
                        }}
                    />
                    <NumberControl
                        label="Acceleration"
                        disabled={!updateEnabled}
                        defaultValue={rotationBehavior.acceleration}
                        onChange={(value) => {
                            rotationBehavior.acceleration = value;
                        }}
                    />
                </>
            )}

            {mode === "list" && (
                <ValueList
                    label="Rotation List"
                    defaultList={rotationBehavior.list.list.map(
                        (step, index) => ({
                            time: step.time,
                            value: step.value,
                            ID: index,
                        }),
                    )}
                    onChange={(list, ease, isStepped) => {
                        rotationBehavior.list.initialize({
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
