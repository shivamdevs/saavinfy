import { cn } from "@/lib/utils";
import React from "react";

export type RoundButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: number;
};

function RoundButton({
    className,
    size = 24,
    style,
    ...props
}: RoundButtonProps) {
    return (
        <button
            className={cn(
                "rounded-full p-2 transition-all",
                "[&:not(:disabled)]:hover:bg-accent flex-center",
                {
                    "cursor-pointer": !props.disabled,
                    "cursor-default text-secondary-foreground/30":
                        props.disabled,
                },
                className
            )}
            style={{
                width: size,
                height: size,
                ...(style ?? {}),
            }}
            {...props}
        />
    );
}

export default RoundButton;
