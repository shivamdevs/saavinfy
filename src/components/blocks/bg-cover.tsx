"use client";

import { cn, getBase64Image } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export type BackgroundCoverProps = React.HTMLAttributes<HTMLDivElement> & {
    src?: string;
    style?: React.CSSProperties;
};

export default function BackgroundCover({
    src,
    style,
    className,
    ...props
}: BackgroundCoverProps) {
    const [image, setImage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setImage("");
        setLoading(true);

        if (src) {
            const img = new Image();

            img.onload = () => {
                setImage(getBase64Image(img));
            };

            img.src = src;
        } else {
            setImage("");
            setLoading(false);
        }
    }, [src]);

    return (
        <div
            style={
                {
                    backgroundImage: `url(${image})`,
                    ...(style ?? {}),
                } as React.CSSProperties
            }
            className={cn(
                "bg-fixed bg-cover bg-center transition-all opacity-0",
                !loading && "opacity-100",
                className
            )}
            {...props}
        />
    );
}
