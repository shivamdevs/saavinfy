import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideMusic2 - `music-2`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideMusic2 component
 *
 * @example
 * <LucideMusic2 color="yellow" size={53} />
 *
 * @see https://lucide.dev/icons/music-2
 */
const LucideMusic2: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-music-2${className ? ` ${className}` : ""}`} ref={ref}><circle cx="8" cy="18" r="4" /><path d="M12 18V2l7 4" /></svg>
));

LucideMusic2.displayName = "LucideMusic2";

export default LucideMusic2;
