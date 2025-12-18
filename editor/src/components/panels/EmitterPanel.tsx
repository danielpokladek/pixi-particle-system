import { BLEND_MODES } from "pixi.js";
import { PanelProps } from "../../Types";
import { NumberControl } from "../ui/controls/NumberControl";
import { Select } from "../ui/controls/Select";
import { Toggle } from "../ui/controls/Toggle";
import { Vector2DControl } from "../ui/controls/Vector2DControl";

// TODO: Add remaining blend modes.

/**
 * Blend mode options for the emitter panel.
 */
const blendModeOptions: { label: string; key: BLEND_MODES }[] = [
    { label: "Normal", key: "normal" },
    { label: "Add", key: "add" },
    { label: "Multiply", key: "multiply" },
    { label: "Screen", key: "screen" },
];

/**
 * EmitterPanel component props.
 * @param props Component props.
 */
export function EmitterPanel({ isOpen = true }: PanelProps): JSX.Element {
    const emitter = window.particleEmitter;

    return (
        <details open={isOpen}>
            <summary>Emitter</summary>

            <Vector2DControl
                label="Particle Lifetime"
                xDefault={emitter.minLifetime}
                yDefault={emitter.maxLifetime}
                onChange={(min, max) => {
                    emitter.minLifetime = min;
                    emitter.maxLifetime = max;
                }}
            />

            <NumberControl
                label="Spawn Interval"
                defaultValue={emitter.spawnInterval}
                onChange={(value) => {
                    emitter.spawnInterval = value;
                }}
            />

            <NumberControl
                label="Spawn Chance"
                defaultValue={emitter.spawnChance}
                onChange={(value) => {
                    emitter.spawnChance = value;
                }}
            />

            <NumberControl
                label="Max Particles"
                defaultValue={emitter.maxParticles}
                onChange={(value) => {
                    emitter.maxParticles = value;
                }}
            />

            <NumberControl
                label="Wave Particles"
                defaultValue={emitter.particlesPerWave}
                onChange={(value) => {
                    emitter.particlesPerWave = value;
                }}
            />

            <Select
                label="Blend Mode"
                defaultValue={
                    blendModeOptions.find(
                        (option) => option.key === emitter.parent.blendMode,
                    )?.label || "Normal"
                }
                options={blendModeOptions}
                onChange={(value) => {
                    const selectedOption = blendModeOptions.find(
                        (option) => option.label === value,
                    );

                    if (selectedOption) {
                        emitter.parent.blendMode = selectedOption.key;
                    }
                }}
            />

            <Toggle
                label="Add At Back"
                defaultValue={emitter.addAtBack}
                onChange={(value) => {
                    emitter.addAtBack = value;
                }}
            />
        </details>
    );
}
