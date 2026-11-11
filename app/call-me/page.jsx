'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function CallMeFormInner() {
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [audience, setAudience] = useState('provider');
  const [bestTime, setBestTime] = useState('Right Now (Next 15m)');
  const [honeypot, setHoneypot] = useState('');
  const [formLoadedAt] = useState(() => Date.now());
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'done' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const qEmail = searchParams.get('email') || searchParams.get('e') || '';
    const qName = searchParams.get('name') || '';
    const qAudience = searchParams.get('audience') || '';
    if (qEmail && !qEmail.includes('{{')) setEmail(qEmail);
    if (qName && !qName.includes('{{')) setFullName(qName);
    if (qAudience === 'attorney') setAudience('attorney');
  }, [searchParams]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!fullName.trim() || phone.replace(/\D/g, '').length < 7) {
      setErrorMsg('Please enter your name and direct phone number.');
      return;
    }
    setErrorMsg('');
    setStatus('submitting');
    try {
      const res = await fetch('/my-api/call-me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          bestTime,
          audience,
          website: honeypot,
          formLoadedAt,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || 'Could not submit request.');
      }
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please call (786) 643-2099 directly.');
    }
  }

  const timeOptions = [
    'Right Now (Next 15m)',
    'Later Today',
    'Tomorrow Morning',
  ];

  return (
    <main className="min-h-[82vh] flex items-center justify-center bg-gradient-to-b from-[#040914] via-[#071124] to-[#0a1628] px-4 py-14">
      <div className="w-full max-w-md bg-white/[0.04] border border-white/15 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Minimalistic MBMB Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 border-2 border-[#00A8E8] border-r-0 flex items-center justify-center text-white font-serif font-black text-xs leading-tight">
            MB<br />MB
          </div>
          <div>
            <div className="text-white font-bold text-sm tracking-wide">
              Jasmel Acosta · Medical Billing Miami Beach
            </div>
            <div className="text-[#00A8E8] text-xs font-semibold">
              Direct Callback Desk · EN &amp; Español
            </div>
          </div>
        </div>

        {status === 'done' ? (
          <div className="py-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-4">
              ✓ Got It — Calling You {bestTime === 'Right Now (Next 15m)' ? 'Shortly' : bestTime}
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-2">
              Thanks, {fullName.split(' ')[0]}.
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Your number (<strong className="text-white">{phone}</strong>) just buzzed my phone in Miami Beach. Watch for a call from <strong className="text-[#00A8E8]">(786) 643-2099</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+17866432099"
                className="flex-1 text-center py-3 px-4 rounded-xl bg-[#0066CC] hover:bg-[#00A8E8] text-white font-bold text-sm transition"
              >
                📞 Or Ring Me Now: (786) 643-2099
              </a>
              <Link
                href={audience === 'attorney' ? '/for-attorneys' : '/for-providers'}
                className="py-3 px-4 rounded-xl border border-white/20 text-slate-200 hover:bg-white/10 font-semibold text-sm text-center transition"
              >
                View Rates →
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              Drop your number. I’ll call you personally.
            </h1>
            <p className="text-slate-300 text-sm mt-2 mb-6 leading-relaxed">
              No call center, no 10-field intake form. Leave your name and direct line below—or tap to ring my desk right now.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Martinez / Maria (Office Mgr)"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00A8E8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Direct Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(305) 555-0192"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00A8E8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  When Should I Call?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setBestTime(opt)}
                      className={`py-2 px-2 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                        bestTime === opt
                          ? 'bg-[#0066CC] border-[#00A8E8] text-white shadow-sm'
                          : 'bg-white/5 border-white/15 text-slate-300 hover:text-white'
                      }`}
                    >
                      {opt.replace(' (Next 15m)', '')}
                    </button>
                  ))}
                </div>
              </div>

              {errorMsg && (
                <p className="text-rose-400 text-xs font-semibold">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 px-6 rounded-xl bg-[#0066CC] hover:bg-[#00A8E8] text-white font-extrabold text-base shadow-lg shadow-[#0066CC]/30 transition cursor-pointer disabled:opacity-60"
              >
                {status === 'submitting' ? 'Sending to Jasmel...' : 'You Call Me →'}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>Rather dial right now?</span>
              <a
                href="tel:+17866432099"
                className="text-[#00A8E8] hover:text-white font-bold transition"
              >
                📞 I’ll Call You · (786) 643-2099
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function CallMePage() {
  return (
    <Suspense fallback={<div className="min-h-[82vh] bg-[#040914]" />}>
      <CallMeFormInner />
    </Suspense>
  );
}
