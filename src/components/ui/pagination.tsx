import * as React from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Pagination = ({
    className,
    ...props
}: React.ComponentProps<"nav"> & {
    className?: string;
}) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul"> & { className?: string }
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
    />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li"> & { className?: string }
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<ButtonProps, "size"> &
    React.ComponentProps<typeof Link>;

const PaginationLink = ({
    className,
    isActive,
    size = "icon",
    ...props
}: PaginationLinkProps) => (
    <Link
        aria-current={isActive ? "page" : undefined}
        className={cn(
            buttonVariants({
                variant: isActive ? "outline" : "ghost",
                size,
            }),
            "min-w-9",
            className
        )}
        {...props}
    />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink> & {
    className?: string;
}) => (
    <PaginationLink
        aria-label="Go to previous page"
        size="default"
        className={cn("gap-1 pl-2.5", className)}
        {...props}
    >
        <ChevronLeftIcon className="h-4 w-4" />
        <span>Previous</span>
    </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink> & {
    className?: string;
}) => (
    <PaginationLink
        aria-label="Go to next page"
        size="default"
        className={cn("gap-1 pr-2.5", className)}
        {...props}
    >
        <span>Next</span>
        <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span"> & {
    className?: string;
}) => (
    <span
        aria-hidden
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}
    >
        <DotsHorizontalIcon className="h-4 w-4" />
        <span className="sr-only">More pages</span>
    </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
};

export type PagedProps = {
    page: number;
    total: number;
    limit?: number;
    fromLimit?: boolean;
    // eslint-disable-next-line no-unused-vars
    href: (page: number) => string;
};

export default function Paged({ page, total, href, limit }: PagedProps) {
    if (limit) {
        total = Math.ceil(total / limit);
        page = Math.ceil(page / limit);
    }

    const pages = Array.from({ length: total }, (_, i) => i + 1);

    if (pages.length < 2) {
        return null;
    }

    return (
        <Pagination>
            <PaginationPrevious href={page === 1 ? href(1) : href(page - 1)} />
            <PaginationContent>
                {pages.map((p) => {
                    if (p === 1 || p === total || Math.abs(p - page) < 3) {
                        return (
                            <PaginationItem key={p}>
                                <PaginationLink
                                    isActive={p === page}
                                    href={href(p)}
                                >
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    } else if (Math.abs(p - page) === 3) {
                        return (
                            <PaginationItem key={p}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }
                })}
            </PaginationContent>
            <PaginationNext
                href={page === total ? href(total) : href(page + 1)}
            />
        </Pagination>
    );
}
