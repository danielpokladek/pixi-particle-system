type Props = {
    label: string;
    defaultValue: string;
    options: { label: string; key: string }[];
    onChange?: (value: string) => void;
};

/**
 * Select control with label.
 * @param props Component props.
 */
export function Select({
    label,
    defaultValue,
    options,
    onChange,
}: Props): JSX.Element {
    return (
        <div className="control">
            <label htmlFor="">{label}</label>
            <select
                required
                defaultValue={defaultValue}
                onChange={(e) => onChange?.(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option.key} value={option.key}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
