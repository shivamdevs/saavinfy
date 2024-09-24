import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideLibrary - `library`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideLibrary component
 *
 * @example
 * <LucideLibrary color="blue" size={86} />
 *
 * @see https://lucide.dev/icons/library
 */
const LucideLibrary: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-library${className ? ` ${className}` : ""}`} ref={ref}><path d="m16 6 4 14" /><path d="M12 6v14" /><path d="M8 8v12" /><path d="M4 4v16" /></svg>
));

LucideLibrary.displayName = "LucideLibrary";

export default LucideLibrary;
