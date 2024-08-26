import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideMinimize2 - `minimize-2`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideMinimize2 component
 *
 * @example
 * <LucideMinimize2 color="purple" size={31} />
 *
 * @see https://lucide.dev/icons/minimize-2
 */
const LucideMinimize2: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-minimize-2 ${className ? className : ""}`} ref={ref}><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" x2="21" y1="10" y2="3" /><line x1="3" x2="10" y1="21" y2="14" /></svg>
));

export default LucideMinimize2;
