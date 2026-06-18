import Link from "next/link";
import { BOOKING_URL } from "@/lib/booking";

interface ServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  benefits: { heading: string; body: string }[];
  cta?: string;
}

export default function ServicePage({
  title,
  subtitle,
  description,
  features,
  benefits,
  cta = "Book a Free Consultation",
}: ServicePageProps) {
  return (
    <div className="bg-brand-offwhite">
      {/* Hero */}
      <section className="bg-brand-navy text-white -mt-[64px] pt-[84px] pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-sub !text-brand-sky">{subtitle}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-brand-tight mb-6 !text-white">
            {title}
          </h1>
          <p className="text-lg text-white/75 max-w-2xl leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
              {cta}
            </Link>
            <Link href="/contact" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-brand-navy">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-heading">What&apos;s Included</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                <span className="text-brand-gold mt-0.5 flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-sm font-medium text-brand-navy tracking-brand-tight">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-heading">Why It Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {benefits.map((b) => (
              <div key={b.heading} className="rounded-xl border border-gray-100 p-6 bg-brand-offwhite">
                <div className="w-10 h-1 bg-brand-gold rounded mb-4" />
                <h3 className="font-bold text-brand-navy mb-2 tracking-brand-tight">{b.heading}</h3>
                <p className="text-sm text-brand-navy/70 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-16 px-6 bg-brand-navy text-white text-center">
        <p className="section-sub !text-brand-sky">Ready to get started?</p>
        <h2 className="text-3xl font-extrabold tracking-brand-tight mb-6 !text-white">
          Let&apos;s build your program
        </h2>
        <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
          {cta}
        </Link>
      </section>
    </div>
  );
}
