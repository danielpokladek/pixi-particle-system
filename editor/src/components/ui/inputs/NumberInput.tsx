import { Input } from "../base/Input";

type Props = {
    label: string;
    defaultValue?: number;
    onChange?: (value: number) => void;
};

export function NumberInput({ label, defaultValue = 1, onChange }: Props) {
    return (
        <div className="control">
            <label htmlFor="">{label}</label>
            <Input
                // Text input to avoid selection arrows on number input.
                inputType="text"
                defaultValue={defaultValue}
                onChange={onChange}
            />
        </div>
    );
}
