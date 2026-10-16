'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function RotatingLogo3D({ size = 180, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) / windowHalfX;
      mouseY = (event.clientY - windowHalfY) / windowHalfY;
    };

    const animate = () => {
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      if (container) {
        container.style.transform = `
          rotateY(${targetX * 18}deg) 
          rotateX(${-targetY * 18}deg)
        `;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div
      className={`relative ${className}`}
      style={{
        perspective: '1000px',
        width: size,
        height: size * 0.78,
      }}
    >
      <div
        ref={containerRef}
        className="w-full h-full relative flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
          willChange: 'transform',
        }}
      >
        {/* Clean Transparent 3D Logo — No Box Background */}
        <Image
          src="/mbmb-white.png"
          alt="Medical Billing Miami Beach (MBMB) Logo"
          width={Math.round(size * 0.95)}
          height={Math.round(size * 0.7)}
          className="object-contain select-none pointer-events-none"
          style={{
            filter: 'drop-shadow(0 8px 24px rgba(0, 168, 232, 0.35))',
          }}
          priority
        />
      </div>
    </div>
  );
}
