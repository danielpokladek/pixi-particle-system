import { useRef } from "react";

type Props = {
    label: string;
    defaultValue?: boolean;
    onChange?: (value: boolean) => void;
};

export function Toggle({ label, defaultValue = false, onChange }: Props) {
    const lastValueRef = useRef<boolean>(defaultValue);

    return (
        <div className="control">
            <label htmlFor="">{label}</label>
            <input
                type="checkbox"
                role="switch"
                // defaultValue={defaultValue}
                onChange={(e) => {
                    const newValue = Boolean(e.currentTarget.checked);
                    if (newValue === lastValueRef.current) return;

                    onChange?.(Boolean(e.target.checked));
                    lastValueRef.current = newValue;
                }}
            />
        </div>
    );
}
