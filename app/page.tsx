"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// R3F renders WebGL — must not be server-rendered
const StoreExplorer = dynamic(() => import("@/components/StoreExplorer"), { ssr: false });
import HeroScrollingColumns from "@/components/HeroScrollingColumns";
import HeroParticles    from "@/components/HeroParticles";
import HeroMesh         from "@/components/HeroMesh";
import HeroShapes       from "@/components/HeroShapes";
import HeroHeadline     from "@/components/HeroHeadline";
import RevealWrapper    from "@/components/RevealWrapper";
import SectionReveal    from "@/components/SectionReveal";
import CapabilityMarquee from "@/components/CapabilityMarquee";
import ServicesFlow from "@/components/ServicesFlow";
import DiscoverCard     from "@/components/DiscoverCard";
import MarqueeLogos     from "@/components/MarqueeLogos";
import ProcessSteps     from "@/components/ProcessSteps";
import SlotCounter      from "@/components/SlotCounter";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import TiltCard         from "@/components/TiltCard";
import TypewriterLabel  from "@/components/TypewriterLabel";
import ParticleBurst    from "@/components/ParticleBurst";
import MagneticWrapper  from "@/components/MagneticWrapper";

const SERVICES = [
  {
    name: "Multi-Location POP Signage",
    href: "/services/signage-programs",
    image: "/images/easy/cooler-doors-promotional-graphics4.webp",
    desc: "Monthly, bi-monthly, and quarterly promotional programs for chains of any size.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
  },
  {
    name: "Graphic Design",
    href: "/services/graphic-design",
    image: "/images/easy/brunch-a-frame-sandwich-board4.webp",
    desc: "In-house design team. No upcharges — ever. You pay for the finished product only.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>,
  },
  {
    name: "Custom Print Production",
    href: "/services/custom-print-production",
    image: "/images/easy/coke-pepsi-shelf-talkers4.webp",
    desc: "Digital and screen printing. Banners, cooler graphics, floor graphics, and more.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>,
  },
  {
    name: "Store Surveys",
    href: "/services/store-surveys",
    image: "/images/easy/storefront-promo-window-cling4.webp",
    desc: "Precise store measurements and asset profiling for perfectly fitted signage.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>,
  },
  {
    name: "Direct Store Delivery",
    href: "/services/direct-store-delivery",
    image: "/images/easy/gas-pump-celsius-topper4.webp",
    desc: "Shipped to every store location, with simple reordering built in.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
  },
  {
    name: "Product Photography",
    href: "/services/product-photography",
    image: "/images/easy/qsr-hangry-burger-menu-board4.webp",
    desc: "In-house food and product photography to complement your programs.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" /></svg>,
  },
];

const TESTIMONIALS = [
  {
    quote: "The service with Universal Signage & Graphics has been outstanding. Whether we have a specific idea in mind or we don't even know what we want, the USG team is there for us.",
    attribution: "Marketing Manager — Handy Mart Convenience Stores",
    tenure: "Partner since 2014",
    tilt: -2,
  },
  {
    quote: "When comparing their printing costs with those of other providers, they can't be beat. The level of service that they provide is second to none.",
    attribution: "Public Relations and Marketing — E-Z Mart Stores",
    tenure: "Partner since 2001",
    tilt: 2,
  },
];

const INDUSTRIES = [
  {
    name: "Convenience Retail",
    href: "/industries/convenience-retail",
    image: "/images/easy/hero-coca-cola-sunset-station4.webp",
    desc: "Gas stations, c-stores, truck stops — branded for speed.",
  },
  {
    name: "Tobacco & Nicotine",
    href: "/industries/tobacco-nicotine",
    image: "/images/easy/marlboro-gas-pump-promo.webp",
    desc: "Compliance-aware signage for regulated categories.",
  },
  {
    name: "QSR",
    href: "/industries/qsr",
    image: "/images/easy/suspended-menu-board4.webp",
    desc: "Menu boards, drive-thru, in-store — every touchpoint.",
  },
  {
    name: "Grocery",
    href: "/industries/grocery",
    image: "/images/easy/grab-go-fresh-eats-cooler4.webp",
    desc: "End-cap, shelf, cooler — moving product since 1985.",
  },
  {
    name: "Beverage",
    href: "/industries/beverage",
    image: "/images/easy/corona-find-your-beach-beer-cave4.webp",
    desc: "Cooler graphics and POP that pull buyers from the aisle.",
  },
];

const GALLERY_PREVIEW = [
  "/images/gallery/01-hero-storefront-coca-cola.webp",
  "/images/gallery/04-qsr-bbq-pylon.webp",
  "/images/gallery/07-storefront-window-cling.webp",
  "/images/gallery/10-gas-pump-celsius-topper.webp",
  "/images/gallery/13-grab-go-cooler.webp",
  "/images/gallery/16-vuex-pop-floor-display.webp",
  "/images/gallery/19-suspended-menu-board.webp",
  "/images/gallery/22-newport-marlboro-pylons.webp",
];

function SectionDivider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-current/10 to-transparent" aria-hidden="true" />;
}

export default function HomePage() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  return (
    <div className="bg-brand-offwhite text-brand-navy">

      {/* ── 1 · HERO (navy) ────────────────────────────────────────── */}
      <section
        className="relative text-white overflow-hidden -mt-[64px]"
        style={{ background: "#1B2D5E" }}
      >
        {/* Marigold split panel (desktop only) */}
        <div aria-hidden="true" className="hero-panel hidden lg:block absolute z-0 inset-y-0 left-0 w-[42%]" />
        <div aria-hidden="true" className="hero-fade hidden lg:block absolute z-0 inset-y-0" />

        <HeroMesh />
        <HeroShapes />
        <HeroParticles />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 md:py-36">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_680px] lg:gap-12 lg:items-center">

            <div className="hero-text-col relative">
              <p
                className="section-sub mb-4 text-brand-navy"
                style={{ animation: "heroEnter 0.6s ease-out 0.1s both" }}
              >
                Retail Signage Specialists
              </p>

              <HeroHeadline />

              <p
                className="text-lg md:text-xl text-brand-navy/90 max-w-xl leading-relaxed mb-6"
                style={{ animation: "heroEnter 0.7s ease-out 0.5s both" }}
              >
                We design, produce, and deliver promotional signage programs for convenience, tobacco,
                QSR, grocery, and beverage chains — serving multi-location retailers, franchise
                organizations, and chain locations across the US.
              </p>

              <div
                className="inline-flex gap-6 bg-brand-navy/10 border border-brand-navy/20 rounded-xl px-5 py-3 mb-8 text-sm"
                style={{ animation: "heroEnter 0.6s ease-out 0.65s both" }}
              >
                <span className="text-brand-navy/70">Serving</span>
                <span className="font-bold text-brand-navy number-glow">2,000+ locations</span>
                <span className="text-brand-navy/70">across</span>
                <span className="font-bold text-brand-navy number-glow" style={{ animationDelay: "2s" }}>28 states</span>
              </div>

              <div
                className="flex flex-col md:flex-row gap-4 items-start mt-8 flex-wrap"
                style={{ animation: "heroEnter 0.6s ease-out 0.8s both" }}
              >
                <Link href="/book" className="inline-block bg-brand-navy text-white hover:bg-brand-navy-dark transition-colors duration-200 font-semibold tracking-brand-wide !px-8 !py-4 !rounded-xl text-base w-full sm:w-auto max-w-md sm:max-w-none mx-auto sm:mx-0 whitespace-normal sm:whitespace-nowrap text-center">
                  Book Your Free Campaign Analysis
                </Link>
                <Link
                  href="/success-stories"
                  className="text-base font-semibold tracking-brand-wide text-brand-navy border-2 border-brand-navy/70 px-6 py-4 rounded w-full sm:w-auto max-w-md mx-auto sm:mx-0 whitespace-normal text-center hover:bg-brand-navy/10 transition-colors duration-200"
                >
                  See our work
                </Link>
              </div>
            </div>

            <div className="lg:flex lg:justify-center lg:items-center">
              <HeroScrollingColumns />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── 2 · LOGO WALL / AUTHORITY BAR (cream) ───────────────────── */}
      <SectionReveal>
        <section className="bg-brand-offwhite py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 text-center mb-10">
            <p className="text-xs font-semibold tracking-widest text-brand-sky uppercase mb-2">
              What we deliver
            </p>
            <h2 className="text-4xl font-black text-brand-navy">
              Every format. Every fixture. Every <span className="font-serif italic font-normal">store</span>.
            </h2>
          </div>
          <MarqueeLogos />
          <div className="container mx-auto px-6 lg:px-12">
            <p className="text-sm text-brand-navy/60 mt-6 text-center">
              2,000+ retail locations served across the US
            </p>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 3 · SUCCESS IN NUMBERS (navy) ───────────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-navy py-24 lg:py-36 text-white overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <RevealWrapper className="text-center mb-16 lg:mb-24">
              <p className="text-xs tracking-[0.2em] font-semibold text-brand-sky uppercase mb-4">
                Success in numbers
              </p>
              <h2 className="text-4xl lg:text-6xl font-black text-white max-w-3xl mx-auto leading-[1.05]">
                The best return on your <span className="font-serif italic font-normal text-brand-gold">signage investment</span>.
              </h2>
            </RevealWrapper>

            {/* Editorial 2-col rows: each stat pairs supporting copy with a giant serif number, alternating sides */}
            <div className="divide-y divide-white/10">
              {/* Row 1 — text left, number right */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 lg:py-16">
                <RevealWrapper delay={0}>
                  <p className="text-lg lg:text-xl text-white/85 leading-relaxed max-w-md">
                    Clients report a <span className="text-white font-semibold">10% lift in product sales</span> after partnering with USG.
                  </p>
                  <p className="text-sm tracking-wide text-brand-sky uppercase mt-4 font-semibold">Average sales increase</p>
                </RevealWrapper>
                <RevealWrapper delay={0.1} className="lg:text-right">
                  <span className="block font-serif font-normal text-brand-gold leading-none text-7xl lg:text-[8.5rem]">
                    <SlotCounter target={10} suffix="%" delay={0} />
                  </span>
                </RevealWrapper>
              </div>

              {/* Row 2 — number left, text right */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 lg:py-16">
                <RevealWrapper delay={0} className="order-2 lg:order-1">
                  <span className="block font-serif font-normal text-brand-gold leading-none text-7xl lg:text-[8.5rem]">
                    <SlotCounter target={30} suffix="+" delay={0.2} />
                  </span>
                </RevealWrapper>
                <RevealWrapper delay={0.1} className="order-1 lg:order-2">
                  <p className="text-lg lg:text-xl text-white/85 leading-relaxed max-w-md">
                    <span className="text-white font-semibold">Three decades</span> of established, credible retail signage expertise.
                  </p>
                  <p className="text-sm tracking-wide text-brand-sky uppercase mt-4 font-semibold">Years in business</p>
                </RevealWrapper>
              </div>

              {/* Row 3 — text left, number right */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 lg:py-16">
                <RevealWrapper delay={0}>
                  <p className="text-lg lg:text-xl text-white/85 leading-relaxed max-w-md">
                    Signage shipped <span className="text-white font-semibold">direct to store</span> across 28 states nationwide.
                  </p>
                  <p className="text-sm tracking-wide text-brand-sky uppercase mt-4 font-semibold">Retail locations served</p>
                </RevealWrapper>
                <RevealWrapper delay={0.1} className="lg:text-right">
                  <span className="block font-serif font-normal text-brand-gold leading-none text-7xl lg:text-[8.5rem]">
                    <SlotCounter target={2000} suffix="+" thousands delay={0.4} />
                  </span>
                </RevealWrapper>
              </div>

              {/* Row 4 — number left, text right */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 lg:py-16">
                <RevealWrapper delay={0} className="order-2 lg:order-1">
                  <span className="block font-serif font-normal text-brand-gold leading-none text-7xl lg:text-[8.5rem]">
                    <SlotCounter target={99.7} suffix="%" decimals={1} delay={0.6} />
                  </span>
                </RevealWrapper>
                <RevealWrapper delay={0.1} className="order-1 lg:order-2">
                  <p className="text-lg lg:text-xl text-white/85 leading-relaxed max-w-md">
                    The right products, in the right box, <span className="text-white font-semibold">99.7% of the time.</span>
                  </p>
                  <p className="text-sm tracking-wide text-brand-sky uppercase mt-4 font-semibold">Packing accuracy</p>
                </RevealWrapper>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 3.5 · SERVICES FLOW (animated diagram) ──────────────────── */}
      <ServicesFlow />

      <SectionDivider />

      {/* ── 4 · SERVICES OVERVIEW (cream) ───────────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-offwhite py-20 lg:py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <RevealWrapper className="mb-10">
              <TypewriterLabel
                text="What we do"
                className="text-xs tracking-widest font-semibold text-brand-sky uppercase"
              />
              <h2 className="text-4xl font-black text-brand-navy mt-2">
                One partner. Every <span className="font-serif italic font-normal">signage</span> need.
              </h2>
            </RevealWrapper>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((svc, i) => (
                <RevealWrapper key={svc.name} delay={i * 0.08}>
                  <Link
                    href={svc.href}
                    className="group bg-white rounded-2xl border border-brand-navy/10 p-6 flex flex-col h-full hover:border-brand-navy hover:shadow-[0_8px_32px_rgba(27,45,94,0.1)] hover:-translate-y-1 transition-all duration-[250ms] cursor-pointer"
                  >
                    <div className="relative w-full aspect-[4/3] mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={svc.image}
                        alt={svc.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-brand-navy group-hover:bg-[#2D4A7A] text-white flex items-center justify-center mb-4 flex-shrink-0 transition-colors duration-200">
                      {svc.icon}
                    </div>
                    <p className="font-bold text-brand-navy mb-2">{svc.name}</p>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1">{svc.desc}</p>
                    <span className="text-brand-sky text-sm mt-4 font-medium inline-block group-hover:translate-x-1 transition-transform duration-200">
                      Learn more →
                    </span>
                  </Link>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 5 · CAPABILITY MARQUEE (navy) ───────────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-navy py-20 lg:py-32 text-white overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 mb-10 text-center">
            <h2 className="text-4xl font-black text-white">
              Every fixture. Every format. Every <span className="font-serif italic font-normal">capability</span>.
            </h2>
            <p className="text-white/80 text-lg mt-3 max-w-2xl mx-auto">
              From cooler doors to pylon toppers — we produce signage for every retail surface.
            </p>
          </div>
          <CapabilityMarquee />
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 6 · DISCOVER (cream) ────────────────────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-offwhite py-20 lg:py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <RevealWrapper className="mb-10">
              <TypewriterLabel
                text="Why USG"
                className="text-xs tracking-widest font-semibold text-brand-sky uppercase"
              />
              <h2 className="text-4xl font-black text-brand-navy mt-2">
                Discover the <span className="font-serif italic font-normal">difference</span>
              </h2>
            </RevealWrapper>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  delay: 0,
                  title: "Predictable pricing. No upcharges. Ever.",
                  body: "The quote you receive is the price you pay. No hidden design fees, no surprise material costs, no rush charges.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                    </svg>
                  ),
                },
                {
                  delay: 0.1,
                  title: "Your dedicated account manager",
                  body: "One person who knows your program, your stores, and your brand. Available when things need to move fast.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  ),
                },
                {
                  delay: 0.2,
                  title: "Direct to every store location",
                  body: "We ship individually to each of your locations — not to a warehouse. Every store gets exactly what it needs.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  ),
                },
              ].map((card) => (
                <TiltCard key={card.title} className="h-full">
                  <DiscoverCard delay={card.delay} title={card.title} body={card.body} icon={card.icon} />
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 6b · EASY & HASSLE-FREE (navy, photo cards) ─────────────── */}
      <SectionReveal>
        <section className="bg-brand-navy py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <RevealWrapper className="text-center mb-12 lg:mb-16">
              <TypewriterLabel
                text="Easy & hassle-free"
                className="text-xs tracking-widest font-semibold text-brand-sky uppercase"
              />
              <h2 className="text-4xl lg:text-5xl font-black text-white mt-2 leading-tight">
                World-class signage.{" "}
                <span className="font-serif italic font-normal text-brand-gold">Smarter systems.</span>
              </h2>
            </RevealWrapper>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  delay: 0,
                  image: "/images/easy/snack-fresh-eat-well-cooler.webp",
                  alt: "Branded grab-and-go cooler with custom header and base graphics in a convenience store",
                  title: "In-house design & print",
                  body: "Design and production under one roof. No outsourcing, no middlemen, no delays between concept and shelf.",
                  strip: "navy" as const,
                },
                {
                  delay: 0.12,
                  image: "/images/easy/hanks-bbq-pylon-sign.webp",
                  alt: "Custom illuminated pylon sign for a BBQ restaurant",
                  title: "Store-surveyed precision",
                  body: "We measure every location so signage fits perfectly the first time — exact sizes, exact placement.",
                  strip: "marigold" as const,
                },
                {
                  delay: 0.24,
                  image: "/images/easy/three-flag-formats-showroom.webp",
                  alt: "Three custom-printed feather flags in different formats",
                  title: "Built-in reorder system",
                  body: "Reordering is effortless — one point of contact and the next run ships. No paperwork, no re-briefing.",
                  strip: "sky" as const,
                },
              ].map((card) => (
                <EasyCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 7 · CONTEXT STRIP (navy) ────────────────────────────────── */}
      <SectionReveal>
        <section className="relative py-32 lg:py-40 overflow-hidden">
          {/* Full-bleed background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/easy/storefront-vinyl-lettering4.webp"
              alt="Chain retail location"
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
            />
          </div>

          {/* Navy gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B2D5E]/85 via-[#1B2D5E]/75 to-[#1B2D5E]/85" />

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 lg:px-12">
            <p className="text-center text-2xl lg:text-4xl text-white font-light leading-relaxed max-w-5xl mx-auto">
              Serving chain locations, franchise organizations, and multi-location <span className="font-serif italic font-normal">retailers</span> across the US.
            </p>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 8 · PROCESS STEPS (cream) ──────────────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-offwhite py-20 lg:py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <RevealWrapper className="mb-12">
              <TypewriterLabel
                text="The USG process"
                className="text-xs tracking-widest font-semibold text-brand-sky uppercase"
              />
              <h2 className="text-4xl font-black text-brand-navy mt-2">
                From <span className="font-serif italic font-normal">brief</span> to every store — handled.
              </h2>
            </RevealWrapper>
            <ProcessSteps />
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 9 · PAIN → USG → OUTCOME FLOW (navy) ────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-navy py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <RevealWrapper className="text-center mb-12 lg:mb-16">
              <TypewriterLabel
                text="The USG difference"
                className="text-xs tracking-widest font-semibold text-brand-sky uppercase"
              />
              <h2 className="text-4xl lg:text-5xl font-black text-white mt-2 leading-tight">
                From signage headaches to{" "}
                <span className="font-serif italic font-normal text-brand-gold">stores that sell</span>
              </h2>
            </RevealWrapper>

            <PainWinFlow />
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 10 · INDUSTRIES SHOWCASE (cream) ────────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-offwhite py-20 lg:py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-black text-brand-navy">
                Built for the <span className="font-serif italic font-normal">industries</span> that move fast.
              </h2>
              <p className="text-brand-navy/80 text-lg mt-3 max-w-2xl mx-auto">
                5 industries. 2,000+ locations. One partner that ships on time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {INDUSTRIES.map((ind) => (
                <Link key={ind.href} href={ind.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg">
                    <Image
                      src={ind.image}
                      alt={ind.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/20" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{ind.name}</h3>
                      <p className="text-sm text-white/80">{ind.desc}</p>
                      <span className="text-sm text-brand-gold mt-3 inline-block group-hover:translate-x-1 transition-transform">
                        View case studies →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 11 · TESTIMONIALS (navy) ────────────────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-navy py-20 lg:py-32 overflow-hidden">
          <TestimonialMarquee testimonials={TESTIMONIALS} />

          <div className="container mx-auto px-6 lg:px-12">
            <Link href="/success-stories" className="text-brand-sky hover:text-brand-sky-dark font-medium mt-8 block text-center transition-colors">
              See all success stories →
            </Link>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 12 · GALLERY PREVIEW (cream) ────────────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-offwhite py-20 lg:py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-black text-brand-navy">
                Recent <span className="font-serif italic font-normal">work</span> in the wild.
              </h2>
              <p className="text-brand-navy/80 text-lg mt-3 max-w-2xl mx-auto">
                A glimpse at what we&apos;ve shipped to convenience, tobacco, QSR, grocery, and beverage chains.
              </p>
            </div>

            {/* Static 3D model preview — click to open the full interactive explorer */}
            <div className="mb-8">
              <StoreExplorer staticPreview />
            </div>

            {/* Preview thumbnails — even grid, click to open enlarged lightbox */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {GALLERY_PREVIEW.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg group cursor-pointer bg-[#1B2D5E]/10 block w-full"
                  aria-label={`View USG project ${i + 1} enlarged`}
                >
                  <Image
                    src={src}
                    alt={`USG project ${i + 1}`}
                    fill
                    placeholder="empty"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </button>
              ))}
            </div>

            <Lightbox
              open={lightboxIndex >= 0}
              close={() => setLightboxIndex(-1)}
              index={lightboxIndex < 0 ? 0 : lightboxIndex}
              slides={GALLERY_PREVIEW.map((src) => ({ src }))}
            />

            <div className="flex justify-center mt-12">
              <Link href="/gallery" className="group inline-flex items-center gap-2 text-brand-navy hover:gap-3 transition-all">
                <span className="text-lg font-semibold">Visit the full gallery</span>
                <span className="text-2xl">→</span>
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 13 · FINAL CTA (navy) ───────────────────────────────────── */}
      <SectionReveal>
        <section className="relative bg-brand-navy py-20 lg:py-32 px-4 text-center text-white overflow-hidden">
          <ParticleBurst />
          <RevealWrapper className="relative max-w-3xl mx-auto">
            <p className="text-brand-gold text-xs font-semibold tracking-widest uppercase">
              Ready to simplify your signage program?
            </p>
            <h2 className="text-white text-4xl font-black mt-3">
              Get your free signage system <span className="font-serif italic font-normal">audit</span>
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mt-4 leading-relaxed">
              30-minute call. We&apos;ll review your current signage program and show you exactly what USG can do for your locations.
            </p>
            <div className="mt-8 flex justify-center items-center px-4 sm:px-0">
              <MagneticWrapper strength={8} radius={70} className="!block w-full sm:!inline-block sm:w-auto sm:max-w-none max-w-md">
                <Link href="/book" className="btn-gold text-lg !px-10 !py-4 !rounded-xl block sm:inline-block text-center">
                  Book Your Free Campaign Analysis →
                </Link>
              </MagneticWrapper>
            </div>
            <p className="text-white/50 text-sm mt-4">
              No commitment. No sales pitch. Just a clear picture of what&apos;s possible.
            </p>
          </RevealWrapper>
        </section>
      </SectionReveal>

    </div>
  );
}

/* ─── EasyCard: photo card with colored bottom strip (Superside-style) ─── */
function EasyCard({
  image, alt, title, body, strip, delay,
}: {
  image: string; alt: string; title: string; body: string;
  strip: "navy" | "marigold" | "sky"; delay: number;
}) {
  const ref      = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !firedRef.current) {
        firedRef.current = true;
        setTimeout(() => setVisible(true), delay * 1000);
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const stripStyles = {
    navy:     { bg: "bg-brand-navy-dark", title: "text-white",      body: "text-white/70" },
    marigold: { bg: "bg-brand-gold",      title: "text-brand-navy", body: "text-brand-navy/80" },
    sky:      { bg: "bg-brand-sky",       title: "text-brand-navy", body: "text-brand-navy/80" },
  }[strip];

  return (
    <div
      ref={ref}
      className="group rounded-2xl overflow-hidden bg-brand-navy-dark h-full flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className={`${stripStyles.bg} px-6 py-5`}>
        <div className="flex items-center justify-between gap-3">
          <h3 className={`font-bold text-lg ${stripStyles.title}`}>{title}</h3>
          <span
            className={`flex-shrink-0 text-xl leading-none ${stripStyles.title} opacity-50 transition-transform duration-500 group-hover:rotate-45`}
            aria-hidden="true"
          >
            +
          </span>
        </div>
        {/* body: hidden by default, expands on hover */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-2">
          <p className={`overflow-hidden text-sm leading-relaxed ${stripStyles.body}`}>{body}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── PainWinFlow: pains → USG → outcomes (Superside-style) ─────────── */
const PAIN_WIN_PAIRS: { pain: string; win: string }[] = [
  { pain: "Late, incomplete kits",            win: "On-time, 99.7% accurate kits" },
  { pain: "Art approvals drag for weeks",     win: "Fast in-house design approvals" },
  { pain: "Brand looks different everywhere", win: "Every store perfectly on-brand" },
  { pain: "Surprise upcharges on every job",  win: "One price, no upcharges ever" },
  { pain: "You manage the shipping",          win: "Shipped direct to every store" },
  { pain: "Wrong sizes, no store survey",     win: "Store-surveyed, perfect-fit signage" },
  { pain: "Juggling multiple vendors",        win: "One partner, end to end" },
];

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PainWinFlow() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Desktop: 3-column flow (pains | USG | wins) */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:items-center">
        <div>
          <p className="text-[0.65rem] tracking-widest uppercase font-bold text-red-300/80 mb-4">With other vendors</p>
          <div className="space-y-2.5">
            {PAIN_WIN_PAIRS.map((p, i) => (
              <RevealWrapper key={p.pain} delay={i * 0.06}>
                <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm leading-snug bg-red-500/10 border border-red-500/25 text-red-100/90">
                  <span className="text-red-400"><XIcon /></span>
                  {p.pain}
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>

        <RevealWrapper delay={0.2} className="flex flex-col items-center gap-3 px-2">
          <span className="text-brand-gold text-2xl leading-none">→</span>
          <div className="w-16 h-16 bg-brand-navy border-2 border-brand-gold rounded-lg flex items-center justify-center shadow-[0_0_28px_rgba(239,165,30,0.35)]">
            <div className="w-8 h-8 border-2 border-brand-gold rounded-sm relative">
              <div className="absolute inset-1 bg-brand-sky/40 rounded-sm" />
            </div>
          </div>
          <span className="text-base font-extrabold tracking-brand-logo text-brand-gold">USG</span>
          <span className="text-brand-gold text-2xl leading-none">→</span>
        </RevealWrapper>

        <div>
          <p className="text-[0.65rem] tracking-widest uppercase font-bold text-brand-sky mb-4">With USG</p>
          <div className="space-y-2.5">
            {PAIN_WIN_PAIRS.map((p, i) => (
              <RevealWrapper key={p.win} delay={0.3 + i * 0.06}>
                <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm leading-snug bg-brand-sky/10 border border-brand-sky/30 text-sky-100/90">
                  <span className="text-brand-sky"><CheckIcon /></span>
                  {p.win}
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/tablet: stacked pain→win pairs with USG mark on top */}
      <div className="lg:hidden">
        <RevealWrapper className="flex flex-col items-center gap-2 mb-8">
          <div className="w-14 h-14 bg-brand-navy border-2 border-brand-gold rounded-lg flex items-center justify-center shadow-[0_0_24px_rgba(239,165,30,0.35)]">
            <div className="w-7 h-7 border-2 border-brand-gold rounded-sm relative">
              <div className="absolute inset-1 bg-brand-sky/40 rounded-sm" />
            </div>
          </div>
          <span className="text-sm font-extrabold tracking-brand-logo text-brand-gold">USG</span>
        </RevealWrapper>

        <div className="space-y-4">
          {PAIN_WIN_PAIRS.map((p, i) => (
            <RevealWrapper key={p.pain} delay={i * 0.05}>
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 text-sm bg-red-500/10 text-red-100/80 line-through decoration-red-400/50">
                  <span className="text-red-400 no-underline"><XIcon /></span>
                  {p.pain}
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-sm bg-brand-sky/10 text-sky-50 font-medium">
                  <span className="text-brand-sky"><CheckIcon /></span>
                  {p.win}
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </div>
  );
}
