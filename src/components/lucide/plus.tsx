import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucidePlus - `plus`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucidePlus component
 *
 * @example
 * <LucidePlus color="purple" size={87} />
 *
 * @see https://lucide.dev/icons/plus
 */
const LucidePlus: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-plus${className ? ` ${className}` : ""}`} ref={ref}><path d="M5 12h14" /><path d="M12 5v14" /></svg>
));

LucidePlus.displayName = "LucidePlus";

export default LucidePlus;
