'use client';
import React, { useState } from 'react';

export default function InstantOfferBar({ audience = 'provider', sourcePage = '/' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'

  const isAttorney = audience === 'attorney';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return;

    setStatus('sending');
    try {
      const res = await fetch('/my-api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          offerType: isAttorney ? 'attorney-sample-chronology' : 'provider-20-claim',
          sourcePage,
        }),
      });
      if (res.ok) {
        setStatus('sent');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-[#0a1628]/95 border border-white/20 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              {isAttorney
                ? '72-Hour 1-Case Proof · Zero Retainer'
                : '48-Hour Proof · Zero Obligation'}
            </span>
          </div>
          <p className="text-white text-sm sm:text-base font-bold leading-snug">
            {isAttorney
              ? 'Want to see the exact Excel + Bates-linked PDF layout before sending a case?'
              : 'Don’t take our word for it. Make us prove it on 20 of your denied claims.'}
          </p>
          <p className="text-slate-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
            {isAttorney
              ? 'Enter your firm email—we’ll immediately send a redacted Sample Billing Chronology & EOB Reconciliation table.'
              : 'Enter your work email—we’ll send our 20-Claim Free Audit instructions + 2026 Fee Schedule (5.6%–10% of collections, $0 setup).'}
          </p>
        </div>

        <div className="w-full md:w-auto md:min-w-[330px]">
          {status === 'sent' ? (
            <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-xl px-4 py-3 text-emerald-200 text-xs sm:text-sm font-semibold">
              ✓ Sent to your inbox. Check your email (or reply directly to Jasmel@medicalbillingmb.com).
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <label htmlFor={`instant-offer-${audience}`} className="sr-only">
                Work Email
              </label>
              <input
                id={`instant-offer-${audience}`}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isAttorney ? 'attorney@lawfirm.com' : 'doctor@practice.com'}
                className="flex-1 bg-white text-slate-900 text-sm font-medium px-3.5 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00A8E8]"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-[#0066CC] hover:bg-[#00A8E8] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 shadow-lg"
              >
                {status === 'sending'
                  ? 'Sending...'
                  : isAttorney
                  ? 'Send Sample Table →'
                  : 'Send 20-Claim Audit Info →'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="text-rose-300 text-xs mt-1">
              Could not send—please call (786) 643-2099 or email Jasmel@medicalbillingmb.com.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
