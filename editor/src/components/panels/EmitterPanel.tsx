import { PanelProps } from "../../Types";
import { NumberInput } from "../ui/inputs/NumberInput";
import { Select } from "../ui/inputs/Select";
import { Toggle } from "../ui/inputs/Toggle";
import { Vector2DInput } from "../ui/inputs/Vector2DInput";

export function EmitterPanel({ emitter, isOpen = true }: PanelProps) {
    return (
        <details open={isOpen}>
            <summary>Emitter</summary>

            <Vector2DInput
                label="Particle Lifetime"
                xDefault={emitter.minLifetime}
                yDefault={emitter.maxLifetime}
                onChange={(min, max) => {
                    emitter.minLifetime = min;
                    emitter.maxLifetime = max;
                }}
            />

            <NumberInput
                label="Spawn Interval"
                defaultValue={0.1}
                onChange={(value) => {
                    emitter.spawnInterval = value;
                }}
            />

            <NumberInput
                label="Spawn Chance"
                defaultValue={1}
                onChange={(value) => {
                    emitter.spawnChance = value;
                }}
            />

            <NumberInput
                label="Max Particles"
                defaultValue={500}
                onChange={(value) => {
                    emitter.maxParticles = value;
                }}
            />

            <NumberInput
                label="Wave Particles"
                defaultValue={1}
                onChange={(value) => {
                    emitter.particlesPerWave = value;
                }}
            />

            <Select
                label="Blend Mode"
                defaultValue="normal"
                options={[
                    { label: "Normal", key: "normal" },
                    { label: "Add", key: "Add" },
                ]}
            />

            <Toggle
                label="Add At Back"
                onChange={(value) => {
                    emitter.addAtBack = value;
                }}
            />
        </details>
    );
}
