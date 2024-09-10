import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideGlobe - `globe`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideGlobe component
 *
 * @example
 * <LucideGlobe color="purple" size={87} />
 *
 * @see https://lucide.dev/icons/globe
 */
const LucideGlobe: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-globe${className ? ` ${className}` : ""}`} ref={ref}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
));

LucideGlobe.displayName = "LucideGlobe";

export default LucideGlobe;
