"use client";
import React, { useState, useEffect } from 'react';

export default function RevenueCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [billingVolume, setBillingVolume] = useState(50000);
  const [currentDenialRate, setCurrentDenialRate] = useState(15);
  const [mbmbRate, setMbmbRate] = useState(6.5);
  
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
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
        aria-label="Open Revenue Calculator"
        title="Open Revenue Calculator"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span className="font-semibold text-base">Revenue Calculator</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-[420px] max-w-[calc(100vw-32px)]">
      <div className="bg-white rounded-2xl shadow-2xl border border-green-500/30 overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white" aria-label="Revenue Calculator header" role="region" aria-labelledby="revcalc-header-title revcalc-header-sub">
          <div id="revcalc-header-title" className="flex items-center justify-between" >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center" aria-hidden>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Chart icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l3-3 3 3 4-4"/>
                </svg>
              </div>
              <div>
                <h3 id="revcalc-header-title" className="font-bold text-sm">Revenue Calculator</h3>
                <p id="revcalc-header-sub" className="text-xs text-white/80">Estimate potential gains from MBMB improvements</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white" aria-label="Close Revenue Calculator" title="Close">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Billing Volume ($)
              </label>
              <input
                type="number"
                value={billingVolume}
                onChange={(e) => setBillingVolume(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={billingVolume}
                onChange={(e) => setBillingVolume(Number(e.target.value))}
                className="w-full mt-2 accent-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Denial Rate: {currentDenialRate}%
              </label>
              <input
                type="range"
                min="1"
                max="40"
                value={currentDenialRate}
                onChange={(e) => setCurrentDenialRate(Number(e.target.value))}
                className="w-full accent-red-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1%</span>
                <span>40%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" aria-label="MBMB Clean Claim Rate label">
                MBMB Clean Claim Rate: 98%
              </label>
              <div className="text-xs text-gray-500">MBMB Fee Rate: 6-8% (adjustable)</div>
              <select 
                aria-describedby="mbmb-help"
                value={mbmbRate}
                onChange={(e) => setMbmbRate(Number(e.target.value))}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value={6}>6% (Best Value)</option>
                <option value={6.5}>6.5% (Standard)</option>
                <option value={7}>7% (Premium)</option>
                <option value={8}>8% (Enterprise)</option>
              </select>
              <div id="mbmb-help" className="text-xs text-gray-500 mt-1">Adjust MBMB fee rate; affects your calculated gains and savings display.</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <h4 className="font-bold text-gray-900 text-center mb-3">Your Potential Gains</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Monthly Gain</p>
                <p className="text-xl font-bold text-green-600">${results.monthlyGain.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Yearly Gain</p>
                <p className="text-xl font-bold text-green-600">${results.yearlyGain.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-600">
                With MBMB's <span className="font-bold text-green-600">98% clean claim rate</span>, 
                you'd save <span className="font-bold text-green-600">${results.savingsPercent}%</span> on denials!
              </p>
            </div>
          </div>

          <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all">
            Get Free Audit →
          </button>
        </div>
      </div>
    </div>
  );
}
