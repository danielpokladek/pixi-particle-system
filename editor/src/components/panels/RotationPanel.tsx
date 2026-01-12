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

    const [behaviorState, setBehaviorState] = useState(() => ({
        initEnabled: emitter.isBehaviorInitActive(rotationBehavior),
        updateEnabled: emitter.isBehaviorUpdateActive(rotationBehavior),
        mode: rotationBehavior.mode,
        staticValue: rotationBehavior.staticValue,
        startRotation: rotationBehavior.startRotation,
        acceleration: rotationBehavior.acceleration,
        list: rotationBehavior.list,
    }));

    const [refreshKey, setRefreshKey] = useState<number>(0);

    useEffect(() => {
        const refreshFromEmitter = (): void => {
            setBehaviorState({
                initEnabled: emitter.isBehaviorInitActive(rotationBehavior),
                updateEnabled: emitter.isBehaviorUpdateActive(rotationBehavior),
                mode: rotationBehavior.mode,
                staticValue: rotationBehavior.staticValue,
                startRotation: rotationBehavior.startRotation,
                acceleration: rotationBehavior.acceleration,
                list: rotationBehavior.list,
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
    }, [rotationBehavior, emitter]);

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
                key={`${refreshKey}-rotationInitializeEnabled`}
                label="Initialize Particles"
                defaultValue={behaviorState.initEnabled}
                onChange={(value) => {
                    setBehaviorState({
                        ...behaviorState,
                        initEnabled: value,
                    });

                    if (value) {
                        emitter.addToActiveInitBehaviors(rotationBehavior);
                    } else {
                        emitter.removeFromActiveInitBehaviors(rotationBehavior);
                    }
                }}
            />

            <Toggle
                key={`${refreshKey}-rotationUpdateEnabled`}
                label="Update Particles"
                defaultValue={behaviorState.updateEnabled}
                onChange={(value) => {
                    setBehaviorState({
                        ...behaviorState,
                        updateEnabled: value,
                    });

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
                key={`${refreshKey}-rotationBehaviorMode`}
                label="Mode"
                defaultValue={behaviorState.mode}
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

                    rotationBehavior.mode = newMode;

                    setBehaviorState({
                        ...behaviorState,
                        mode: newMode,
                    });
                }}
            />

            <hr />

            {behaviorState.mode === "static" && (
                <NumberControl
                    key={`${refreshKey}-rotationBehaviorStaticValue`}
                    label="Static Value"
                    disabled={!behaviorState.initEnabled}
                    defaultValue={behaviorState.staticValue}
                    onChange={(value) => {
                        rotationBehavior.staticValue = value;

                        setBehaviorState({
                            ...behaviorState,
                            staticValue: value,
                        });
                    }}
                />
            )}

            {behaviorState.mode === "acceleration" && (
                <>
                    <NumberControl
                        key={`${refreshKey}-rotationBehaviorStartRotation`}
                        label="Start Rotation"
                        disabled={!behaviorState.initEnabled}
                        defaultValue={behaviorState.startRotation}
                        onChange={(value) => {
                            rotationBehavior.startRotation = value;

                            setBehaviorState({
                                ...behaviorState,
                                startRotation: value,
                            });
                        }}
                    />
                    <NumberControl
                        key={`${refreshKey}-rotationBehaviorAcceleration`}
                        label="Acceleration"
                        disabled={!behaviorState.updateEnabled}
                        defaultValue={behaviorState.acceleration}
                        onChange={(value) => {
                            rotationBehavior.acceleration = value;

                            setBehaviorState({
                                ...behaviorState,
                                acceleration: value,
                            });
                        }}
                    />
                </>
            )}

            {behaviorState.mode === "list" && (
                <ValueList
                    key={`${refreshKey}-rotationBehaviorList`}
                    label="Rotation List"
                    defaultList={behaviorState.list.list.map((step, index) => ({
                        time: step.time,
                        value: step.value,
                        ID: index,
                    }))}
                    onChange={(list, ease, isStepped) => {
                        rotationBehavior.list.initialize({
                            list,
                            ease,
                            isStepped,
                        });

                        setBehaviorState({
                            ...behaviorState,
                            list: rotationBehavior.list,
                        });
                    }}
                />
            )}
        </details>
    );
}
