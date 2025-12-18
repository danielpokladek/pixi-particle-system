import { SpawnShape } from "pixi-particle-system";
import { useState } from "react";
import { PanelProps } from "../../Types";
import { NumberControl } from "../ui/controls/NumberControl";
import { Select } from "../ui/controls/Select";
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

    return (
        <details open={isOpen}>
            <summary>Spawn Behavior</summary>

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
