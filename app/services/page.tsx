import Link from "next/link";
import { BOOKING_URL } from "@/lib/booking";
import Image from "next/image";
import type { Metadata } from "next";
import ServicesFlow from "@/components/ServicesFlow";
import CapabilityMarquee from "@/components/CapabilityMarquee";
import RevealWrapper from "@/components/RevealWrapper";
import SectionReveal from "@/components/SectionReveal";
import TypewriterLabel from "@/components/TypewriterLabel";

export const metadata: Metadata = {
  title: "Services | Universal Signage & Graphics",
  description:
    "Design, print, store surveys, and direct-to-store delivery — every step of your retail signage program under one roof. Explore USG's six core services.",
};

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
    name: "Fulfillment Services",
    href: "/services/direct-store-delivery",
    image: "/images/easy/gas-pump-celsius-topper4.webp",
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

function SectionDivider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-current/10 to-transparent" aria-hidden="true" />;
}

export default function ServicesPage() {
  return (
    <div className="bg-brand-offwhite text-brand-navy">

      {/* ── HERO (navy) ─────────────────────────────────────────────── */}
      <section className="bg-brand-navy text-white -mt-[64px] pt-[104px] pb-20 lg:pb-28 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <p className="section-sub">Services</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-brand-tight leading-[1.05] mb-6">
            One partner. <span className="font-serif italic font-normal text-brand-gold">Every</span> signage need.
          </h1>
          <p className="text-lg text-white/75 max-w-2xl leading-relaxed">
            Design, print, store surveys, and direct-to-store delivery — every step of your
            signage program under one roof, built to move at retail speed across 2,000+ locations.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
              Book a Call
            </Link>
            <Link
              href="/gallery"
              className="btn-outline !border-white !text-white hover:!bg-white hover:!text-brand-navy"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── OUR SERVICES — FLOW DIAGRAM (cream, self-contained) ──────── */}
      <ServicesFlow />

      <SectionDivider />

      {/* ── THE SIX SERVICES — CARD GRID (navy) ─────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-navy py-20 lg:py-32 text-white overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <RevealWrapper className="mb-10 text-center">
              <TypewriterLabel
                text="Explore the lineup"
                className="text-xs tracking-widest font-semibold text-brand-sky uppercase"
              />
              <h2 className="text-4xl font-black text-white mt-2">
                Six services. <span className="font-serif italic font-normal text-brand-gold">One</span> seamless program.
              </h2>
            </RevealWrapper>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((svc, i) => (
                <RevealWrapper key={svc.name} delay={i * 0.08}>
                  <Link
                    href={svc.href}
                    className="group bg-white rounded-2xl border border-brand-navy/10 p-6 flex flex-col h-full hover:border-brand-gold hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-[250ms] cursor-pointer"
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

      {/* ── EVERY CAPABILITY — MARQUEE (cream) ──────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-offwhite py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 mb-10 text-center">
            <h2 className="text-4xl font-black text-brand-navy">
              Every fixture. Every format. Every <span className="font-serif italic font-normal">capability</span>.
            </h2>
            <p className="text-brand-navy/70 text-lg mt-3 max-w-2xl mx-auto">
              From cooler doors to pylon toppers — we produce signage for every retail surface.
            </p>
          </div>
          <CapabilityMarquee />
        </section>
      </SectionReveal>

      <SectionDivider />

      {/* ── FINAL CTA (navy) ────────────────────────────────────────── */}
      <SectionReveal>
        <section className="bg-brand-navy py-20 lg:py-32 px-4 text-center text-white overflow-hidden">
          <RevealWrapper className="max-w-3xl mx-auto">
            <p className="text-brand-gold text-xs font-semibold tracking-widest uppercase">
              Ready to build your program?
            </p>
            <h2 className="text-white text-4xl font-black mt-3">
              Let&apos;s get your signage <span className="font-serif italic font-normal">handled</span>
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mt-4 leading-relaxed">
              One call, one partner, every location covered. We&apos;ll map your program end to end —
              design through direct-to-store delivery.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold text-lg !px-10 !py-4 !rounded-xl">
                Book Your Free Campaign Analysis →
              </Link>
            </div>
          </RevealWrapper>
        </section>
      </SectionReveal>

    </div>
  );
}
