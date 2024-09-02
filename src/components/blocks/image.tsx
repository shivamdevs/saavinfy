import React, { useMemo } from "react";
import BlurFade from "../magicui/blur-fade";
import Image from "next/image";
import { MediaImage } from "@/types/media";
import { cn } from "@/lib/utils";

export type BlockImageProps = React.PropsWithChildren<{
    src?: string | MediaImage | MediaImage[];
    alt?: string;

    size?: number;
    className?: string;
    show?: boolean;
}>;

export default function BlockImage({
    src,
    alt,
    show = false,
    size = 24,
    children,
    className,
}: BlockImageProps) {
    const img = useMemo(() => {
        let img = Array.isArray(src) ? src.at(-1) : src;

        if (typeof img === "object") {
            img = img.url;
        }

        if (!img) {
            img = "/images/tone.svg";
        }

        return img;
    }, [src]);

    return (
        <div
            className={cn("flex-center relative rounded-lg", className)}
            style={{
                width: size,
                height: size,
            }}
        >
            <span
                className={cn(
                    "absolute inset-0 animate-pulse bg-secondary/50 rounded-lg duration-1000",
                    className
                )}
            />
            <BlurFade
                delay={0}
                inView={!show}
                yOffset={0}
                className="w-full h-full"
            >
                <Image
                    src={img}
                    alt={alt ?? "Image"}
                    width={size}
                    height={size}
                    className={cn(
                        "object-cover absolute inset-0 rounded-lg overflow-hidden",
                        className
                    )}
                    draggable={false}
                />
            </BlurFade>
            {children}
        </div>
    );
}
