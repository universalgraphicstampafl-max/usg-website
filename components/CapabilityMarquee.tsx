"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TILES = [
  { src: "/images/easy/hero-coca-cola-sunset-station2.webp", caption: "Storefront Signage" },
  { src: "/images/easy/grab-go-fresh-eats-cooler2.webp",     caption: "Grab & Go Coolers" },
  { src: "/images/easy/cooler-doors-promotional-graphics2.webp", caption: "Cooler Door Graphics" },
  { src: "/images/easy/suspended-menu-board2.webp",          caption: "Suspended Menus" },
  { src: "/images/easy/brunch-a-frame-sandwich-board2.webp", caption: "A-Frame Boards" },
  { src: "/images/easy/qsr-hangry-burger-menu-board2.webp",  caption: "Menu Boards" },
  { src: "/images/easy/corona-find-your-beach-beer-cave2.webp", caption: "Beer Cave Headers" },
  { src: "/images/easy/coke-pepsi-shelf-talkers2.webp",      caption: "Shelf Talkers" },
  { src: "/images/easy/fiji-stay-hydrated-pole-sign2.webp",  caption: "Pole Signs" },
  { src: "/images/easy/gas-pump-celsius-topper2.webp",       caption: "Pump Toppers" },
  { src: "/images/easy/hot-dog-combo-menu-signs2.webp",      caption: "Combo Menus" },
  { src: "/images/easy/karma-wellness-poster-frame2.webp",   caption: "Poster Frames" },
];

export default function CapabilityMarquee() {
  const doubled = [...TILES, ...TILES];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <motion.div
        className="flex gap-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((tile, i) => (
          <div key={`${tile.src}-${i}`} className="flex-shrink-0">
            <div className="relative w-[280px] h-[200px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={tile.src}
                alt={tile.caption}
                fill
                sizes="280px"
                quality={85}
                loading="lazy"
                className="object-cover"
              />
            </div>
            <p className="text-white/80 font-medium text-base leading-4 mt-3 text-center">
              {tile.caption}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
