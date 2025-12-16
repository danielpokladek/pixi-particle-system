import { SpawnShape } from "pixi-particle-system";
import { useState } from "react";
import { PanelProps } from "../../Types";
import { NumberControl } from "../ui/controls/NumberControl";
import { Vector2DControl } from "../ui/controls/Vector2DControl";
import { Select } from "../ui/inputs/Select";

const spawnOptionToType: Record<string, SpawnShape> = {
    Point: "point",
    Rectangle: "rectangle",
    Circle: "circle",
    Line: "line",
};

const spawnTypeToOption: Record<SpawnShape, string> = {
    point: "Point",
    rectangle: "Rectangle",
    circle: "Circle",
    line: "Line",
};

export function SpawnPanel({ emitter, isOpen = true }: PanelProps) {
    const [spawnShape, setSpawnShape] = useState<SpawnShape>(
        emitter.spawnBehavior.shape,
    );

    return (
        <details open={isOpen}>
            <summary>Spawn Behavior</summary>

            <Vector2DControl
                label="Direction"
                xDefault={emitter.spawnBehavior.direction.x}
                yDefault={emitter.spawnBehavior.direction.y}
                onChange={(x, y) => {
                    console.log(x, y);
                    emitter.spawnBehavior.direction.x = x;
                    emitter.spawnBehavior.direction.y = y;
                }}
            />

            <Select
                label="Shape"
                defaultValue={spawnTypeToOption[emitter.spawnBehavior.shape]}
                // prettier-ignore
                options={[
                    { label: "Point"    , key: "point"     },
                    { label: "Rectangle", key: "rectangle" },
                    { label: "Circle"   , key: "circle"    },
                    { label: "Line"     , key: "line"      },
                ]}
                onChange={(shape) => {
                    const newShape = spawnOptionToType[shape];
                    setSpawnShape(newShape);

                    emitter.spawnBehavior.shape = newShape;
                }}
            />

            {spawnShape === "rectangle" && (
                <>
                    <Vector2DControl
                        label="Size"
                        xDefault={emitter.spawnBehavior.width}
                        yDefault={emitter.spawnBehavior.height}
                        onChange={(width, height) => {
                            emitter.spawnBehavior.width = width;
                            emitter.spawnBehavior.height = height;
                        }}
                    />
                </>
            )}

            {spawnShape === "circle" && (
                <>
                    <Vector2DControl
                        label="Radius"
                        xDefault={emitter.spawnBehavior.outerRadius}
                        yDefault={emitter.spawnBehavior.innerRadius}
                        onChange={(outer, inner) => {
                            emitter.spawnBehavior.outerRadius = outer;
                            emitter.spawnBehavior.innerRadius = inner;
                        }}
                    />
                </>
            )}

            {spawnShape === "line" && (
                <NumberControl
                    label="Width"
                    defaultValue={emitter.spawnBehavior.width}
                    onChange={(value) => {
                        emitter.spawnBehavior.width = value;
                    }}
                />
            )}
        </details>
    );
}
