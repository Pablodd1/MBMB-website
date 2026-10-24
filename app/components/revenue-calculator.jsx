"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RevenueCalculator({ inline = false }) {
  const [isOpen, setIsOpen] = useState(inline);
  const [billingVolume, setBillingVolume] = useState(65000);
  const [currentDenialRate, setCurrentDenialRate] = useState(16);
  const [mbmbRate, setMbmbRate] = useState(5.6);

  const [results, setResults] = useState({
    currentLost: 0,
    recoveredGross: 0,
    mbmbFee: 0,
    monthlyNetGain: 0,
    yearlyNetGain: 0,
  });

  useEffect(() => {
    // Current monthly revenue lost to denials
    const currentLost = (billingVolume * currentDenialRate) / 100;
    // MBMB maintains a 98% clean claim rate (2% residual denial rate)
    const effectiveDenialReduction = Math.max(0, currentDenialRate - 2);
    const recoveredGross = (billingVolume * effectiveDenialReduction) / 100;
    // Fee on the newly recovered revenue at the selected tier rate
    const mbmbFee = (recoveredGross * mbmbRate) / 100;
    const monthlyNetGain = Math.max(0, recoveredGross - mbmbFee);
    const yearlyNetGain = monthlyNetGain * 12;

    setResults({
      currentLost: Math.round(currentLost),
      recoveredGross: Math.round(recoveredGross),
      mbmbFee: Math.round(mbmbFee),
      monthlyNetGain: Math.round(monthlyNetGain),
      yearlyNetGain: Math.round(yearlyNetGain),
    });
  }, [billingVolume, currentDenialRate, mbmbRate]);

  if (inline) {
    return (
      <div id="calculator" className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
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
                Adjust your monthly collections and current denial rate to calculate your annual recovery with MBMB&apos;s 98% clean claim standard.
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center shrink-0">
              <div className="text-xs text-slate-300 uppercase tracking-wider">Est. Annual Net Recovery</div>
              <div className="text-2xl md:text-3xl font-extrabold text-[#00A8E8]">
                +${results.yearlyNetGain.toLocaleString()}/yr
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 grid lg:grid-cols-12 gap-8 items-center">
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
                <span className="text-red-600 font-semibold">Miami Avg: 14–18%</span>
                <span>35% (High Leakage)</span>
              </div>
            </div>

            {/* Service Tier Selection */}
            <div>
              <span className="text-sm font-bold text-slate-800 block mb-2">
                3. Select MBMB Performance Tier (Pay Only When We Collect)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { rate: 5.6, name: 'Basic Billing', desc: 'Claims & Posting' },
                  { rate: 6.5, name: 'Standard', desc: '+ AR & Eligibility' },
                  { rate: 7.5, name: 'Full Service', desc: '+ Denials & CAQH' },
                  { rate: 10, name: 'Enterprise RCM', desc: 'Full End-to-End' },
                ].map((tier) => (
                  <button
                    key={tier.rate}
                    type="button"
                    onClick={() => setMbmbRate(tier.rate)}
                    className={`p-3 rounded-xl text-left transition-all border-2 ${
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
                <span className="text-slate-600">Gross Recovered (at 98% Clean Rate):</span>
                <span className="font-bold text-slate-900">+${results.recoveredGross.toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Est. MBMB Performance Fee ({mbmbRate}%):</span>
                <span className="font-medium text-slate-600">-${results.mbmbFee.toLocaleString()}/mo</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center">
                <p className="text-xs text-slate-500 font-medium">Monthly Net Gain</p>
                <p className="text-xl font-extrabold text-emerald-600 mt-0.5">
                  +${results.monthlyNetGain.toLocaleString()}
                </p>
              </div>
              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-center">
                <p className="text-xs text-emerald-800 font-semibold">12-Month Net Gain</p>
                <p className="text-xl font-extrabold text-emerald-700 mt-0.5">
                  +${results.yearlyNetGain.toLocaleString()}
                </p>
              </div>
            </div>

            <Link
              href="/consultation"
              className="block w-full text-center bg-[#0066CC] hover:bg-[#1A3A5F] text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-[#0066CC]/25 transition-all"
            >
              Claim Your Free 48-Hour Billing Audit →
            </Link>
            <p className="text-center text-xs text-slate-500">
              Zero upfront fees · HIPAA BAA signed · Cancel anytime with 30 days notice
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
