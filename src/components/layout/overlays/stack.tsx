"use client";

import React from "react";
import OverlayHeader from "./_header";
import OverlayContent from "./_content";
import { Button } from "@/components/ui/button";
import Lucide from "@/components/lucide";
import Tippy from "@/components/ui/tooltip";
import useStack from "@/contexts/stack";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import useAgo from "@/contexts/hooks/use-ago";
import { StackItem } from "@/types/stack";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function OverlayStack() {
    const stack = useStack();

    return (
        <>
            <OverlayHeader title="Notifications">
                {stack.stack.length > 0 && (
                    <Tippy content="Clear notifications">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                                stack.setStack([]);
                            }}
                        >
                            <Lucide.ListX size={18} />
                        </Button>
                    </Tippy>
                )}
            </OverlayHeader>
            <OverlayContent>
                {stack.stack.map(({ key, ...item }, index) => (
                    <StackCard
                        key={item.id}
                        {...item}
                        index={index}
                        _key={key}
                    />
                ))}
                {stack.stack.length === 0 && (
                    <div className="flex-center flex-col pt-40 gap-10">
                        <Image
                            src="/images/bell.svg"
                            alt="No notifications"
                            width={80}
                            height={80}
                        />
                        <div className="text-center text-gray-500 font-semibold">
                            No notifications
                        </div>
                    </div>
                )}
            </OverlayContent>
        </>
    );
}

function StackCard({
    id,
    message,
    type,
    details,
    time,
    history,
    index,
}: StackItem & { _key: string; index: number }) {
    const ago = useAgo();

    const Icon =
        type === "warning"
            ? Lucide.TriangleAlert
            : type === "error"
              ? Lucide.CircleX
              : type === "success"
                ? Lucide.BadgeCheck
                : type === "loading"
                  ? Lucide.LoaderCircle
                  : Lucide.Info;

    return (
        <div id={`stack-${id}`}>
            {index !== 0 && <Separator className="my-1" />}
            <div className="flex p-2 items-start gap-2">
                <span className="inline-block pt-1.5">
                    <Icon
                        size={16}
                        className={cn("", {
                            "text-yellow-500": type === "warning",
                            "text-red-600": type === "error",
                            "text-green-600": type === "success",
                            "text-secondary-foreground animate-spin":
                                type === "loading",
                            "text-blue-500": type === "info",
                        })}
                    />
                </span>
                <div className="flex flex-col flex-1 gap-1">
                    <div className="w-full">
                        <span className="text-xs text-gray-500 float-right ml-2 my-2">
                            {ago(time)}
                        </span>
                        <span className="text-sm inline-flex items-center">
                            {history.length > 0 && (
                                <Badge
                                    variant="secondary"
                                    className="mr-2 rounded-full text-xs"
                                >
                                    {history.length + 1}
                                </Badge>
                            )}
                            {message}
                        </span>
                    </div>
                    <div className="text-xs">{details}</div>
                </div>
            </div>
        </div>
    );
}
