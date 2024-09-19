"use client";

import { LinkProps } from "@/types/link";
import React from "react";
import { Button, ButtonProps } from "../ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export type ContinueButtonProps = LinkProps & {
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
    strict?: boolean;
    noContinue?: boolean;
    asAnchor?: boolean;
};

export default function ContinueButton({
    variant,
    size,
    href,
    strict,
    noContinue,
    asAnchor,
    ...props
}: ContinueButtonProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const queryContinue = searchParams.get("continue");

    let continuePath = `${pathname}${searchParams.toString()}`;

    if (queryContinue && !strict) {
        continuePath = queryContinue;
    }

    try {
        const urlHref = new URL(href);
        if (!noContinue) {
            urlHref.searchParams.set("continue", continuePath);
        }
        href = urlHref.toString();
    } catch (error) {
        href = `${href}${
            !noContinue
                ? `${href.includes("?") ? "&" : "?"}continue=${encodeURIComponent(continuePath)}`
                : ""
        }`;
    }

    const Tag = asAnchor ? `a` : Link;

    return (
        <Button variant={variant} size={size} asChild>
            <Tag href={href} {...props} />
        </Button>
    );
}
