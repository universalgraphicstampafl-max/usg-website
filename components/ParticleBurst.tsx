"use client";

import { useEffect, useRef, useState } from "react";

const COUNT = 16;
const ANGLES = Array.from({ length: COUNT }, (_, i) => (i * 360) / COUNT);

export default function ParticleBurst() {
  const [fired, setFired] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || firedRef.current) return;
      firedRef.current = true;
      setFired(true);
      observer.disconnect();
    }, { threshold: 0.6 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      {fired && ANGLES.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const tx  = Math.cos(rad) * 90;
        const ty  = Math.sin(rad) * 90;
        return (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-brand-gold"
            style={{
              top: "50%", left: "50%",
              animation: `particleBurst 1s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.025}s 1 both`,
              "--tx": `${tx}px`,
              "--ty": `${ty}px`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}
