"use client";

import { useEffect, useRef, useState } from "react";

/* Steps positioned along a winding road. x/y are percentages of the
   1000x360 viewBox the road is drawn in; `above` places the label on the
   outside of each curve so it never overlaps the road. */
const STEPS = [
  { n: 1, name: "Submit order", sub: "Via portal or account manager", x: 8,    y: 66.7, above: false },
  { n: 2, name: "Design",       sub: "In-house team",                 x: 24.8, y: 33.3, above: true  },
  { n: 3, name: "Approval",     sub: "Portal proof review",           x: 41.6, y: 66.7, above: false },
  { n: 4, name: "Production",   sub: "Print + finishing",             x: 58.4, y: 33.3, above: true  },
  { n: 5, name: "Ship",         sub: "Direct to every store or to your warehouse location",         x: 75.2, y: 66.7, above: false },
  { n: 6, name: "Track",        sub: "Real-time visibility",          x: 92,   y: 33.3, above: true  },
];

/* Smooth winding path through the six waypoints (viewBox 0 0 1000 360). */
const ROAD =
  "M 80 240 C 164 240 164 120 248 120 C 332 120 332 240 416 240 C 500 240 500 120 584 120 C 668 120 668 240 752 240 C 836 240 836 120 920 120";

export default function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRevealed(true); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* ── Desktop / tablet: winding road ── */}
      <div className="relative hidden md:block w-full mx-auto" style={{ aspectRatio: "1000 / 360" }}>
        <svg
          viewBox="0 0 1000 360"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {/* road bed */}
          <path
            d={ROAD}
            fill="none"
            stroke="#001132"
            strokeWidth={13}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={revealed ? 0 : 1}
            style={{ transition: revealed ? "stroke-dashoffset 1.8s ease-in-out" : "none" }}
          />
          {/* dashed lane markings */}
          <path
            d={ROAD}
            fill="none"
            stroke="#EFEFEE"
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            strokeDasharray="0.012 0.026"
            style={{ opacity: revealed ? 0.85 : 0, transition: "opacity 0.6s ease 1.5s" }}
          />
        </svg>

        {/* numbered map-marker nodes + labels */}
        {STEPS.map((step, i) => (
          <div
            key={step.n}
            className="absolute"
            style={{ left: `${step.x}%`, top: `${step.y}%`, transform: "translate(-50%, -50%)" }}
          >
            {/* marker */}
            <div
              className="w-12 h-12 rounded-full bg-brand-navy text-white text-base font-bold flex items-center justify-center shadow-lg ring-2 ring-white/60"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "scale(1)" : "scale(0.4)",
                transition: revealed
                  ? `opacity 0.4s ease ${0.4 + i * 0.18}s, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.18}s`
                  : "none",
              }}
            >
              {step.n}
            </div>

            {/* label (outside the curve) */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-40 text-center ${step.above ? "bottom-full mb-3" : "top-full mt-3"}`}
              style={{
                opacity: revealed ? 1 : 0,
                transition: revealed ? `opacity 0.4s ease ${0.55 + i * 0.18}s` : "none",
              }}
            >
              <p className="font-bold text-brand-navy text-sm leading-tight">{step.name}</p>
              <p className="text-brand-navy/70 text-xs mt-0.5 leading-tight">{step.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Mobile: vertical road ── */}
      <div className="flex flex-col gap-0 md:hidden">
        {STEPS.map((step, i) => (
          <div key={step.n} className="flex gap-4">
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className="w-10 h-10 rounded-full bg-brand-navy text-white text-sm font-bold flex items-center justify-center z-10 shadow ring-2 ring-white/60"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 0.35s ease ${i * 0.12}s, transform 0.35s ease ${i * 0.12}s`,
                }}
              >
                {step.n}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="w-0.5 flex-1 my-1"
                  style={{
                    backgroundImage: "repeating-linear-gradient(to bottom, #001132 0 6px, transparent 6px 12px)",
                  }}
                />
              )}
            </div>
            <div
              className={`pb-7 ${i === STEPS.length - 1 ? "pb-0" : ""}`}
              style={{ opacity: revealed ? 1 : 0, transition: `opacity 0.35s ease ${i * 0.12 + 0.1}s` }}
            >
              <p className="text-base font-bold text-brand-navy leading-none mt-2">{step.name}</p>
              <p className="text-xs text-brand-navy/70 mt-1">{step.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
