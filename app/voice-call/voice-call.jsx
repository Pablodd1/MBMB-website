'use client'
import React, { useState } from 'react';

export default function VoiceCallButton() {
  const [isHovered, setIsHovered] = useState(false);
  const officeNumber = '+1-786-643-2099';

  return (
    <a
      href={`tel:${officeNumber.replace(/-/g, '')}`}
      className="fixed bottom-20 md:bottom-6 left-6 z-50 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center"
      aria-label="Call Now"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered ? '0 0 30px rgba(236, 72, 153, 0.6)' : '0 10px 25px rgba(0, 0, 0, 0.3)'
      }}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    </a>
  );
}
