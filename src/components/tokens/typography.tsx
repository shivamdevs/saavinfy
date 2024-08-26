import Fonts from "@/fonts";
import { cn, formatSeconds } from "@/lib/utils";
import React from "react";

export type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
	variant?: "body" | "caption" | "subtitle" | "title" | "heading";
};

export function Text({ variant = "body", className, ...props }: TextProps) {
	return <p className={cn(`text-${variant}`, className)} {...props} />;
}

export type MonoSpanProps = React.HTMLAttributes<HTMLSpanElement>;

export function MonoSpan({ className, ...props }: MonoSpanProps) {
	return (
		<span
			className={cn(
				Fonts.mono.className,
				"text-secondary-foreground font-medium",
				className
			)}
			{...props}
		/>
	);
}

export type TimeSpanProps = MonoSpanProps & {
	time: number;
};

export function TimeSpan({ className, time, ...props }: TimeSpanProps) {
	return (
		<MonoSpan className={cn("text-sm", className)} {...props}>
			{formatSeconds(time)}
		</MonoSpan>
	);
}

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
	level: 1 | 2 | 3 | 4 | 5 | 6;
};

export function Heading({ level, ...props }: HeadingProps) {
	const Tag =
		`h${level}` as keyof React.JSX.IntrinsicElements as React.ElementType;
	return <Tag {...props} />;
}
