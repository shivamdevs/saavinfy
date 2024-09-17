export function generateRandomColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

export default function getRandomContrastColor(
    textColor: string = "#ffffff"
): string {
    let bgColor = generateRandomColor();

    while (
        calculateBrightness(bgColor) > 200 ||
        calculateContrast(bgColor, textColor) < 4.5
    ) {
        bgColor = generateRandomColor();
    }

    return bgColor;
}

export function calculateBrightness(hexColor: string): number {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    return (r * 299 + g * 587 + b * 114) / 1000;
}

export function calculateContrast(color1: string, color2: string): number {
    const luminance1 = calculateLuminance(color1);
    const luminance2 = calculateLuminance(color2);

    return (
        (Math.max(luminance1, luminance2) + 0.05) /
        (Math.min(luminance1, luminance2) + 0.05)
    );
}

export function calculateLuminance(hexColor: string): number {
    const r = parseInt(hexColor.slice(1, 3), 16) / 255;
    const g = parseInt(hexColor.slice(3, 5), 16) / 255;
    const b = parseInt(hexColor.slice(5, 7), 16) / 255;

    const gammaCorrectedR =
        r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gammaCorrectedG =
        g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const gammaCorrectedB =
        b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    return (
        0.2126 * gammaCorrectedR +
        0.7152 * gammaCorrectedG +
        0.0722 * gammaCorrectedB
    );
}

export class GradientColors {
    private static readonly MIN_BRIGHTNESS = 0.3; // Minimum brightness threshold
    private static readonly MAX_BRIGHTNESS = 0.7; // Maximum brightness threshold
    private static readonly HUE_DIFF_THRESHOLD = 30; // Minimum hue difference to ensure gradient compatibility

    private static hash(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }

        return Math.abs(hash);
    }

    private static rgbToHex(r: number, g: number, b: number): string {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }

    private static hexToRgb(hex: string): { r: number; g: number; b: number } {
        const bigint = parseInt(hex.slice(1), 16);

        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255,
        };
    }

    private static calculateBrightness(
        r: number,
        g: number,
        b: number
    ): number {
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }

    private static adjustBrightness(
        r: number,
        g: number,
        b: number
    ): { r: number; g: number; b: number } {
        const brightness = this.calculateBrightness(r, g, b);

        if (brightness < this.MIN_BRIGHTNESS) {
            const factor = this.MIN_BRIGHTNESS / brightness;

            return {
                r: Math.min(255, Math.round(r * factor)),
                g: Math.min(255, Math.round(g * factor)),
                b: Math.min(255, Math.round(b * factor)),
            };
        } else if (brightness > this.MAX_BRIGHTNESS) {
            const factor = this.MAX_BRIGHTNESS / brightness;

            return {
                r: Math.max(0, Math.round(r * factor)),
                g: Math.max(0, Math.round(g * factor)),
                b: Math.max(0, Math.round(b * factor)),
            };
        }

        return { r, g, b };
    }

    private static colorToHsl(
        r: number,
        g: number,
        b: number
    ): { h: number; s: number; l: number } {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const l = (max + min) / 2;
        let h = 0,
            s = 0;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return { h: h * 360, s: s * 100, l: l * 100 };
    }

    private static hslToRgb(
        h: number,
        s: number,
        l: number
    ): { r: number; g: number; b: number } {
        s /= 100;
        l /= 100;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;

        let r = 0,
            g = 0,
            b = 0;
        if (h < 60) {
            r = c;
            g = x;
        } else if (h < 120) {
            r = x;
            g = c;
        } else if (h < 180) {
            g = c;
            b = x;
        } else if (h < 240) {
            g = x;
            b = c;
        } else if (h < 300) {
            r = x;
            b = c;
        } else {
            r = c;
            b = x;
        }

        return {
            r: Math.round((r + m) * 255),
            g: Math.round((g + m) * 255),
            b: Math.round((b + m) * 255),
        };
    }

    private static adjustHue(color: string, degrees: number): string {
        const { r, g, b } = this.hexToRgb(color);
        const { h, s, l } = this.colorToHsl(r, g, b);
        const adjustedH = (h + degrees) % 360;

        const rgb = this.hslToRgb(adjustedH, s, l);

        return this.rgbToHex(rgb.r, rgb.g, rgb.b);
    }

    public static from(id: string): [string, string] {
        const hashValue = this.hash(id);

        const color1Value = hashValue & 0xffffff;
        const color2Value = (hashValue >> 24) & 0xffffff;

        let color1 = this.rgbToHex(
            (color1Value >> 16) & 255,
            (color1Value >> 8) & 255,
            color1Value & 255
        );

        let color2 = this.rgbToHex(
            (color2Value >> 16) & 255,
            (color2Value >> 8) & 255,
            color2Value & 255
        );

        const hsl1 = this.colorToHsl(
            (color1Value >> 16) & 255,
            (color1Value >> 8) & 255,
            color1Value & 255
        );
        const hsl2 = this.colorToHsl(
            (color2Value >> 16) & 255,
            (color2Value >> 8) & 255,
            color2Value & 255
        );

        const hueDifference = Math.abs(hsl1.h - hsl2.h);
        if (hueDifference < this.HUE_DIFF_THRESHOLD) {
            color2 = this.adjustHue(color2, this.HUE_DIFF_THRESHOLD);
        }

        const { r: r1, g: g1, b: b1 } = this.hexToRgb(color1);
        const { r: r2, g: g2, b: b2 } = this.hexToRgb(color2);

        const ab1 = this.adjustBrightness(r1, g1, b1);
        const ab2 = this.adjustBrightness(r2, g2, b2);

        color1 = this.rgbToHex(ab1.r, ab1.g, ab1.b);
        color2 = this.rgbToHex(ab2.r, ab2.g, ab2.b);

        return [color1, color2];
    }
}
