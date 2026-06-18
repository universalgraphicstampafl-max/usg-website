import Link from "next/link";
import { BOOKING_URL } from "@/lib/booking";

export const metadata = {
  title: "Success Stories | USG",
  description: "How Universal Signage & Graphics has helped retail brands grow in-store.",
};

const stories = [
  {
    category: "Convenience Retail",
    accent: "bg-brand-sky",
    title: "Regional Chain Achieves 98% Planogram Compliance",
    challenge:
      "A 250-store regional c-store chain struggled with inconsistent signage execution and poor compliance scores during vendor audits.",
    solution:
      "USG deployed a fully managed signage program — covering design, print, store-specific kitting, and DSD installation — paired with monthly compliance surveys.",
    result: "Compliance scores rose from 61% to 98% within two reset cycles.",
    metric: "98%",
    metricLabel: "Compliance",
  },
  {
    category: "Tobacco & Nicotine",
    accent: "bg-brand-navy",
    title: "Nicotine Pouch Brand Launches Nationwide in 90 Days",
    challenge:
      "A leading nicotine pouch brand needed to launch FDA-compliant POS materials across 3,000 retail doors — in 90 days.",
    solution:
      "USG fast-tracked creative with built-in compliance review, produced 180,000 individual pieces, and coordinated store-level delivery through our carrier network.",
    result: "Full national rollout completed on schedule, zero regulatory rejections.",
    metric: "90",
    metricLabel: "Day Rollout",
  },
  {
    category: "Beverage",
    accent: "bg-brand-gold",
    title: "Energy Drink Brand Doubles Cold Vault Share of Shelf",
    challenge:
      "A fast-growing energy drink brand needed to defend and expand cold vault real estate against category giants with bigger budgets.",
    solution:
      "USG developed a complete cold vault graphics package — door clings, header panels, shelf talkers — paired with quarterly survey data to track competitive positioning.",
    result: "Share of cold vault grew from 8% to 17% over three promotion cycles.",
    metric: "2×",
    metricLabel: "Shelf Share",
  },
];

export default function SuccessStoriesPage() {
  return (
    <div className="bg-brand-offwhite">
      {/* Hero */}
      <section className="bg-brand-navy text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-sub !text-brand-gold">Proven Results</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-brand-tight mb-4 !text-white">
            Success Stories
          </h1>
          <p className="text-lg text-white/70 max-w-xl">
            Real outcomes for real brands. See how USG helps retailers and CPG companies win at the point of sale.
          </p>
        </div>
      </section>

      {/* Stories */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          {stories.map((s) => (
            <article
              key={s.title}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className={`h-2 ${s.accent}`} />
              <div className="p-8 md:p-10">
                <p className="section-sub !text-brand-sky mb-2">{s.category}</p>
                <h2 className="text-2xl font-bold text-brand-navy tracking-brand-tight mb-6">
                  {s.title}
                </h2>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="font-bold text-brand-navy uppercase tracking-brand-wide text-xs mb-2">
                      Challenge
                    </p>
                    <p className="text-brand-navy/70 leading-relaxed">{s.challenge}</p>
                  </div>
                  <div>
                    <p className="font-bold text-brand-navy uppercase tracking-brand-wide text-xs mb-2">
                      Solution
                    </p>
                    <p className="text-brand-navy/70 leading-relaxed">{s.solution}</p>
                  </div>
                  <div>
                    <p className="font-bold text-brand-navy uppercase tracking-brand-wide text-xs mb-2">
                      Result
                    </p>
                    <p className="text-brand-navy/70 leading-relaxed mb-4">{s.result}</p>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-extrabold text-brand-gold">{s.metric}</span>
                      <span className="text-xs text-brand-navy/50 mb-1 tracking-brand-wide uppercase">
                        {s.metricLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-brand-navy text-white text-center">
        <h2 className="text-3xl font-extrabold tracking-brand-tight mb-4 !text-white">
          Ready to write your success story?
        </h2>
        <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
          Book a Free Strategy Call
        </Link>
      </section>
    </div>
  );
}
