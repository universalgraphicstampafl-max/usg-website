"use client";

import Image from "next/image";
import { useRef } from "react";

const ITEMS = [
  { src: "/images/easy/storefront-vinyl-lettering3.webp",    caption: "Storefront Vinyl" },
  { src: "/images/easy/iced-coffee-dispenser3.webp",         caption: "Dispenser Graphics" },
  { src: "/images/easy/marlboro-gas-pump-promo3.webp", caption: "Pylon Toppers" },
  { src: "/images/easy/feather-flag-circle-k-hot-food3.webp", caption: "Promotional Flags" },
  { src: "/images/easy/storefront-promo-window-cling3.webp", caption: "Window Clings" },
  { src: "/images/easy/hero-coca-cola-sunset-station3.webp", caption: "Bollard Signs" },
  { src: "/images/easy/grab-go-fresh-eats-cooler3.webp",     caption: "Cooler Branding" },
  { src: "/images/easy/cooler-doors-promotional-graphics3.webp", caption: "Cooler Doors" },
  { src: "/images/easy/corona-find-your-beach-beer-cave3.webp", caption: "Beer Caves" },
  { src: "/images/easy/suspended-menu-board3.webp",          caption: "Menu Boards" },
  { src: "/images/easy/brunch-a-frame-sandwich-board3.webp", caption: "Sidewalk Signs" },
  { src: "/images/easy/coke-pepsi-shelf-talkers3.webp",      caption: "Price Talkers" },
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
