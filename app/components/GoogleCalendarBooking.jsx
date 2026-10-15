'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function GoogleCalendarBooking() {
  const [isOpen, setIsOpen] = useState(false);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    practice: '',
    specialty: '',
    challenge: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const triggerButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  const specialties = [
    'Family Medicine', 'Internal Medicine', 'Pediatrics', 'Cardiology',
    'Dermatology', 'Orthopedics', 'OB/GYN', 'Urgent Care',
    'General Surgery', 'Psychiatry', 'Oncology', 'Law Firm / Attorney Pilot', 'Other'
  ];

  useEffect(() => {
    if (isOpen) {
      loadAvailability();
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setSuccess(false);
    setTimeout(() => {
      triggerButtonRef.current?.focus();
    }, 50);
  };

  const loadAvailability = async () => {
    setLoading(true);
    try {
      const days = [];
      const today = new Date();
      for (let i = 1; i <= 14; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        const dayOfWeek = date.getDay();
        // Match Mon–Fri (9:00 AM – 6:00 PM EST) office hours; skip Sunday (0) and Saturday (6)
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          days.push({
            date: date.toISOString().split('T')[0],
            dayName: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
            slots: [
              { time: '10:00 AM EST', available: true },
              { time: '11:30 AM EST', available: true },
              { time: '2:00 PM EST', available: true },
              { time: '4:00 PM EST', available: true }
            ]
          });
        }
      }
      setSlots(days);
    } catch (err) {
      console.error('Failed to load availability');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selected_slot: selectedSlot,
          timezone: 'America/New_York (EST/EDT)',
          meeting_type: 'Free Billing Assessment'
        })
      });

      if (response.ok) {
        setSuccess(true);
      }
    } catch (err) {
      console.error('Booking failed', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        ref={triggerButtonRef}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group cursor-pointer"
        aria-label="Book Free Billing Audit"
      >
        <span className="absolute inset-0 rounded-full bg-[#0066CC]/20 animate-ping" />
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#0066CC] to-[#1A3A5F] text-white shadow-xl flex items-center justify-center group-hover:shadow-[#0066CC]/50 transition-all duration-300 group-hover:scale-110 border-2 border-white/30">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-semibold text-[#0066CC] whitespace-nowrap bg-white/95 px-2 py-0.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Book Audit
        </span>
      </button>
    );
  }

  if (success) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-confirmed-title"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      >
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 id="booking-confirmed-title" className="text-2xl font-bold text-gray-900 mb-2">You&apos;re Booked!</h3>
          <p className="text-gray-600 mb-2">Check your email for confirmation.</p>
          <p className="text-sm text-gray-500 mb-6">
            We&apos;ve sent a confirmation for {selectedSlot?.dayName} ({selectedSlot?.time}, Eastern Time) to {formData.email}
          </p>
          <button
            onClick={handleClose}
            className="w-full py-3 bg-[#0066CC] text-white rounded-xl font-semibold hover:bg-[#1A3A5F] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0a1628] to-[#0066CC] text-white px-8 py-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 id="booking-modal-title" className="text-xl font-bold">Book Your Free Billing Assessment</h3>
              <p className="text-blue-100 text-sm mt-1">
                30 minutes · Mon–Fri · Times shown in Eastern Time (America/New_York, EST/EDT)
              </p>
            </div>
            <button
              ref={closeButtonRef}
              onClick={handleClose}
              aria-label="Close booking"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-8 max-h-[70vh] overflow-y-auto">
          {!selectedSlot ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <h4 className="font-semibold text-gray-800">Select a Weekday Date &amp; Time</h4>
                <span className="text-xs font-medium text-[#0066CC] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Timezone: America/New_York (EST/EDT)
                </span>
              </div>
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-[#0066CC] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-gray-500">Loading availability...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {slots.map((day) => (
                    <div key={day.date} className="border border-gray-200 rounded-xl p-4">
                      <h5 className="font-medium text-gray-800 mb-3">{day.dayName}</h5>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {day.slots.map((slot, idx) => (
                          <button
                            key={idx}
                            disabled={!slot.available}
                            onClick={() => setSelectedSlot({ date: day.date, time: slot.time, dayName: day.dayName })}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                              slot.available
                                ? 'bg-blue-50 text-[#0066CC] hover:bg-blue-100 border border-blue-200'
                                : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-100'
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-slate-900">
                  <strong>Selected:</strong> {selectedSlot.dayName} at {selectedSlot.time} (Eastern Time — America/New_York)
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedSlot(null)}
                  className="text-xs text-[#0066CC] font-semibold underline mt-1 cursor-pointer"
                >
                  Change Date/Time
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-white text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                    placeholder="Dr. Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="booking-email" className="block text-sm font-medium text-gray-700 mb-1">Work Email *</label>
                  <input
                    id="booking-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-white text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                    placeholder="jane@practice.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-white text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                    placeholder="+1 786-643-2099"
                  />
                </div>
                <div>
                  <label htmlFor="booking-practice" className="block text-sm font-medium text-gray-700 mb-1">Practice or Firm Name</label>
                  <input
                    id="booking-practice"
                    type="text"
                    value={formData.practice}
                    onChange={(e) => setFormData({ ...formData, practice: e.target.value })}
                    className="w-full px-4 py-2 bg-white text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                    placeholder="Sunrise Medical Group"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="booking-specialty" className="block text-sm font-medium text-gray-700 mb-1">Specialty / Inquiry Type</label>
                <select
                  id="booking-specialty"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-4 py-2 bg-white text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                >
                  <option value="">Select specialty...</option>
                  {specialties.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="booking-challenge" className="block text-sm font-medium text-gray-700 mb-1">Biggest Billing Challenge (Non-Sensitive Summary)</label>
                <textarea
                  id="booking-challenge"
                  rows={3}
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  className="w-full px-4 py-2 bg-white text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                  placeholder="e.g., High denial rate, slow payments, credentialing delays..."
                />
                <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2.5 mt-2">
                  <strong>Privacy Notice:</strong> Do not include patient names, dates of birth, medical records, insurance IDs, or other sensitive information in this form. Read our{' '}
                  <Link href="/privacy-policy" className="underline font-semibold text-[#0066CC]">
                    Privacy Policy
                  </Link>.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
