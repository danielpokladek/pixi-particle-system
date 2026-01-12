import { Input } from "../base/Input";

type Props = {
    label: string;
    defaultValue?: number;
    disabled?: boolean;
    onChange?: (value: number) => void;
};

/**
 * Number control with label.
 * @param props Component props.
 */
export function NumberControl({
    label,
    onChange,
    defaultValue = 1,
    disabled = false,
}: Props): JSX.Element {
    return (
        <div className="control">
            <label htmlFor="">{label}</label>
            <Input
                // Text input to avoid selection arrows on number input.
                disabled={disabled}
                inputType="text"
                defaultValue={defaultValue.toString()}
                onUpdate={(value) => onChange?.(Number(value))}
            />
        </div>
    );
}
