'use client';

import React from 'react';

/**
 * CPTICD10HeroBackground — Executive Ambient Aurora Mesh & Floating Glassmorphic Claim Cards
 * Replaces the old Matrix-style falling code rain with a calm, institutional-grade
 * healthcare fintech backdrop featuring softly floating verified claim cards.
 */

const claimCards = [
  {
    code: 'CPT 99214 · ICD-10 I10',
    payer: 'Florida Blue (BCBS)',
    status: 'Paid · First Pass',
    amount: '+$184.50',
    position: 'top-[12%] left-[4%] xl:left-[7%]',
    delay: '0s',
    duration: '9s',
  },
  {
    code: 'CPT 93000 · Mod -25',
    payer: 'Medicare (FCSO)',
    status: 'Scrubbed · Clean Claim',
    amount: '98.4% Clean Rate',
    position: 'top-[18%] right-[4%] xl:right-[7%]',
    delay: '1.5s',
    duration: '11s',
  },
  {
    code: 'CPT 97110 · Physical Therapy',
    payer: 'UnitedHealthcare FL',
    status: 'ERA Posted · 12 Days',
    amount: '+$342.00',
    position: 'bottom-[18%] left-[5%] xl:left-[8%]',
    delay: '3s',
    duration: '10s',
  },
  {
    code: 'CAQH & EDI Enrollment',
    payer: 'Simply / Sunshine MMA',
    status: 'Verified & Active',
    amount: '0 Rejections',
    position: 'bottom-[16%] right-[5%] xl:right-[8%]',
    delay: '2.2s',
    duration: '12s',
  },
];

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
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0, 102, 204, 0.28), transparent 70%), radial-gradient(ellipse 60% 50% at 85% 75%, rgba(0, 168, 232, 0.14), transparent 65%), radial-gradient(ellipse 60% 50% at 15% 80%, rgba(16, 185, 129, 0.08), transparent 65%), linear-gradient(180deg, #040914 0%, #071124 55%, #0a1628 100%)',
        }}
      />

      {/* Slow Breathing Ambient Aurora Orbs */}
      <div
        className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full opacity-25 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, #0066CC 0%, transparent 70%)',
          animation: 'auroraDrift 16s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute top-1/3 right-1/5 w-[440px] h-[440px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #00A8E8 0%, transparent 70%)',
          animation: 'auroraDrift 20s ease-in-out 2s infinite alternate-reverse',
        }}
      />

      {/* Ultra-Subtle Architectural Grid with Radial Vignette Mask */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, #000 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, #000 30%, transparent 80%)',
        }}
      />

      {/* Floating Glassmorphic Live Claim Cards (Visible on Large Screens, framing the center copy) */}
      <div className="hidden lg:block absolute inset-0 max-w-[1440px] mx-auto">
        {claimCards.map((card) => (
          <div
            key={card.code}
            className={`absolute ${card.position} w-64 rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-md p-4 shadow-2xl`}
            style={{
              animation: `claimFloat ${card.duration} ease-in-out ${card.delay} infinite`,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#00A8E8]">
                {card.code}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Verified
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xs font-semibold text-white/90">{card.payer}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{card.status}</p>
              </div>
              <span className="text-sm font-extrabold text-emerald-400">
                {card.amount}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Center Readability Vignette so Hero Text Pops 100% Cleanly */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(4, 9, 20, 0.55) 0%, transparent 55%)',
        }}
      />

      <style jsx>{`
        @keyframes claimFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes auroraDrift {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          100% {
            transform: translate(30px, -20px) scale(1.08);
          }
        }
      `}</style>
    </div>
  );
}
