"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "nav";

export default function CursorGlow() {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const pos        = useRef({ x: -200, y: -200 });
  const target     = useRef({ x: -200, y: -200 });
  const stateRef   = useRef<CursorState>("default");
  const rafRef     = useRef<number>(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    setReady(true);

    const onMove = (e: MouseEvent) => { target.current = { x: e.clientX, y: e.clientY }; };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest("nav a, nav button")) stateRef.current = "nav";
      else if (t.closest("a, button"))    stateRef.current = "hover";
      else                                stateRef.current = "default";
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12);

      const el = cursorRef.current;
      if (el) {
        el.style.transform = `translate(${pos.current.x}px,${pos.current.y}px) translate(-50%,-50%)`;
        const s = stateRef.current;
        if (s === "nav") {
          el.style.width  = "8px";
          el.style.height = "8px";
          el.style.background = "rgba(239,165,30,0.9)";
          el.style.mixBlendMode = "normal";
        } else if (s === "hover") {
          el.style.width  = "48px";
          el.style.height = "48px";
          el.style.background = "rgba(239,165,30,0.25)";
          el.style.mixBlendMode = "normal";
        } else {
          el.style.width  = "20px";
          el.style.height = "20px";
          el.style.background = "rgba(255,255,255,0.15)";
          el.style.mixBlendMode = "overlay";
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!ready) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full hidden lg:block"
      style={{
        width: "20px", height: "20px",
        background: "rgba(255,255,255,0.15)",
        mixBlendMode: "overlay",
        transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease",
        willChange: "transform",
      }}
    />
  );
}
