'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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

  const specialties = [
    'Family Medicine', 'Internal Medicine', 'Pediatrics', 'Cardiology',
    'Dermatology', 'Orthopedics', 'OB/GYN', 'Urgent Care',
    'General Surgery', 'Psychiatry', 'Oncology', 'Other'
  ];

  useEffect(() => {
    if (isOpen) {
      loadAvailability();
    }
  }, [isOpen]);

  const loadAvailability = async () => {
    setLoading(true);
    try {
      // In production, this would fetch from your API
      // For now, we'll generate realistic slots
      const days = [];
      const today = new Date();
      for (let i = 1; i <= 14; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        if (date.getDay() !== 0) { // Skip Sundays
          days.push({
            date: date.toISOString().split('T')[0],
            dayName: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
            slots: [
              { time: '4:00 PM', available: Math.random() > 0.3 },
              { time: '4:30 PM', available: Math.random() > 0.3 },
              { time: '5:00 PM', available: Math.random() > 0.3 },
              { time: '5:30 PM', available: Math.random() > 0.3 }
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
      // In production, this creates Google Calendar event + Brevo email
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selected_slot: selectedSlot,
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
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <span className="absolute inset-0 rounded-full bg-pink-500/20 animate-ping" />
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-pink-700 text-white shadow-xl flex items-center justify-center group-hover:shadow-pink-500/50 transition-all duration-300 group-hover:scale-110 border-2 border-white/30">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-semibold text-pink-600 whitespace-nowrap bg-white/90 px-2 py-0.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Book Now
        </span>
      </button>
    );
  }

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">You're Booked!</h3>
          <p className="text-gray-600 mb-2">Check your email for confirmation.</p>
          <p className="text-sm text-gray-500 mb-6">We've sent a Google Meet link and calendar invite to {formData.email}</p>
          <button
            onClick={() => { setIsOpen(false); setSuccess(false); }}
            className="w-full py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-pink-800 text-white px-8 py-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Book Your Free Billing Assessment</h3>
              <p className="text-pink-100 text-sm mt-1">30 minutes · Google Meet · No obligation</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
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
              <h4 className="font-semibold text-gray-800 mb-4">Select a Date & Time</h4>
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-gray-500">Loading availability...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {slots.map((day) => (
                    <div key={day.date} className="border border-gray-100 rounded-xl p-4">
                      <h5 className="font-medium text-gray-700 mb-3">{day.dayName}</h5>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {day.slots.map((slot, idx) => (
                          <button
                            key={idx}
                            disabled={!slot.available}
                            onClick={() => setSelectedSlot({ date: day.date, time: slot.time, dayName: day.dayName })}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                              slot.available
                                ? 'bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200'
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
              <div className="bg-pink-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-pink-800">
                  <strong>Selected:</strong> {selectedSlot.dayName} at {selectedSlot.time}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedSlot(null)}
                  className="text-xs text-pink-600 underline mt-1"
                >
                  Change
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Dr. Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="jane@practice.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="+1 786-643-2099"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Practice Name</label>
                  <input
                    type="text"
                    value={formData.practice}
                    onChange={(e) => setFormData({ ...formData, practice: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Sunrise Medical Group"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                <select
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select specialty...</option>
                  {specialties.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Biggest Billing Challenge</label>
                <textarea
                  rows={3}
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., High denial rate, slow payments, credentialing delays..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all disabled:opacity-50"
              >
                {submitting ? 'Booking...' : 'Confirm Booking'}
              </button>

              <p className="text-xs text-gray-400 text-center">
                By booking, you agree to our terms. We'll send a Google Meet link and calendar invite.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
