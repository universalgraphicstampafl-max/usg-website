"use client";

import { useRef } from "react";

const LOGOS = [0, 1, 2, 3, 4, 5];

export default function MarqueeLogos() {
  const trackRef = useRef<HTMLDivElement>(null);

  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = "paused";  };
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = "running"; };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          width: "max-content",
          alignItems: "center",
          animation: "marqueeScroll 40s linear infinite",
          willChange: "transform",
        }}
      >
        {[...LOGOS, ...LOGOS].map((_, i) => (
          <div key={i} style={{ flexShrink: 0, margin: "0 20px" }}>
            <div className="w-[140px] h-[56px] bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center">
              <span className="text-xs text-gray-400">Client Logo</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
