import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideClock - `clock`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideClock component
 *
 * @example
 * <LucideClock color="green" size={90} />
 *
 * @see https://lucide.dev/icons/clock
 */
const LucideClock: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-clock${className ? ` ${className}` : ""}`} ref={ref}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
));

LucideClock.displayName = "LucideClock";

export default LucideClock;
