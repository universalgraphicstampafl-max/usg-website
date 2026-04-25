"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import HeroParticles    from "@/components/HeroParticles";
import HeroMesh         from "@/components/HeroMesh";
import HeroShapes       from "@/components/HeroShapes";
import HeroHeadline     from "@/components/HeroHeadline";
import RevealWrapper    from "@/components/RevealWrapper";
import DiscoverCard     from "@/components/DiscoverCard";
import MarqueeLogos     from "@/components/MarqueeLogos";
import ProcessSteps     from "@/components/ProcessSteps";
import SlotCounter      from "@/components/SlotCounter";
import TiltCard         from "@/components/TiltCard";
import TypewriterLabel  from "@/components/TypewriterLabel";
import ParticleBurst    from "@/components/ParticleBurst";
import MagneticWrapper  from "@/components/MagneticWrapper";

export default function HomePage() {
  return (
    <div className="bg-brand-offwhite">

      {/* ── 1 · HERO ───────────────────────────────────────────────── */}
      <section
        className="relative text-white overflow-hidden -mt-[64px]"
        style={{ background: "#1B2D5E" }}
      >
        {/* Animated mesh gradient */}
        <HeroMesh />

        {/* Floating shapes */}
        <HeroShapes />

        {/* Particles */}
        <HeroParticles />

        <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-36">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>
              {/* Eyebrow */}
              <p
                className="section-sub !text-brand-gold mb-4"
                style={{ animation: "heroEnter 0.6s ease-out 0.1s both" }}
              >
                Retail Signage Specialists
              </p>

              {/* Word-by-word headline */}
              <HeroHeadline />

              {/* Body copy */}
              <p
                className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed mb-6"
                style={{ animation: "heroEnter 0.7s ease-out 0.5s both" }}
              >
                We design, produce, and deliver promotional signage programs for convenience, tobacco,
                QSR, grocery, and beverage chains — serving multi-location retailers, franchise
                organizations, and chain locations across the US.
              </p>

              {/* Counter strip */}
              <div
                className="inline-flex gap-6 bg-white/5 border border-white/10 rounded-xl px-5 py-3 mb-8 text-sm"
                style={{ animation: "heroEnter 0.6s ease-out 0.65s both" }}
              >
                <span className="text-white/60">Serving</span>
                <span className="font-bold text-brand-gold number-glow">2,000+ locations</span>
                <span className="text-white/60">across</span>
                <span className="font-bold text-white number-glow" style={{ animationDelay: "2s" }}>28 states</span>
              </div>

              {/* CTAs */}
              <div
                className="flex flex-wrap gap-4"
                style={{ animation: "heroEnter 0.6s ease-out 0.8s both" }}
              >
                <MagneticWrapper strength={6} radius={60}>
                  <Link href="/book" className="btn-gold btn-gold-glow text-base !px-8 !py-3 !rounded-xl">
                    Book Your Free Campaign Analysis
                  </Link>
                </MagneticWrapper>
                <MagneticWrapper strength={5} radius={55}>
                  <Link
                    href="/success-stories"
                    className="btn-outline !border-white !text-white hover:!bg-white hover:!text-brand-navy text-base !px-8 !py-3"
                  >
                    See our work
                  </Link>
                </MagneticWrapper>
              </div>
            </div>

            {/* Photo placeholder */}
            <div
              className="hidden md:flex items-center justify-center rounded-2xl border-2 border-dashed border-white/30 bg-white/5 min-h-[380px]"
              style={{ animation: "heroPhotoEnter 0.8s ease-out 0.4s both" }}
            >
              <div className="text-center px-8">
                <svg className="w-12 h-12 mx-auto mb-4 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-white/40 text-sm font-medium tracking-brand-wide">Hero photography — coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · DISCOVER THE DIFFERENCE ────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-10">
            <TypewriterLabel
              text="Why USG"
              className="text-xs tracking-widest font-semibold text-brand-sky uppercase"
            />
            <h2 className="text-4xl font-black text-brand-navy mt-2">Discover the difference</h2>
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

      {/* Context strip */}
      <div className="bg-brand-navy py-4">
        <p className="text-white text-sm font-medium text-center">
          Serving chain locations, franchise organizations, and multi-location retailers across the US.
        </p>
      </div>

      {/* ── 3 · SERVICES GRID ───────────────────────────────────────── */}
      <section className="bg-brand-offwhite py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-10">
            <TypewriterLabel
              text="What we do"
              className="text-xs tracking-widest font-semibold text-brand-sky uppercase"
            />
            <h2 className="text-4xl font-black text-brand-navy mt-2">One partner. Every signage need.</h2>
          </RevealWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                name: "Multi-Location POP Signage",
                href: "/services/signage-programs",
                desc: "Monthly, bi-monthly, and quarterly promotional programs for chains of any size.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
              },
              {
                name: "Graphic Design",
                href: "/services/graphic-design",
                desc: "In-house design team. No upcharges — ever. You pay for the finished product only.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>,
              },
              {
                name: "Custom Print Production",
                href: "/services/custom-print-production",
                desc: "Digital and screen printing. Banners, cooler graphics, floor graphics, and more.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>,
              },
              {
                name: "Store Surveys",
                href: "/services/store-surveys",
                desc: "Precise store measurements and asset profiling for perfectly fitted signage.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>,
              },
              {
                name: "Direct Store Delivery",
                href: "/services/direct-store-delivery",
                desc: "Shipped to every store location. QR packing slip reorder system included.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
              },
              {
                name: "Product Photography",
                href: "/services/product-photography",
                desc: "In-house food and product photography to complement your programs.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" /></svg>,
              },
            ].map((svc, i) => (
              <RevealWrapper key={svc.name} delay={i * 0.08}>
                <Link
                  href={svc.href}
                  className="group bg-white rounded-2xl border border-brand-navy/10 p-6 flex flex-col h-full hover:border-brand-navy hover:shadow-[0_8px_32px_rgba(27,45,94,0.1)] hover:-translate-y-1 transition-all duration-[250ms] cursor-pointer"
                >
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

      {/* ── 4 · AUTHORITY BAR ───────────────────────────────────────── */}
      <RevealWrapper>
        <section
          className="bg-brand-offwhite py-10 overflow-hidden"
          style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-xs font-semibold tracking-widest text-brand-sky uppercase mb-6 text-center">
              Trusted by leading brands in convenience, tobacco, QSR, grocery &amp; beverage retail
            </p>
          </div>
          <MarqueeLogos />
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-sm text-gray-500 mt-6 text-center">
              2,000+ retail locations served across the US
            </p>
          </div>
        </section>
      </RevealWrapper>

      {/* ── 5 · STATS + TESTIMONIALS ────────────────────────────────── */}
      <section className="bg-brand-offwhite py-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Slot-machine stat counters */}
          <div className="flex justify-center gap-12 md:gap-20 mb-12 flex-wrap text-center">
            <RevealWrapper delay={0}>
              <p className="text-5xl font-black text-brand-navy">
                <SlotCounter target={10} suffix="%" delay={0} />
              </p>
              <p className="text-sm text-gray-500 mt-1">Average sales increase</p>
            </RevealWrapper>
            <RevealWrapper delay={0.1}>
              <p className="text-5xl font-black text-brand-gold">
                <SlotCounter target={30} suffix="+" delay={0.3} />
              </p>
              <p className="text-sm text-gray-500 mt-1">Years in business</p>
            </RevealWrapper>
            <RevealWrapper delay={0.2}>
              <p className="text-5xl font-black text-brand-navy">
                <SlotCounter target={2000} suffix="+" thousands delay={0.6} />
              </p>
              <p className="text-sm text-gray-500 mt-1">Store locations served</p>
            </RevealWrapper>
          </div>

          {/* Testimonial cards — subtle 3D perspective */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: "1200px" }}>
            {[
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
            ].map((t, i) => (
              <RevealWrapper key={t.attribution} delay={i * 0.1}>
                <div
                  className="group bg-white rounded-2xl border border-brand-navy/10 p-8 transition-all duration-300 cursor-default"
                  style={{
                    transform: `perspective(1200px) rotateY(${t.tilt}deg)`,
                    transition: "transform 0.4s ease, box-shadow 0.4s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "perspective(1200px) rotateY(0deg) translateY(-4px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(27,45,94,0.12)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = `perspective(1200px) rotateY(${t.tilt}deg)`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                  }}
                >
                  <span
                    className="text-brand-sky/25 group-hover:text-brand-sky/40 text-8xl font-serif leading-none -mb-6 block transition-all duration-300 group-hover:scale-110 origin-left"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <p className="text-gray-600 italic text-base leading-relaxed mb-6">{t.quote}</p>
                  <p className="font-bold text-brand-navy text-sm">{t.attribution}</p>
                  <p className="text-gray-400 text-xs mt-1">{t.tenure}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>

          <Link href="/success-stories" className="text-brand-sky hover:text-brand-sky-dark font-medium mt-8 block text-center transition-colors">
            See all success stories →
          </Link>
        </div>
      </section>

      {/* ── 6 · PROCESS STEPS ───────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-12">
            <TypewriterLabel
              text="The USG process"
              className="text-xs tracking-widest font-semibold text-brand-sky uppercase"
            />
            <h2 className="text-4xl font-black text-brand-navy mt-2">From brief to every store — handled.</h2>
          </RevealWrapper>
          <ProcessSteps />
        </div>
      </section>

      {/* ── 7 · PAIN CARDS — cinematic 3D entrance ──────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-10">
            <TypewriterLabel
              text="Why signage programs fail"
              className="text-xs tracking-widest font-semibold text-brand-sky uppercase"
            />
            <h2 className="text-4xl font-black text-brand-navy mt-2">Sound familiar?</h2>
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

      {/* ── 8 · FINAL CTA ───────────────────────────────────────────── */}
      <section className="relative bg-brand-navy py-24 px-4 text-center text-white overflow-hidden">
        <ParticleBurst />
        <RevealWrapper className="relative max-w-3xl mx-auto">
          <p className="text-brand-gold text-xs font-semibold tracking-widest uppercase">
            Ready to simplify your signage program?
          </p>
          <h2 className="text-white text-4xl font-black mt-3">
            Get your free signage system audit
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mt-4 leading-relaxed">
            30-minute call. We&apos;ll review your current signage program and show you exactly what USG can do for your locations.
          </p>
          <div className="mt-8 inline-block">
            <MagneticWrapper strength={8} radius={70}>
              <Link href="/book" className="btn-gold btn-gold-glow text-lg !px-10 !py-4 !rounded-xl">
                Book Your Free Campaign Analysis →
              </Link>
            </MagneticWrapper>
          </div>
          <p className="text-white/50 text-sm mt-4">
            No commitment. No sales pitch. Just a clear picture of what&apos;s possible.
          </p>
        </RevealWrapper>
      </section>

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
  const ref     = useRef<HTMLDivElement>(null);
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
    : enterFrom === "right"  ? "translateX(60px) rotateY(15deg)"
    : "translateY(40px) scale(0.9)";

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl border border-brand-navy/10 p-6 h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0) rotateY(0) scale(1) translateY(0)" : initial,
        transition: visible
          ? `opacity 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0}s`
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

