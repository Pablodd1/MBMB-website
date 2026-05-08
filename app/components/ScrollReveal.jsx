'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal — reusable scroll-triggered animation wrapper
 * Uses IntersectionObserver for performance
 * 
 * Props:
 * - children: content to wrap
 * - className: additional classes
 * - delay: stagger delay in ms (default 0)
 * - direction: 'up' | 'down' | 'left' | 'right' | 'none' (default 'up')
 * - distance: translate distance in px (default 40)
 * - duration: CSS transition duration in ms (default 700)
 * - threshold: intersection threshold 0-1 (default 0.15)
 * - once: trigger only once (default true)
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 40,
  duration = 700,
  threshold = 0.15,
  once = true,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return `translateY(${distance}px)`;
      case 'down': return `translateY(-${distance}px)`;
      case 'left': return `translateX(${distance}px)`;
      case 'right': return `translateX(-${distance}px)`;
      case 'none': return 'none';
      default: return `translateY(${distance}px)`;
    }
  };

  const initialTransform = getInitialTransform();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : initialTransform,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
