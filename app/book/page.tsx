import Link from "next/link";

export const metadata = {
  title: "Book a Call | USG",
  description: "Schedule a free strategy call with Universal Screen Graphics.",
};

export default function BookPage() {
  return (
    <div className="bg-brand-offwhite">
      <section className="bg-brand-navy text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-sub !text-brand-gold">Free 30-Minute Session</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-brand-tight mb-4 !text-white">
            Book a Strategy Call
          </h1>
          <p className="text-lg text-white/70 max-w-xl">
            Let&apos;s talk about your in-store goals. We&apos;ll walk you through how USG can help — no commitment required.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* What to expect */}
            <div>
              <h2 className="section-heading text-2xl">What to Expect</h2>
              <ul className="space-y-4 mt-6">
                {[
                  "Overview of your current in-store program challenges",
                  "USG capabilities walkthrough tailored to your industry",
                  "Preliminary recommendations and scope ideas",
                  "Q&A — no sales pressure, just honest answers",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-brand-gold mt-0.5 flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-sm text-brand-navy/80 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <form action="/thank-you" method="GET" className="space-y-5">
                <div>
                  <label htmlFor="book-name" className="block text-sm font-semibold text-brand-navy tracking-brand-tight mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="book-name"
                    name="name"
                    type="text"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-sky focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="book-email" className="block text-sm font-semibold text-brand-navy tracking-brand-tight mb-1.5">
                    Work Email
                  </label>
                  <input
                    id="book-email"
                    name="email"
                    type="email"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-sky focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="book-company" className="block text-sm font-semibold text-brand-navy tracking-brand-tight mb-1.5">
                    Company
                  </label>
                  <input
                    id="book-company"
                    name="company"
                    type="text"
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-sky focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="book-industry" className="block text-sm font-semibold text-brand-navy tracking-brand-tight mb-1.5">
                    Industry
                  </label>
                  <select
                    id="book-industry"
                    name="industry"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-sky focus:border-transparent bg-white"
                  >
                    <option value="">Select your industry</option>
                    <option value="convenience-retail">Convenience Retail</option>
                    <option value="tobacco-nicotine">Tobacco & Nicotine</option>
                    <option value="beverage">Beverage</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="book-notes" className="block text-sm font-semibold text-brand-navy tracking-brand-tight mb-1.5">
                    Anything to share upfront? (optional)
                  </label>
                  <textarea
                    id="book-notes"
                    name="notes"
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-sky focus:border-transparent resize-none"
                  />
                </div>
                <button type="submit" className="btn-gold w-full text-center">
                  Request My Call
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
