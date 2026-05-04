'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('fadeIn'); // fadeIn -> hold -> fadeOut

  useEffect(() => {
    // Phase 1: Fade in (0.8s)
    const t1 = setTimeout(() => setPhase('hold'), 800);
    // Phase 2: Hold for logo rotation (2.5s)
    const t2 = setTimeout(() => setPhase('fadeOut'), 3300);
    // Phase 3: Complete and unmount
    const t3 = setTimeout(() => onComplete?.(), 4300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ease-in-out
        ${phase === 'fadeIn' ? 'opacity-0' : ''}
        ${phase === 'hold' ? 'opacity-100' : ''}
        ${phase === 'fadeOut' ? 'opacity-0 pointer-events-none' : ''}
      `}
    >
      {/* 3D Rotating Logo Container */}
      <div className="relative w-40 h-40 md:w-56 md:h-56" style={{ perspective: '800px' }}>
        {/* 3D Flip Card */}
        <div
          className="w-full h-full relative"
          style={{
            transformStyle: 'preserve-3d',
            animation: 'luxurySpin 3s cubic-bezier(0.23, 1, 0.32, 1) forwards',
          }}
        >
          {/* Front Face - Logo */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <Image
              src="/mbmb-white.png"
              alt="Medical Billing Miami Beach"
              width={220}
              height={160}
              className="drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              priority
            />
          </div>
          
          {/* Back Face - Tagline */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-black"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <p className="text-white text-lg md:text-2xl font-bold tracking-[0.3em] text-center">
              MEDICAL
            </p>
            <p className="text-pink-400 text-sm md:text-base font-medium tracking-[0.2em] mt-1">
              BILLING
            </p>
            <p className="text-blue-400 text-xs md:text-sm tracking-[0.15em] mt-1">
              MIAMI BEACH
            </p>
          </div>
        </div>
      </div>

      {/* FREE AUDIT OFFER */}
      <div
        className={`mt-6 text-center transition-all duration-1000 delay-1000 max-w-md px-6
          ${phase === 'hold' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <p className="text-white text-lg md:text-xl font-bold tracking-wide">
          FREE BILLING AUDIT
        </p>
        <p className="text-pink-400 text-sm md:text-base mt-2">
          Discover hidden revenue leaks in your practice
        </p>
        <p className="text-gray-400 text-xs mt-3">
          No obligation · 30 minutes · $0
        </p>
      </div>

      {/* Subtle tagline below logo */}
      <div
        className={`mt-8 text-center transition-all duration-1000 delay-500
          ${phase === 'hold' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <p className="text-gray-400 text-sm tracking-[0.4em] uppercase font-light">
          Loading Experience
        </p>
        {/* Animated dots */}
        <div className="flex justify-center gap-1 mt-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-pink-400"
              style={{
                animation: `dotPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Keyframe styles */}
      <style jsx>{`
        @keyframes luxurySpin {
          0% {
            transform: rotateY(0deg) scale(0.7);
            filter: brightness(0.3);
          }
          30% {
            transform: rotateY(180deg) scale(1);
            filter: brightness(1);
          }
          50% {
            transform: rotateY(360deg) scale(1.05);
            filter: brightness(1.2) drop-shadow(0 0 40px rgba(255, 192, 203, 0.4));
          }
          70% {
            transform: rotateY(540deg) scale(1);
          }
          100% {
            transform: rotateY(720deg) scale(1);
            filter: brightness(1) drop-shadow(0 0 60px rgba(255, 192, 203, 0.6));
          }
        }
        @keyframes dotPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
