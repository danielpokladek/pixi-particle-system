import { useRef } from "react";

type Props = {
    inputType: "text" | "number" | "color";
    defaultValue?: string;
    onChange?: (value: string) => void;
};

export function Input({ defaultValue = "1", onChange, inputType }: Props) {
    const lastValueRef = useRef<string>(defaultValue);

    return (
        <input
            type={inputType}
            defaultValue={defaultValue}
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
