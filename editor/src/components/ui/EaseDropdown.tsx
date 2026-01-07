import { Ease } from "pixi-particle-system";
import { Select } from "./controls/Select";

/**
 * Ease options for the emitter panel.
 */
const easeOptions: { label: string; key: Ease }[] = [
    { label: "Linear", key: "linear" },

    { label: "Power 2 In", key: "power2.in" },
    { label: "Power 2 Out", key: "power2.out" },
    { label: "Power 2 In/Out", key: "power2.inout" },

    { label: "Power 3 In", key: "power3.in" },
    { label: "Power 3 Out", key: "power3.out" },
    { label: "Power 3 In/Out", key: "power3.inout" },

    { label: "Power 4 In", key: "power4.in" },
    { label: "Power 4 Out", key: "power4.out" },
    { label: "Power 4 In/Out", key: "power4.inout" },

    { label: "Power 5 In", key: "power5.in" },
    { label: "Power 5 Out", key: "power5.out" },
    { label: "Power 5 In/Out", key: "power5.inout" },

    { label: "Back In", key: "back.in" },
    { label: "Back Out", key: "back.out" },
    { label: "Back In/Out", key: "back.inout" },

    { label: "Bounce In", key: "bounce.in" },
    { label: "Bounce Out", key: "bounce.out" },
    { label: "Bounce In/Out", key: "bounce.inout" },

    { label: "Circle In", key: "circle.in" },
    { label: "Circle Out", key: "circle.out" },
    { label: "Circle In/Out", key: "circle.inout" },

    { label: "Elastic In", key: "elastic.in" },
    { label: "Elastic Out", key: "elastic.out" },
    { label: "Elastic In/Out", key: "elastic.inout" },

    { label: "Sine In", key: "sine.in" },
    { label: "Sine Out", key: "sine.out" },
    { label: "Sine In/Out", key: "sine.inout" },
];

type Props = {
    label: string;
    defaultValue: Ease;
    onChange: (value: Ease) => void;
};

/**
 * EaseDropdown component for selecting easing functions.
 * @param props Component props.
 * @returns JSX.Element.
 */
export function EaseDropdown({
    label,
    defaultValue,
    onChange,
}: Props): JSX.Element {
    return (
        <>
            <Select
                label={label}
                defaultValue={defaultValue}
                options={easeOptions}
                onChange={(value) => {
                    onChange(value as Ease);
                }}
            />
        </>
    );
}
