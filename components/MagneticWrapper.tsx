"use client";

import { useRef, ReactNode } from "react";

interface MagneticWrapperProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}

export default function MagneticWrapper({
  children,
  strength = 6,
  radius   = 60,
  className = "",
}: MagneticWrapperProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > radius) return;
    const factor = (1 - dist / radius) * strength;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      ref.current.style.transform  = `translate(${(dx / dist) * factor}px, ${(dy / dist) * factor}px)`;
      ref.current.style.transition = "transform 0.1s ease";
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(rafRef.current);
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.4s cubic-bezier(0.16,1,0.3,1)";
    el.style.transform  = "translate(0, 0)";
  };

  return (
    <div ref={ref} className={`inline-block ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}
