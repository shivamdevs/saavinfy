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
