import { useRef } from "react";

type Props = {
    label: string;
    defaultValue?: boolean;
    onChange?: (value: boolean) => void;
};

/**
 * Toggle control with label.
 * @param props Component props.
 */
export function Toggle({
    label,
    defaultValue = false,
    onChange,
}: Props): JSX.Element {
    const lastValueRef = useRef<boolean>(defaultValue);

    return (
        <div className="control">
            <label htmlFor="">{label}</label>
            <input
                type="checkbox"
                role="switch"
                checked={defaultValue}
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
