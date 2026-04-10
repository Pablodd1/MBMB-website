'use client'
import Image from "next/image";
import { useState } from "react";

/**
 * SmartImage Component
 * A wrapper around next/image that handles loading errors and provides a fallback.
 */
export default function SmartImage({ src, alt, width, height, className, priority, ...props }) {
  const [error, setError] = useState(false);

  // If no source is provided or an error occurs during loading, show placeholder
  if (!src || error) {
    return (
      <div 
        className={`${className} bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200 rounded-md`}
        style={{ 
          width: width ? `${width}px` : '100%', 
          height: height ? `${height}px` : '200px',
          maxWidth: '100%'
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-medium">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || "MBMB Image"}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      onError={() => setError(true)}
      {...props}
    />
  );
}
