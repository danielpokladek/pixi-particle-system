import { useRef } from "react";

type Props = {
    label: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
};

export function ColorInput({
    label,
    defaultValue = "#ffffff",
    onChange,
}: Props) {
    const lastValueRef = useRef<string>(defaultValue);

    return (
        <div className="control">
            <label htmlFor="">{label}</label>
            <input
                type="color"
                defaultValue={defaultValue}
                onBlur={(e) => {
                    const newValue = e.currentTarget.value;
                    if (newValue === lastValueRef.current) return;

                    onChange?.(e.target.value);
                    lastValueRef.current = newValue;
                }}
                onKeyDown={(e) => {
                    if (e.key !== "Enter") return;

                    const newValue = e.currentTarget.value;
                    if (newValue === lastValueRef.current) return;

                    onChange?.(e.currentTarget.value);
                    lastValueRef.current = newValue;
                }}
            />
        </div>
    );
}
