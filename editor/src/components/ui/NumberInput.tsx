import { useRef } from "react";

type Props = {
    label: string;
    defaultValue?: number;
    onChange?: (value: number) => void;
};

export function NumberInput({ label, defaultValue = 1, onChange }: Props) {
    const lastValueRef = useRef<number>(defaultValue);

    return (
        <div className="control">
            <label htmlFor="">{label}</label>
            <input
                type="number"
                defaultValue={defaultValue}
                onBlur={(e) => {
                    const newValue = Number(e.currentTarget.value);
                    if (newValue === lastValueRef.current) return;

                    onChange?.(Number(e.target.value));
                    lastValueRef.current = newValue;
                }}
                onKeyDown={(e) => {
                    if (e.key !== "Enter") return;

                    const newValue = Number(e.currentTarget.value);
                    if (newValue === lastValueRef.current) return;

                    onChange?.(Number(e.currentTarget.value));
                    lastValueRef.current = newValue;
                }}
            />
        </div>
    );
}
