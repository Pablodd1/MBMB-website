'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trackMBMBEvent } from '../components/MarketingAndAnalyticsScripts';

const inputClasses =
  'w-full px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl focus:outline-none focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/30 shadow-2xs font-medium text-sm transition-all';

export default function ProviderAuditForm() {
  const [formLoadedAt] = useState(() => Date.now());
  const [formData, setFormData] = useState({
    fullName: '',
    practiceName: '',
    email: '',
    phone: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const validate = () => {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.fullName.trim()) nextErrors.fullName = 'Your name is required.';
    if (!formData.practiceName.trim()) nextErrors.practiceName = 'Practice name & specialty are required.';
    if (!formData.email.trim()) {
      nextErrors.email = 'Work email is required.';
    } else if (!emailRegex.test(formData.email)) {
      nextErrors.email = 'Please enter a valid work email address.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setStatus(null);
    try {
      const response = await fetch('/my-api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          practiceName: formData.practiceName,
          serviceInterest: 'Free 20-Claim 48-Hour Revenue Audit',
          message: formData.phone
            ? `Phone: ${formData.phone}${formData.message ? ` | Notes: ${formData.message}` : ''}`
            : formData.message,
          website: formData.website,
          formLoadedAt,
        }),
      });

      if (response.ok) {
        trackMBMBEvent('generate_lead', {
          event_category: 'lead_submission',
          form_location: '/for-providers',
        });
        setStatus({
          type: 'success',
          text: 'Registration received. Our AAPC-certified team will reach out within 1 business day to schedule your free 48-hour 20-claim audit.',
        });
        setFormData({
          fullName: '',
          practiceName: '',
          email: '',
          phone: '',
          message: '',
          website: '',
        });
      } else {
        setStatus({
          type: 'error',
          text: 'Could not submit right now. Please call (786) 643-2099 or email Jasmel@medicalbillingmb.com.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        text: 'Connection error. Please call (786) 643-2099 or email Jasmel@medicalbillingmb.com.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      toolname="request_provider_20_claim_audit"
      tooldescription="Register a Florida medical practice for a free 48-hour 20-claim billing and coding audit on /for-providers. Do not submit patient PHI."
      className="space-y-4"
      noValidate
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="provider-website">Website</label>
        <input
          id="provider-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      {status && (
        <output
          className={`block p-4 rounded-xl text-sm font-medium border ${
            status.type === 'success'
              ? 'bg-emerald-500/15 text-emerald-200 border-emerald-400/40'
              : 'bg-rose-500/15 text-rose-200 border-rose-400/40'
          }`}
        >
          {status.text}
        </output>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="provider-fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
            Full Name *
          </label>
          <input
            id="provider-fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Dr. Jane Smith / Office Manager"
            className={inputClasses}
            required
          />
          {errors.fullName && <p className="text-rose-400 text-xs mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="provider-email" className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
            Work Email *
          </label>
          <input
            id="provider-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="doctor@practice.com"
            className={inputClasses}
            required
          />
          {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="provider-practiceName" className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
            Practice Name &amp; Specialty *
          </label>
          <input
            id="provider-practiceName"
            name="practiceName"
            type="text"
            value={formData.practiceName}
            onChange={handleChange}
            placeholder="Miami Beach Cardiology Associates"
            className={inputClasses}
            required
          />
          {errors.practiceName && <p className="text-rose-400 text-xs mt-1">{errors.practiceName}</p>}
        </div>

        <div>
          <label htmlFor="provider-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
            Direct Phone (Optional)
          </label>
          <input
            id="provider-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(786) 555-0199"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="provider-message" className="block text-xs font-bold uppercase tracking-wider text-slate-200 mb-1.5">
          Current EHR &amp; Denial Notes (Optional)
        </label>
        <textarea
          id="provider-message"
          name="message"
          rows={2}
          value={formData.message}
          onChange={handleChange}
          aria-describedby="provider-phi-warning"
          placeholder="e.g., eClinicalWorks, CO-16/CO-50 denials, 800 claims/month..."
          className={inputClasses}
        />
        <p id="provider-phi-warning" className="mt-2 text-xs text-amber-200 bg-amber-500/10 border border-amber-400/30 rounded-lg px-3 py-2 leading-relaxed">
          <strong>Privacy Notice:</strong> Do not enter patient names, DOBs, insurance IDs, or medical records (PHI). Review our{' '}
          <Link href="/privacy-policy" className="text-[#00A8E8] underline font-semibold">
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 px-6 rounded-xl font-bold text-base bg-gradient-to-r from-[#0066CC] to-[#00A8E8] hover:opacity-95 text-white shadow-lg shadow-[#0066CC]/30 transition cursor-pointer disabled:opacity-50"
      >
        {submitting ? 'Submitting Request...' : 'Claim My Free 20-Claim Audit →'}
      </button>
    </form>
  );
}
