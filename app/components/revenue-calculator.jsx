"use client";
import React, { useState, useEffect } from 'react';

export default function RevenueCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [billingVolume, setBillingVolume] = useState(50000);
  const [currentDenialRate, setCurrentDenialRate] = useState(15);
  const [mbmbRate, setMbmbRate] = useState(5.6);

  const [results, setResults] = useState({
    currentLost: 0,
    withMbmb: 0,
    monthlyGain: 0,
    yearlyGain: 0,
    savingsPercent: 0
  });

  useEffect(() => {
    const currentLost = (billingVolume * currentDenialRate) / 100;
    const withMbmbLost = (billingVolume * (100 - 98)) / 100;
    const monthlyGain = currentLost - withMbmbLost;
    const yearlyGain = monthlyGain * 12;
    const savingsPercent = currentDenialRate > 2 ? ((currentDenialRate - 2) / currentDenialRate) * 100 : 0;

    setResults({
      currentLost: Math.round(currentLost),
      withMbmbLost: Math.round(withMbmbLost),
      monthlyGain: Math.round(monthlyGain),
      yearlyGain: Math.round(yearlyGain),
      savingsPercent: Math.round(savingsPercent)
    });
  }, [billingVolume, currentDenialRate, mbmbRate]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-36 right-20 z-50 group"
        aria-label="Open Revenue Calculator"
        title="Open Revenue Calculator"
      >
        {/* Pulsing outer ring */}
        <span className="absolute inset-0 rounded-full bg-[#026711]/20 animate-ping" />
        {/* Main button */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#026711] to-[#015a0e] text-white shadow-xl flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(2,103,17,0.5)] transition-all duration-300 group-hover:scale-110 border-2 border-white/20">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        {/* Hover label */}
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs font-semibold text-[#026711] whitespace-nowrap bg-white/90 px-2 py-0.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Calculate Fees
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-36 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)]">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#026711] to-[#015a0e] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-inner">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3v18h18" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 13l3-3 3 3 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">Calculate Fees</h3>
                <p className="text-[10px] text-white/75">See how much MBMB can save</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="space-y-5">

            {/* Billing Volume */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-800">
                  Monthly Billing Volume
                </label>
                <span className="text-sm font-bold text-[#026711] bg-[#026711]/8 px-2 py-0.5 rounded-lg">
                  ${billingVolume.toLocaleString()}
                </span>
              </div>
              <input
                type="number"
                value={billingVolume}
                onChange={(e) => setBillingVolume(Number(e.target.value))}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#026711] transition-colors text-gray-800 font-medium"
              />
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={billingVolume}
                onChange={(e) => setBillingVolume(Number(e.target.value))}
                className="w-full mt-2 h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #026711 0%, #026711 ${((billingVolume - 10000) / 490000) * 100}%, #e5e7eb ${((billingVolume - 10000) / 490000) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$10K</span>
                <span>$500K</span>
              </div>
            </div>

            {/* Denial Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-800">
                  Current Denial Rate
                </label>
                <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-lg">
                  {currentDenialRate}%
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={currentDenialRate}
                  onChange={(e) => setCurrentDenialRate(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${((currentDenialRate - 1) / 39) * 100}%, #e5e7eb ${((currentDenialRate - 1) / 39) * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1%</span>
                <span className="text-red-500 font-medium">Your rate: {currentDenialRate}%</span>
                <span>40%</span>
              </div>
            </div>

            {/* MBMB Rate */}
            <div>
              <label className="text-sm font-semibold text-gray-800 block mb-2">
                MBMB Service Tier
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5.6, 6.5, 8, 10].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setMbmbRate(rate)}
                    className={`py-2 rounded-xl text-sm font-semibold transition-all border-2 ${
                      mbmbRate === rate
                        ? 'bg-[#026711] text-white border-[#026711] shadow-md'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#026711]/40'
                    }`}
                  >
                    {rate}%
                    <div className="text-xs opacity-70 font-normal">
                      {rate === 5.6 ? 'Base' : rate === 6.5 ? 'Std' : rate === 8 ? 'Prem' : 'Ent'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="mt-5 p-4 bg-gradient-to-br from-[#026711]/5 to-[#026711]/10 rounded-2xl border-2 border-[#026711]/20">
            <h4 className="font-bold text-gray-900 text-center text-xs mb-3 uppercase tracking-wide">
              Your Potential Savings with MBMB
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 font-medium">Monthly Gain</p>
                <p className="text-xl font-black text-[#026711]">
                  ${results.monthlyGain.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 font-medium">Yearly Gain</p>
                <p className="text-xl font-black text-[#026711]">
                  ${results.yearlyGain.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-3 text-center text-sm text-gray-600">
              MBMB's <span className="font-bold text-[#026711]">98% clean claim rate</span> vs your {currentDenialRate}% denial rate
            </div>
          </div>

          {/* CTA */}
          <a
            href="/consultation"
            onClick={() => setIsOpen(false)}
            className="mt-4 block w-full text-center bg-gradient-to-r from-[#026711] to-[#015a0e] text-white py-3.5 rounded-xl font-bold text-base hover:shadow-lg hover:shadow-[#026711]/30 transition-all active:scale-[0.98]"
          >
            Get Your Free Audit →
          </a>

          <p className="text-center text-xs text-gray-400 mt-2">
            No commitment. 100% free analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
