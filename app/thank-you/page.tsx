import Link from "next/link";

export const metadata = {
  title: "Thank You | USG",
  description: "Thank you for reaching out to Universal Signage & Graphics.",
};

export default function ThankYouPage() {
  return (
    <div className="bg-brand-offwhite min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-brand-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-brand-tight text-brand-navy mb-4">
          Thank You!
        </h1>
        <p className="text-brand-navy/70 leading-relaxed mb-8">
          We&apos;ve received your message and will be in touch within one business day. We look forward to learning more about your in-store goals.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-navy">
            Back to Home
          </Link>
          <Link href="/gallery" className="btn-outline">
            See Our Work
          </Link>
        </div>
      </div>
    </div>
  );
}
