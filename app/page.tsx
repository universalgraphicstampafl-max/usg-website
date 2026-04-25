import Link from "next/link";
import StatCounter from "@/components/StatCounter";

export const metadata = {
  title: "Universal Signage & Graphics | Retail Signage Programs for Chain Locations",
  description:
    "Full-service retail signage programs for convenience, tobacco, QSR, grocery, and beverage chains. Design, production, and direct-to-location delivery for multi-location retailers and franchise organizations.",
};

const services = [
  {
    title: "Signage Programs",
    desc: "End-to-end managed signage programs tailored to your brand and retail environment.",
    href: "/services/signage-programs",
  },
  {
    title: "Graphic Design",
    desc: "Compelling point-of-sale creative that drives attention and conversion.",
    href: "/services/graphic-design",
  },
  {
    title: "Custom Print Production",
    desc: "High-quality substrate printing for every display format and application.",
    href: "/services/custom-print-production",
  },
  {
    title: "Store Surveys",
    desc: "Detailed field audits ensuring planogram compliance and signage accuracy.",
    href: "/services/store-surveys",
  },
  {
    title: "Direct Store Delivery",
    desc: "White-glove installation and delivery straight to store — on time, every time.",
    href: "/services/direct-store-delivery",
  },
  {
    title: "Product Photography",
    desc: "Studio-quality imagery for packaging, marketing, and in-store displays.",
    href: "/services/product-photography",
  },
];

const industries = [
  {
    title: "Convenience Retail",
    desc: "Maximise impulse and category sales with smart, compliant in-store graphics.",
    href: "/industries/convenience-retail",
    accent: "bg-brand-sky",
  },
  {
    title: "Tobacco & Nicotine",
    desc: "Regulatory-compliant messaging that meets FDA requirements while building brand.",
    href: "/industries/tobacco-nicotine",
    accent: "bg-brand-navy",
  },
  {
    title: "QSR & Fast Casual",
    desc: "Monthly promotional programs delivered direct to every location — on time, every cycle.",
    href: "/industries/qsr",
    accent: "bg-brand-gold",
  },
  {
    title: "Grocery",
    desc: "High-frequency promotional signage for grocery chains, produced and shipped at scale.",
    href: "/industries/grocery",
    accent: "bg-brand-sky",
  },
  {
    title: "Beverage",
    desc: "Ice-cold creative that moves product from cooler to checkout — faster.",
    href: "/industries/beverage",
    accent: "bg-brand-navy",
  },
];

export default function HomePage() {
  return (
    <div className="bg-brand-offwhite">
      {/* 1 — Hero */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-sky to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-brand-gold to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-36">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div>
              <p className="section-sub !text-brand-gold mb-4">Retail Signage Specialists</p>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-brand-tight leading-tight mb-6 text-white">
                Every store. On brand. On time.
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed mb-10">
                We design, produce, and deliver promotional signage programs for convenience, tobacco, QSR, grocery, and beverage chains — serving multi-location retailers, franchise organizations, and chain locations across the US.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/book" className="btn-gold text-base !px-8 !py-3">
                  Book Your Free Campaign Analysis
                </Link>
                <Link
                  href="/success-stories"
                  className="btn-outline !border-white !text-white hover:!bg-white hover:!text-brand-navy text-base !px-8 !py-3"
                >
                  See our work
                </Link>
              </div>
            </div>

            {/* Placeholder image */}
            <div className="hidden md:flex items-center justify-center rounded-2xl border-2 border-dashed border-white/30 bg-white/5 min-h-[380px]">
              <div className="text-center px-8">
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-white/25"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.25}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-white/40 text-sm font-medium tracking-brand-wide">
                  Hero photography — coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Discover the difference */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest font-semibold text-brand-sky uppercase">
            Why USG
          </p>
          <h2 className="text-4xl font-black text-brand-navy mt-2 mb-10">
            Discover the difference
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Predictable pricing. No upcharges. Ever.",
                body: "The quote you receive is the price you pay. No hidden design fees, no surprise material costs, no rush charges.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                ),
              },
              {
                title: "Your dedicated account manager",
                body: "One person who knows your program, your stores, and your brand. Available when things need to move fast.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ),
              },
              {
                title: "Direct to every store location",
                body: "We ship individually to each of your locations — not to a warehouse. Every store gets exactly what it needs.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                ),
              },
            ].map((pillar) => (
              <div key={pillar.title} className="border border-brand-navy/10 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-brand-gold text-brand-navy flex items-center justify-center mx-auto mb-5">
                  {pillar.icon}
                </div>
                <h3 className="font-black text-brand-navy text-lg mb-3">{pillar.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{pillar.body}</p>
              </div>
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

      {/* 3 — Services grid */}
      <section className="bg-brand-offwhite py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest font-semibold text-brand-sky uppercase">
            What we do
          </p>
          <h2 className="text-4xl font-black text-brand-navy mt-2 mb-10">
            One partner. Every signage need.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                name: "Multi-Location POP Signage",
                href: "/services/signage-programs",
                desc: "Monthly, bi-monthly, and quarterly promotional programs for chains of any size.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                  </svg>
                ),
              },
              {
                name: "Graphic Design",
                href: "/services/graphic-design",
                desc: "In-house design team. No upcharges — ever. You pay for the finished product only.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
                  </svg>
                ),
              },
              {
                name: "Custom Print Production",
                href: "/services/custom-print-production",
                desc: "Digital and screen printing. Banners, cooler graphics, floor graphics, and more.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                    <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" /><rect x="6" y="14" width="12" height="8" />
                  </svg>
                ),
              },
              {
                name: "Store Surveys",
                href: "/services/store-surveys",
                desc: "Precise store measurements and asset profiling for perfectly fitted signage.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                    <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                ),
              },
              {
                name: "Direct Store Delivery",
                href: "/services/direct-store-delivery",
                desc: "Shipped to every store location. QR packing slip reorder system included.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                    <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                ),
              },
              {
                name: "Product Photography",
                href: "/services/product-photography",
                desc: "In-house food and product photography to complement your programs.",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" />
                  </svg>
                ),
              },
            ].map((svc) => (
              <Link
                key={svc.name}
                href={svc.href}
                className="bg-white rounded-2xl border border-brand-navy/10 p-6 flex flex-col hover:border-brand-navy/30 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-navy text-white flex items-center justify-center mb-4 flex-shrink-0">
                  {svc.icon}
                </div>
                <p className="font-bold text-brand-navy mb-2">{svc.name}</p>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{svc.desc}</p>
                <span className="text-brand-sky text-sm mt-4 font-medium">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Authority bar */}
      <section className="bg-brand-offwhite py-10 px-6 overflow-hidden">
        <p className="text-xs font-semibold tracking-widest text-brand-sky uppercase mb-6 text-center">
          Trusted by leading brands in convenience, tobacco, QSR, grocery &amp; beverage retail
        </p>

        {/* Logo row — horizontal scroll on mobile, centred on desktop */}
        <div className="relative">
          {/* Right-edge fade on mobile */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-brand-offwhite to-transparent md:hidden" aria-hidden="true" />

          <div className="flex md:justify-center gap-6 overflow-x-auto md:overflow-x-visible flex-nowrap md:flex-wrap pb-1 md:pb-0 scrollbar-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-20 h-10 bg-gray-200 rounded-lg flex items-center justify-center"
              >
                <span className="text-xs text-gray-400">Client Logo</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4 text-center">
          2,000+ retail locations served across the US
        </p>
      </section>

      {/* 5 — Social proof */}
      <section className="bg-brand-offwhite py-20 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Stat callouts */}
          <div className="flex justify-center gap-12 md:gap-20 mb-12 flex-wrap text-center">
            <div>
              <p className="text-5xl font-black text-brand-navy">
                <StatCounter target={10} suffix="%" />
              </p>
              <p className="text-sm text-gray-500 mt-1">Average sales increase</p>
            </div>
            <div>
              <p className="text-5xl font-black text-brand-gold">
                <StatCounter target={30} suffix="+" />
              </p>
              <p className="text-sm text-gray-500 mt-1">Years in business</p>
            </div>
            <div>
              <p className="text-5xl font-black text-brand-navy">
                <StatCounter target={2000} suffix="+" thousands />
              </p>
              <p className="text-sm text-gray-500 mt-1">Store locations served</p>
            </div>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote: "The service with Universal Signage & Graphics has been outstanding. Whether we have a specific idea in mind or we don't even know what we want, the USG team is there for us.",
                attribution: "Marketing Manager — Handy Mart Convenience Stores",
                tenure: "Partner since 2014",
              },
              {
                quote: "When comparing their printing costs with those of other providers, they can't be beat. The level of service that they provide is second to none.",
                attribution: "Public Relations and Marketing — E-Z Mart Stores",
                tenure: "Partner since 2001",
              },
            ].map((t) => (
              <div key={t.attribution} className="bg-white rounded-2xl border border-brand-navy/10 p-8">
                <span className="text-brand-sky/25 text-8xl font-serif leading-none -mb-6 block" aria-hidden="true">&ldquo;</span>
                <p className="text-gray-600 italic text-base leading-relaxed mb-6">{t.quote}</p>
                <p className="font-bold text-brand-navy text-sm">{t.attribution}</p>
                <p className="text-gray-400 text-xs mt-1">{t.tenure}</p>
              </div>
            ))}
          </div>

          <Link
            href="/success-stories"
            className="text-brand-sky hover:text-brand-sky-dark font-medium mt-8 block text-center transition-colors"
          >
            See all success stories →
          </Link>
        </div>
      </section>

      {/* 6 — How it works */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest font-semibold text-brand-sky uppercase">
            The USG process
          </p>
          <h2 className="text-4xl font-black text-brand-navy mt-2 mb-12">
            From brief to every store — handled.
          </h2>

          {(() => {
            const steps = [
              { n: 1, name: "Submit order",   sub: "Via portal or account manager" },
              { n: 2, name: "Design",         sub: "In-house team" },
              { n: 3, name: "Approval",       sub: "Portal proof review" },
              { n: 4, name: "Production",     sub: "Print + finishing" },
              { n: 5, name: "Ship",           sub: "Direct to every store" },
              { n: 6, name: "Track",          sub: "Real-time visibility" },
            ];
            return (
              <>
                {/* Desktop: horizontal flow */}
                <div className="hidden md:flex items-start">
                  {steps.map((step, i) => (
                    <div key={step.n} className="flex items-start flex-1 min-w-0">
                      {/* Step */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-brand-navy text-white text-sm font-bold flex items-center justify-center relative z-10">
                          {step.n}
                        </div>
                        <p className="text-sm font-semibold text-brand-navy mt-2 text-center leading-tight">
                          {step.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 text-center leading-tight">
                          {step.sub}
                        </p>
                      </div>
                      {/* Connector (not after last step) */}
                      {i < steps.length - 1 && (
                        <div className="flex-1 h-px bg-brand-navy/25 mt-4 mx-1" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile: vertical timeline */}
                <div className="flex flex-col gap-0 md:hidden">
                  {steps.map((step, i) => (
                    <div key={step.n} className="flex gap-4">
                      {/* Left: circle + connector */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-brand-navy text-white text-sm font-bold flex items-center justify-center z-10">
                          {step.n}
                        </div>
                        {i < steps.length - 1 && (
                          <div className="w-px flex-1 bg-brand-navy/25 my-1" />
                        )}
                      </div>
                      {/* Right: text */}
                      <div className={`pb-6 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                        <p className="text-sm font-semibold text-brand-navy leading-none mt-1.5">
                          {step.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{step.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* 7 — Problems we solve */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest font-semibold text-brand-sky uppercase">
            Why signage programs fail
          </p>
          <h2 className="text-4xl font-black text-brand-navy mt-2 mb-10">Sound familiar?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl border border-brand-navy/10 p-6 h-full">
              <div className="inline-flex items-center justify-center w-9 h-9 bg-red-50 text-red-500 rounded-lg p-1.5 mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Late and incomplete orders</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Kits arrive after the promotional window. Stores get the wrong materials. Your team spends days chasing down what&apos;s missing.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl border border-brand-navy/10 p-6 h-full">
              <div className="inline-flex items-center justify-center w-9 h-9 bg-red-50 text-red-500 rounded-lg p-1.5 mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Art approvals drag for weeks</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Back-and-forth emails. Revisions on revisions. By the time art is approved, the campaign launch has slipped.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl border border-brand-navy/10 p-6 h-full">
              <div className="inline-flex items-center justify-center w-9 h-9 bg-red-50 text-red-500 rounded-lg p-1.5 mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Brand looks different in every store</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Wrong sizes, off-brand colours, outdated versions. You lose control the moment product leaves the printer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — Final CTA */}
      <section className="bg-brand-navy py-24 px-4 text-center text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold tracking-widest uppercase">
            Ready to simplify your signage program?
          </p>
          <h2 className="text-white text-4xl font-black mt-3">
            Get your free signage system audit
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto mt-4 leading-relaxed">
            30-minute call. We&apos;ll review your current signage program and show you exactly what USG can do for your locations.
          </p>
          <Link
            href="/book"
            className="bg-brand-gold text-brand-navy font-bold px-10 py-4 rounded-xl text-lg hover:bg-brand-gold-dark transition-all mt-8 inline-block"
          >
            Book Your Free Campaign Analysis →
          </Link>
          <p className="text-white/50 text-sm mt-4">
            No commitment. No sales pitch. Just a clear picture of what&apos;s possible.
          </p>
        </div>
      </section>
    </div>
  );
}
