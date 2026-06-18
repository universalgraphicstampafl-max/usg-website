"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  { n: 1, name: "Submit order", sub: "Via portal or account manager" },
  { n: 2, name: "Design",       sub: "In-house team"                 },
  { n: 3, name: "Approval",     sub: "Portal proof review"           },
  { n: 4, name: "Production",   sub: "Print + finishing"             },
  { n: 5, name: "Ship",         sub: "Direct to every store"         },
  { n: 6, name: "Track",        sub: "Real-time visibility"          },
];

const LINE_DURATION = 1500; // ms

export default function ProcessSteps() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [width,    setWidth]    = useState(0);

  useEffect(() => {
    const el  = sectionRef.current;
    const con = containerRef.current;
    if (!el || !con) return;

    const ro = new ResizeObserver(() => setWidth(con.offsetWidth));
    ro.observe(con);
    setWidth(con.offsetWidth);

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRevealed(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);

    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  // Delay for each step's ripple = (i / (steps-1)) * LINE_DURATION ms
  const rippleDelay = (i: number) => (i / (STEPS.length - 1)) * (LINE_DURATION / 1000);

  return (
    <div ref={sectionRef}>

      {/* ── Desktop ── */}
      <div ref={containerRef} className="relative hidden md:block">

        {/* SVG connector */}
        {width > 0 && (
          <svg
            width={width}
            height={2}
            className="absolute top-4 left-0"
            style={{ overflow: "visible" }}
          >
            <line
              x1={0} y1={1} x2={width} y2={1}
              stroke="rgba(27,45,94,0.2)"
              strokeWidth={1}
              strokeDasharray={width}
              strokeDashoffset={revealed ? 0 : width}
              style={{ transition: revealed ? `stroke-dashoffset ${LINE_DURATION}ms ease-in-out` : "none" }}
            />
          </svg>
        )}

        {/* Steps */}
        <div className="flex items-start">
          {STEPS.map((step, i) => (
            <div key={step.n} className="flex flex-col items-center flex-1 min-w-0">
              {/* Circle + ripple */}
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-full bg-brand-navy text-white text-sm font-bold flex items-center justify-center relative z-10"
                  style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "scale(1)" : "scale(0.5)",
                    transition: revealed
                      ? `opacity 0.35s ease ${rippleDelay(i)}s, transform 0.35s ease ${rippleDelay(i)}s`
                      : "none",
                  }}
                >
                  {step.n}
                </div>
                {/* Ripple ring */}
                {revealed && (
                  <div
                    className="absolute inset-0 rounded-full border border-brand-navy/40"
                    style={{
                      animation: `stepRipple 0.6s ease-out ${rippleDelay(i) + 0.25}s 1 both`,
                    }}
                  />
                )}
              </div>

              <p
                className="text-sm font-semibold text-brand-navy mt-2 text-center leading-tight"
                style={{
                  opacity: revealed ? 1 : 0,
                  transition: revealed ? `opacity 0.35s ease ${rippleDelay(i) + 0.2}s` : "none",
                }}
              >
                {step.name}
              </p>
              <p
                className="text-xs text-brand-navy/70 mt-1 text-center leading-tight"
                style={{
                  opacity: revealed ? 1 : 0,
                  transition: revealed ? `opacity 0.35s ease ${rippleDelay(i) + 0.3}s` : "none",
                }}
              >
                {step.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="flex flex-col gap-0 md:hidden">
        {STEPS.map((step, i) => (
          <div key={step.n} className="flex gap-4">
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className="w-8 h-8 rounded-full bg-brand-navy text-white text-sm font-bold flex items-center justify-center z-10"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 0.35s ease ${i * 0.12}s, transform 0.35s ease ${i * 0.12}s`,
                }}
              >
                {step.n}
              </div>
              {i < STEPS.length - 1 && <div className="w-px flex-1 bg-brand-navy/25 my-1" />}
            </div>
            <div
              className={`pb-6 ${i === STEPS.length - 1 ? "pb-0" : ""}`}
              style={{ opacity: revealed ? 1 : 0, transition: `opacity 0.35s ease ${i * 0.12 + 0.1}s` }}
            >
              <p className="text-sm font-semibold text-brand-navy leading-none mt-1.5">{step.name}</p>
              <p className="text-xs text-brand-navy/70 mt-1">{step.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
