"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeroScrollingColumns from "@/components/HeroScrollingColumns";
import HeroParticles    from "@/components/HeroParticles";
import HeroMesh         from "@/components/HeroMesh";
import HeroShapes       from "@/components/HeroShapes";
import HeroHeadline     from "@/components/HeroHeadline";
import RevealWrapper    from "@/components/RevealWrapper";
import SectionReveal    from "@/components/SectionReveal";
import CapabilityMarquee from "@/components/CapabilityMarquee";
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
    image: "/images/services/signage-programs.webp",
    desc: "Monthly, bi-monthly, and quarterly promotional programs for chains of any size.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
  },
  {
    name: "Graphic Design",
    href: "/services/graphic-design",
    image: "/images/services/graphic-design.webp",
    desc: "In-house design team. No upcharges — ever. You pay for the finished product only.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>,
  },
  {
    name: "Custom Print Production",
    href: "/services/custom-print-production",
    image: "/images/services/custom-print-production.webp",
    desc: "Digital and screen printing. Banners, cooler graphics, floor graphics, and more.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>,
  },
  {
    name: "Store Surveys",
    href: "/services/store-surveys",
    image: "/images/services/store-surveys.webp",
    desc: "Precise store measurements and asset profiling for perfectly fitted signage.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>,
  },
  {
    name: "Direct Store Delivery",
    href: "/services/direct-store-delivery",
    image: "/images/services/direct-store-delivery.webp",
    desc: "Shipped to every store location. QR packing slip reorder system included.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
  },
  {
    name: "Product Photography",
    href: "/services/product-photography",
    image: "/images/services/product-photography.webp",
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
    image: "/images/industries/convenience-retail.webp",
    desc: "Gas stations, c-stores, truck stops — branded for speed.",
  },
  {
    name: "Tobacco & Nicotine",
    href: "/industries/tobacco-nicotine",
    image: "/images/industries/tobacco-nicotine.webp",
    desc: "Compliance-aware signage for regulated categories.",
  },
  {
    name: "QSR",
    href: "/industries/qsr",
    image: "/images/industries/qsr.webp",
    desc: "Menu boards, drive-thru, in-store — every touchpoint.",
  },
  {
    name: "Grocery",
    href: "/industries/grocery",
    image: "/images/industries/grocery.webp",
    desc: "End-cap, shelf, cooler — moving product since 1985.",
  },
  {
    name: "Beverage",
    href: "/industries/beverage",
    image: "/images/industries/beverage.webp",
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

      {/* ── 3 · STATS STRIP (navy) ──────────────────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-navy py-20 lg:py-32 text-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex justify-center gap-12 md:gap-20 flex-wrap text-center">
              <RevealWrapper delay={0}>
                <p className="text-5xl font-black text-white">
                  <SlotCounter target={10} suffix="%" delay={0} />
                </p>
                <p className="text-sm text-white/60 mt-1">Average sales increase</p>
              </RevealWrapper>
              <RevealWrapper delay={0.1}>
                <p className="text-5xl font-black text-brand-gold">
                  <SlotCounter target={30} suffix="+" delay={0.3} />
                </p>
                <p className="text-sm text-white/60 mt-1">Years in business</p>
              </RevealWrapper>
              <RevealWrapper delay={0.2}>
                <p className="text-5xl font-black text-white">
                  <SlotCounter target={2000} suffix="+" thousands delay={0.6} />
                </p>
                <p className="text-sm text-white/60 mt-1">Store locations served</p>
              </RevealWrapper>
            </div>
          </div>
        </section>
      </SectionReveal>

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

      {/* ── 7 · CONTEXT STRIP (navy) ────────────────────────────────── */}
      <SectionReveal>
        <section className="relative py-32 lg:py-40 overflow-hidden">
          {/* Full-bleed background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/gallery/07-storefront-window-cling.webp"
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

      {/* ── 9 · PAIN CARDS (navy) ──────────────────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-navy py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <RevealWrapper className="mb-10">
              <TypewriterLabel
                text="Why signage programs fail"
                className="text-xs tracking-widest font-semibold text-brand-sky uppercase"
              />
              <h2 className="text-4xl font-black text-white mt-2">
                Sound <span className="font-serif italic font-normal">familiar?</span>
              </h2>
            </RevealWrapper>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
              {[
                {
                  delay: 0,
                  enterFrom: "left" as const,
                  title: "Late and incomplete orders",
                  body: "Kits arrive after the promotional window. Stores get the wrong materials. Your team spends days chasing down what's missing.",
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
                },
                {
                  delay: 0.15,
                  enterFrom: "bottom" as const,
                  title: "Art approvals drag for weeks",
                  body: "Back-and-forth emails. Revisions on revisions. By the time art is approved, the campaign launch has slipped.",
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
                },
                {
                  delay: 0.3,
                  enterFrom: "right" as const,
                  title: "Brand looks different in every store",
                  body: "Wrong sizes, off-brand colours, outdated versions. You lose control the moment product leaves the printer.",
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
                },
              ].map((card, i) => (
                <PainCard key={card.title} {...card} index={i} />
              ))}
            </div>
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
            <div className="columns-1 md:columns-2 lg:columns-4 gap-6 [&>*]:break-inside-avoid [&>*]:mb-6">
              {GALLERY_PREVIEW.map((src, i) => (
                <div key={src} className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer bg-[#1B2D5E]/10">
                  <Image
                    src={src}
                    alt={`USG project ${i + 1}`}
                    width={400}
                    height={500}
                    placeholder="empty"
                    sizes="(max-width: 640px) 384px, (max-width: 1024px) 50vw, 25vw"
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Link href="/gallery" className="group inline-flex items-center gap-2 text-brand-navy hover:gap-3 transition-all">
                <span className="text-lg font-semibold">View all 23 projects</span>
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

/* ─── PainCard: cinematic 3D entrance ──────────────────────────────── */
function PainCard({
  title, body, icon, delay, enterFrom, index,
}: {
  title: string; body: string; icon: React.ReactNode;
  delay: number; enterFrom: "left" | "right" | "bottom"; index: number;
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

  const initial =
    enterFrom === "left"   ? "translateX(-60px) rotateY(-15deg)"
    : enterFrom === "right" ? "translateX(60px) rotateY(15deg)"
    : "translateY(40px) scale(0.9)";

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl border border-brand-navy/10 p-6 h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0) rotateY(0) scale(1) translateY(0)" : initial,
        transition: visible
          ? `opacity 0.6s cubic-bezier(0.34,1.56,0.64,1) 0s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) 0s`
          : "none",
      }}
    >
      <div className="inline-flex items-center justify-center w-9 h-9 bg-red-50 text-red-500 rounded-lg p-1.5 mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-brand-navy mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
    </div>
  );
}
