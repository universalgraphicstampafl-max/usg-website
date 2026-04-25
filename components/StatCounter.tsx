"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  target: number;
  suffix: string;
  thousands?: boolean;
  className?: string;
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function StatCounter({ target, suffix, thousands = false, className = "" }: StatCounterProps) {
  const [value, setValue] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || firedRef.current) return;
        firedRef.current = true;

        const duration = 1500;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.round(easeOut(progress) * target));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const display = thousands ? value.toLocaleString("en-US") : String(value);

  return (
    <span ref={nodeRef} className={className}>
      {display}{suffix}
    </span>
  );
}
