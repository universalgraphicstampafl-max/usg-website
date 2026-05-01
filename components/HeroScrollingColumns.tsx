"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Tile = { src: string; alt: string; height: number };
type ImageMeta = { src: string; alt: string };

const COLUMN_1: Tile[] = [
  { src: "/images/hero/hero-primary.webp",                alt: "Coca-Cola promotional signage at gas station storefront", height: 320 },
  { src: "/images/services/signage-programs.webp",        alt: "Multi-location POP signage programs",                    height: 240 },
  { src: "/images/marquee/11-vinyl-lettering.webp",       alt: "Storefront cut vinyl lettering",                         height: 380 },
  { src: "/images/services/store-surveys.webp",           alt: "Gas pump topper store survey",                           height: 280 },
  { src: "/images/marquee/06-a-frame.webp",               alt: "A-frame sandwich board sign",                            height: 440 },
  { src: "/images/services/direct-store-delivery.webp",   alt: "Direct store delivery logistics",                        height: 260 },
  { src: "/images/marquee/05-pole-sign.webp",             alt: "Pole-mounted retail sign",                               height: 360 },
  { src: "/images/marquee/10-pylon-toppers.webp",         alt: "Pylon-topper signage",                                   height: 300 },
];

const COLUMN_2: Tile[] = [
  { src: "/images/industries/beverage.webp",              alt: "Beverage cooler beer cave",                              height: 380 },
  { src: "/images/industries/grocery.webp",               alt: "Grocery store signage",                                  height: 280 },
  { src: "/images/services/custom-print-production.webp", alt: "Custom printed cooler door graphics",                    height: 340 },
  { src: "/images/marquee/01-grab-go-cooler.webp",        alt: "Grab and go cooler signage",                             height: 240 },
  { src: "/images/marquee/03-poster-frame.webp",          alt: "Outdoor poster frame display",                           height: 420 },
  { src: "/images/industries/qsr.webp",                   alt: "QSR pylon signage",                                      height: 300 },
  { src: "/images/marquee/04-floor-display.webp",         alt: "POP floor display",                                      height: 360 },
  { src: "/images/industries/tobacco-nicotine.webp",      alt: "Tobacco and nicotine retail signage",                    height: 280 },
];

const COLUMN_3: Tile[] = [
  { src: "/images/services/graphic-design.webp",          alt: "In-house graphic design",                                height: 280 },
  { src: "/images/services/product-photography.webp",     alt: "Product photography studio work",                        height: 360 },
  { src: "/images/industries/convenience-retail.webp",    alt: "Convenience retail storefront",                          height: 240 },
  { src: "/images/marquee/02-menu-signs.webp",            alt: "Promotional menu signs",                                 height: 320 },
  { src: "/images/marquee/12-qsr-pylon.webp",             alt: "QSR pylon identification sign",                          height: 400 },
  { src: "/images/marquee/07-suspended-menu.webp",        alt: "Suspended menu board",                                   height: 260 },
  { src: "/images/marquee/09-shelf-talkers.webp",         alt: "Shelf talker promotional signs",                         height: 340 },
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
