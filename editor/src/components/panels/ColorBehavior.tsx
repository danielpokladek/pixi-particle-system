import { ColorInput } from "../ui/inputs/ColorInput";

export function ColorPanel() {
    return (
        <details>
            <summary>Color Behavior</summary>

            <ColorInput label="Static Value" defaultValue={"#ffffff"} />
            {/* TODO: Add a controller to allow for lists to be edited. */}
        </details>
    );
}
