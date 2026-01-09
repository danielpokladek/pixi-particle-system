import { BLEND_MODES } from "pixi.js";
import { useEffect, useState } from "react";
import { PanelProps } from "../../Types";
import { ColorControl } from "../ui/controls/ColorControl";
import { NumberControl } from "../ui/controls/NumberControl";
import { Select } from "../ui/controls/Select";
import { Toggle } from "../ui/controls/Toggle";
import { Vector2DControl } from "../ui/controls/Vector2DControl";
import { EaseDropdown } from "../ui/EaseDropdown";

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

    const [emitterState, setEmitterState] = useState(() => ({
        minLifetime: emitter.minLifetime,
        maxLifetime: emitter.maxLifetime,
        spawnInterval: emitter.spawnInterval,
        spawnChance: emitter.spawnChance,
        maxParticles: emitter.maxParticles,
        particlesPerWave: emitter.particlesPerWave,
        blendMode: emitter.parent.blendMode,
        ease: emitter.ease,
        addAtBack: emitter.addAtBack,
    }));

    const [refreshKey, setRefreshKey] = useState<number>(0);

    useEffect(() => {
        const refreshFromEmitter = (): void => {
            setEmitterState({
                minLifetime: emitter.minLifetime,
                maxLifetime: emitter.maxLifetime,
                spawnInterval: emitter.spawnInterval,
                spawnChance: emitter.spawnChance,
                maxParticles: emitter.maxParticles,
                particlesPerWave: emitter.particlesPerWave,
                blendMode: emitter.parent.blendMode,
                ease: emitter.ease,
                addAtBack: emitter.addAtBack,
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
    }, [emitter]);

    return (
        <details open={isOpen}>
            <summary>Emitter</summary>

            <ColorControl
                label="Background"
                defaultValue="#000000"
                onChange={(value) => {
                    window.application.renderer.background.color = value;
                }}
            />

            <Vector2DControl
                key={`${refreshKey}-lifetime}`}
                label="Particle Lifetime"
                xDefault={emitterState.minLifetime}
                yDefault={emitterState.maxLifetime}
                onChange={(min, max) => {
                    emitter.minLifetime = min;
                    emitter.maxLifetime = max;

                    setEmitterState((state) => ({
                        ...state,
                        minLifetime: min,
                        maxLifetime: max,
                    }));
                }}
            />

            <NumberControl
                key={`${refreshKey}-spawnInterval`}
                label="Spawn Interval"
                defaultValue={emitterState.spawnInterval}
                onChange={(value) => {
                    emitter.spawnInterval = value;

                    setEmitterState((state) => ({
                        ...state,
                        spawnInterval: value,
                    }));
                }}
            />

            <NumberControl
                key={`${refreshKey}-spawnChance`}
                label="Spawn Chance"
                defaultValue={emitterState.spawnChance}
                onChange={(value) => {
                    emitter.spawnChance = value;
                }}
            />

            <NumberControl
                key={`${refreshKey}-maxParticles`}
                label="Max Particles"
                defaultValue={emitterState.maxParticles}
                onChange={(value) => {
                    emitter.maxParticles = value;
                }}
            />

            <NumberControl
                key={`${refreshKey}-particlesPerWave`}
                label="Wave Particles"
                defaultValue={emitterState.particlesPerWave}
                onChange={(value) => {
                    emitter.particlesPerWave = value;
                }}
            />

            <Select
                key={`${refreshKey}-blendMode`}
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

            <EaseDropdown
                key={`${refreshKey}-lifetimeEase`}
                label="Lifetime Ease"
                defaultValue={emitterState.ease}
                onChange={(value) => {
                    emitter.ease = value;
                }}
            />

            <Toggle
                key={`${refreshKey}-addAtBack`}
                label="Add At Back"
                defaultValue={emitterState.addAtBack}
                onChange={(value) => {
                    emitter.addAtBack = value;
                }}
            />
        </details>
    );
}
