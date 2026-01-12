import { SpawnShape } from "pixi-particle-system";
import { useEffect, useState } from "react";
import { PanelProps } from "../../Types";
import { NumberControl } from "../ui/controls/NumberControl";
import { Select } from "../ui/controls/Select";
import { Toggle } from "../ui/controls/Toggle";
import { Vector2DControl } from "../ui/controls/Vector2DControl";

/**
 * Spawn Behavior Panel component.
 * @param props Component props.
 */
export function SpawnPanel({ isOpen = true }: PanelProps): JSX.Element {
    const emitter = window.particleEmitter;
    const spawnBehavior = emitter.spawnBehavior;
    const [refreshKey, setRefreshKey] = useState<number>(0);

    const [behaviorState, setBehaviorState] = useState(() => ({
        shape: spawnBehavior.shape,
        origin: spawnBehavior.origin,
        direction: spawnBehavior.direction,
        width: spawnBehavior.width,
        height: spawnBehavior.height,
        outerRadius: spawnBehavior.outerRadius,
        innerRadius: spawnBehavior.innerRadius,
        followMouse: false,
    }));

    useEffect(() => {
        const refreshFromEmitter = (): void => {
            setBehaviorState({
                shape: spawnBehavior.shape,
                origin: spawnBehavior.origin,
                direction: spawnBehavior.direction,
                width: spawnBehavior.width,
                height: spawnBehavior.height,
                outerRadius: spawnBehavior.outerRadius,
                innerRadius: spawnBehavior.innerRadius,
                followMouse: false,
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
    }, [spawnBehavior, emitter]);

    useEffect(() => {
        if (!behaviorState.followMouse) return;

        const canvas: HTMLCanvasElement | null =
            document.querySelector("canvas");

        if (!canvas) return;

        const emitter = window.particleEmitter;
        const parent = emitter.parent;

        const onPointerMove = (e: PointerEvent): void => {
            const rect = canvas.getBoundingClientRect();

            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const globalX = (e.clientX - rect.left) * scaleX;
            const globalY = (e.clientY - rect.top) * scaleY;

            if (parent?.toLocal) {
                const local = parent.toLocal({ x: globalX, y: globalY });

                spawnBehavior.origin = local;
                behaviorState.origin = local;
            } else {
                spawnBehavior.origin = { x: globalX, y: globalY };
                behaviorState.origin = { x: globalX, y: globalY };
            }
        };

        canvas.addEventListener("pointermove", onPointerMove, {
            passive: true,
        });

        return (): void => {
            canvas.removeEventListener("pointermove", onPointerMove);
        };
    }, [spawnBehavior, behaviorState]);

    return (
        <details open={isOpen}>
            <summary>Spawn Behavior</summary>

            <Toggle
                key={`${refreshKey}-spawnBehaviorFollowMouse`}
                label="Follow Mouse"
                defaultValue={behaviorState.followMouse}
                onChange={(value) => {
                    if (!value) {
                        spawnBehavior.origin = { x: 0, y: 0 };
                    }

                    setBehaviorState({
                        ...behaviorState,
                        followMouse: value,
                    });
                }}
            />

            {!behaviorState.followMouse && (
                <Vector2DControl
                    key={`${refreshKey}-spawnBehaviorOrigin`}
                    label="Origin"
                    xDefault={0}
                    yDefault={0}
                    onChange={(x, y) => {
                        spawnBehavior.origin = { x, y };

                        setBehaviorState({
                            ...behaviorState,
                            origin: { x, y },
                        });
                    }}
                />
            )}

            <hr />

            <Vector2DControl
                key={`${refreshKey}-spawnBehaviorDirection`}
                label="Direction"
                xDefault={behaviorState.direction.x}
                yDefault={behaviorState.direction.y}
                onChange={(x, y) => {
                    spawnBehavior.direction.x = x;
                    spawnBehavior.direction.y = y;

                    setBehaviorState({
                        ...behaviorState,
                        direction: { x, y },
                    });
                }}
            />

            <Select
                key={`${refreshKey}-spawnBehaviorShape`}
                label="Shape"
                defaultValue={behaviorState.shape}
                // prettier-ignore
                options={[
                    { label: "Point"    , key: "point"     },
                    { label: "Rectangle", key: "rectangle" },
                    { label: "Circle"   , key: "circle"    },
                    { label: "Line"     , key: "line"      },
                ]}
                onChange={(shape) => {
                    const newShape = shape as SpawnShape;

                    spawnBehavior.shape = newShape;
                    setBehaviorState({
                        ...behaviorState,
                        shape: newShape,
                    });
                }}
            />

            {behaviorState.shape === "rectangle" && (
                <>
                    <Vector2DControl
                        key={`${refreshKey}-spawnBehaviorSize`}
                        label="Size"
                        xDefault={behaviorState.width}
                        yDefault={behaviorState.height}
                        onChange={(width, height) => {
                            spawnBehavior.width = width;
                            spawnBehavior.height = height;

                            setBehaviorState({
                                ...behaviorState,
                                width,
                                height,
                            });
                        }}
                    />
                </>
            )}

            {behaviorState.shape === "circle" && (
                <>
                    <Vector2DControl
                        key={`${refreshKey}-spawnBehaviorRadius`}
                        label="Radius"
                        xDefault={behaviorState.outerRadius}
                        yDefault={behaviorState.innerRadius}
                        onChange={(outer, inner) => {
                            spawnBehavior.outerRadius = outer;
                            spawnBehavior.innerRadius = inner;

                            setBehaviorState({
                                ...behaviorState,
                                outerRadius: outer,
                                innerRadius: inner,
                            });
                        }}
                    />
                </>
            )}

            {behaviorState.shape === "line" && (
                <NumberControl
                    key={`${refreshKey}-spawnBehaviorWidth`}
                    label="Width"
                    defaultValue={behaviorState.width}
                    onChange={(value) => {
                        spawnBehavior.width = value;

                        setBehaviorState({
                            ...behaviorState,
                            width: value,
                        });
                    }}
                />
            )}
        </details>
    );
}
