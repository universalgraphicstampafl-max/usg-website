"use client";

import { useEffect, useRef, useState } from "react";

interface SlotCounterProps {
  target: number;
  suffix: string;
  thousands?: boolean;
  decimals?: number;
  delay?: number;
  className?: string;
}

export default function SlotCounter({ target, suffix, thousands = false, decimals = 0, delay = 0, className = "" }: SlotCounterProps) {
  const [display, setDisplay] = useState(0);
  const [locked,  setLocked]  = useState(false);
  const ref       = useRef<HTMLSpanElement>(null);
  const firedRef  = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || firedRef.current) return;
      firedRef.current = true;
      observer.disconnect();

      setTimeout(() => {
        let elapsed = 0;
        const SPIN_DURATION = 800;
        const TICK = 55;

        const spinner = setInterval(() => {
          elapsed += TICK;
          setDisplay(decimals > 0 ? (Math.random() * target * 1.4 + target * 0.1) : Math.round(Math.random() * target * 1.4 + target * 0.1));
          if (elapsed >= SPIN_DURATION) {
            clearInterval(spinner);
            // 3-step slow landing
            let steps = 3;
            const land = setInterval(() => {
              steps--;
              if (steps <= 0) {
                clearInterval(land);
                setDisplay(target);
                setLocked(true);
              } else {
                const jitter = Math.round((Math.random() - 0.5) * target * 0.15);
                setDisplay(target + jitter);
              }
            }, 110);
          }
        }, TICK);
      }, delay * 1000);
    }, { threshold: 0.4 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, delay, decimals]);

  const fmt = (n: number) => {
    const abs = Math.abs(n);
    if (decimals > 0) return abs.toFixed(decimals);
    return thousands ? abs.toLocaleString("en-US") : String(Math.round(abs));
  };

  return (
    <span
      ref={ref}
      className={`${className} inline-block tabular-nums`}
      style={!locked ? { animation: "slotFlicker 0.11s linear infinite" } : undefined}
    >
      {fmt(display)}{suffix}
    </span>
  );
}
