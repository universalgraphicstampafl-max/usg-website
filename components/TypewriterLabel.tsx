"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterLabelProps {
  text: string;
  className?: string;
  onComplete?: () => void;
}

export default function TypewriterLabel({ text, className = "", onComplete }: TypewriterLabelProps) {
  const [chars, setChars]       = useState(0);
  const [cursor, setCursor]     = useState(false);
  const ref                     = useRef<HTMLSpanElement>(null);
  const firedRef                = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || firedRef.current) return;
      firedRef.current = true;
      observer.disconnect();

      setCursor(true);
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setChars(i);
        if (i >= text.length) {
          clearInterval(iv);
          setTimeout(() => {
            setCursor(false);
            onComplete?.();
          }, 900);
        }
      }, 40);
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, onComplete]);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {/* invisible placeholder keeps correct width */}
      <span className="opacity-0 select-none pointer-events-none">{text}</span>
      <span className="absolute inset-0">
        {text.slice(0, chars)}
        {cursor && <span className="animate-pulse ml-px">|</span>}
      </span>
    </span>
  );
}
