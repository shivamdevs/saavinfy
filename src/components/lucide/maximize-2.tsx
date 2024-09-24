import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideMaximize2 - `maximize-2`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideMaximize2 component
 *
 * @example
 * <LucideMaximize2 color="purple" size={52} />
 *
 * @see https://lucide.dev/icons/maximize-2
 */
const LucideMaximize2: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-maximize-2${className ? ` ${className}` : ""}`} ref={ref}><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" x2="14" y1="3" y2="10" /><line x1="3" x2="10" y1="21" y2="14" /></svg>
));

LucideMaximize2.displayName = "LucideMaximize2";

export default LucideMaximize2;
