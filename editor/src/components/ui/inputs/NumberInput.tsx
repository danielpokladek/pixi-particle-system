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
                inputType="text"
                defaultValue={defaultValue}
                onChange={onChange}
            />
        </div>
    );
}
