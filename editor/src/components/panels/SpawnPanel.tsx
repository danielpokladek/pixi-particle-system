import { NumberInput } from "../ui/NumberInput";
import { Select } from "../ui/Select";
import { Toggle } from "../ui/Toggle";

export function SpawnPanel() {
    return (
        <details open>
            <summary>Spawn Settings</summary>

            <Select
                label="Shape"
                // prettier-ignore
                options={[
                    { label: "Point",     key: "point"    , selected: true },
                    { label: "Rectangle", key: "rectangle"                 },
                    { label: "Circle",    key: "circle"                    },
                    { label: "Line",      key: "line"                      },
                ]}
            />

            <NumberInput label="Min Lifetime" defaultValue={0.2} />
            <NumberInput label="Max Lifetime" defaultValue={0.4} />
            <NumberInput label="Spawn Interval" defaultValue={0.1} />
            <NumberInput label="Spawn Chance" defaultValue={1} />
            <NumberInput label="Max Particles" defaultValue={500} />
            <NumberInput label="Wave Particles" defaultValue={1} />

            <Toggle
                label="Add At Back"
                onChange={(value) => {
                    console.log(value);
                }}
            />
        </details>
    );
}
