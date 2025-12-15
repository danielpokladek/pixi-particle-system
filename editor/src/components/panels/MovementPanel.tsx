import { MovementSpace } from "pixi-particle-system";
import { PanelProps } from "../../Types";
import { Select } from "../ui/inputs/Select";

const spaceOptionToType: Record<string, MovementSpace> = {
    Local: "local",
    Global: "global",
};

const spaceTypeToOption: Record<MovementSpace, string> = {
    local: "Local",
    global: "Global",
};

export function MovementPanel({ emitter, isOpen }: PanelProps) {
    return (
        <details open={isOpen}>
            <summary>Movement Behavior</summary>

            <Select
                label="Space"
                defaultValue={spaceTypeToOption[emitter.movementBehavior.space]}
                // prettier-ignore
                options={[
                    { label: "Global", key: "global" },
                    { label: "Local" , key: "local"  },
                ]}
                onChange={(value) => {
                    emitter.movementBehavior.space = spaceOptionToType[value];
                }}
            />
        </details>
    );
}
