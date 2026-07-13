import Link from "next/link";
import { BOOKING_URL } from "@/lib/booking";
import AboutTicker from "@/components/AboutTicker";

export const metadata = {
  title: "About | USG",
  description: "The story, mission, and values behind USG — a second-generation, family-owned signage partner for retail chains across the U.S.",
};

const values = [
  {
    heading: "Partnership",
    body: "We act as an extension of your team, your wins are our wins. We pride ourselves on being that stable partner you can call on when chaos hits your desk.",
  },
  {
    heading: "Precision",
    body: "The right graphic, in the right store, on the right day. We sweat the details so our partners don't have to.",
  },
  {
    heading: "Responsiveness",
    body: "Retail doesn't wait. Our workflows are built for speed without sacrificing quality or accuracy.",
  },
  {
    heading: "Relationship",
    body: "Beyond the business USG is a multi generational company with family values at its core. We don't seek to just gain clients, we desire to develop true collaborative relationships.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-brand-offwhite">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-navy to-brand-navy-dark text-white pt-20 pb-14 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-sub !text-brand-gold">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-brand-tight mb-10 !text-white">
            About USG
          </h1>
        </div>
        <AboutTicker />
      </section>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-sub">Two Generations. One Standard.</p>
            <h2 className="section-heading">Built by family, driven by craft</h2>
            <p className="text-brand-navy/70 leading-relaxed mb-4">
              USG started in 1992 when Tim Packrall turned an in-house graphics shop into its own company. Over 30 years later, that same drive has grown USG into a full-service signage partner for retail chains across the U.S., now led by Tim and his son Preston, carrying the company into its second generation.
            </p>
            <p className="text-brand-navy/70 leading-relaxed">
              We help brands boost customer engagement and drive sales through smart, high-quality signage, all while keeping costs in check. We never charge for design work. You only pay for the finished product, so every design we create is one we stand behind.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "1992", label: "Founded" },
                { value: "30+", label: "Years in Business" },
                { value: "2", label: "Generations" },
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

      {/* What sets us apart */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-sub">What Sets Us Apart</p>
          <p className="text-brand-navy/70 leading-relaxed max-w-3xl">
            We&apos;ve grown into a large, full-service operation, but we&apos;ve never lost the values we started with. We&apos;re not chasing one-time projects. We build long-term partnerships and treat every client&apos;s business like it&apos;s our own.
          </p>
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
            Book a Discovery Call
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
