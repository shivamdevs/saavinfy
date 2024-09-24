import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideRefreshCw - `refresh-cw`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideRefreshCw component
 *
 * @example
 * <LucideRefreshCw color="orange" size={68} />
 *
 * @see https://lucide.dev/icons/refresh-cw
 */
const LucideRefreshCw: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-refresh-cw${className ? ` ${className}` : ""}`} ref={ref}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></svg>
));

LucideRefreshCw.displayName = "LucideRefreshCw";

export default LucideRefreshCw;
