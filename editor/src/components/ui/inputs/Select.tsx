type Props = {
    label: string;
    defaultValue: string;
    options: { label: string; key: string }[];
    onChange?: (value: string) => void;
};

export function Select({ label, defaultValue, options, onChange }: Props) {
    return (
        <div className="control">
            <label htmlFor="">{label}</label>
            <select
                required
                defaultValue={defaultValue}
                onChange={(e) => onChange?.(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option.key}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}
