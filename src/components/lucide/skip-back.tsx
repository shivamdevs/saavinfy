import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideSkipBack - `skip-back`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideSkipBack component
 *
 * @example
 * <LucideSkipBack color="green" size={86} />
 *
 * @see https://lucide.dev/icons/skip-back
 */
const LucideSkipBack: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-skip-back${className ? ` ${className}` : ""}`} ref={ref}><polygon points="19 20 9 12 19 4 19 20" /><line x1="5" x2="5" y1="19" y2="5" /></svg>
));

LucideSkipBack.displayName = "LucideSkipBack";

export default LucideSkipBack;
