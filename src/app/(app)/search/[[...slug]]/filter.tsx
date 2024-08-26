import { cn, getSearchFilter } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export type TypeButtonProps = {
	name: string;
	type: string;
	value: string;
	query: string;
};

export default function FilterButton({
	name,
	type,
	value,
	query,
}: TypeButtonProps) {
	const currentType = getSearchFilter(type);

	return (
		<Link
			href={`/search/${query}${value}`}
			type="button"
			className={cn(
				"border border-accent px-8 py-2",
				"rounded-full hover:bg-accent transition-all",
				{
					"bg-secondary border-secondary-foreground":
						value === currentType,
				}
			)}
		>
			{name}
		</Link>
	);
}
