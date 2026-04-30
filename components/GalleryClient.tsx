"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Category =
  | "Storefront"
  | "Cooler Graphics"
  | "Gas Pump"
  | "Menu Board"
  | "A-Frame"
  | "Flag"
  | "Pylon"
  | "Shelf Talker"
  | "Floor Display";

type GalleryItem = {
  src: string;
  alt: string;
  category: Category;
};

const FILTERS: ("All" | Category)[] = [
  "All",
  "Storefront",
  "Cooler Graphics",
  "Gas Pump",
  "Menu Board",
  "A-Frame",
  "Flag",
  "Pylon",
  "Shelf Talker",
  "Floor Display",
];

const ITEMS: GalleryItem[] = [
  { src: "/images/gallery/01-hero-storefront-coca-cola.webp", alt: "Coca-Cola storefront program", category: "Storefront" },
  { src: "/images/gallery/02-convenience-storefront.webp", alt: "Convenience store storefront signage", category: "Storefront" },
  { src: "/images/gallery/03-corona-beer-cave.webp", alt: "Corona beer cave cooler graphics", category: "Cooler Graphics" },
  { src: "/images/gallery/04-qsr-bbq-pylon.webp", alt: "QSR BBQ pylon sign", category: "Pylon" },
  { src: "/images/gallery/05-grocery-fresh-eats.webp", alt: "Grocery fresh-eats cooler graphics", category: "Cooler Graphics" },
  { src: "/images/gallery/06-tobacco-marlboro.webp", alt: "Tobacco Marlboro pylon", category: "Pylon" },
  { src: "/images/gallery/07-storefront-window-cling.webp", alt: "Storefront window cling", category: "Storefront" },
  { src: "/images/gallery/08-qsr-hangry-burger-menu.webp", alt: "QSR Hangry burger menu board", category: "Menu Board" },
  { src: "/images/gallery/09-cooler-doors-graphics.webp", alt: "Cooler door graphics", category: "Cooler Graphics" },
  { src: "/images/gallery/10-gas-pump-celsius-topper.webp", alt: "Celsius gas pump topper", category: "Gas Pump" },
  { src: "/images/gallery/11-circle-k-hot-food-flag.webp", alt: "Circle K hot food flag", category: "Flag" },
  { src: "/images/gallery/12-iced-coffee-dispenser.webp", alt: "Iced coffee dispenser graphics", category: "Cooler Graphics" },
  { src: "/images/gallery/13-grab-go-cooler.webp", alt: "Grab-and-go cooler graphics", category: "Cooler Graphics" },
  { src: "/images/gallery/14-hot-dog-combo-signs.webp", alt: "Hot dog combo menu signs", category: "Menu Board" },
  { src: "/images/gallery/15-karma-poster-frame.webp", alt: "Karma poster frame pylon", category: "Pylon" },
  { src: "/images/gallery/16-vuex-pop-floor-display.webp", alt: "Vuex POP floor display", category: "Floor Display" },
  { src: "/images/gallery/17-fiji-pole-sign.webp", alt: "Fiji pole sign", category: "Pylon" },
  { src: "/images/gallery/18-brunch-a-frame.webp", alt: "Brunch A-frame sandwich board", category: "A-Frame" },
  { src: "/images/gallery/19-suspended-menu-board.webp", alt: "Suspended menu board", category: "Menu Board" },
  { src: "/images/gallery/20-three-flag-formats.webp", alt: "Three flag formats", category: "Flag" },
  { src: "/images/gallery/21-coke-pepsi-shelf-talkers.webp", alt: "Coke and Pepsi shelf talkers", category: "Shelf Talker" },
  { src: "/images/gallery/22-newport-marlboro-pylons.webp", alt: "Newport and Marlboro pylons", category: "Pylon" },
  { src: "/images/gallery/23-storefront-vinyl-lettering.webp", alt: "Storefront vinyl lettering", category: "Storefront" },
];

export default function GalleryClient() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  const visible = useMemo(
    () => (filter === "All" ? ITEMS : ITEMS.filter((it) => it.category === filter)),
    [filter],
  );

  const slides = useMemo(
    () => visible.map((it) => ({ src: it.src, alt: it.alt, description: it.category })),
    [visible],
  );

  return (
    <div className="bg-brand-offwhite">
      {/* Hero */}
      <section className="bg-brand-navy text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-sub !text-brand-gold">Our Work</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-brand-tight mb-4 !text-white">
            Our Work
          </h1>
          <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
            Real signage programs. Real retail locations. Every format we deliver.
          </p>
        </div>
      </section>

      {/* Filter chips */}
      <section className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex gap-2 flex-wrap">
          {FILTERS.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-brand-tight transition-colors ${
                  active
                    ? "bg-brand-navy text-white"
                    : "bg-brand-offwhite text-brand-navy hover:bg-brand-navy hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Masonry grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {visible.map((item, i) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                data-category={item.category}
                className="group mb-4 break-inside-avoid block w-full overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1200}
                    height={900}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-xs text-brand-sky font-semibold tracking-brand-wide uppercase mb-1">
                    {item.category}
                  </p>
                  <h3 className="font-bold text-brand-navy text-sm tracking-brand-tight">
                    {item.alt}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex < 0 ? 0 : lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
      />
    </div>
  );
}
