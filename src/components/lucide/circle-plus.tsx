import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideCirclePlus - `circle-plus`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideCirclePlus component
 *
 * @example
 * <LucideCirclePlus color="green" size={63} />
 *
 * @see https://lucide.dev/icons/circle-plus
 */
const LucideCirclePlus: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-circle-plus${className ? ` ${className}` : ""}`} ref={ref}><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
));

LucideCirclePlus.displayName = "LucideCirclePlus";

export default LucideCirclePlus;
