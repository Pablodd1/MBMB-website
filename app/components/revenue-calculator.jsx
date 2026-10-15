"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RevenueCalculator({ inline = false }) {
  const [billingVolume, setBillingVolume] = useState(65000);
  const [currentDenialRate, setCurrentDenialRate] = useState(16);
  const [mbmbRate, setMbmbRate] = useState(5.6);
  const [feeBasis, setFeeBasis] = useState('recovered'); // 'recovered' or 'total'

  const [results, setResults] = useState({
    currentLost: 0,
    recoveredGross: 0,
    feeOnRecovered: 0,
    feeOnTotalCollections: 0,
    appliedFee: 0,
    monthlyNetGain: 0,
    yearlyNetGain: 0,
  });

  useEffect(() => {
    // Current monthly revenue lost to denials
    const currentLost = (billingVolume * currentDenialRate) / 100;
    // Illustrative model: reducing denial rate toward a 2% residual benchmark (98% clean claim target)
    const effectiveDenialReduction = Math.max(0, currentDenialRate - 2);
    const recoveredGross = (billingVolume * effectiveDenialReduction) / 100;
    // Projected total monthly collections after recovery (98% of billed volume)
    const projectedTotalCollections = billingVolume * 0.98;

    const feeOnRecovered = (recoveredGross * mbmbRate) / 100;
    const feeOnTotalCollections = (projectedTotalCollections * mbmbRate) / 100;

    const appliedFee = feeBasis === 'recovered' ? feeOnRecovered : feeOnTotalCollections;
    const monthlyNetGain = Math.round(recoveredGross - appliedFee);
    const yearlyNetGain = monthlyNetGain * 12;

    setResults({
      currentLost: Math.round(currentLost),
      recoveredGross: Math.round(recoveredGross),
      feeOnRecovered: Math.round(feeOnRecovered),
      feeOnTotalCollections: Math.round(feeOnTotalCollections),
      appliedFee: Math.round(appliedFee),
      monthlyNetGain,
      yearlyNetGain,
    });
  }, [billingVolume, currentDenialRate, mbmbRate, feeBasis]);

  if (inline) {
    return (
      <div
        id="calculator"
        className="scroll-mt-28 w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#0a1628] via-[#1A3A5F] to-[#0066CC] text-white px-6 py-6 md:px-10 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#00A8E8] bg-white/10 px-3 py-1 rounded-full mb-2">
                Interactive ROI &amp; Denial Leakage Calculator
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">
                How Much Revenue Is Your Practice Losing to Denials?
              </h2>
              <p className="text-slate-200 text-sm mt-1">
                Adjust your monthly volume, denial rate, and fee basis to model illustrative recovery with MBMB&apos;s Human + AI double-check workflow.
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center shrink-0">
              <div className="text-xs text-slate-300 uppercase tracking-wider">
                Est. Annual Impact ({feeBasis === 'recovered' ? 'Incremental Basis' : 'Full-RCM Net'})
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-[#00A8E8]">
                {results.yearlyNetGain >= 0 ? '+' : '-'}${Math.abs(results.yearlyNetGain).toLocaleString()}/yr
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 grid lg:grid-cols-12 gap-8 items-start">
          {/* Sliders & Tier Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Monthly Billing Volume */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="calc-volume" className="text-sm font-bold text-slate-800">
                  1. Monthly Practice Billing Volume
                </label>
                <span className="text-base font-extrabold text-[#0066CC] bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg">
                  ${billingVolume.toLocaleString()}/mo
                </span>
              </div>
              <input
                id="calc-volume"
                type="range"
                min="15000"
                max="500000"
                step="5000"
                value={billingVolume}
                onChange={(e) => setBillingVolume(Number(e.target.value))}
                className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-[#0066CC] bg-slate-200"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1.5 font-medium">
                <span>$15K/mo (Solo Practice)</span>
                <span>$150K/mo (Group Clinic)</span>
                <span>$500K/mo (Multi-Site)</span>
              </div>
            </div>

            {/* Current Denial Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="calc-denial" className="text-sm font-bold text-slate-800">
                  2. Current Claim Denial / Leakage Rate
                </label>
                <span className="text-base font-extrabold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-lg">
                  {currentDenialRate}% Denials
                </span>
              </div>
              <input
                id="calc-denial"
                type="range"
                min="3"
                max="35"
                step="1"
                value={currentDenialRate}
                onChange={(e) => setCurrentDenialRate(Number(e.target.value))}
                className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-red-600 bg-slate-200"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1.5 font-medium">
                <span>3% (Low)</span>
                <span className="text-red-600 font-semibold">Typical Unaudited: 14–18%</span>
                <span>35% (High Leakage)</span>
              </div>
            </div>

            {/* Service Tier Selection */}
            <div>
              <span className="text-sm font-bold text-slate-800 block mb-2">
                3. Select Illustrative MBMB Collection Tier (5.6%–10%)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { rate: 5.6, name: '$50K+/mo Tier', desc: 'High-Volume RCM' },
                  { rate: 6.5, name: '$40K–$50K/mo', desc: 'Established Clinic' },
                  { rate: 7.5, name: '$20K–$30K/mo', desc: 'Growing Practice' },
                  { rate: 10, name: 'New / Startup', desc: 'Under $20K/mo' },
                ].map((tier) => (
                  <button
                    key={tier.rate}
                    type="button"
                    onClick={() => setMbmbRate(tier.rate)}
                    className={`p-3 rounded-xl text-left transition-all border-2 cursor-pointer ${
                      mbmbRate === tier.rate
                        ? 'bg-[#0a1628] text-white border-[#0066CC] shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#0066CC]/50'
                    }`}
                  >
                    <div className="text-base font-extrabold">{tier.rate}%</div>
                    <div className="text-xs font-semibold mt-0.5">{tier.name}</div>
                    <div className={`text-[11px] mt-0.5 ${mbmbRate === tier.rate ? 'text-[#00A8E8]' : 'text-slate-500'}`}>
                      {tier.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Fee Basis Selector */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                4. Fee Calculation Basis
              </span>
              <div className="grid sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFeeBasis('recovered')}
                  className={`p-2.5 rounded-lg text-left text-xs border transition-all cursor-pointer ${
                    feeBasis === 'recovered'
                      ? 'bg-[#0066CC] text-white border-[#0066CC] font-semibold'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="block font-bold">Fee on Recovered Denials Only</span>
                  <span className={feeBasis === 'recovered' ? 'text-blue-100' : 'text-slate-500'}>
                    Models fee strictly on newly recovered denial dollars (${results.feeOnRecovered.toLocaleString()}/mo)
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setFeeBasis('total')}
                  className={`p-2.5 rounded-lg text-left text-xs border transition-all cursor-pointer ${
                    feeBasis === 'total'
                      ? 'bg-[#0066CC] text-white border-[#0066CC] font-semibold'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="block font-bold">Full-Cycle RCM Fee (All Collections)</span>
                  <span className={feeBasis === 'total' ? 'text-blue-100' : 'text-slate-500'}>
                    Models {mbmbRate}% fee across all projected collections (${results.feeOnTotalCollections.toLocaleString()}/mo)
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-200 pb-3">
              Your Practice Recovery Breakdown
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Current Uncollected / Denied Revenue:</span>
                <span className="font-bold text-red-600">-${results.currentLost.toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Gross Denials Recovered (at 98% Target):</span>
                <span className="font-bold text-slate-900">+${results.recoveredGross.toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">
                  {feeBasis === 'recovered'
                    ? `Fee on Recovered Revenue (${mbmbRate}%):`
                    : `Full-Cycle RCM Fee on Total Collections (${mbmbRate}%):`}
                </span>
                <span className="font-medium text-slate-700">-${results.appliedFee.toLocaleString()}/mo</span>
              </div>
              <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200">
                <strong>Fee Basis Note:</strong> Full-service RCM contracts apply the agreed percentage ({mbmbRate}%) to total monthly collections (est. <strong>${results.feeOnTotalCollections.toLocaleString()}/mo</strong>), replacing in-house billing overhead. Incremental fee on recovered denials alone is <strong>${results.feeOnRecovered.toLocaleString()}/mo</strong>.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center">
                <p className="text-xs text-slate-500 font-medium">Monthly Net Impact</p>
                <p className="text-xl font-extrabold text-emerald-600 mt-0.5">
                  {results.monthlyNetGain >= 0 ? '+' : '-'}${Math.abs(results.monthlyNetGain).toLocaleString()}
                </p>
              </div>
              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-center">
                <p className="text-xs text-emerald-800 font-semibold">12-Month Net Impact</p>
                <p className="text-xl font-extrabold text-emerald-700 mt-0.5">
                  {results.yearlyNetGain >= 0 ? '+' : '-'}${Math.abs(results.yearlyNetGain).toLocaleString()}
                </p>
              </div>
            </div>

            <Link
              href="/consultation"
              className="block w-full text-center bg-[#0066CC] hover:bg-[#1A3A5F] text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-[#0066CC]/25 transition-all"
            >
              Claim Your Free 48-Hour Billing Audit →
            </Link>
            <p className="text-center text-[11px] text-slate-500 leading-relaxed">
              <strong>Illustrative estimate, not a guarantee.</strong> Pricing depends on agreed services, claim volume, and complexity ($0 setup fee). Request a written proposal detailing fees and included services.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
