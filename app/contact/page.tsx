export const metadata = {
  title: "Contact | USG",
  description: "Get in touch with Universal Screen Graphics.",
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
      </section>
    </div>
  );
}
