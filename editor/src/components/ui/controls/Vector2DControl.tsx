import { useRef } from "react";
import { Input } from "../base/Input";

type Props = {
    label: string;
    xDefault?: number;
    yDefault?: number;
    onChange?: (xValue: number, yValue: number) => void;
};

/**
 * Vector2D control with label.
 * @param props Component props.
 */
export function Vector2DControl({
    label,
    xDefault = 0,
    yDefault = 0,
    onChange,
}: Props): JSX.Element {
    const xValueRef = useRef<number>(xDefault);
    const yValueRef = useRef<number>(yDefault);

    return (
        <div className="control">
            <label htmlFor="">{label}</label>
            <div role="group" style={{ width: "50%" }}>
                <Input
                    inputType="text"
                    defaultValue={xDefault.toString()}
                    onChange={(value) => {
                        const newValue = Number(value);

                        if (newValue === xValueRef.current) return;

                        xValueRef.current = newValue;
                        onChange?.(xValueRef.current, yValueRef.current);
                    }}
                />
                <Input
                    inputType="text"
                    defaultValue={yDefault.toString()}
                    onChange={(value) => {
                        const newValue = Number(value);

                        if (newValue === yValueRef.current) return;

                        yValueRef.current = newValue;
                        onChange?.(xValueRef.current, yValueRef.current);
                    }}
                />
            </div>
        </div>
    );
}
