import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideInfo - `info`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideInfo component
 *
 * @example
 * <LucideInfo color="purple" size={92} />
 *
 * @see https://lucide.dev/icons/info
 */
const LucideInfo: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-info${className ? ` ${className}` : ""}`} ref={ref}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
));

LucideInfo.displayName = "LucideInfo";

export default LucideInfo;
