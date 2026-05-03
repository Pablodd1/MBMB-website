"use client";
import React, { useRef, useEffect, useState } from 'react';

export default function FloatingVideo() {
  const videoRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-8 px-4">
      <div 
        className={`relative rounded-2xl overflow-hidden shadow-xl border-2 border-pink-500/30 bg-black transition-all duration-300 cursor-pointer ${
          isExpanded ? 'w-full max-w-md h-64' : 'w-40 h-28'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <video
          ref={videoRef}
          src="/assets/free-offer-mbmb.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        
        {/* Live indicator */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          <span className="text-white text-[9px] font-bold uppercase">LIVE</span>
        </div>
        
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1.5 pt-4">
          <p className="text-white text-[10px] font-semibold text-center leading-tight">
            {isExpanded ? 'Tap to minimize' : 'Meet Your Billing Expert'}
          </p>
        </div>
        
        {/* Expand hint */}
        {!isExpanded && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 rounded-full p-1">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
