import { Emitter } from "pixi-particle-system";
import { NumberInput } from "../ui/NumberInput";
import { Select } from "../ui/Select";
import { Toggle } from "../ui/Toggle";

type Props = {
    emitter: Emitter;
};

export function EmitterPanel({ emitter }: Props) {
    return (
        <details open>
            <summary>Emitter</summary>

            <NumberInput
                label="Min Lifetime"
                defaultValue={0.2}
                onChange={(value) => {
                    emitter.minLifetime = value;
                }}
            />
            <NumberInput
                label="Max Lifetime"
                defaultValue={0.4}
                onChange={(value) => {
                    emitter.maxLifetime = value;
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
                options={[
                    { label: "Normal", key: "normal", selected: true },
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
