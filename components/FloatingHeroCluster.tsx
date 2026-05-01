"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Tile = {
  src: string;
  alt: string;
  /** top-left x within the 600px-wide container */
  x: number;
  /** top-left y within the 700px-tall container */
  y: number;
  w: number;
  h: number;
  /** static rotation in degrees (deterministic to avoid hydration mismatch) */
  rot: number;
  /** vertical drift amplitude in px */
  drift: number;
  /** drift duration in seconds */
  duration: number;
  /** drift loop start offset in seconds */
  driftDelay: number;
  z: number;
};

const TILES: Tile[] = [
  // 1 — Coca-Cola sunset, featured center-ish, slightly larger
  { src: "/images/hero/hero-primary.webp",                alt: "Coca-Cola promotional signage at gas station storefront", x: 180, y: 200, w: 220, h: 180, rot: -3, drift:  8, duration: 5.0, driftDelay: 0,   z: 30 },
  // 2 — Corona beer cave
  { src: "/images/industries/beverage.webp",              alt: "Corona beer cave cooler graphics",                       x:  20, y:  80, w: 180, h: 180, rot: -5, drift:  6, duration: 4.4, driftDelay: 0.4, z: 20 },
  // 3 — BBQ pylon
  { src: "/images/industries/qsr.webp",                   alt: "QSR BBQ pylon sign",                                     x: 420, y:  60, w: 140, h: 140, rot:  4, drift:  7, duration: 5.4, driftDelay: 0.2, z: 20 },
  // 4 — Fresh Eats grocery cooler
  { src: "/images/industries/grocery.webp",               alt: "Grocery Fresh Eats cooler signage",                      x:  20, y: 420, w: 180, h: 180, rot:  3, drift:  9, duration: 5.8, driftDelay: 0.6, z: 20 },
  // 5 — Hangry Burger menu
  { src: "/images/services/graphic-design.webp",          alt: "Hangry Burger QSR menu graphic design",                  x: 380, y: 410, w: 220, h: 140, rot: -4, drift:  6, duration: 4.8, driftDelay: 0.3, z: 20 },
  // 6 — Cooler door graphics
  { src: "/images/services/custom-print-production.webp", alt: "Custom printed cooler door graphics",                    x: 440, y: 250, w: 140, h: 140, rot:  6, drift:  5, duration: 4.2, driftDelay: 0.5, z: 15 },
  // 7 — Gas pump topper
  { src: "/images/services/store-surveys.webp",           alt: "Gas pump topper store survey",                           x: 220, y:  20, w: 140, h: 140, rot:  2, drift:  7, duration: 5.2, driftDelay: 0.1, z: 15 },
  // 8 — Grab and go cooler
  { src: "/images/marquee/01-grab-go-cooler.webp",        alt: "Grab and go cooler signage",                             x: 440, y: 560, w: 140, h: 140, rot: -7, drift:  6, duration: 4.6, driftDelay: 0.7, z: 15 },
  // 9 — Fiji pole sign
  { src: "/images/marquee/05-pole-sign.webp",             alt: "Fiji pole-mounted retail sign",                          x:  10, y: 270, w: 140, h: 160, rot:  5, drift:  8, duration: 5.6, driftDelay: 0.2, z: 10 },
  // 10 — Brunch A-frame
  { src: "/images/marquee/06-a-frame.webp",               alt: "Brunch A-frame sandwich board",                          x: 200, y: 560, w: 180, h: 140, rot: -2, drift:  7, duration: 4.4, driftDelay: 0.5, z: 10 },
  // 11 — Promotional flag formats
  { src: "/images/marquee/08-flag-formats.webp",          alt: "Promotional flag formats trio",                          x: 380, y: 270, w: 140, h: 130, rot:  7, drift:  5, duration: 5.0, driftDelay: 0.8, z: 10 },
  // 12 — Storefront vinyl lettering
  { src: "/images/marquee/11-vinyl-lettering.webp",       alt: "Storefront cut vinyl lettering",                         x: 160, y: 410, w: 140, h: 140, rot: -6, drift:  9, duration: 5.4, driftDelay: 0.4, z: 10 },
];

export default function FloatingHeroCluster() {
  return (
    <div
      className="relative mx-auto"
      style={{ width: 600, height: 700 }}
      aria-hidden="false"
    >
      {TILES.map((t, i) => (
        <motion.div
          key={t.src}
          className="absolute rounded-xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)]"
          style={{
            left: t.x,
            top: t.y,
            width: t.w,
            height: t.h,
            zIndex: t.z,
            rotate: `${t.rot}deg`,
          }}
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -t.drift, 0],
          }}
          transition={{
            opacity:  { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
            scale:    { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
            y: {
              duration: t.duration,
              delay: i * 0.08 + t.driftDelay,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            },
          }}
        >
          <Image
            src={t.src}
            alt={t.alt}
            width={t.w}
            height={t.h}
            sizes="200px"
            quality={85}
            loading={i < 4 ? "eager" : "lazy"}
            priority={i < 4}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}
