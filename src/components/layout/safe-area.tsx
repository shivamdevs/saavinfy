import { cn } from "@/lib/utils";
import React from "react";

function SafeArea({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("mt-16", className)} {...props} />;
}

export default SafeArea;
