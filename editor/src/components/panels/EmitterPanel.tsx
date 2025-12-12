import { NumberInput } from "../ui/NumberInput";
import { Select } from "../ui/Select";
import { Toggle } from "../ui/Toggle";

export function EmitterPanel() {
    return (
        <details open>
            <summary>Emitter Settings</summary>

            <NumberInput label="Min Lifetime" defaultValue={0.2} />
            <NumberInput label="Max Lifetime" defaultValue={0.4} />
            <NumberInput label="Spawn Interval" defaultValue={0.1} />
            <NumberInput label="Spawn Chance" defaultValue={1} />
            <NumberInput label="Max Particles" defaultValue={500} />
            <NumberInput label="Wave Particles" defaultValue={1} />
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
                    console.log(value);
                }}
            />
        </details>
    );
}
