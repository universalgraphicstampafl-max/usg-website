import Link from "next/link";
import { BOOKING_URL } from "@/lib/booking";
import Image from "next/image";
import SectionReveal from "@/components/SectionReveal";
import EasyCard from "@/components/EasyCard";
import PainWinFlow from "@/components/PainWinFlow";

export const metadata = {
  title: "About | USG",
  description: "The story, mission, and team behind Universal Signage & Graphics.",
};

const values = [
  {
    heading: "Precision",
    body: "The right graphic, in the right store, on the right day. We sweat the details so retailers don't have to.",
  },
  {
    heading: "Compliance",
    body: "Every piece we produce is reviewed for regulatory accuracy. We protect your brand and your licence.",
  },
  {
    heading: "Partnership",
    body: "We act as an extension of your marketing team — responsive, proactive, and aligned with your goals.",
  },
  {
    heading: "Velocity",
    body: "Retail doesn't wait. Our workflows are built for speed without sacrificing quality or accuracy.",
  },
];

const EASY_CARDS = [
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
];

export default function AboutPage() {
  return (
    <div className="bg-brand-offwhite">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-navy to-brand-navy-dark text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-sub !text-brand-gold">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-brand-tight mb-6 !text-white">
            About Universal Signage & Graphics
          </h1>
          <p className="text-lg text-white/75 max-w-2xl leading-relaxed">
            For over 30 years, USG has been the behind-the-scenes partner for brands that need their in-store graphics done right — on time, on brand, and in compliance.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-sub">Mission</p>
            <h2 className="section-heading">We make brands win at the shelf</h2>
            <p className="text-brand-navy/70 leading-relaxed mb-4">
              USG was founded on a simple belief: that great in-store execution is the highest-leverage investment a retail brand can make. Every shopper who walks past a fixture is a chance to convert — and every missed or wrong graphic is a chance lost.
            </p>
            <p className="text-brand-navy/70 leading-relaxed">
              We built a full-service operation — design, production, surveying, and delivery — so our clients never have to manage a patchwork of vendors again. One partner. Complete execution.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "30+", label: "Years in Business" },
                { value: "2,000+", label: "Retail Locations" },
                { value: "28", label: "States Served" },
                { value: "5", label: "Industries Served" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-4xl font-extrabold text-brand-gold">{s.value}</p>
                  <p className="text-xs tracking-brand-wide text-brand-navy/50 uppercase mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="section-sub">What We Stand For</p>
          <h2 className="section-heading">Our values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {values.map((v) => (
              <div key={v.heading} className="rounded-xl bg-brand-offwhite border border-gray-100 p-6">
                <div className="w-10 h-1 bg-brand-gold rounded mb-4" />
                <h3 className="font-bold text-brand-navy mb-2 tracking-brand-tight">{v.heading}</h3>
                <p className="text-sm text-brand-navy/70 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUTURE OF RETAIL SIGNAGE (navy editorial split) ─────────── */}
      <SectionReveal>
        <section className="bg-brand-navy text-white py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* text column */}
              <div>
                <p className="text-xs tracking-[0.2em] font-semibold text-brand-sky uppercase pb-4 mb-8 border-b border-white/15">
                  The future of retail signage
                </p>
                <h2 className="text-4xl lg:text-6xl font-black text-white leading-[1.05]">
                  Beyond a print vendor.{" "}
                  <span className="font-serif italic font-normal text-brand-gold">A signage partner</span>, built to move at retail speed.
                </h2>
                <p className="text-xl lg:text-2xl font-bold text-white mt-8 leading-snug">
                  What happens when design, production, and delivery live under one roof?
                </p>
                <p className="text-base lg:text-lg text-white/75 mt-5 leading-relaxed max-w-xl">
                  By owning every step — design, print, store surveys, and direct-to-store delivery — your locations get faster turnarounds, fewer errors, perfect-fit signage, and programs that actually ship on time.
                </p>
                <div className="mt-10">
                  <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
                    Book a Call <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>

              {/* image column */}
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/gallery/01-hero-storefront-coca-cola.webp"
                  alt="Freestanding USG-produced storefront signage display at a retail fuel station at golden hour"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ── CONTEXT STRIP (full-bleed photo banner) ─────────────────── */}
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#001132]/85 via-[#001132]/75 to-[#001132]/85" />

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 lg:px-12">
            <p className="text-center text-2xl lg:text-4xl text-white font-light leading-relaxed max-w-5xl mx-auto">
              Serving chain locations, franchise organizations, and multi-location <span className="font-serif italic font-normal">retailers</span> across the US.
            </p>
          </div>
        </section>
      </SectionReveal>

      {/* ── WORLD-CLASS SIGNAGE / SMARTER SYSTEMS (cream, photo cards) ─ */}
      <SectionReveal>
        <section className="bg-brand-offwhite py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-12 lg:mb-16">
              <p className="text-xs tracking-widest font-semibold text-brand-sky uppercase">
                Easy & hassle-free
              </p>
              <h2 className="text-4xl lg:text-5xl font-black text-brand-navy mt-2 leading-tight">
                World-class signage.{" "}
                <span className="font-serif italic font-normal text-brand-gold">Smarter systems.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {EASY_CARDS.map((card) => (
                <EasyCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* ── THE USG DIFFERENCE (navy, vendors vs USG) ───────────────── */}
      <SectionReveal>
        <section className="bg-brand-navy py-20 lg:py-32 text-white overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-12 lg:mb-16">
              <p className="text-xs tracking-widest font-semibold text-brand-sky uppercase">
                The USG difference
              </p>
              <h2 className="text-4xl lg:text-5xl font-black text-white mt-2 leading-tight">
                From signage headaches to{" "}
                <span className="font-serif italic font-normal text-brand-gold">stores that sell</span>
              </h2>
            </div>

            <PainWinFlow />
          </div>
        </section>
      </SectionReveal>

      {/* CTA */}
      <section className="py-16 px-6 bg-brand-navy-dark text-white text-center">
        <h2 className="text-3xl font-extrabold tracking-brand-tight mb-4 !text-white">
          Let&apos;s work together
        </h2>
        <p className="text-white/65 mb-8 max-w-md mx-auto">
          Book a free 30-minute strategy call and see why leading brands trust USG with their most visible real estate.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
            Book a Free Call
          </Link>
          <Link
            href="/contact"
            className="btn-outline !border-white !text-white hover:!bg-white hover:!text-brand-navy"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
