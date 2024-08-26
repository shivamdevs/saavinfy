import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucidePause - `pause`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucidePause component
 *
 * @example
 * <LucidePause color="yellow" size={87} />
 *
 * @see https://lucide.dev/icons/pause
 */
const LucidePause: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-pause${className ? ` ${className}` : ""}`} ref={ref}><rect x="14" y="4" width="4" height="16" rx="1" /><rect x="6" y="4" width="4" height="16" rx="1" /></svg>
));

LucidePause.displayName = "LucidePause";

export default LucidePause;
