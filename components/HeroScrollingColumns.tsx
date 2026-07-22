"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ar = true aspect ratio (w/h) of the source file — tiles are sized to match so
// every image renders fully, centered, with no cropping.
type Tile = { src: string; alt: string; ar: number };

const COLUMN_1: Tile[] = [
  { src: "/images/easy/grab-go-fresh-eats-cooler.webp",     alt: "Branded grab-and-go fresh food cooler",            ar: 0.74 },
  { src: "/images/easy/brunch-a-frame-sandwich-board.webp", alt: "A-frame sidewalk sandwich board sign",             ar: 0.72 },
  { src: "/images/easy/iced-coffee-dispenser.webp",         alt: "Branded iced coffee dispenser graphics",           ar: 0.59 },
  { src: "/images/easy/qsr-hangry-burger-menu-board.webp",  alt: "Quick-service restaurant menu board",              ar: 1.5 },
];

const COLUMN_2: Tile[] = [
  { src: "/images/easy/cooler-doors-promotional-graphics.webp",  alt: "Cooler door promotional graphics run",        ar: 1.25 },
  { src: "/images/easy/hot-dog-combo-menu-signs.webp",           alt: "Hot food combo menu signage",                 ar: 1.0 },
  { src: "/images/easy/coke-pepsi-shelf-talkers.webp",           alt: "Shelf-edge price talker signage",             ar: 1.5 },
  { src: "/images/easy/feather-flag-circle-k-hot-food.webp",     alt: "Feather flag promoting hot food",             ar: 0.8 },
];

const COLUMN_3: Tile[] = [
  { src: "/images/easy/storefront-promo-window-cling.webp",      alt: "Convenience store window cling promotions",   ar: 1.25 },
  { src: "/images/easy/grab-go-fresh-eats-cooler2.webp",         alt: "Fresh food cooler branding, alternate view",  ar: 0.74 },
  { src: "/images/easy/cooler-doors-promotional-graphics2.webp", alt: "Cooler door graphics, alternate view",        ar: 1.25 },
  { src: "/images/easy/qsr-hangry-burger-menu-board2.webp",      alt: "QSR menu board, alternate view",              ar: 1.5 },
  { src: "/images/easy/iced-coffee-dispenser2.webp",             alt: "Iced coffee dispenser, alternate view",       ar: 0.59 },
];

const allImages: Tile[] = [...COLUMN_1, ...COLUMN_2, ...COLUMN_3];

const DURATION = 30;

function VerticalColumn({
  tiles,
  direction,
  loadEager,
  width,
}: {
  tiles: Tile[];
  direction: "up" | "down";
  loadEager: boolean;
  width: number;
}) {
  const doubled = [...tiles, ...tiles];
  const animateY = direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className="relative flex-shrink-0 overflow-hidden" style={{ width }}>
      <motion.div
        animate={{ y: animateY }}
        transition={{ duration: DURATION, repeat: Infinity, ease: "linear" }}
        className="flex flex-col gap-4 px-2"
      >
        {doubled.map((tile, i) => (
          <div
            key={`${tile.src}-${i}`}
            className="relative w-full rounded-xl overflow-hidden shadow-2xl"
            style={{ height: Math.round((width - 16) / tile.ar) }}
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes={`${width}px`}
              quality={85}
              loading={(loadEager && i < tiles.length) || i === 0 ? "eager" : "lazy"}
              priority={(loadEager && i < 3) || i === 0}
              className="object-cover object-center"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function HorizontalRow({
  images,
  direction,
  height,
}: {
  images: Tile[];
  direction: "left" | "right";
  height: number;
}) {
  const doubled = [...images, ...images];
  const animateX = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
      }}
    >
      <motion.div
        animate={{ x: animateX }}
        transition={{ duration: DURATION, repeat: Infinity, ease: "linear" }}
        className="flex gap-4"
      >
        {doubled.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="relative flex-shrink-0 rounded-xl overflow-hidden shadow-2xl"
            style={{ width: Math.round(height * img.ar), height }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={`${Math.round(height * img.ar)}px`}
              quality={85}
              loading="lazy"
              className="object-cover object-center"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function HeroScrollingColumns() {
  const row1 = allImages.slice(0, 7);
  const row2 = allImages.slice(7);

  return (
    <>
      {/* Mobile (<md): single horizontal row */}
      <div className="block md:hidden">
        <HorizontalRow images={allImages} direction="left" height={160} />
      </div>

      {/* Tablet (md to lg): 2 horizontal rows, opposite directions */}
      <div className="hidden md:flex md:flex-col md:gap-4 lg:hidden">
        <HorizontalRow images={row1} direction="left"  height={200} />
        <HorizontalRow images={row2} direction="right" height={200} />
      </div>

      {/* Desktop wide (lg+): 3 vertical scrolling columns */}
      <div className="hidden lg:block">
        <div
          className="relative ml-auto flex gap-4 max-w-[680px]"
          style={{
            height: 560,
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
          aria-hidden="false"
        >
          <VerticalColumn tiles={COLUMN_1} direction="up"   loadEager        width={200} />
          <VerticalColumn tiles={COLUMN_2} direction="down" loadEager={false} width={240} />
          <VerticalColumn tiles={COLUMN_3} direction="up"   loadEager={false} width={200} />
        </div>
      </div>
    </>
  );
}
