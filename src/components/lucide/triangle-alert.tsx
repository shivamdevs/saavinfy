import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideTriangleAlert - `triangle-alert`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideTriangleAlert component
 *
 * @example
 * <LucideTriangleAlert color="purple" size={97} />
 *
 * @see https://lucide.dev/icons/triangle-alert
 */
const LucideTriangleAlert: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-triangle-alert${className ? ` ${className}` : ""}`} ref={ref}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
));

LucideTriangleAlert.displayName = "LucideTriangleAlert";

export default LucideTriangleAlert;
