import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideSearch - `search`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideSearch component
 *
 * @example
 * <LucideSearch color="yellow" size={88} />
 *
 * @see https://lucide.dev/icons/search
 */
const LucideSearch: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-search ${className ? className : ""}`} ref={ref}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
));

export default LucideSearch;
