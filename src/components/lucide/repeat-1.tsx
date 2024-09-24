import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideRepeat1 - `repeat-1`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideRepeat1 component
 *
 * @example
 * <LucideRepeat1 color="yellow" size={51} />
 *
 * @see https://lucide.dev/icons/repeat-1
 */
const LucideRepeat1: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-repeat-1${className ? ` ${className}` : ""}`} ref={ref}><path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /><path d="M11 10h1v4" /></svg>
));

LucideRepeat1.displayName = "LucideRepeat1";

export default LucideRepeat1;
