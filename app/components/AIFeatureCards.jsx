'use client';

import { useRef, useState, useCallback } from 'react';
import ScrollReveal from './ScrollReveal';

/**
 * AIFeatureCards — 3 AI feature cards with 3D tilt hover effect
 * Uses CSS perspective + rotateX/Y transforms
 * Anti-slop: real 3D transforms, no generic gradients
 */

const features = [
  {
    title: 'AI Denial Prediction',
    description: 'Our system predicts claim denials before submission, reducing rejections by up to 40%. Machine learning models trained on millions of Florida claims.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
      </svg>
    ),
    accent: '#00c8b1',
    stat: '40%',
    statLabel: 'Fewer Denials',
  },
  {
    title: 'Smart Coding Assistant',
    description: 'AI-powered CPT/ICD-10 code suggestions with 99.2% accuracy. Real-time coding guidance that learns from your specialty and payer mix.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="10" y1="12" x2="14" y2="12" strokeDasharray="2 2" />
      </svg>
    ),
    accent: '#ff6b35',
    stat: '99.2%',
    statLabel: 'Accuracy',
  },
  {
    title: 'Revenue Intelligence Dashboard',
    description: 'Real-time analytics powered by machine learning. Track AR aging, denial patterns, and revenue trends — all in one intelligent dashboard.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-6 4 3 4-7" />
        <circle cx="17" cy="6" r="1.5" fill="currentColor" />
        <circle cx="15" cy="13" r="1.5" fill="currentColor" />
        <circle cx="11" cy="10" r="1.5" fill="currentColor" />
      </svg>
    ),
    accent: '#00c8b1',
    stat: '24/7',
    statLabel: 'Monitoring',
  },
];

function TiltCard({ feature, index }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max rotation: ±12deg
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlowPos({ x: 50, y: 50 });
  }, []);

  return (
    <ScrollReveal delay={index * 150} direction="up" distance={50}>
      <div
        ref={cardRef}
        className="relative group cursor-default"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: transform,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Glow effect following mouse */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, ${feature.accent}15, transparent 60%)`,
          }}
        />

        <div
          className="relative bg-[#0d1b2a] border border-white/10 rounded-2xl p-8 h-full overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)` }}
          />

          {/* Icon */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
            style={{
              background: `${feature.accent}15`,
              color: feature.accent,
              transform: 'translateZ(40px)',
            }}
          >
            {feature.icon}
          </div>

          {/* Title */}
          <h3
            className="text-xl font-bold text-white mb-3"
            style={{ transform: 'translateZ(30px)' }}
          >
            {feature.title}
          </h3>

          {/* Description */}
          <p
            className="text-gray-400 text-sm leading-relaxed mb-6"
            style={{ transform: 'translateZ(20px)' }}
          >
            {feature.description}
          </p>

          {/* Stat badge */}
          <div
            className="flex items-center gap-3"
            style={{ transform: 'translateZ(25px)' }}
          >
            <span
              className="text-2xl font-bold"
              style={{ color: feature.accent }}
            >
              {feature.stat}
            </span>
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              {feature.statLabel}
            </span>
          </div>

          {/* Subtle corner decoration */}
          <div
            className="absolute bottom-4 right-4 w-16 h-16 opacity-5"
            style={{ color: feature.accent }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function AIFeatureCards() {
  return (
    <section className="w-full py-24 bg-[#070d17] relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <ScrollReveal direction="up" distance={30}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00c8b1]/30 bg-[#00c8b1]/5 mb-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00c8b1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span className="text-[#00c8b1] text-sm font-medium tracking-wide">AI-POWERED TECHNOLOGY</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Intelligence That <span style={{ color: '#ff6b35' }}>Pays</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Machine learning models trained on millions of claims. Predictive analytics that catch errors before they cost you money.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6" style={{ perspective: '2000px' }}>
          {features.map((feature, i) => (
            <TiltCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
