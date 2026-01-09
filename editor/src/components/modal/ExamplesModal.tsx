import { useState } from "react";
import { getDefaultConfig } from "../../examples/Default";
import { getSnowConfig } from "../../examples/Snow";
import { Select } from "../ui/controls/Select";

const exampleToConfigs = {
    default: getDefaultConfig,
    snow: getSnowConfig,
};

type ExampleConfig = keyof typeof exampleToConfigs;

const dropdownOptions: { label: string; key: ExampleConfig }[] = [
    { label: "Default", key: "default" },
    { label: "Snow", key: "snow" },
];

type Props = {
    onClose: () => void;
};

/**
 * Loads the example configuration into the emitter.
 * @param preset The example preset to load.
 */
async function loadExampleConfig(preset: ExampleConfig): Promise<void> {
    const config = await exampleToConfigs[preset]();

    const emitter = window.particleEmitter;

    emitter.stop(true);
    emitter.applyConfig(config);
    emitter.play();
}

/**
 * Modal component for selecting and loading example particle configurations.
 * @param params Component props.
 * @returns JSX.Element.
 */
export function ExamplesModal({ onClose }: Props): JSX.Element {
    const [selectedPreset, setSelectedPreset] =
        useState<ExampleConfig>("default");

    return (
        <>
            <dialog open>
                <article>
                    <header>
                        <button
                            aria-label="Close"
                            rel="prev"
                            onClick={onClose}
                        ></button>
                        <p>
                            <strong>Particle Presets</strong>
                        </p>
                    </header>
                    <p>Example configs will go here!</p>
                    <Select
                        label="Preset"
                        defaultValue={selectedPreset}
                        options={dropdownOptions}
                        onChange={(value) => {
                            setSelectedPreset(value as ExampleConfig);
                        }}
                    />
                    <footer>
                        <button
                            className="secondary"
                            onClick={() => {
                                onClose();
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                loadExampleConfig(selectedPreset).then(() => {
                                    onClose();
                                });
                            }}
                        >
                            Load
                        </button>
                    </footer>
                </article>
            </dialog>
        </>
    );
}
