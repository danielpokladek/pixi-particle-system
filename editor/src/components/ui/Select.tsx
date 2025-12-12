type Props = {
    label: string;
    options: { label: string; key: string; selected?: true }[];
    onChange?: (value: boolean) => void;
};

export function Select({ label, options, onChange }: Props) {
    return (
        <div className="control">
            <label htmlFor="">{label}</label>
            <select
                required
                onChange={(e) => onChange?.(Boolean(e.target.value))}
            >
                {options.map((option) => (
                    <option key={option.key}>{option.label}</option>
                ))}
            </select>
        </div>
    );
}
