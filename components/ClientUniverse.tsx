"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* Client "planets" scattered around the USG mark. left/top are % of the
   square constellation container; the center mark sits at 50/50. Drop logo
   files into public/images/logos/<slug>.png to populate. */
const CLIENTS = [
  { slug: "circle-k",        name: "Circle K",        left: 18, top: 24 },
  { slug: "refuel",          name: "Refuel",          left: 39, top: 12 },
  { slug: "7-eleven",        name: "7-Eleven",        left: 63, top: 13 },
  { slug: "rebel",           name: "Rebel",           left: 83, top: 26 },
  { slug: "fast-track",      name: "Fast Track",      left: 11, top: 53 },
  { slug: "tom-thumb",       name: "Tom Thumb",       left: 89, top: 55 },
  { slug: "ez-mart",         name: "EZ Mart",         left: 21, top: 80 },
  { slug: "coca-cola",       name: "Coca-Cola",       left: 45, top: 88 },
  { slug: "chestnut-market", name: "Chestnut Market", left: 67, top: 85 },
  { slug: "texbest",         name: "TexBest",         left: 86, top: 75 },
];

function UsgMark() {
  return (
    <div className="flex flex-col items-center text-center gap-3 select-none">
      <div className="w-20 h-20 bg-brand-navy rounded-xl flex items-center justify-center p-3 shadow-[0_8px_30px_rgba(0,17,50,0.35)]">
        <img
          src="/images/usg-logo-mark.svg"
          alt="Universal Signage & Graphics"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="leading-none">
        <p className="font-black text-brand-navy tracking-widest uppercase text-2xl lg:text-3xl">
          Retail Signage
        </p>
        <p className="text-brand-navy/60 text-[0.6rem] tracking-wide uppercase mt-1.5">
          Specialist
        </p>
      </div>
    </div>
  );
}

function Planet({ slug, name }: { slug: string; name: string }) {
  return (
    <div className="relative w-[18vw] h-[18vw] max-w-24 max-h-24 sm:w-24 sm:h-24 rounded-full bg-white shadow-[0_8px_24px_rgba(0,17,50,0.28)]">
      <div className="absolute inset-[20%]">
        <Image src={`/images/logos/${slug}.png`} alt={name} fill className="object-contain" sizes="96px" />
      </div>
    </div>
  );
}

export default function ClientUniverse() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRevealed(true); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* ── Desktop / tablet: constellation ── */}
      <div className="relative mx-auto hidden md:block w-full max-w-2xl aspect-square">
        {/* shooting-star connections (draw from center → each planet on scroll) */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {CLIENTS.map((c, i) => (
            <g key={c.slug}>
              <line x1={50} y1={50} x2={c.left} y2={c.top} stroke="#001132" strokeOpacity={0.18} strokeWidth={1} vectorEffect="non-scaling-stroke" />
              <line
                x1={50} y1={50} x2={c.left} y2={c.top}
                stroke="#001132" strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke"
                pathLength={1} strokeDasharray={1} strokeDashoffset={revealed ? 0 : 1}
                style={{ transition: revealed ? `stroke-dashoffset 0.9s ease-out ${0.3 + i * 0.12}s` : "none" }}
              />
            </g>
          ))}
        </svg>

        {/* planets */}
        {CLIENTS.map((c, i) => (
          <div
            key={c.slug}
            className="absolute"
            style={{
              left: `${c.left}%`,
              top: `${c.top}%`,
              opacity: revealed ? 1 : 0,
              transform: revealed
                ? "translate(-50%, -50%) scale(1)"
                : "translate(-50%, -50%) scale(0.4)",
              transition: revealed
                ? `opacity 0.4s ease ${0.9 + i * 0.12}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.9 + i * 0.12}s`
                : "none",
            }}
          >
            <Planet slug={c.slug} name={c.name} />
          </div>
        ))}

        {/* center USG mark — marigold clearing hides the converging lines behind the mark */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-56 rounded-full bg-brand-marigold blur-lg"
            aria-hidden="true"
          />
          <div className="relative">
            <UsgMark />
          </div>
        </div>
      </div>

      {/* ── Mobile: mark + tidy logo grid ── */}
      <div className="md:hidden">
        <div className="flex justify-center mb-10">
          <UsgMark />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {CLIENTS.map((c, i) => (
            <div
              key={c.slug}
              className="relative aspect-square rounded-2xl bg-white shadow-[0_8px_24px_rgba(0,17,50,0.28)]"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s`,
              }}
            >
              <div className="absolute inset-[22%]">
                <Image src={`/images/logos/${c.slug}.png`} alt={c.name} fill className="object-contain" sizes="120px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
