import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideListMinus - `list-minus`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideListMinus component
 *
 * @example
 * <LucideListMinus color="red" size={77} />
 *
 * @see https://lucide.dev/icons/list-minus
 */
const LucideListMinus: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-list-minus ${className ? className : ""}`} ref={ref}><path d="M11 12H3" /><path d="M16 6H3" /><path d="M16 18H3" /><path d="M21 12h-6" /></svg>
));

export default LucideListMinus;
