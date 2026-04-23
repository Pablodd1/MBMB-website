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
          rotateY(${targetX * 25}deg) 
          rotateX(${-targetY * 25}deg)
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
        height: size,
      }}
    >
      <div
        ref={containerRef}
        className="w-full h-full relative"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
          willChange: 'transform',
        }}
      >
        {/* Main Logo Face */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 0 40px rgba(255, 192, 203, 0.2), inset 0 0 40px rgba(255, 192, 203, 0.1)',
          }}
        >
          <Image
            src="/mbmb-white.png"
            alt="MBMB Logo"
            width={size * 0.75}
            height={size * 0.55}
            className="object-contain"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(255, 192, 203, 0.5))',
            }}
          />
        </div>

        {/* Right Face */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl"
          style={{
            transform: 'rotateY(90deg) translateZ(' + size / 2 + 'px)',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(to right, rgba(236, 72, 153, 0.3), rgba(236, 72, 153, 0.1))',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            width: size / 8,
            left: '50%',
            marginLeft: -size / 16,
          }}
        />

        {/* Left Face */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl"
          style={{
            transform: 'rotateY(-90deg) translateZ(' + size / 2 + 'px)',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(to left, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.1))',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            width: size / 8,
            left: '50%',
            marginLeft: -size / 16,
          }}
        />

        {/* Top Face */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl"
          style={{
            transform: 'rotateX(90deg) translateZ(' + size / 2 + 'px)',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(to top, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            height: size / 8,
            top: '50%',
            marginTop: -size / 16,
          }}
        />

        {/* Bottom Face */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl"
          style={{
            transform: 'rotateX(-90deg) translateZ(' + size / 2 + 'px)',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            height: size / 8,
            top: '50%',
            marginTop: -size / 16,
          }}
        />

        {/* Back Face */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl"
          style={{
            transform: 'rotateY(180deg) translateZ(' + size / 16 + 'px)',
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(30,30,30,0.9))',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="text-center">
            <p className="text-white text-xs font-bold tracking-widest">MBMB</p>
            <p className="text-pink-400 text-[8px] tracking-wider mt-0.5">MIAMI BEACH</p>
          </div>
        </div>

        {/* Glow effect behind */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            transform: 'translateZ(-20px)',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </div>
    </div>
  );
}
