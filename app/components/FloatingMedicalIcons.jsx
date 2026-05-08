'use client';

import { useEffect, useRef } from 'react';

/**
 * FloatingMedicalIcons — Small medical icons that float with parallax at different speeds
 * Uses requestAnimationFrame for smooth parallax without scroll listeners
 * Icons: pills, heartbeat, clipboard, stethoscope, DNA, microscope
 */

const icons = [
  {
    // Pills
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.5 20.5l10-10a4.95 4.95 0 10-7-7l-10 10a4.95 4.95 0 107 7z" />
        <path d="M8.5 8.5l7 7" />
      </svg>
    ),
    x: '8%',
    y: '15%',
    size: 28,
    speed: 0.3,
    color: 'rgba(0, 200, 177, 0.15)',
  },
  {
    // Heartbeat
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    x: '85%',
    y: '25%',
    size: 32,
    speed: 0.5,
    color: 'rgba(255, 107, 53, 0.12)',
  },
  {
    // Clipboard
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
    x: '15%',
    y: '70%',
    size: 24,
    speed: 0.2,
    color: 'rgba(0, 200, 177, 0.1)',
  },
  {
    // Stethoscope
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3" />
        <path d="M8 15v4a2 2 0 002 2h4a2 2 0 002-2v0" />
        <circle cx="17" cy="19" r="2" />
      </svg>
    ),
    x: '78%',
    y: '60%',
    size: 30,
    speed: 0.4,
    color: 'rgba(255, 107, 53, 0.1)',
  },
  {
    // DNA
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 15c6.5-1 8.5-1 15 2" />
        <path d="M17 3c-6.5 4-8.5 4-15-1" />
        <path d="M11 3c-1 3.5-1 6.5 0 10" />
        <path d="M17 21c1-3.5 1-6.5 0-10" />
      </svg>
    ),
    x: '92%',
    y: '80%',
    size: 26,
    speed: 0.35,
    color: 'rgba(0, 200, 177, 0.12)',
  },
  {
    // Microscope
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18h12" />
        <path d="M3 22h18" />
        <path d="M14 18V9a4 4 0 00-8 0v9" />
        <circle cx="10" cy="5" r="2" />
      </svg>
    ),
    x: '5%',
    y: '45%',
    size: 22,
    speed: 0.25,
    color: 'rgba(255, 107, 53, 0.08)',
  },
];

export default function FloatingMedicalIcons() {
  const containerRef = useRef(null);
  const iconRefs = useRef([]);

  useEffect(() => {
    let rafId;
    let lastScrollY = window.scrollY;

    const animate = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;

      iconRefs.current.forEach((el, i) => {
        if (!el) return;
        const icon = icons[i];
        // Parallax: move at different speeds based on scroll
        // Also add a gentle sine wave float
        const floatY = Math.sin((Date.now() / 1000) * icon.speed + i * 2) * 8;
        const parallaxY = scrollY * icon.speed * 0.15;

        el.style.transform = `translateY(${parallaxY + floatY}px)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {icons.map((icon, i) => (
        <div
          key={i}
          ref={(el) => { iconRefs.current[i] = el; }}
          className="absolute"
          style={{
            left: icon.x,
            top: icon.y,
            width: icon.size,
            height: icon.size,
            color: icon.color,
            willChange: 'transform',
          }}
        >
          {icon.svg}
        </div>
      ))}
    </div>
  );
}
