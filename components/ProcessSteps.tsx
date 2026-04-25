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

export default function ProcessSteps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Desktop: horizontal flow with animated line */}
      <div className="relative hidden md:block">
        {/* Connector line — draws left to right */}
        <div className="absolute left-0 right-0 top-4 h-px overflow-hidden">
          <div
            className="h-full bg-brand-navy/25"
            style={{
              transform: revealed ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: revealed ? "transform 1.2s ease-in-out" : "none",
            }}
          />
        </div>

        {/* Steps */}
        <div className="flex items-start">
          {STEPS.map((step, i) => (
            <div key={step.n} className="flex flex-col items-center flex-1 min-w-0">
              <div
                className="w-8 h-8 rounded-full bg-brand-navy text-white text-sm font-bold flex items-center justify-center relative z-10"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "scale(1)" : "scale(0.6)",
                  transition: `opacity 0.35s ease ${i * 0.2}s, transform 0.35s ease ${i * 0.2}s`,
                }}
              >
                {step.n}
              </div>
              <p
                className="text-sm font-semibold text-brand-navy mt-2 text-center leading-tight"
                style={{
                  opacity: revealed ? 1 : 0,
                  transition: `opacity 0.35s ease ${i * 0.2 + 0.15}s`,
                }}
              >
                {step.name}
              </p>
              <p
                className="text-xs text-gray-500 mt-1 text-center leading-tight"
                style={{
                  opacity: revealed ? 1 : 0,
                  transition: `opacity 0.35s ease ${i * 0.2 + 0.2}s`,
                }}
              >
                {step.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
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
              {i < STEPS.length - 1 && (
                <div className="w-px flex-1 bg-brand-navy/25 my-1" />
              )}
            </div>
            <div
              className={`pb-6 ${i === STEPS.length - 1 ? "pb-0" : ""}`}
              style={{
                opacity: revealed ? 1 : 0,
                transition: `opacity 0.35s ease ${i * 0.12 + 0.1}s`,
              }}
            >
              <p className="text-sm font-semibold text-brand-navy leading-none mt-1.5">
                {step.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">{step.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
