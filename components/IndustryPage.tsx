import Image from "next/image";
import Link from "next/link";

interface IndustryPageProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  challenges: string[];
  solutions: { heading: string; body: string; href: string }[];
  stats?: { value: string; label: string }[];
}

export default function IndustryPage({
  title,
  subtitle,
  description,
  image,
  challenges,
  solutions,
  stats,
}: IndustryPageProps) {
  return (
    <div className="bg-brand-offwhite">
      {/* Hero */}
      <section className="relative h-[400px] w-full overflow-hidden -mt-[64px]">
        <Image
          src={image}
          alt={`${title} retail signage`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B2D5E]/85 via-[#1B2D5E]/60 to-[#1B2D5E]/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pt-[64px]">
          <p className="text-[#F0A500] text-sm font-semibold tracking-wider uppercase mb-2">{subtitle}</p>
          <h1 className="text-white text-5xl md:text-6xl font-bold">{title}</h1>
          <p className="text-white/90 text-xl mt-4 max-w-2xl">{description}</p>
        </div>
      </section>

      {/* Hero CTA strip */}
      <section className="bg-brand-navy text-white py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-3">
          <Link href="/book" className="btn-gold">
            Talk to a Specialist
          </Link>
          <Link href="/success-stories" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-brand-navy">
            See Success Stories
          </Link>
        </div>
      </section>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <section className="bg-brand-sky py-12 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-extrabold text-white">{s.value}</p>
                <p className="text-sm text-white/80 mt-1 tracking-brand-wide uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Challenges */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-heading">Industry Challenges We Solve</h2>
          <ul className="mt-6 space-y-3">
            {challenges.map((c) => (
              <li key={c} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                <span className="text-brand-sky mt-0.5 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-brand-navy tracking-brand-tight">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-heading">Our Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {solutions.map((s) => (
              <Link
                key={s.heading}
                href={s.href}
                className="group rounded-xl border border-gray-100 p-6 bg-brand-offwhite hover:border-brand-gold hover:shadow-md transition-all"
              >
                <div className="w-10 h-1 bg-brand-sky rounded mb-4 group-hover:bg-brand-gold transition-colors" />
                <h3 className="font-bold text-brand-navy mb-2 tracking-brand-tight group-hover:text-brand-gold transition-colors">
                  {s.heading}
                </h3>
                <p className="text-sm text-brand-navy/70 leading-relaxed">{s.body}</p>
                <span className="mt-4 inline-flex items-center text-sm text-brand-sky font-semibold gap-1 group-hover:gap-2 transition-all">
                  Learn more
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-brand-navy text-white text-center">
        <p className="section-sub !text-brand-gold">Built for your industry</p>
        <h2 className="text-3xl font-extrabold tracking-brand-tight mb-6 !text-white">
          Ready to elevate your in-store presence?
        </h2>
        <Link href="/book" className="btn-gold">
          Book a Free Strategy Call
        </Link>
      </section>
    </div>
  );
}
