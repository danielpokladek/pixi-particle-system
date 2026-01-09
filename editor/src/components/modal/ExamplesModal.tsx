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

let isLoading = false;

/**
 * Loads the example configuration into the emitter.
 * @param preset The example preset to load.
 */
async function loadExampleConfig(preset: ExampleConfig): Promise<void> {
    if (isLoading) {
        return;
    }

    isLoading = true;

    const config = await exampleToConfigs[preset]();

    const emitter = window.particleEmitter;

    emitter.stop(true);
    emitter.applyConfig(config);
    emitter.play();

    isLoading = false;
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
                    <p>
                        Presets are ready-made particle configurations that set
                        up an emitter's behaviors (spawn, movement, color,
                        alpha, scale, textures, etc.) so you can quickly try a
                        look without manually tweaking every setting.
                    </p>
                    <p>
                        Select a preset to preview its configuration, then click
                        <strong> Load</strong> to apply it to the current
                        emitter. Click <strong>Cancel</strong> (or the close
                        button) to close this modal without changing anything.
                    </p>
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
