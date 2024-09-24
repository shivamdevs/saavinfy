// eslint-disable-next-line camelcase
import { Edu_VIC_WA_NT_Beginner, Inter, Sono } from "next/font/google";

const text = Inter({
    subsets: ["latin"],
    variable: "--font-text",
    preload: true,
    display: "swap",
    fallback: ["sans-serif"],
});
const brand = Edu_VIC_WA_NT_Beginner({
    subsets: ["latin"],
    variable: "--font-brand",
    weight: ["600"],
    style: ["normal"],
    preload: true,
    display: "swap",
    fallback: ["sans-serif"],
});

const mono = Sono({
    subsets: ["latin"],
    variable: "--font-mono",
    style: ["normal"],
    preload: true,
    display: "swap",

    // fallback: ["monospace"],
});

const Fonts = {
    text,
    brand,
    mono,
};

export default Fonts;
