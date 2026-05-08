'use client';

import ScrollReveal from './ScrollReveal';

/**
 * AIProcessFlow — Visual flow showing the AI billing pipeline
 * Paper Claims → AI Scanning → Smart Coding → Automated Submission → Payment Tracking
 * Uses scroll-triggered reveals with connecting lines
 */

const steps = [
  {
    label: 'Paper Claims',
    description: 'Physical or digital claim documents received',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: 'AI Scanning',
    description: 'OCR + NLP extracts data with 99.7% accuracy',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <circle cx="12" cy="10" r="3" />
        <path d="M12 7v-1" />
      </svg>
    ),
    highlight: true,
  },
  {
    label: 'Smart Coding',
    description: 'AI suggests optimal CPT/ICD-10 codes instantly',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    highlight: true,
  },
  {
    label: 'Auto Submission',
    description: 'Claims submitted to payers in real-time',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    label: 'Payment Tracking',
    description: 'Real-time status + AR aging analytics',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1v22" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
];

function FlowArrow() {
  return (
    <div className="hidden md:flex items-center justify-center w-12 shrink-0">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#00c8b1]/50">
        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function FlowArrowMobile() {
  return (
    <div className="flex md:hidden items-center justify-center h-10">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#00c8b1]/50">
        <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function AIProcessFlow() {
  return (
    <section className="w-full py-24 bg-[#0a1628] relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,200,177,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <ScrollReveal direction="up" distance={30}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff6b35]/30 bg-[#ff6b35]/5 mb-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <span className="text-[#ff6b35] text-sm font-medium tracking-wide">AUTOMATED PIPELINE</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              From Claim to <span style={{ color: '#00c8b1' }}>Payment</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our AI-powered workflow eliminates manual steps, reduces errors, and accelerates your revenue cycle from days to hours.
            </p>
          </div>
        </ScrollReveal>

        {/* Flow steps — horizontal on desktop, vertical on mobile */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-col md:flex-row items-center">
              <ScrollReveal delay={i * 200} direction="up" distance={30}>
                <div className="relative group">
                  {/* Card */}
                  <div
                    className={`
                      relative w-[220px] p-6 rounded-xl border text-center
                      transition-all duration-500
                      ${step.highlight
                        ? 'bg-[#00c8b1]/10 border-[#00c8b1]/40 shadow-lg shadow-[#00c8b1]/10'
                        : 'bg-[#0d1b2a] border-white/10 hover:border-white/20'
                      }
                    `}
                  >
                    {/* Step number */}
                    <div
                      className={`
                        absolute -top-3 left-1/2 -translate-x-1/2
                        w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                        ${step.highlight ? 'bg-[#00c8b1] text-[#0a1628]' : 'bg-white/10 text-white/60'}
                      `}
                    >
                      {i + 1}
                    </div>

                    {/* Icon */}
                    <div
                      className={`
                        w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center
                        ${step.highlight ? 'text-[#00c8b1]' : 'text-gray-400'}
                      `}
                    >
                      {step.icon}
                    </div>

                    {/* Label */}
                    <h3 className={`font-bold text-sm mb-1 ${step.highlight ? 'text-white' : 'text-gray-300'}`}>
                      {step.label}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {step.description}
                    </p>

                    {/* AI sparkle for highlighted steps */}
                    {step.highlight && (
                      <div className="absolute -top-1 -right-1 w-3 h-3">
                        <svg viewBox="0 0 24 24" fill="#00c8b1" className="animate-pulse">
                          <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>

              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <>
                  <FlowArrow />
                  <FlowArrowMobile />
                </>
              )}
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <ScrollReveal delay={400} direction="up" distance={20}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: '3x', label: 'Faster Processing' },
              { value: '40%', label: 'Fewer Denials' },
              { value: '99.2%', label: 'Coding Accuracy' },
              { value: '24/7', label: 'AI Monitoring' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#00c8b1] mb-1">{stat.value}</div>
                <div className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
