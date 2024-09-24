import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideFacebook - `facebook`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideFacebook component
 *
 * @example
 * <LucideFacebook color="blue" size={83} />
 *
 * @see https://lucide.dev/icons/facebook
 */
const LucideFacebook: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-facebook${className ? ` ${className}` : ""}`} ref={ref}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
));

LucideFacebook.displayName = "LucideFacebook";

export default LucideFacebook;
