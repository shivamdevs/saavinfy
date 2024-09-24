"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Button } from "./button";
import Lucide from "../lucide";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

        return (
            <fieldset className="flex flex-col gap-3 relative">
                {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
                <div className="relative">
                    <input
                        type={
                            type === "password" && isPasswordVisible
                                ? "text"
                                : type
                        }
                        className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                            { "pr-10": type === "password" },
                            className
                        )}
                        ref={ref}
                        name={props.id}
                        {...props}
                    />
                    {type === "password" && (
                        <Button
                            size="icon"
                            variant="ghost"
                            type="button"
                            className={cn(
                                "absolute top-1/2 right-0 transform -translate-y-1/2",
                                {
                                    "!text-primary": isPasswordVisible,
                                }
                            )}
                            onClick={() =>
                                setIsPasswordVisible(!isPasswordVisible)
                            }
                        >
                            {isPasswordVisible ? (
                                <Lucide.EyeOff size={16} />
                            ) : (
                                <Lucide.Eye size={16} />
                            )}
                        </Button>
                    )}
                </div>
            </fieldset>
        );
    }
);
Input.displayName = "Input";

export { Input };
