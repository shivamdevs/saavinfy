import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideRotateCcw - `rotate-ccw`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideRotateCcw component
 *
 * @example
 * <LucideRotateCcw color="yellow" size={26} />
 *
 * @see https://lucide.dev/icons/rotate-ccw
 */
const LucideRotateCcw: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-rotate-ccw${className ? ` ${className}` : ""}`} ref={ref}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
));

LucideRotateCcw.displayName = "LucideRotateCcw";

export default LucideRotateCcw;
