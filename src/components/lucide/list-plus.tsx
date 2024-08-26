import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideListPlus - `list-plus`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideListPlus component
 *
 * @example
 * <LucideListPlus color="orange" size={58} />
 *
 * @see https://lucide.dev/icons/list-plus
 */
const LucideListPlus: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-list-plus ${className ? className : ""}`} ref={ref}><path d="M11 12H3" /><path d="M16 6H3" /><path d="M16 18H3" /><path d="M18 9v6" /><path d="M21 12h-6" /></svg>
));

export default LucideListPlus;
