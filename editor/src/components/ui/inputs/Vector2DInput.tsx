import { useRef } from "react";

type Props = {
    label: string;
    xDefault?: number;
    yDefault?: number;
    onChange?: (xValue: number, yValue: number) => void;
};

export function Vector2DInput({
    label,
    xDefault = 0,
    yDefault = 0,
    onChange,
}: Props) {
    const xValueRef = useRef<number>(xDefault);
    const yValueRef = useRef<number>(yDefault);

    return (
        <div className="control">
            <label htmlFor="">{label}</label>
            <div role="group" style={{ width: "50%" }}>
                <input
                    defaultValue={xDefault}
                    onBlur={(e) => {
                        const newValue = Number(e.currentTarget.value);
                        if (newValue === xValueRef.current) return;

                        xValueRef.current = newValue;
                        onChange?.(xValueRef.current, yValueRef.current);
                    }}
                    onKeyDown={(e) => {
                        if (e.key !== "Enter") return;

                        const newValue = Number(e.currentTarget.value);
                        if (newValue === yValueRef.current) return;

                        xValueRef.current = newValue;
                        onChange?.(xValueRef.current, yValueRef.current);
                    }}
                />
                <input
                    defaultValue={yDefault}
                    onBlur={(e) => {
                        const newValue = Number(e.currentTarget.value);
                        if (newValue === yValueRef.current) return;

                        yValueRef.current = newValue;
                        onChange?.(xValueRef.current, yValueRef.current);
                    }}
                    onKeyDown={(e) => {
                        if (e.key !== "Enter") return;

                        const newValue = Number(e.currentTarget.value);
                        if (newValue === yValueRef.current) return;

                        yValueRef.current = newValue;
                        onChange?.(xValueRef.current, yValueRef.current);
                    }}
                />
            </div>
        </div>
    );
}
