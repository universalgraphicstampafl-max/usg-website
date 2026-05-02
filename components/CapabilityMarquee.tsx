"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TILES = [
  { src: "/images/marquee/01-grab-go-cooler.webp",  caption: "Grab & Go Cooler" },
  { src: "/images/marquee/02-menu-signs.webp",      caption: "Menu Signs" },
  { src: "/images/marquee/03-poster-frame.webp",    caption: "Poster Frame" },
  { src: "/images/marquee/04-floor-display.webp",   caption: "Floor Display" },
  { src: "/images/marquee/05-pole-sign.webp",       caption: "Pole Sign" },
  { src: "/images/marquee/06-a-frame.webp",         caption: "A-Frame" },
  { src: "/images/marquee/07-suspended-menu.webp",  caption: "Suspended Menu" },
  { src: "/images/marquee/08-flag-formats.webp",    caption: "Promotional Flags" },
  { src: "/images/marquee/09-shelf-talkers.webp",   caption: "Shelf Talkers" },
  { src: "/images/marquee/10-pylon-toppers.webp",   caption: "Pylon Toppers" },
  { src: "/images/marquee/11-vinyl-lettering.webp", caption: "Vinyl Lettering" },
  { src: "/images/marquee/12-qsr-pylon.webp",       caption: "QSR Pylon" },
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
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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
