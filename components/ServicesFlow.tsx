"use client";

/**
 * ServicesFlow — "Our Services" flow diagram (Superside-style, USG-branded).
 * SVG-canvas layout: service nodes (left) flow through a central USG hub and fan
 * out via animated glowing arrows to the industries USG serves (right).
 * CSS/SVG animation only. Stacked fallback on mobile.
 */

import { useEffect, useRef, useState } from "react";

/* ---- canvas coordinate space ---- */
const W = 1000;
const H = 640;
const HUB = { x: 500, y: 320 };
/* viewBox tightly hugs the actual content with EQUAL margins both sides,
   so the diagram fills its container and is perfectly centered.
   (content spans x:55–864, y:96–582; center x=460. 40px margin each side.) */
const VIEWBOX = "15 56 889 566";

/* service nodes — clustered on the left, flowing toward the hub */
const SERVICES = [
  { label: "Multi-Location POP", x: 55, y: 103 },
  { label: "Graphic Design", x: 245, y: 103 },
  { label: "Custom Print", x: 55, y: 165 },
  { label: "Store Surveys", x: 245, y: 165 },
  { label: "Direct Store Delivery", x: 55, y: 227 },
  { label: "Product Photography", x: 245, y: 227 },
  { label: "Window Clings", x: 55, y: 289 },
  { label: "Cooler Graphics", x: 245, y: 289 },
  { label: "Menu Boards", x: 55, y: 351 },
  { label: "Pylon Signs", x: 245, y: 351 },
  { label: "Feather Flags", x: 55, y: 413 },
  { label: "Floor Graphics", x: 245, y: 413 },
  { label: "Shelf Talkers", x: 55, y: 475 },
  { label: "A-Frames", x: 245, y: 475 },
  { label: "Pump Toppers", x: 175, y: 537 },
];

/* industry nodes — each centered at x≈765 in the right half, vertically centered */
const INDUSTRIES = [
  { label: "Convenience", x: 694, y: 96, color: "#EFA51E" },
  { label: "Tobacco & Nicotine", x: 666, y: 208, color: "#DA291C" },
  { label: "QSR", x: 710, y: 320, color: "#5CB8E4" },
  { label: "Grocery", x: 710, y: 432, color: "#4f9d5b" },
  { label: "Beverage", x: 706, y: 544, color: "#3A9DCC" },
];

const SVC_ACCENTS = [
  { fill: "rgba(239,165,30,0.16)", stroke: "rgba(239,165,30,0.55)", text: "#7a5208" },
  { fill: "rgba(92,184,228,0.16)", stroke: "rgba(92,184,228,0.55)", text: "#1c5e7e" },
  { fill: "rgba(27,45,94,0.10)", stroke: "rgba(27,45,94,0.4)", text: "#1B2D5E" },
];

/* helper: cubic path between two points with horizontal control handles */
function curve(x1: number, y1: number, x2: number, y2: number) {
  const dx = (x2 - x1) * 0.5;
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

export default function ServicesFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) { setVisible(true); return; }
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) setVisible(true);
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    const fallback = window.setTimeout(() => setVisible(true), 1200);
    return () => { io.disconnect(); window.clearTimeout(fallback); };
  }, []);

  return (
    <section ref={ref} className="bg-brand-offwhite py-24 lg:py-36 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-xs tracking-[0.2em] font-semibold text-brand-sky uppercase mb-4">Our Services</p>
          <h2 className="text-4xl lg:text-6xl font-black text-brand-navy max-w-4xl mx-auto leading-[1.06]">
            One partner for <span className="font-serif italic font-normal text-brand-gold">every signage format</span>, shipped to <span className="font-serif italic font-normal text-brand-gold">every retail location</span>.
          </h2>
        </div>

        {/* ===== desktop: SVG flow canvas ===== */}
        <div className="hidden lg:block">
          <svg viewBox={VIEWBOX} className="w-full h-auto" role="img" aria-label="USG services flowing through a central hub out to the industries served">
            <defs>
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#EFA51E" stopOpacity="0.28" />
                <stop offset="55%" stopColor="#5CB8E4" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#5CB8E4" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="svcLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#EFA51E" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#EFA51E" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="indLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5CB8E4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#5CB8E4" stopOpacity="0.12" />
              </linearGradient>
            </defs>

            {/* glow field behind hub */}
            <ellipse cx={HUB.x} cy={HUB.y} rx="360" ry="240" fill="url(#hubGlow)"
              style={{ opacity: visible ? 1 : 0, transition: "opacity 1s ease .2s" }} />

            {/* services -> hub connectors */}
            {SERVICES.map((s, i) => (
              <path key={`sl${i}`} d={curve(s.x + 75, s.y + 16, HUB.x - 60, HUB.y)} fill="none"
                stroke="url(#svcLine)" strokeWidth="2" strokeLinecap="round"
                strokeDasharray="5 8"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity .6s ease ${i * 0.04}s`,
                  animation: visible ? `usgDashFlow 1.3s linear ${i * 0.05}s infinite` : "none",
                }} />
            ))}

            {/* hub -> industries connectors (arrows) */}
            {INDUSTRIES.map((ind, i) => (
              <path key={`il${i}`} d={curve(HUB.x + 60, HUB.y, ind.x - 5, ind.y + 19)} fill="none"
                stroke="url(#indLine)" strokeWidth="2.5" strokeLinecap="round"
                strokeDasharray="6 9" markerEnd="url(#arrowHead)"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity .6s ease ${0.3 + i * 0.08}s`,
                  animation: visible ? `usgDashFlow 1.5s linear ${i * 0.1}s infinite` : "none",
                }} />
            ))}
            <defs>
              <marker id="arrowHead" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
                <path d="M0,0 L9,4.5 L0,9 Z" fill="#5CB8E4" opacity="0.7" />
              </marker>
            </defs>

            {/* service node pills */}
            {SERVICES.map((s, i) => {
              const a = SVC_ACCENTS[i % SVC_ACCENTS.length];
              const w = Math.max(96, s.label.length * 8.4 + 24);
              return (
                <g key={`sn${i}`} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-10px)", transition: `all .5s cubic-bezier(.16,1,.3,1) ${i * 0.05}s` }}>
                  <rect x={s.x} y={s.y} width={w} height="32" rx="16" fill={a.fill} stroke={a.stroke} strokeWidth="1.5" />
                  <text x={s.x + w / 2} y={s.y + 21} textAnchor="middle" fontSize="13" fontWeight="600" fill={a.text}>{s.label}</text>
                </g>
              );
            })}

            {/* HUB */}
            <g style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.85)", transformOrigin: `${HUB.x}px ${HUB.y}px`, transition: "all .6s cubic-bezier(.16,1,.3,1) .25s" }}>
              <rect x={HUB.x - 60} y={HUB.y - 60} width="120" height="120" rx="26" fill="#1B2D5E" />
              <rect x={HUB.x - 60} y={HUB.y - 60} width="120" height="120" rx="26" fill="none" stroke="#EFA51E" strokeWidth="2" opacity="0.5">
                {visible && <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.6s" repeatCount="indefinite" />}
              </rect>
              <text x={HUB.x} y={HUB.y - 4} textAnchor="middle" fontSize="30" fontWeight="900" fill="#EFA51E" letterSpacing="-1">USG</text>
              <text x={HUB.x} y={HUB.y + 22} textAnchor="middle" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.7)" letterSpacing="1.5">SIGNAGE</text>
            </g>

            {/* industry nodes */}
            {INDUSTRIES.map((ind, i) => {
              // width = dot zone (34) + text + right padding (20); min 110
              const w = Math.max(110, 34 + ind.label.length * 8.0 + 20);
              return (
                <g key={`in${i}`} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(10px)", transition: `all .55s cubic-bezier(.16,1,.3,1) ${0.45 + i * 0.1}s` }}>
                  <rect x={ind.x} y={ind.y} width={w} height="38" rx="19" fill="#ffffff" stroke="rgba(0,0,0,0.06)" strokeWidth="1" style={{ filter: "drop-shadow(0 4px 10px rgba(27,45,94,0.12))" }} />
                  <circle cx={ind.x + 19} cy={ind.y + 19} r="6" fill={ind.color} />
                  <text x={ind.x + 34} y={ind.y + 24} fontSize="14" fontWeight="700" fill="#1B2D5E">{ind.label}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ===== mobile: stacked ===== */}
        <div className="lg:hidden">
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {SERVICES.map((s, i) => {
              const a = SVC_ACCENTS[i % SVC_ACCENTS.length];
              return (
                <span key={s.label} className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full border"
                  style={{ background: a.fill, borderColor: a.stroke, color: a.text, opacity: visible ? 1 : 0, transition: `opacity .5s ${i * 40}ms` }}>
                  {s.label}
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
