'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function getUpcomingBusinessDays(count = 4) {
  const days = [];
  const cursor = new Date();
  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) {
      days.push(
        cursor.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      );
    }
  }
  return days;
}

function buildSmsHref(phoneE164, bodyText, isIOS) {
  const sep = isIOS ? '&' : '?';
  return `sms:${phoneE164}${sep}body=${encodeURIComponent(bodyText)}`;
}

function CallMeFormInner() {
  const searchParams = useSearchParams();
  const businessDays = useMemo(() => getUpcomingBusinessDays(4), []);

  const [mode, setMode] = useState('call'); // 'call' | 'text' | 'open-sms' | 'virtual' | 'admin-sms'
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [audience, setAudience] = useState('provider');
  const [bestTime, setBestTime] = useState('Right Now (Next 15m)');
  const [topic, setTopic] = useState('20-Claim Free Test');
  const [apptDay, setApptDay] = useState(() => businessDays[0] || 'Tomorrow');
  const [apptWindow, setApptWindow] = useState('Morning (9–11a EST)');
  const [adminTargetPhone, setAdminTargetPhone] = useState('');
  const [adminTargetName, setAdminTargetName] = useState('');
  const [isIOS, setIsIOS] = useState(false);
  const [copied, setCopied] = useState(false);

  const [honeypot, setHoneypot] = useState('');
  const [formLoadedAt] = useState(() => Date.now());
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'done' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const iosDetected = /iPhone|iPad|iPod/i.test(ua);
    const mobileDetected = /iPhone|iPad|iPod|Android/i.test(ua);
    setIsIOS(iosDetected);

    const qEmail = searchParams.get('email') || searchParams.get('e') || '';
    const qName = searchParams.get('name') || '';
    const qAudience = searchParams.get('audience') === 'attorney' ? 'attorney' : 'provider';
    const qMode = searchParams.get('mode') || '';
    const qAdminSms = searchParams.get('admin-sms') || '';

    setAudience(qAudience);
    if (qAudience === 'attorney') {
      setTopic('1-Case 72h Pilot');
    }

    if (qEmail && !qEmail.includes('{{')) setEmail(qEmail);
    if (qName && !qName.includes('{{')) setFullName(qName);

    if (qAdminSms) {
      setMode('admin-sms');
      setAdminTargetPhone(qAdminSms);
      setAdminTargetName(qName || 'there');
      const intro =
        qAudience === 'attorney'
          ? `Hi ${qName || 'there'}, this is Jasmel at Medical Billing Miami Beach following up on your text request about our 72-hr medical bill chronology.`
          : `Hi ${qName || 'there'}, this is Jasmel at Medical Billing Miami Beach following up on your text request about the free 20-claim billing audit.`;
      if (mobileDetected) {
        window.location.href = buildSmsHref(qAdminSms, intro, iosDetected);
      }
      return;
    }

    if (['call', 'text', 'open-sms', 'virtual'].includes(qMode)) {
      setMode(qMode);
      if (qMode === 'open-sms' && mobileDetected) {
        const starter =
          qAudience === 'attorney'
            ? 'Hi Jasmel — saw your email about the 72-hr medical billing chronology pilot.'
            : 'Hi Jasmel — saw your email about the free 20-claim billing audit.';
        window.location.href = buildSmsHref('+17866432099', starter, iosDetected);
      }
    }
  }, [searchParams]);

  async function handleSubmit(e) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '');
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!fullName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if ((mode === 'call' || mode === 'text') && digits.length < 7) {
      setErrorMsg('Please enter your direct phone number.');
      return;
    }
    if (mode === 'virtual' && !validEmail && digits.length < 7) {
      setErrorMsg('Please enter your work email (or direct phone) so we can send your invite.');
      return;
    }

    setErrorMsg('');
    setStatus('submitting');
    try {
      const res = await fetch('/my-api/call-me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          fullName,
          phone,
          email,
          bestTime,
          topic,
          apptDay,
          apptWindow,
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
      setErrorMsg(err.message || 'Something went wrong. Please call or text (786) 643-2099.');
    }
  }

  const timeOptions = ['Right Now (Next 15m)', 'Later Today', 'Tomorrow Morning'];
  const topicOptions =
    audience === 'attorney'
      ? ['1-Case 72h Pilot', 'Sample Chronology', 'Rates & Turnaround']
      : ['20-Claim Free Test', 'Rates (5.6%–10%)', 'Quick Question'];
  const windowOptions = ['Morning (9–11a EST)', 'Midday (12–2p EST)', 'Afternoon (3–5p EST)'];

  const prospectSmsStarter =
    audience === 'attorney'
      ? 'Hi Jasmel — saw your email about the 72-hr medical billing chronology pilot.'
      : 'Hi Jasmel — saw your email about the free 20-claim billing audit.';
  const prospectSmsHref = buildSmsHref('+17866432099', prospectSmsStarter, isIOS);

  const adminSmsIntro =
    audience === 'attorney'
      ? `Hi ${adminTargetName || 'there'}, this is Jasmel at Medical Billing Miami Beach following up on your text request about our 72-hr medical bill chronology.`
      : `Hi ${adminTargetName || 'there'}, this is Jasmel at Medical Billing Miami Beach following up on your text request about the free 20-claim billing audit.`;

  return (
    <main className="min-h-[84vh] flex items-center justify-center bg-gradient-to-b from-[#040914] via-[#071124] to-[#0a1628] px-4 py-12">
      <div className="w-full max-w-md bg-white/[0.04] border border-white/15 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Minimalistic MBMB Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 border-2 border-[#00A8E8] border-r-0 flex items-center justify-center text-white font-serif font-black text-xs leading-tight">
            MB<br />MB
          </div>
          <div>
            <div className="text-white font-bold text-sm tracking-wide">
              Jasmel Acosta · Medical Billing Miami Beach
            </div>
            <div className="text-[#00A8E8] text-xs font-semibold">
              Direct Connect Desk · EN &amp; Español
            </div>
          </div>
        </div>

        {/* Admin 1-Tap SMS Launcher Mode */}
        {mode === 'admin-sms' ? (
          <div className="py-3">
            <h1 className="text-2xl font-extrabold text-white mb-2">
              Text {adminTargetName}
            </h1>
            <p className="text-slate-300 text-sm mb-5">
              Tap below if your Messages app didn’t open automatically:
            </p>
            <a
              href={buildSmsHref(adminTargetPhone, adminSmsIntro, isIOS)}
              className="block w-full text-center py-3.5 px-5 rounded-xl bg-[#0066CC] hover:bg-[#00A8E8] text-white font-extrabold text-base transition"
            >
              💬 Open SMS to {adminTargetPhone}
            </a>
          </div>
        ) : mode === 'open-sms' ? (
          /* "I'll Text You" Instant SMS Launcher + Desktop Fallback */
          <div className="py-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A8E8]/15 border border-[#00A8E8]/30 text-[#38bdf8] text-xs font-bold mb-3">
              💬 Direct Text Line · (786) 643-2099
            </div>
            <h1 className="text-2xl font-extrabold text-white leading-snug mb-2">
              Text my direct line right now.
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed mb-5">
              Tap below on your phone to open a pre-addressed text message straight to my desk in Miami Beach:
            </p>
            <a
              href={prospectSmsHref}
              className="block w-full text-center py-3.5 px-5 rounded-xl bg-[#0066CC] hover:bg-[#00A8E8] text-white font-extrabold text-base shadow-lg shadow-[#0066CC]/30 transition mb-4"
            >
              💬 Open Messages · (786) 643-2099
            </a>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 flex items-center justify-between mb-5">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  Direct SMS / Phone Number
                </div>
                <div className="text-white font-extrabold text-base">(786) 643-2099</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText('786-643-2099');
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-[#38bdf8] transition cursor-pointer"
              >
                {copied ? '✓ Copied' : 'Copy Number'}
              </button>
            </div>

            <div className="pt-3 border-t border-white/10 text-center">
              <button
                type="button"
                onClick={() => setMode('text')}
                className="text-xs font-bold text-[#00A8E8] hover:text-white transition cursor-pointer"
              >
                On a computer? Leave your cell here and I’ll text you first →
              </button>
            </div>
          </div>
        ) : status === 'done' ? (
          /* Confirmation View */
          <div className="py-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-4">
              {mode === 'text'
                ? '✓ Got It — Texting Your Cell Shortly'
                : mode === 'virtual'
                  ? `✓ Locked In — ${apptDay} · ${apptWindow}`
                  : `✓ Got It — Calling You ${bestTime === 'Right Now (Next 15m)' ? 'Shortly' : bestTime}`}
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-2">
              Thanks, {fullName.split(' ')[0]}.
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {mode === 'text' ? (
                <>
                  Your mobile (<strong className="text-white">{phone}</strong>) just pinged my phone in Miami Beach. Watch for a personal text from <strong className="text-[#00A8E8]">(786) 643-2099</strong>—no automated bots.
                </>
              ) : mode === 'virtual' ? (
                <>
                  I received your request for <strong className="text-white">{apptDay} ({apptWindow})</strong> and will send your 15-minute video link{email ? <> to <strong className="text-white">{email}</strong></> : ''} shortly.
                </>
              ) : (
                <>
                  Your number (<strong className="text-white">{phone}</strong>) just buzzed my phone in Miami Beach. Watch for a call from <strong className="text-[#00A8E8]">(786) 643-2099</strong>.
                </>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+17866432099"
                className="flex-1 text-center py-3 px-4 rounded-xl bg-[#0066CC] hover:bg-[#00A8E8] text-white font-bold text-sm transition"
              >
                📞 Or Call Now: (786) 643-2099
              </a>
              <Link
                href={audience === 'attorney' ? '/for-attorneys' : '/for-providers'}
                className="py-3 px-4 rounded-xl border border-white/20 text-slate-200 hover:bg-white/10 font-semibold text-sm text-center transition"
              >
                View Details →
              </Link>
            </div>
          </div>
        ) : (
          /* Interactive Form: Call | Text | Virtual Appointment */
          <>
            {/* Minimalistic 3-Mode Switcher */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 mb-5">
              {[
                { id: 'call', label: '📞 Call Me' },
                { id: 'text', label: '💬 Text Me' },
                { id: 'virtual', label: '🗓️ Virtual' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setMode(tab.id);
                    setErrorMsg('');
                  }}
                  className={`py-2 px-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    mode === tab.id
                      ? 'bg-[#0066CC] text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <h1 className="text-2xl font-extrabold text-white leading-snug">
              {mode === 'text'
                ? 'Drop your cell. I’ll text you personally.'
                : mode === 'virtual'
                  ? 'Book a Free 15-Min Virtual Consultation.'
                  : 'Drop your number. I’ll call you personally.'}
            </h1>
            <p className="text-slate-300 text-sm mt-1.5 mb-5 leading-relaxed">
              {mode === 'text'
                ? 'Skip phone tag. Leave your mobile number below and I’ll shoot you a quick personal text from (786) 643-2099.'
                : mode === 'virtual'
                  ? 'Pick a day and window below. I’ll send a clean 15-minute video meeting invite straight to your calendar—zero obligation.'
                  : 'No call center, no 10-field intake form. Leave your name and direct line below—or tap to ring my desk right now.'}
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
                  placeholder={
                    audience === 'attorney'
                      ? 'Alex Rivera, Esq. / Paralegal'
                      : 'Dr. Martinez / Maria (Office Mgr)'
                  }
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00A8E8]"
                />
              </div>

              {mode === 'virtual' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Work Email (For Calendar Invite)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={
                      audience === 'attorney' ? 'partner@lawfirm.com' : 'doctor@practice.com'
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00A8E8]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  {mode === 'text'
                    ? 'Mobile Number (For SMS)'
                    : mode === 'virtual'
                      ? 'Direct Phone (Optional — For Text Reminder)'
                      : 'Direct Phone Number'}
                </label>
                <input
                  type="tel"
                  required={mode !== 'virtual'}
                  placeholder="(305) 555-0192"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00A8E8]"
                />
              </div>

              {mode === 'call' && (
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
              )}

              {mode === 'text' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    What Should We Text About?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {topicOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setTopic(opt)}
                        className={`py-2 px-2 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                          topic === opt
                            ? 'bg-[#0066CC] border-[#00A8E8] text-white shadow-sm'
                            : 'bg-white/5 border-white/15 text-slate-300 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {mode === 'virtual' && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Pick a Day
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {businessDays.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setApptDay(d)}
                          className={`py-2 px-2.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                            apptDay === d
                              ? 'bg-[#0066CC] border-[#00A8E8] text-white shadow-sm'
                              : 'bg-white/5 border-white/15 text-slate-300 hover:text-white'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Preferred Time Window
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {windowOptions.map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setApptWindow(w)}
                          className={`py-2 px-1.5 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                            apptWindow === w
                              ? 'bg-[#0066CC] border-[#00A8E8] text-white shadow-sm'
                              : 'bg-white/5 border-white/15 text-slate-300 hover:text-white'
                          }`}
                        >
                          {w.replace(' EST', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {errorMsg && (
                <p className="text-rose-400 text-xs font-semibold">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 px-6 rounded-xl bg-[#0066CC] hover:bg-[#00A8E8] text-white font-extrabold text-base shadow-lg shadow-[#0066CC]/30 transition cursor-pointer disabled:opacity-60"
              >
                {status === 'submitting'
                  ? 'Sending to Jasmel...'
                  : mode === 'text'
                    ? '💬 You Text Me →'
                    : mode === 'virtual'
                      ? '🗓️ Book Free Virtual Consultation →'
                      : '📞 You Call Me →'}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <a
                href="tel:+17866432099"
                className="text-[#00A8E8] hover:text-white font-bold transition"
              >
                📞 I’ll Call You · (786) 643-2099
              </a>
              <a
                href={prospectSmsHref}
                className="text-slate-300 hover:text-white font-semibold transition"
              >
                ✉️ I’ll Text You →
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
    <Suspense fallback={<div className="min-h-[84vh] bg-[#040914]" />}>
      <CallMeFormInner />
    </Suspense>
  );
}
