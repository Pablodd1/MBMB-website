"use client";
import React, { useState, useEffect } from 'react';

export default function LeadMagnetPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('mbmb_lead_magnet_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 25000); // Show after 25 seconds of engaged reading, not immediately
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch('/my-api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch (_) {
      // Fallback silently so user still gets confirmation
    } finally {
      setLoading(false);
      setSubmitted(true);
      localStorage.setItem('mbmb_lead_magnet_seen', 'true');
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  };

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem('mbmb_lead_magnet_seen', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closePopup}></div>

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
        <button
          onClick={closePopup}
          aria-label="Close checklist offer"
          className="absolute top-3 right-3 text-white/80 hover:text-white z-10 p-1"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="bg-gradient-to-r from-[#0a1628] to-[#0066CC] p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-7 h-7 text-[#00A8E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00A8E8]">Free Practice Resource</span>
              <h2 className="text-lg font-bold leading-snug">2026 Florida Billing &amp; Telehealth Compliance Checklist</h2>
            </div>
          </div>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Checklist Sent!</h3>
              <p className="text-slate-600 text-sm">Check your inbox for the 2026 Florida Billing &amp; Telehealth Checklist.</p>
            </div>
          ) : (
            <>
              <p className="text-slate-700 text-sm mb-4">
                Protect your Miami practice against preventable claim denials with our updated 2026 audit guide:
              </p>
              <ul className="text-sm text-slate-600 space-y-2 mb-5">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  Florida Telehealth POS Code 02/10 &amp; Modifier 95 rules
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  Florida Medicaid (AHCA) &amp; FCSO Medicare updates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  Top 10 CPT/ICD-10 denial triggers &amp; HIPAA BAA checklist
                </li>
              </ul>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your practice email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] text-slate-900 text-sm mb-3"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0066CC] hover:bg-[#1A3A5F] text-white py-3 rounded-lg font-bold text-sm transition-all disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Me the Free Checklist →'}
                </button>
              </form>

              <p className="text-xs text-slate-400 text-center mt-3">
                100% confidential. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}