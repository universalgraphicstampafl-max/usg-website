"use client";

import Link from "next/link";
import { BOOKING_URL } from "@/lib/booking";
import Image from "next/image";
import HeroScrollingColumns from "@/components/HeroScrollingColumns";
import HeroParticles    from "@/components/HeroParticles";
import HeroMesh         from "@/components/HeroMesh";
import HeroShapes       from "@/components/HeroShapes";
import HeroHeadline     from "@/components/HeroHeadline";
import RevealWrapper    from "@/components/RevealWrapper";
import SectionReveal    from "@/components/SectionReveal";
import DiscoverCard     from "@/components/DiscoverCard";
import ClientUniverse  from "@/components/ClientUniverse";
import ProcessSteps     from "@/components/ProcessSteps";
import SlotCounter      from "@/components/SlotCounter";
import TiltCard         from "@/components/TiltCard";
import TypewriterLabel  from "@/components/TypewriterLabel";
import ParticleBurst    from "@/components/ParticleBurst";
import MagneticWrapper  from "@/components/MagneticWrapper";

const SERVICES = [
  {
    name: "Signage Programs",
    href: "/services/signage-programs",
    image: "/images/easy/cooler-doors-promotional-graphics4.webp",
    desc: "Monthly, bi-monthly, and quarterly promotional programs for chains of any size.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
  },
  {
    name: "Graphic Design",
    href: "/services/graphic-design",
    image: "/images/easy/karma-wellness-poster-frame.webp",
    desc: "In-house design team. No upcharges — ever. You pay for the finished product only.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>,
  },
  {
    name: "Custom Print Production",
    href: "/services/custom-print-production",
    image: "/images/easy/floor-graphics-aisle.webp",
    desc: "Digital printing on over 100 print medias for indoor & outdoor application. Specializing in making your vision come to life.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>,
  },
  {
    name: "Store Surveys",
    href: "/services/store-surveys",
    image: "/images/easy/fountain-drink-station.webp",
    desc: "Precise store measurements and asset profiling for perfectly fitted signage.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>,
  },
  {
    name: "Fulfillment Services",
    href: "/services/direct-store-delivery",
    image: "/images/easy/snack-fresh-eat-well-cooler4.webp",
    desc: "Pick, pack, and ship to every location — 99.7% accuracy, reordering built in.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
  },
  {
    name: "Signage Management Software",
    href: "/services/signage-management-software",
    image: "/images/easy/checkout-counter-signage.webp",
    desc: "Proprietary platform for store profiles, art approvals, and one-click reordering.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  },
];

const INDUSTRIES = [
  {
    name: "Convenience Stores + Retail",
    image: "/images/easy/slurpee-machine-topper.webp",
    sub: "High-volume, high-speed, and zero margin for error — we get it. USG partners with convenience and retail brands to make signage the most organized, stress-free part of your marketing program.",
    stat: { value: "152K", label: "U.S. convenience stores", source: "NACS, 2025" },
  },
  {
    name: "Tobacco & Nicotine",
    image: "/images/easy/cig-changeable.webp",
    sub: "Tobacco and nicotine signage comes with its own set of rules — FDA compliance, shrinking display space, and vendor standards that change constantly. We know the category, we know the requirements, and we handle the details so your locations stay visible, compliant, and stress-free.",
    stat: { value: "~26%", label: "of c-store in-store sales", source: "NACS, 2024" },
  },
  {
    name: "QSR & Fast Casual",
    image: "/images/easy/qsr-soup-lto-poster.webp",
    sub: "New value deals, LTOs, and menu refreshes roll out constantly \u2014 and every location needs to be ready on day one. USG handles design, production, and direct-to-location delivery so your signage keeps pace with your promotional calendar, not the other way around.",
    stat: { value: "~2x", label: "LTO launches across major chains vs. the prior year", source: "Datassential, 2026" },
  },
  {
    name: "Grocery & Supermarkets",
    image: "/images/easy/grocery-shelf-signage.webp",
    sub: "With promotions that change weekly, time is of the essence. USG\u2019s quick turnaround and fast shipping help your campaign stay on track.",
    stat: { value: "33K+", label: "items carried by the average U.S. supermarket", source: "FMI, 2025" },
  },
  {
    name: "Beverage",
    image: "/images/easy/corona-find-your-beach-beer-cave4.webp",
    sub: "The cold vault and warm shelf are where buying decisions get made. We make sure your beverage signage is working as hard as your products are — from cooler door clings to floor displays, produced accurately and on time, every time.",
    stat: { value: "57%", label: "of beverage shoppers have no brand in mind", source: "CSP study" },
  },
];

function SectionDivider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-current/10 to-transparent" aria-hidden="true" />;
}

export default function HomePage() {
  return (
    <div className="bg-brand-offwhite text-brand-navy">

      {/* ── 1 · HERO (navy) ────────────────────────────────────────── */}
      <section
        className="relative text-white overflow-hidden -mt-[72px]"
        style={{ background: "#001132" }}
      >
        {/* Marigold split panel (desktop only) */}
        <div aria-hidden="true" className="hero-panel hidden lg:block absolute z-0 inset-y-0 left-0 w-[50%]" />
        <div aria-hidden="true" className="hero-fade hidden lg:block absolute z-0 inset-y-0" />

        <HeroMesh />
        <HeroShapes />
        <HeroParticles />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-6 md:py-20">
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[1fr_680px] lg:gap-12 lg:items-center">

            <div className="hero-text-col relative">
              <p
                className="section-sub mb-3 text-brand-navy"
                style={{ animation: "heroEnter 0.6s ease-out 0.1s both" }}
              >
                Retail Signage Specialists
              </p>

              <HeroHeadline />

              <p
                className="text-base md:text-xl text-brand-navy/90 max-w-xl leading-relaxed mb-5 md:mb-6"
                style={{ animation: "heroEnter 0.7s ease-out 0.5s both" }}
              >
                USG partners with multi-location brands to make signage the easiest part of their
                marketing. Reliable production, real people, and a process built around your business —
                from one location to one thousand.
              </p>


              <div
                className="flex flex-col md:flex-row gap-4 items-start mt-2 flex-wrap"
                style={{ animation: "heroEnter 0.6s ease-out 0.8s both" }}
              >
                <Link
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-base !px-8 !py-3 sm:!py-4 w-full sm:w-auto max-w-md mx-auto sm:mx-0 text-center"
                >
                  Book a Discovery Call →
                </Link>
                <Link
                  href="/gallery"
                  className="text-base font-semibold tracking-brand-wide text-brand-navy border-2 border-brand-navy/70 px-6 py-3 sm:py-4 rounded w-full sm:w-auto max-w-md mx-auto sm:mx-0 whitespace-normal text-center hover:bg-brand-navy/10 transition-colors duration-200"
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

      {/* ── 2 · CLIENTS — UNIVERSE WALL (marigold) ──────────────────── */}
      <SectionReveal>
        <section className="relative bg-brand-marigold py-20 lg:py-28 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-brand-navy uppercase mb-2">
              Our Clients
            </p>
            <h2 className="text-4xl font-black text-brand-navy">
              Trusted by brands across the <span className="font-serif italic font-normal">country</span>.
            </h2>
          </div>
          <div className="container mx-auto px-6 lg:px-12">
            <ClientUniverse />
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 3 · DISCOVER THE DIFFERENCE (navy) ──────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-navy py-20 lg:py-32 text-white overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <RevealWrapper className="mb-10">
              <TypewriterLabel
                text="Why USG"
                className="text-xs tracking-widest font-semibold text-brand-gold uppercase"
              />
              <h2 className="text-4xl font-black text-white mt-2">
                Why brands <span className="font-serif italic font-normal text-brand-gold">stick</span> with us.
              </h2>
            </RevealWrapper>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  delay: 0,
                  title: "Pricing you can plan around",
                  body: "The quote you receive is the price you pay. No hidden design fees, no surprise price increases, no rush charges.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                    </svg>
                  ),
                },
                {
                  delay: 0.1,
                  title: "A real team, assigned to you",
                  body: "A dedicated account manager, and design team, who know your program, your locations, and your timelines.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  ),
                },
                {
                  delay: 0.2,
                  title: "National scale, local feel",
                  body: "The capabilities of a large operation with the service and accountability of a partner that actually picks up the phone.",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  ),
                },
              ].map((card) => (
                <TiltCard key={card.title} className="h-full">
                  <DiscoverCard delay={card.delay} title={card.title} body={card.body} icon={card.icon} />
                </TiltCard>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold inline-block">
                Book a Discovery Call →
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 4 · WHAT WE DO — 6 CARD TILES (cream) ───────────────────── */}
      <SectionReveal>
        <section className="bg-brand-offwhite py-20 lg:py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <RevealWrapper className="mb-10">
              <TypewriterLabel
                text="What we do"
                className="text-xs tracking-widest font-semibold text-brand-sky uppercase"
              />
              <h2 className="text-4xl font-black text-brand-navy mt-2">
                One partner. Every <span className="font-serif italic font-normal">solution</span>.
              </h2>
            </RevealWrapper>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((svc, i) => (
                <RevealWrapper key={svc.name} delay={i * 0.08}>
                  <Link
                    href={svc.href}
                    className="group bg-white rounded-2xl border border-brand-navy/10 p-6 flex flex-col h-full hover:border-brand-navy hover:shadow-[0_8px_32px_rgba(0,17,50,0.1)] hover:-translate-y-1 transition-all duration-[250ms] cursor-pointer"
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

      {/* ── 5 · SUCCESS IN NUMBERS / STATISTICS (navy) ──────────────── */}
      <SectionReveal>
        <section className="bg-brand-navy py-20 lg:py-28 text-white overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <RevealWrapper className="text-center mb-12 lg:mb-16">
              <p className="text-xs tracking-[0.2em] font-semibold text-brand-gold uppercase mb-4">
                Success in numbers
              </p>
              <h2 className="text-4xl lg:text-6xl font-black text-white max-w-3xl mx-auto leading-[1.05]">
                The best return on your <span className="font-serif italic font-normal text-brand-gold">signage investment</span>.
              </h2>
            </RevealWrapper>

            {/* Compact stat row — punchy numbers, tight spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-12 gap-x-6 lg:divide-x lg:divide-white/10">
              <RevealWrapper delay={0} className="text-center lg:px-6">
                <span className="block font-serif font-normal text-brand-gold leading-none text-5xl lg:text-7xl">
                  <SlotCounter target={10} suffix="%" delay={0} />
                </span>
                <p className="text-xs lg:text-sm tracking-wide text-brand-gold uppercase mt-4 font-semibold">Average sales increase</p>
                <p className="text-sm text-white/60 mt-2 leading-snug">Lift in product sales after partnering with USG.</p>
              </RevealWrapper>
              <RevealWrapper delay={0.1} className="text-center lg:px-6">
                <span className="block font-serif font-normal text-brand-gold leading-none text-5xl lg:text-7xl">
                  <SlotCounter target={30} suffix="+" delay={0.2} />
                </span>
                <p className="text-xs lg:text-sm tracking-wide text-brand-gold uppercase mt-4 font-semibold">Years in business</p>
                <p className="text-sm text-white/60 mt-2 leading-snug">Three decades of credible retail signage expertise.</p>
              </RevealWrapper>
              <RevealWrapper delay={0.3} className="text-center lg:px-6">
                <span className="block font-serif font-normal text-brand-gold leading-none text-5xl lg:text-7xl">
                  <SlotCounter target={99.7} suffix="%" decimals={1} delay={0.6} />
                </span>
                <p className="text-xs lg:text-sm tracking-wide text-brand-gold uppercase mt-4 font-semibold">Packing accuracy</p>
                <p className="text-sm text-white/60 mt-2 leading-snug">The right products, in the right box, every time.</p>
              </RevealWrapper>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 6 · USG PROCESS (marigold) ──────────────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-marigold py-20 lg:py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <RevealWrapper className="mb-12">
              <TypewriterLabel
                text="The USG process"
                className="text-xs tracking-widest font-semibold text-brand-navy uppercase"
              />
              <h2 className="text-4xl font-black text-brand-navy mt-2">
                From <span className="font-serif italic font-normal">concept</span> to rollout. Handled.
              </h2>
            </RevealWrapper>
            <ProcessSteps />
            <div className="mt-12 text-center">
              <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-navy inline-block">
                Book a Discovery Call →
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 7 · BUILT FOR THE INDUSTRIES THAT MOVE FAST (cream) ──────── */}
      <SectionReveal>
        <section id="industries" className="bg-brand-offwhite py-20 lg:py-32 scroll-mt-24">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-black text-brand-navy">
                Built for the <span className="font-serif italic font-normal">industries</span> that move fast.
              </h2>
              <p className="text-brand-navy/80 text-lg mt-3 max-w-2xl mx-auto">
                5 industries. One partner that ships on time.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {INDUSTRIES.map((ind) => (
                <div
                  key={ind.name}
                  className="flex flex-col bg-white rounded-2xl shadow-md ring-1 ring-brand-navy/5 overflow-hidden w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={ind.image}
                      alt={ind.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-xl font-bold text-brand-navy">{ind.name}</h3>
                    <p className="text-sm text-brand-navy/70 leading-relaxed mt-2 flex-1">
                      {ind.sub}
                    </p>
                    <div className="mt-5 pt-4 border-t border-brand-navy/10">
                      <p className="text-3xl font-black text-brand-marigold leading-none">
                        {ind.stat.value}
                      </p>
                      <p className="text-xs text-brand-navy/60 mt-1.5">{ind.stat.label}</p>
                      <p className="text-[10px] uppercase tracking-wide text-brand-navy/35 mt-1">
                        Source: {ind.stat.source}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 8 · FOOTER BANNER / FINAL CTA (navy) ────────────────────── */}
      <SectionReveal>
        <section className="relative bg-brand-navy py-24 lg:py-44 px-4 text-center text-white overflow-hidden">
          <ParticleBurst />
          <RevealWrapper className="relative max-w-6xl mx-auto">
            <p className="text-brand-gold text-sm font-semibold tracking-widest uppercase">
              Ready to optimize your signage program?
            </p>
            <h2 className="text-white text-5xl sm:text-6xl lg:text-8xl font-black mt-5 leading-[0.98] tracking-tight">
              Get your free signage system <span className="font-serif italic font-normal">audit</span>
            </h2>
            <p className="text-white/80 text-xl lg:text-2xl max-w-3xl mx-auto mt-8 leading-relaxed">
              30-minute call. We&apos;ll review your current signage program and show you exactly what USG can do for your locations.
            </p>
            <div className="mt-8 flex justify-center items-center px-4 sm:px-0">
              <MagneticWrapper strength={8} radius={70} className="!block w-full sm:!inline-block sm:w-auto sm:max-w-none max-w-md">
                <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold text-xl !px-12 !py-5 !rounded-xl block sm:inline-block text-center">
                  Start with a Discovery Call →
                </Link>
              </MagneticWrapper>
            </div>
            <p className="text-white/50 text-base mt-5">
              No commitment. No sales pitch. Just a clear picture of what&apos;s possible.
            </p>
          </RevealWrapper>
        </section>
      </SectionReveal>

    </div>
  );
}
