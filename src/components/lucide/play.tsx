import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucidePlay - `play`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucidePlay component
 *
 * @example
 * <LucidePlay color="green" size={45} />
 *
 * @see https://lucide.dev/icons/play
 */
const LucidePlay: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-play ${className ? className : ""}`} ref={ref}><polygon points="6 3 20 12 6 21 6 3" /></svg>
));

export default LucidePlay;
