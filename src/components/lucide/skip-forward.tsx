import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideSkipForward - `skip-forward`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideSkipForward component
 *
 * @example
 * <LucideSkipForward color="red" size={21} />
 *
 * @see https://lucide.dev/icons/skip-forward
 */
const LucideSkipForward: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-skip-forward${className ? ` ${className}` : ""}`} ref={ref}><polygon points="5 4 15 12 5 20 5 4" /><line x1="19" x2="19" y1="5" y2="19" /></svg>
));

LucideSkipForward.displayName = "LucideSkipForward";

export default LucideSkipForward;
