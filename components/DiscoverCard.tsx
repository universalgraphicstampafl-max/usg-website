"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface DiscoverCardProps {
  title: string;
  body: string;
  icon: ReactNode;
  delay?: number;
}

export default function DiscoverCard({ title, body, icon, delay = 0 }: DiscoverCardProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
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
    <div
      ref={outerRef}
      style={{
        opacity: 0,
        transform: "translateY(32px)",
        transition: `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      <div className="border border-brand-navy/10 rounded-2xl p-8 text-center hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(27,45,94,0.12)] hover:border-brand-gold/30 transition-all duration-300 h-full">
        <div
          className="w-12 h-12 rounded-xl bg-brand-gold text-brand-navy flex items-center justify-center mx-auto mb-5"
          style={
            revealed
              ? { animation: "iconEntryPulse 0.5s ease 0.4s 1 both" }
              : undefined
          }
        >
          {icon}
        </div>
        <h3 className="font-black text-brand-navy text-lg mb-3">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
