'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const inputClasses =
  'w-full px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-xl focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/25 shadow-2xs font-medium text-sm transition-all';

export default function AttorneyPilotForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    firmName: '',
    email: '',
    phone: '',
    serviceInterest: 'Itemized Bill & EOB Organization Pilot',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text: string }

  const validate = () => {
    const nextErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.fullName.trim()) nextErrors.fullName = 'Your name is required.';
    if (!formData.firmName.trim()) nextErrors.firmName = 'Your law firm name is required.';
    if (!formData.email.trim()) {
      nextErrors.email = 'Business email is required.';
    } else if (!emailRegex.test(formData.email)) {
      nextErrors.email = 'Please enter a valid business email address.';
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
          inquiryType: 'attorney-pilot',
          fullName: formData.fullName,
          firmName: formData.firmName,
          practiceName: `${formData.firmName} (Law Firm Pilot)`,
          email: formData.email,
          phone: formData.phone,
          serviceInterest: formData.serviceInterest,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          text: 'Thank you. Your pilot inquiry has been received. Our coordination team will follow up within 1 business day to discuss an agreed document-sharing workflow.',
        });
        setFormData({
          fullName: '',
          firmName: '',
          email: '',
          phone: '',
          serviceInterest: 'Itemized Bill & EOB Organization Pilot',
          message: '',
        });
      } else {
        setStatus({
          type: 'error',
          text: 'We could not process your request right now. Please call (786) 643-2099 or email Jasmel@medicalbillingmb.com.',
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
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {status && (
        <div
          role="status"
          className={`p-4 rounded-xl text-sm font-medium border ${
            status.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
              : 'bg-rose-50 text-rose-900 border-rose-200'
          }`}
        >
          {status.text}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="attorney-fullName" className="block text-sm font-bold text-slate-800 mb-1.5">
            Name *
          </label>
          <input
            id="attorney-fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Alex Rivera, Esq. / Paralegal"
            className={inputClasses}
            required
          />
          {errors.fullName && <p className="text-rose-600 text-xs mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="attorney-firmName" className="block text-sm font-bold text-slate-800 mb-1.5">
            Firm *
          </label>
          <input
            id="attorney-firmName"
            name="firmName"
            type="text"
            value={formData.firmName}
            onChange={handleChange}
            placeholder="Rivera & Associates, P.A."
            className={inputClasses}
            required
          />
          {errors.firmName && <p className="text-rose-600 text-xs mt-1">{errors.firmName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="attorney-email" className="block text-sm font-bold text-slate-800 mb-1.5">
            Business Email *
          </label>
          <input
            id="attorney-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="arivera@lawfirm.com"
            className={inputClasses}
            required
          />
          {errors.email && <p className="text-rose-600 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="attorney-phone" className="block text-sm font-bold text-slate-800 mb-1.5">
            Business Phone (Optional)
          </label>
          <input
            id="attorney-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(305) 555-0199"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="attorney-serviceInterest" className="block text-sm font-bold text-slate-800 mb-1.5">
          General Service Interest
        </label>
        <select
          id="attorney-serviceInterest"
          name="serviceInterest"
          value={formData.serviceInterest}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="Itemized Bill & EOB Organization Pilot">Itemized Bill &amp; EOB Organization Pilot</option>
          <option value="Charges, Payments, Adjustments & Balance Reconciliation">
            Charges, Payments, Adjustments &amp; Balance Reconciliation
          </option>
          <option value="Source-Linked Administrative Billing Questions">
            Source-Linked Administrative Billing Questions
          </option>
          <option value="General Law Firm Workflow Discussion">General Law Firm Workflow Discussion</option>
        </select>
      </div>

      <div>
        <label htmlFor="attorney-message" className="block text-sm font-bold text-slate-800 mb-1.5">
          General Workflow Notes (Optional — Non-Sensitive Only)
        </label>
        <textarea
          id="attorney-message"
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          aria-describedby="attorney-phi-warning"
          placeholder="e.g., Typical number of providers per file, preferred spreadsheet/table format, or best time for a 15-minute intro call..."
          className={inputClasses}
        />
        <div
          id="attorney-phi-warning"
          className="mt-2.5 p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 leading-relaxed"
        >
          <strong>Privacy &amp; Confidentiality Notice:</strong> Do not include client names, medical records, dates of birth, insurance IDs, or other sensitive details in this form. Review our{' '}
          <Link href="/privacy-policy" className="text-[#0066CC] font-bold underline hover:text-slate-900">
            Privacy Policy
          </Link>.
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 px-6 rounded-xl font-bold text-base bg-[#0066CC] hover:bg-[#1A3A5F] text-white shadow-lg shadow-[#0066CC]/25 transition-all disabled:opacity-50 cursor-pointer"
      >
        {submitting ? 'Submitting Inquiry...' : 'Discuss a Pilot File →'}
      </button>
    </form>
  );
}
