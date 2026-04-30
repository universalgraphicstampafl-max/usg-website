"use client";

import Image from "next/image";
import { useRef } from "react";

const ITEMS = [
  { src: "/images/marquee/01-grab-go-cooler.webp",  caption: "Grab-and-Go Coolers" },
  { src: "/images/marquee/02-menu-signs.webp",      caption: "Promotional Menu Signs" },
  { src: "/images/marquee/03-poster-frame.webp",    caption: "Outdoor Poster Frames" },
  { src: "/images/marquee/04-floor-display.webp",   caption: "POP Floor Displays" },
  { src: "/images/marquee/05-pole-sign.webp",       caption: "Pole-Mounted Signs" },
  { src: "/images/marquee/06-a-frame.webp",         caption: "A-Frame Sandwich Boards" },
  { src: "/images/marquee/07-suspended-menu.webp",  caption: "Suspended Menu Boards" },
  { src: "/images/marquee/08-flag-formats.webp",    caption: "Promotional Flags" },
  { src: "/images/marquee/09-shelf-talkers.webp",   caption: "Shelf Talkers" },
  { src: "/images/marquee/10-pylon-toppers.webp",   caption: "Pylon Toppers" },
  { src: "/images/marquee/11-vinyl-lettering.webp", caption: "Storefront Vinyl" },
  { src: "/images/marquee/12-qsr-pylon.webp",       caption: "Pylon Identification" },
];

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
          animation: "marqueeScroll 60s linear infinite",
          willChange: "transform",
        }}
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} style={{ flexShrink: 0, margin: "0 12px" }}>
            <div className="group relative w-[320px] h-[240px] rounded-lg overflow-hidden">
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="320px"
                loading="lazy"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-semibold">{item.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
