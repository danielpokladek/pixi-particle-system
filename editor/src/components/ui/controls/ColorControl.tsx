import { Input } from "../base/Input";

type Props = {
    label: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
};

/**
 * Color control with label.
 * @param props Component props.
 */
export function ColorControl({
    label,
    defaultValue = "#ffffff",
    onChange,
}: Props): JSX.Element {
    return (
        <div className="control">
            <label htmlFor="">{label}</label>
            <Input
                // Text input to avoid selection arrows on number input.
                inputType="color"
                defaultValue={defaultValue.toString()}
                onUpdate={(value) => onChange?.(value)}
            />
        </div>
    );
}
