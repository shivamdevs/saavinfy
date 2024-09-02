import React from "react";

export interface InputRangeProps {
    min?: number | null;
    max?: number | null;
    value?: number | null;
    disabled?: boolean;
    divisor?: number;
    onChange?: // eslint-disable-next-line no-unused-vars
    ((val: number, eve: React.ChangeEvent<HTMLInputElement>) => void) | null;
    // eslint-disable-next-line no-unused-vars
    onMouseDown?: ((eve: React.MouseEvent<HTMLInputElement>) => void) | null;
}

function InputRange({
    min = 0,
    max = 10,
    value = 0,
    disabled = false,
    onChange = null,
    divisor = 1000,
    onMouseDown = null,
}: InputRangeProps) {
    // const {
    //     state: {
    //         option: { expand },
    //     },
    // } = usePlayerContext();

    max = max || 0;
    min = min || 0;
    value = value || 0;

    const step = (max - min) / (divisor || 1000) || 1;

    return (
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            disabled={disabled || false}
            value={value}
            style={
                {
                    "--range": `${(((value - min) / (max - min)) * 100 || 0).toFixed(1)}%`,
                } as React.CSSProperties
            }
            onChange={(eve: React.ChangeEvent<HTMLInputElement>) =>
                onChange?.(parseFloat(eve.target.value) || 0, eve)
            }
            onMouseDown={(eve: React.MouseEvent<HTMLInputElement>) =>
                onMouseDown?.(eve)
            }
        />
    );
}

export default InputRange;
