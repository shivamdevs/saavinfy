import React from 'react';
import { LucideElement, LucideProps } from './.lucide';

/**
 * LucideAudioLines - `audio-lines`
 *
 * @param {string} color - stroke color of the icon
 * @param {number} size - size of the icon
 * @param {number} strokeWidth - width of the stroke
 * @param {string} className - additional classes for the icon
 * @param {object} props - additional props for the icon based on SVGElement
 * @param {object} ref - reference to the icon
 * @returns {React.Component} LucideAudioLines component
 *
 * @example
 * <LucideAudioLines color="green" size={80} />
 *
 * @see https://lucide.dev/icons/audio-lines
 */
const LucideAudioLines: LucideElement = React.forwardRef<SVGSVGElement, LucideProps>(({ className, color, size, ...props }, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" {...props} className={`lucide lucide-audio-lines${className ? ` ${className}` : ""}`} ref={ref}><path d="M2 10v3" /><path d="M6 6v11" /><path d="M10 3v18" /><path d="M14 8v7" /><path d="M18 5v13" /><path d="M22 10v3" /></svg>
));

LucideAudioLines.displayName = "LucideAudioLines";

export default LucideAudioLines;
