import React from "react";
import { FastAverageColor, FastAverageColorResult } from "fast-average-color";
import { MediaImage } from "@/types/media";
import getRandomContrastColor from "@/lib/colors";

export type ColorsHook = {
    background: string;
    isDark: boolean;
    result?: FastAverageColorResult;
};

export default function useColors(image?: MediaImage[] | string): ColorsHook {
    const [color, setColor] = React.useState<ColorsHook>({
        background: "",
        isDark: false,
    });

    React.useLayoutEffect(() => {
        if (image) {
            const source = Array.isArray(image) ? image.at(-1)?.url : image;
            if (source) {
                const fac = new FastAverageColor();

                fac.getColorAsync(source, { algorithm: "simple" })
                    .then((color) => {
                        setColor({
                            result: color,
                            background: color.hexa,
                            isDark: color.isDark,
                        });
                    })
                    .catch((e) => {
                        console.error(e);
                        setColor({
                            background: getRandomContrastColor(),
                            isDark: false,
                        });
                    })
                    .finally(() => {
                        fac.destroy();
                    });
            }
        }
    }, [image]);

    return color;
}
