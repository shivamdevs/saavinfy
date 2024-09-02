import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideDisc3 - `disc-3`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideDisc3 component
 *
 * @example
 * <LucideDisc3 color="blue" size={65} />
 *
 * @see https://lucide.dev/icons/disc-3
 */
const LucideDisc3: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-disc-3${className ? ` ${className}` : ""}`} ref={ref}><circle cx="12" cy="12" r="10" /><path d="M6 12c0-1.7.7-3.2 1.8-4.2" /><circle cx="12" cy="12" r="2" /><path d="M18 12c0 1.7-.7 3.2-1.8 4.2" /></svg>
));

LucideDisc3.displayName = "LucideDisc3";

export default LucideDisc3;
