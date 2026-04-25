import Link from "next/link";

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
            For over 15 years, USG has been the behind-the-scenes partner for brands that need their in-store graphics done right — on time, on brand, and in compliance.
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
                { value: "15+", label: "Years in Business" },
                { value: "500+", label: "Retail Locations" },
                { value: "50+", label: "Brand Partners" },
                { value: "3", label: "Industries Served" },
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

      {/* CTA */}
      <section className="py-16 px-6 bg-brand-navy text-white text-center">
        <h2 className="text-3xl font-extrabold tracking-brand-tight mb-4 !text-white">
          Let&apos;s work together
        </h2>
        <p className="text-white/65 mb-8 max-w-md mx-auto">
          Book a free 30-minute strategy call and see why leading brands trust USG with their most visible real estate.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/book" className="btn-gold">
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
