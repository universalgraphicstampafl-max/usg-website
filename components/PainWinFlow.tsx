"use client";

import RevealWrapper from "@/components/RevealWrapper";

/* PainWinFlow: pains → USG → outcomes (Superside-style) */
const PAIN_WIN_PAIRS: { pain: string; win: string }[] = [
  { pain: "Late, incomplete kits",            win: "On-time, 99.7% accurate kits" },
  { pain: "Art approvals drag for weeks",     win: "Fast in-house design approvals" },
  { pain: "Brand looks different everywhere", win: "Every store perfectly on-brand" },
  { pain: "Surprise upcharges on every job",  win: "One price, no upcharges ever" },
  { pain: "You manage the shipping",          win: "Shipped direct to every store" },
  { pain: "Wrong sizes, no store survey",     win: "Store-surveyed, perfect-fit signage" },
  { pain: "Juggling multiple vendors",        win: "One partner, end to end" },
];

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function PainWinFlow() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Desktop: 3-column flow (pains | USG | wins) */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:items-center">
        <div>
          <p className="text-[0.65rem] tracking-widest uppercase font-bold text-red-300/80 mb-4">With other vendors</p>
          <div className="space-y-2.5">
            {PAIN_WIN_PAIRS.map((p, i) => (
              <RevealWrapper key={p.pain} delay={i * 0.06}>
                <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm leading-snug bg-red-500/10 border border-red-500/25 text-red-100/90">
                  <span className="text-red-400"><XIcon /></span>
                  {p.pain}
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>

        <RevealWrapper delay={0.2} className="flex flex-col items-center gap-3 px-2">
          <span className="text-brand-gold text-2xl leading-none">→</span>
          <div className="w-16 h-16 bg-brand-navy border-2 border-brand-gold rounded-lg flex items-center justify-center shadow-[0_0_28px_rgba(251,176,52,0.35)]">
            <div className="w-8 h-8 border-2 border-brand-gold rounded-sm relative">
              <div className="absolute inset-1 bg-brand-sky/40 rounded-sm" />
            </div>
          </div>
          <span className="text-base font-extrabold tracking-brand-logo text-brand-gold">USG</span>
          <span className="text-brand-gold text-2xl leading-none">→</span>
        </RevealWrapper>

        <div>
          <p className="text-[0.65rem] tracking-widest uppercase font-bold text-brand-sky mb-4">With USG</p>
          <div className="space-y-2.5">
            {PAIN_WIN_PAIRS.map((p, i) => (
              <RevealWrapper key={p.win} delay={0.3 + i * 0.06}>
                <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm leading-snug bg-brand-sky/10 border border-brand-sky/30 text-sky-100/90">
                  <span className="text-brand-sky"><CheckIcon /></span>
                  {p.win}
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/tablet: stacked pain→win pairs with USG mark on top */}
      <div className="lg:hidden">
        <RevealWrapper className="flex flex-col items-center gap-2 mb-8">
          <div className="w-14 h-14 bg-brand-navy border-2 border-brand-gold rounded-lg flex items-center justify-center shadow-[0_0_24px_rgba(251,176,52,0.35)]">
            <div className="w-7 h-7 border-2 border-brand-gold rounded-sm relative">
              <div className="absolute inset-1 bg-brand-sky/40 rounded-sm" />
            </div>
          </div>
          <span className="text-sm font-extrabold tracking-brand-logo text-brand-gold">USG</span>
        </RevealWrapper>

        <div className="space-y-4">
          {PAIN_WIN_PAIRS.map((p, i) => (
            <RevealWrapper key={p.pain} delay={i * 0.05}>
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 text-sm bg-red-500/10 text-red-100/80 line-through decoration-red-400/50">
                  <span className="text-red-400 no-underline"><XIcon /></span>
                  {p.pain}
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-sm bg-brand-sky/10 text-sky-50 font-medium">
                  <span className="text-brand-sky"><CheckIcon /></span>
                  {p.win}
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </div>
  );
}
