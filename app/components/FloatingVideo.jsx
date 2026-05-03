"use client";
import React, { useRef, useEffect } from 'react';

export default function FloatingVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure autoplay works
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play was prevented, show play button or ignore
      });
    }
  }, []);

  return (
    <div className="fixed bottom-28 right-6 z-40 group">
      {/* Pulsing attention ring */}
      <span className="absolute -inset-2 rounded-full bg-pink-500/20 animate-ping" />
      
      <div className="relative w-48 h-36 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/80 bg-black">
        <video
          ref={videoRef}
          src="/assets/medical-presentation (3).mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        
        {/* Play indicator overlay */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-white text-[10px] font-bold uppercase tracking-wide">LIVE</span>
        </div>
        
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 pt-6">
          <p className="text-white text-xs font-semibold text-center leading-tight">
            Meet Your Billing Expert
          </p>
        </div>
        
        {/* Hover expand hint */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Click to expand
        </div>
      </div>
    </div>
  );
}
