import { useRef } from "react";

type Props = {
    inputType: "text" | "number" | "color" | "range";
    defaultValue: string;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (value: string) => void;
};

export function Input({
    onChange,
    inputType,
    defaultValue,
    disabled,
    min,
    max,
    step,
}: Props) {
    const lastValueRef = useRef<string>(defaultValue);

    return (
        <input
            type={inputType}
            defaultValue={defaultValue}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            onBlur={(e) => {
                const newValue = e.currentTarget.value;
                if (newValue === lastValueRef.current) return;

                onChange?.(newValue);
                lastValueRef.current = newValue;
            }}
            onKeyDown={(e) => {
                if (e.key !== "Enter") return;

                const newValue = e.currentTarget.value;
                if (newValue === lastValueRef.current) return;

                onChange?.(newValue);
                lastValueRef.current = newValue;
            }}
        />
    );
}
