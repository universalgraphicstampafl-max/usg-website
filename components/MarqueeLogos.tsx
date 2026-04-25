"use client";

import { useRef } from "react";

const LOGO_COUNT = 6;

export default function MarqueeLogos() {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const handleMouseLeave = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      {/* Two identical sets of logos — second set makes the loop seamless */}
      <div
        ref={trackRef}
        className="flex"
        style={{
          animation: "marqueeScroll 40s linear infinite",
          willChange: "transform",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {[...Array(LOGO_COUNT * 2)].map((_, i) => (
          <div key={i} className="flex-shrink-0 px-3">
            <div className="w-20 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-400">Client Logo</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
