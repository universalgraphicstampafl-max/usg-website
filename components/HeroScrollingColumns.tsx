"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Tile = { src: string; alt: string; height: number };
type ImageMeta = { src: string; alt: string };

const COLUMN_1: Tile[] = [
  { src: "/images/easy/hero-coca-cola-sunset-station.webp", alt: "Coca-Cola bollard sign at gas station storefront",  height: 320 },
  { src: "/images/easy/grab-go-fresh-eats-cooler.webp",     alt: "Branded grab-and-go fresh food cooler",            height: 240 },
  { src: "/images/easy/storefront-vinyl-lettering.webp",    alt: "Storefront window vinyl lettering",                height: 380 },
  { src: "/images/easy/gas-pump-celsius-topper.webp",       alt: "Gas pump dispenser with beverage topper graphic",  height: 280 },
  { src: "/images/easy/brunch-a-frame-sandwich-board.webp", alt: "A-frame sidewalk sandwich board sign",             height: 440 },
  { src: "/images/easy/iced-coffee-dispenser.webp",         alt: "Branded iced coffee dispenser graphics",           height: 260 },
  { src: "/images/easy/fiji-stay-hydrated-pole-sign.webp",  alt: "Pole-mounted beverage promotional sign",           height: 360 },
  { src: "/images/easy/qsr-hangry-burger-menu-board.webp",  alt: "Quick-service restaurant menu board",              height: 300 },
];

const COLUMN_2: Tile[] = [
  { src: "/images/easy/corona-find-your-beach-beer-cave.webp",   alt: "Beer cave cooler header graphics",            height: 380 },
  { src: "/images/easy/cooler-doors-promotional-graphics.webp",  alt: "Cooler door promotional graphics run",        height: 280 },
  { src: "/images/easy/suspended-menu-board.webp",               alt: "Suspended menu board signage",                height: 340 },
  { src: "/images/easy/hot-dog-combo-menu-signs.webp",           alt: "Hot food combo menu signage",                 height: 240 },
  { src: "/images/easy/karma-wellness-poster-frame.webp",        alt: "Beverage poster frame display",               height: 420 },
  { src: "/images/easy/coke-pepsi-shelf-talkers.webp",           alt: "Shelf-edge price talker signage",             height: 300 },
  { src: "/images/easy/vuex-pop-floor-display.webp",             alt: "Point-of-purchase floor display",             height: 360 },
  { src: "/images/easy/feather-flag-circle-k-hot-food.webp",     alt: "Feather flag promoting hot food",             height: 280 },
];

const COLUMN_3: Tile[] = [
  { src: "/images/easy/storefront-promo-window-cling.webp",      alt: "Convenience store window cling promotions",   height: 280 },
  { src: "/images/easy/grab-go-fresh-eats-cooler2.webp",         alt: "Fresh food cooler branding, alternate view",  height: 360 },
  { src: "/images/easy/corona-find-your-beach-beer-cave2.webp",  alt: "Beer cave headers, alternate view",           height: 240 },
  { src: "/images/easy/storefront-vinyl-lettering2.webp",        alt: "Storefront vinyl lettering, alternate view",  height: 320 },
  { src: "/images/easy/cooler-doors-promotional-graphics2.webp", alt: "Cooler door graphics, alternate view",        height: 400 },
  { src: "/images/easy/qsr-hangry-burger-menu-board2.webp",      alt: "QSR menu board, alternate view",              height: 260 },
  { src: "/images/easy/iced-coffee-dispenser2.webp",             alt: "Iced coffee dispenser, alternate view",       height: 340 },
];

const allImages: ImageMeta[] = [...COLUMN_1, ...COLUMN_2, ...COLUMN_3].map(({ src, alt }) => ({ src, alt }));

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
            style={{ height: tile.height }}
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes={`${width}px`}
              quality={85}
              loading={loadEager && i < tiles.length ? "eager" : "lazy"}
              priority={loadEager && i < 3}
              className="object-cover"
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
  width,
  height,
}: {
  images: ImageMeta[];
  direction: "left" | "right";
  width: number;
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
            style={{ width, height }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={`${width}px`}
              quality={85}
              loading="lazy"
              className="object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function HeroScrollingColumns() {
  const row1 = allImages.slice(0, 12);
  const row2 = allImages.slice(12);

  return (
    <>
      {/* Mobile (<md): single horizontal row */}
      <div className="block md:hidden">
        <HorizontalRow images={allImages} direction="left" width={220} height={160} />
      </div>

      {/* Tablet (md to lg): 2 horizontal rows, opposite directions */}
      <div className="hidden md:flex md:flex-col md:gap-4 lg:hidden">
        <HorizontalRow images={row1} direction="left"  width={280} height={200} />
        <HorizontalRow images={row2} direction="right" width={280} height={200} />
      </div>

      {/* Desktop wide (lg+): 3 vertical scrolling columns */}
      <div className="hidden lg:block">
        <div
          className="relative ml-auto flex gap-4 max-w-[680px]"
          style={{
            height: 700,
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
