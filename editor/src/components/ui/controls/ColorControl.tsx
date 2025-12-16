import { Input } from "../base/Input";

type Props = {
    label: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
};

export function ColorControl({
    label,
    defaultValue = "#ffffff",
    onChange,
}: Props) {
    return (
        <div className="control">
            <label htmlFor="">{label}</label>
            <Input
                // Text input to avoid selection arrows on number input.
                inputType="color"
                defaultValue={defaultValue.toString()}
                onChange={(value) => onChange?.(value)}
            />
        </div>
    );
}
