'use client';

import React from 'react';

/**
 * CPTICD10HeroBackground — Clean Executive Ambient Aurora & Subtle Grid
 * Zero floating text cards so the split Hero headline and 3D Paint Logo have 100% visual clarity.
 */
export default function CPTICD10HeroBackground() {
  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Base Deep Clinical Navy Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0, 102, 204, 0.25), transparent 70%), radial-gradient(ellipse 60% 50% at 80% 55%, rgba(0, 168, 232, 0.14), transparent 65%), linear-gradient(180deg, #040914 0%, #071124 55%, #0a1628 100%)',
        }}
      />

      {/* Subtle Architectural Grid with Radial Vignette Mask */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, #000 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, #000 30%, transparent 80%)',
        }}
      />
    </div>
  );
}
