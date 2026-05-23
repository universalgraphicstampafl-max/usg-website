"use client";

/**
 * ServicesFlow — "Our Services" editorial flow diagram (Superside-style, USG-branded).
 * A cluster of service pills (what USG creates) flows via animated connectors into a
 * central USG hub, then fans out to the industries USG serves. CSS/SVG animation only.
 */

import { useEffect, useRef, useState } from "react";

const SERVICES = [
  "Multi-Location POP Signage", "Graphic Design", "Custom Print Production",
  "Store Surveys", "Direct Store Delivery", "Product Photography",
  "Window Clings", "Cooler Graphics", "Menu Boards", "Pylon Signs",
  "Feather Flags", "Floor Graphics", "Shelf Talkers", "A-Frames", "Pump Toppers",
];

// pill accent rotation across brand colors
const ACCENTS = [
  { bg: "rgba(239,165,30,0.14)", br: "rgba(239,165,30,0.5)", tx: "#7a5208" },   // marigold
  { bg: "rgba(92,184,228,0.14)", br: "rgba(92,184,228,0.5)", tx: "#1c5e7e" },   // sky
  { bg: "rgba(27,45,94,0.10)", br: "rgba(27,45,94,0.35)", tx: "#1B2D5E" },      // navy
];

const INDUSTRIES = [
  { label: "Convenience", color: "#EFA51E" },
  { label: "Tobacco & Nicotine", color: "#DA291C" },
  { label: "QSR", color: "#5CB8E4" },
  { label: "Grocery", color: "#4f9d5b" },
  { label: "Beverage", color: "#3A9DCC" },
];

export default function ServicesFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-brand-offwhite py-24 lg:py-36 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        {/* headline */}
        <div className="text-center mb-16 lg:mb-24">
          <p className="text-xs tracking-[0.2em] font-semibold text-brand-sky uppercase mb-4">Our Services</p>
          <h2 className="text-4xl lg:text-6xl font-black text-brand-navy max-w-4xl mx-auto leading-[1.06]">
            One partner for <span className="font-serif italic font-normal text-brand-gold">every signage format</span>, shipped to <span className="font-serif italic font-normal text-brand-gold">every retail location</span>.
          </h2>
        </div>

        {/* ===== desktop flow diagram ===== */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center gap-4 relative">
          {/* animated flow band behind everything: energy moving left -> hub -> right */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-24 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 opacity-60"
              style={{
                background: "repeating-linear-gradient(90deg, transparent 0, transparent 14px, rgba(239,165,30,0.35) 14px, rgba(239,165,30,0.35) 16px)",
                maskImage: "linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent)",
                WebkitMaskImage: "linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent)",
                animation: visible ? "usgFlowBand 1.1s linear infinite" : "none",
              }} />
          </div>

          {/* LEFT: service pills */}
          <div className="flex flex-wrap gap-2.5 justify-end content-center max-w-md ml-auto relative z-10">
            {SERVICES.map((s, i) => {
              const a = ACCENTS[i % ACCENTS.length];
              return (
                <span key={s}
                  className="inline-block text-sm font-semibold px-3.5 py-2 rounded-full border bg-white/80 backdrop-blur-sm transition-all duration-500"
                  style={{
                    background: a.bg, borderColor: a.br, color: a.tx,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(12px)",
                    transitionDelay: `${i * 60}ms`,
                  }}>
                  {s}
                </span>
              );
            })}
          </div>

          {/* CENTER: USG hub */}
          <div className="relative z-20 mx-6">
            <div className="relative w-32 h-32 rounded-3xl bg-brand-navy flex items-center justify-center shadow-2xl"
              style={{ transform: visible ? "scale(1)" : "scale(0.8)", opacity: visible ? 1 : 0, transition: "all .6s cubic-bezier(.16,1,.3,1) .3s" }}>
              <span className="absolute inset-0 rounded-3xl border-2 border-brand-gold/40" style={{ animation: visible ? "usgHubPulse 2.6s ease-out infinite" : "none" }} />
              <span className="absolute inset-0 rounded-3xl border-2 border-brand-sky/30" style={{ animation: visible ? "usgHubPulse 2.6s ease-out 1.3s infinite" : "none" }} />
              <div className="text-center leading-none">
                <span className="block text-brand-gold font-black text-3xl tracking-tight">USG</span>
                <span className="block text-white/70 text-[9px] tracking-[0.15em] uppercase mt-1">Universal<br />Signage</span>
              </div>
            </div>
          </div>

          {/* RIGHT: industry nodes */}
          <div className="flex flex-col gap-3.5 max-w-xs relative z-10">
            {INDUSTRIES.map((ind, i) => (
              <div key={ind.label}
                className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-md border border-black/5"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-14px)",
                  transition: `all .55s cubic-bezier(.16,1,.3,1) ${0.5 + i * 0.1}s`,
                }}>
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: ind.color }} />
                <span className="font-bold text-brand-navy">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== mobile: stacked, simpler ===== */}
        <div className="lg:hidden">
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {SERVICES.map((s, i) => {
              const a = ACCENTS[i % ACCENTS.length];
              return (
                <span key={s} className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full border"
                  style={{ background: a.bg, borderColor: a.br, color: a.tx, opacity: visible ? 1 : 0, transition: `opacity .5s ${i * 40}ms` }}>
                  {s}
                </span>
              );
            })}
          </div>
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-2xl bg-brand-navy flex items-center justify-center shadow-xl">
              <span className="text-brand-gold font-black text-2xl">USG</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {INDUSTRIES.map((ind) => (
              <div key={ind.label} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow border border-black/5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: ind.color }} />
                <span className="font-bold text-brand-navy text-sm">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
