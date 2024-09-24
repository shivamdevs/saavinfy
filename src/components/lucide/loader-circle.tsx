import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideLoaderCircle - `loader-circle`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideLoaderCircle component
 *
 * @example
 * <LucideLoaderCircle color="purple" size={14} />
 *
 * @see https://lucide.dev/icons/loader-circle
 */
const LucideLoaderCircle: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-loader-circle${className ? ` ${className}` : ""}`} ref={ref}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
));

LucideLoaderCircle.displayName = "LucideLoaderCircle";

export default LucideLoaderCircle;
