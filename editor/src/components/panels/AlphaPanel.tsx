import { NumberInput } from "../ui/NumberInput";

export function AlphaPanel() {
    return (
        <details>
            <summary>Alpha Behavior</summary>

            <NumberInput label="Static Value" defaultValue={0.2} />
            {/* TODO: Add a controller to allow for lists to be edited. */}
        </details>
    );
}
