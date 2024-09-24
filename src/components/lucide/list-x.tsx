import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideListX - `list-x`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideListX component
 *
 * @example
 * <LucideListX color="blue" size={14} />
 *
 * @see https://lucide.dev/icons/list-x
 */
const LucideListX: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-list-x${className ? ` ${className}` : ""}`} ref={ref}><path d="M11 12H3" /><path d="M16 6H3" /><path d="M16 18H3" /><path d="m19 10-4 4" /><path d="m15 10 4 4" /></svg>
));

LucideListX.displayName = "LucideListX";

export default LucideListX;
