export const metadata = {
  title: "Contact | USG",
  description: "Get in touch with Universal Signage & Graphics.",
};

export default function ContactPage() {
  return (
    <div className="bg-brand-offwhite">
      <section className="bg-brand-navy text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-sub !text-brand-gold">Get in Touch</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-brand-tight mb-4 !text-white">
            Contact Us
          </h1>
          <p className="text-lg text-white/70 max-w-xl">
            Questions, quotes, or just want to learn more? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <form action="/thank-you" method="GET" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold text-brand-navy tracking-brand-tight mb-1.5"
                >
                  First Name
                </label>
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-sky focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-semibold text-brand-navy tracking-brand-tight mb-1.5"
                >
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-sky focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-brand-navy tracking-brand-tight mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-sky focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-semibold text-brand-navy tracking-brand-tight mb-1.5"
              >
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-sky focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-brand-navy tracking-brand-tight mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-sky focus:border-transparent resize-none"
              />
            </div>
            <button type="submit" className="btn-navy w-full text-center">
              Send Message
            </button>
          </form>
        </div>

        <div className="max-w-3xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-gold mb-1.5">Visit</p>
            <p className="text-brand-navy text-sm leading-relaxed">
              4897 W. Waters Ave, Suite H<br />Tampa, FL 33634
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-gold mb-1.5">Call</p>
            <a href="tel:+18136235335" className="text-brand-navy text-sm hover:text-brand-sky transition-colors">
              (813) 623-5335
            </a>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-gold mb-1.5">Fax</p>
            <p className="text-brand-navy text-sm">(813) 626-7074</p>
          </div>
        </div>
      </section>
    </div>
  );
}
