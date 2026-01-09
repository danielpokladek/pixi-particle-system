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
    const spawnBehavior = window.particleEmitter.spawnBehavior;
    const [spawnShape, setSpawnShape] = useState<SpawnShape>(
        spawnBehavior.shape,
    );

    const [followMouse, setFollowMouse] = useState<boolean>(false);

    useEffect(() => {
        if (!followMouse) return;

        // Try to find the PIXI canvas/view first; fall back to the first <canvas>.
        // const app = w.pixiApp ?? w.app;
        const canvas: HTMLCanvasElement | null =
            document.querySelector("canvas");

        if (!canvas) return;

        // Best-effort "parent-local" space:
        // Prefer emitter container's parent (origin is described as parent-local),
        // then container, then stage; otherwise fall back to canvas coordinates.
        const emitter = window.particleEmitter;
        const parent = emitter.parent;

        const onPointerMove = (e: PointerEvent): void => {
            const rect = canvas.getBoundingClientRect();

            // Convert from CSS pixels -> canvas pixels
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const globalX = (e.clientX - rect.left) * scaleX;
            const globalY = (e.clientY - rect.top) * scaleY;

            if (parent?.toLocal) {
                const local = parent.toLocal({ x: globalX, y: globalY });
                spawnBehavior.origin = local;
            } else {
                spawnBehavior.origin = { x: globalX, y: globalY };
            }
        };

        canvas.addEventListener("pointermove", onPointerMove, {
            passive: true,
        });

        return (): void => {
            canvas.removeEventListener("pointermove", onPointerMove);
        };
    }, [followMouse, spawnBehavior]);

    return (
        <details open={isOpen}>
            <summary>Spawn Behavior</summary>

            <Toggle
                label="Follow Mouse"
                defaultValue={followMouse}
                onChange={(value) => {
                    if (!value) {
                        spawnBehavior.origin = { x: 0, y: 0 };
                    }

                    setFollowMouse(value);
                }}
            />

            {!followMouse && (
                <Vector2DControl
                    label="Origin"
                    xDefault={0}
                    yDefault={0}
                    onChange={(x, y) => {
                        spawnBehavior.origin = { x, y };
                    }}
                />
            )}

            <hr />

            <Vector2DControl
                label="Direction"
                xDefault={spawnBehavior.direction.x}
                yDefault={spawnBehavior.direction.y}
                onChange={(x, y) => {
                    spawnBehavior.direction.x = x;
                    spawnBehavior.direction.y = y;
                }}
            />

            <Select
                label="Shape"
                defaultValue={spawnBehavior.shape}
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
                    setSpawnShape(newShape);
                }}
            />

            {spawnShape === "rectangle" && (
                <>
                    <Vector2DControl
                        label="Size"
                        xDefault={spawnBehavior.width}
                        yDefault={spawnBehavior.height}
                        onChange={(width, height) => {
                            spawnBehavior.width = width;
                            spawnBehavior.height = height;
                        }}
                    />
                </>
            )}

            {spawnShape === "circle" && (
                <>
                    <Vector2DControl
                        label="Radius"
                        xDefault={spawnBehavior.outerRadius}
                        yDefault={spawnBehavior.innerRadius}
                        onChange={(outer, inner) => {
                            spawnBehavior.outerRadius = outer;
                            spawnBehavior.innerRadius = inner;
                        }}
                    />
                </>
            )}

            {spawnShape === "line" && (
                <NumberControl
                    label="Width"
                    defaultValue={spawnBehavior.width}
                    onChange={(value) => {
                        spawnBehavior.width = value;
                    }}
                />
            )}
        </details>
    );
}
