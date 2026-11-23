'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const REELS = [
  {
    id: 'revenue-leakage-en',
    lang: 'en',
    badge: 'Revenue Recovery',
    title: 'Where Miami Clinics Quietly Lose 12%–18% of Collected Revenue',
    duration: '0:45',
    src: '/reels/MBMB_Reel_1_Revenue_Leakage_EN.mp4',
  },
  {
    id: 'scrutiny-en',
    lang: 'en',
    badge: 'Pre-Submission Scrutiny',
    title: 'Scrutiny Before the Scrutiny: Catching Documentation Gaps Before Payers Do',
    duration: '0:50',
    src: '/reels/MBMB_Reel_6_Scrutiny_Before_Scrutiny_EN.mp4',
  },
  {
    id: 'audit-15m-en',
    lang: 'en',
    badge: 'Free 20-Claim Audit',
    title: 'How Our 48-Hour 20-Claim Proof Test Shows Exact Recoverable Dollars',
    duration: '0:45',
    src: '/reels/MBMB_Reel_4_The_15_Minute_Audit_EN.mp4',
  },
  {
    id: 'inhouse-en',
    lang: 'en',
    badge: 'In-House vs. Outsourced',
    title: 'Why Single-Person In-House Billing Falls Behind on Appeals & Denials',
    duration: '0:45',
    src: '/reels/MBMB_Reel_3_Why_InHouse_Billing_Fails_EN.mp4',
  },
  {
    id: 'fuga-es',
    lang: 'es',
    badge: 'Recuperación de Ingresos',
    title: 'Dónde Pierden Ingresos las Clínicas en Miami (y Cómo Recuperarlos)',
    duration: '0:45',
    src: '/reels/MBMB_Reel_1_Fuga_de_Ingresos_ES.mp4',
  },
  {
    id: 'escrutinio-es',
    lang: 'es',
    badge: 'Escrutinio Previo',
    title: 'Escrutinio Antes del Escrutinio: Revisión de Notas y Códigos Antes de Enviar',
    duration: '0:50',
    src: '/reels/MBMB_Reel_6_Escrutinio_Previo_ES.mp4',
  },
  {
    id: 'auditoria-es',
    lang: 'es',
    badge: 'Auditoría Gratis',
    title: 'Auditoría Gratuita de 20 Reclamos Denegados en 48 Horas',
    duration: '0:45',
    src: '/reels/MBMB_Reel_4_Auditoria_15_Minutos_ES.mp4',
  },
  {
    id: 'error-codificacion-es',
    lang: 'es',
    badge: 'Codificación AAPC',
    title: 'Errores Comunes de Codificación CPT/ICD-10 que Causan Denegaciones',
    duration: '0:45',
    src: '/reels/MBMB_Reel_2_Error_de_Codificacion_ES.mp4',
  },
];

export default function ReelsShowcase({ compact = false }) {
  const [lang, setLang] = useState('en');
  const visible = REELS.filter((r) => r.lang === lang).slice(0, compact ? 3 : 4);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#060d18] text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A8E8]/15 border border-[#00A8E8]/30 text-[#00A8E8] text-xs font-bold uppercase tracking-wider mb-3">
              Bilingual Video Briefings · EN / ES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Watch How MBMB Protects South Florida Practice Revenue
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              Quick 45-second briefings in English and Spanish covering denial recovery, AAPC coding accuracy, and our optional Pre-Submission Clinical Scrutiny add-on.
            </p>
          </div>

          <div className="inline-flex rounded-xl bg-white/5 border border-white/15 p-1 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                lang === 'en' ? 'bg-[#0066CC] text-white shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              English Briefings
            </button>
            <button
              type="button"
              onClick={() => setLang('es')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                lang === 'es' ? 'bg-[#0066CC] text-white shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              En Español
            </button>
          </div>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${compact ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
          {visible.map((reel) => (
            <article
              key={reel.id}
              className="rounded-2xl overflow-hidden bg-[#0a1628] border border-white/10 shadow-xl flex flex-col"
            >
              <div className="relative bg-black aspect-[9/14] w-full">
                <video
                  src={reel.src}
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A8E8]">
                      {reel.badge}
                    </span>
                    <span className="text-[11px] text-slate-400">{reel.duration}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">{reel.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
          <p className="text-xs sm:text-sm text-slate-300">
            Want to see what our coders find on your own denied claims? Send 20 claims after BAA execution—free 48-hour review.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/consultation"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white font-bold text-xs sm:text-sm hover:opacity-95 transition"
            >
              Claim Free 20-Claim Audit →
            </Link>
            <Link
              href="/call-me"
              className="px-5 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white font-semibold text-xs sm:text-sm hover:bg-white/10 transition"
            >
              Instant Callback / Text Desk
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
