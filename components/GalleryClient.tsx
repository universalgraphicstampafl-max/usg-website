"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// R3F renders WebGL — must not be server-rendered
const StoreExplorer = dynamic(() => import("@/components/StoreExplorer"), { ssr: false });

type Category =
  | "Storefront"
  | "Cooler Graphics"
  | "Gas Pump"
  | "Menu Board"
  | "A-Frame"
  | "Flag"
  | "Shelf & Aisle"
  | "Floor Display"
  | "Counter"
  | "Beverage";

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
  "Shelf & Aisle",
  "Floor Display",
  "Counter",
  "Beverage",
];

const ITEMS: GalleryItem[] = [
  { src: "/images/gallery/02-convenience-storefront.webp", alt: "Pump Bollard Snap Lock", category: "Gas Pump" },
  { src: "/images/gallery/03-corona-beer-cave.webp", alt: "Cooler Graphics", category: "Cooler Graphics" },
  { src: "/images/gallery/05-grocery-fresh-eats.webp", alt: "Open Air Cooler Wraps", category: "Cooler Graphics" },
  { src: "/images/gallery/06-tobacco-marlboro.webp", alt: "Cigarette Changeable", category: "Storefront" },
  { src: "/images/gallery/07-storefront-window-cling.webp", alt: "Storefront Window Signage", category: "Storefront" },
  { src: "/images/gallery/08-qsr-hangry-burger-menu.webp", alt: "Menu Board", category: "Menu Board" },
  { src: "/images/signtypes/panels/coolerstatic-1.webp", alt: "Cooler Door Statics", category: "Cooler Graphics" },
  { src: "/images/signtypes/panels/pump-1.webp", alt: "Pump Topper & Pump Topper Extender", category: "Gas Pump" },
  { src: "/images/gallery/11-circle-k-hot-food-flag.webp", alt: "Feather Flag", category: "Flag" },
  { src: "/images/gallery/12-iced-coffee-dispenser.webp", alt: "Dispensed Beverage Signage", category: "Beverage" },
  { src: "/images/gallery/13-grab-go-cooler.webp", alt: "Grab and Go Cooler Signage", category: "Cooler Graphics" },
  { src: "/images/gallery/14-hot-dog-combo-signs.webp", alt: "Bent Register Signage", category: "Counter" },
  { src: "/images/gallery/15-karma-poster-frame.webp", alt: "Backlit Kiosk Sign", category: "Storefront" },
  { src: "/images/signtypes/panels/standee-1.webp", alt: "Standee", category: "Floor Display" },
  { src: "/images/gallery/17-fiji-pole-sign.webp", alt: "Snap Lock Insert", category: "Storefront" },
  { src: "/images/gallery/18-brunch-a-frame.webp", alt: "Sidewalk A-Frame", category: "A-Frame" },
  { src: "/images/gallery/19-suspended-menu-board.webp", alt: "Menu Board", category: "Menu Board" },
  { src: "/images/gallery/20-three-flag-formats.webp", alt: "Interior Feather Flag", category: "Flag" },
  { src: "/images/gallery/21-coke-pepsi-shelf-talkers.webp", alt: "Shelf Talker", category: "Shelf & Aisle" },
  { src: "/images/gallery/22-newport-marlboro-pylons.webp", alt: "Perf Window Decals", category: "Storefront" },
  { src: "/images/signtypes/building-snaplock.webp", alt: "Building Snaplock", category: "Storefront" },
  { src: "/images/signtypes/panels/bollard-1.webp", alt: "Triangle Bollard", category: "Gas Pump" },
  { src: "/images/signtypes/panels/icemerch-1.webp", alt: "Ice Merch Decals", category: "Storefront" },
  { src: "/images/signtypes/panels/checkout-1.webp", alt: "Checkout & Impulse Signage", category: "Counter" },
  { src: "/images/signtypes/panels/floorgfx-1.webp", alt: "Floor Graphics", category: "Floor Display" },
  { src: "/images/signtypes/panels/shelf-1.webp", alt: "Shelf Tags", category: "Shelf & Aisle" },
  { src: "/images/signtypes/panels/wobbler-1.webp", alt: "Wobblers", category: "Shelf & Aisle" },
  { src: "/images/signtypes/panels/coolerstrip-1.webp", alt: "Cooler Strips", category: "Cooler Graphics" },
  { src: "/images/signtypes/panels/napkin-1.webp", alt: "Napkin Inserts", category: "Counter" },
  { src: "/images/signtypes/panels/backbar-1.webp", alt: "Backbar Signage", category: "Counter" },
  { src: "/images/signtypes/panels/hotfood-1.webp", alt: "Hot Food Signage", category: "Menu Board" },
];

export default function GalleryClient() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  const visible = useMemo(
    () => (filter === "All" ? ITEMS : ITEMS.filter((it) => it.category === filter)),
    [filter],
  );

  const slides = useMemo(
    () => visible.map((it) => ({ src: it.src, alt: it.alt })),
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

      {/* 3D Interactive Store Explorer */}
      <section className="bg-brand-navy px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <StoreExplorer />
          <p className="text-center text-white/55 text-sm mt-4">
            Explore a live retail site — tap any glowing pin to see the signage USG produces for that spot.
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
