"use client";

import Link from "next/link";
import Image from "next/image";
import HeroScrollingColumns from "@/components/HeroScrollingColumns";
import HeroParticles    from "@/components/HeroParticles";
import HeroMesh         from "@/components/HeroMesh";
import HeroShapes       from "@/components/HeroShapes";
import HeroHeadline     from "@/components/HeroHeadline";
import RevealWrapper    from "@/components/RevealWrapper";
import SectionReveal    from "@/components/SectionReveal";
import DiscoverCard     from "@/components/DiscoverCard";
import MarqueeLogos     from "@/components/MarqueeLogos";
import ProcessSteps     from "@/components/ProcessSteps";
import SlotCounter      from "@/components/SlotCounter";
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

      {/* ── 2 · CUSTOMERS WHO TRUST US (cream, logo marquee) ─────────── */}
      <SectionReveal>
        <section className="bg-brand-offwhite py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 text-center mb-10">
            <p className="text-xs font-semibold tracking-widest text-brand-sky uppercase mb-2">
              Trusted nationwide
            </p>
            <h2 className="text-4xl font-black text-brand-navy">
              Customers who <span className="font-serif italic font-normal">trust</span> us.
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

      {/* ── 3 · DISCOVER THE DIFFERENCE (navy) ──────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-navy py-20 lg:py-32 text-white overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <RevealWrapper className="mb-10">
              <TypewriterLabel
                text="Why USG"
                className="text-xs tracking-widest font-semibold text-brand-sky uppercase"
              />
              <h2 className="text-4xl font-black text-white mt-2">
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

      {/* ── 5 · SUCCESS IN NUMBERS / STATISTICS (navy) ──────────────── */}
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
                From <span className="font-serif italic font-normal">brief</span> to every store — handled.
              </h2>
            </RevealWrapper>
            <ProcessSteps />
          </div>
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── 7 · BUILT FOR THE INDUSTRIES THAT MOVE FAST (cream) ──────── */}
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

      {/* ── 8 · FOOTER BANNER / FINAL CTA (navy) ────────────────────── */}
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
