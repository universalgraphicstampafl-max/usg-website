import type { Metadata } from "next";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import Nav                  from "@/components/Nav";
import Logo                 from "@/components/Logo";
import ScrollProgress       from "@/components/ScrollProgress";
import CursorGlow           from "@/components/CursorGlow";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usg-website.netlify.app"),
  title: "Universal Signage & Graphics | USG",
  description:
    "Universal Signage & Graphics — turnkey signage programs, graphic design, custom print production, store surveys, direct store delivery, and product photography for convenience retail, tobacco/nicotine, QSR, grocery, and beverage industries.",
  openGraph: {
    title: "Universal Signage & Graphics | USG",
    description:
      "Retail signage programs for convenience, tobacco, QSR, grocery, and beverage chains.",
    images: [{ url: "/images/usg-og.jpg", width: 1700, height: 1300, alt: "Universal Signage & Graphics" }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSerif.variable} antialiased min-h-screen flex flex-col`}>
        <SmoothScrollProvider>
        <ScrollProgress />
        <CursorGlow />
        <Nav />
        <main className="flex-1 pt-[64px]">{children}</main>
        <footer className="bg-brand-navy-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Col 1 — Logo + tagline */}
            <div>
              <Logo variant="light" />
              <p className="text-white/60 text-sm mt-3 leading-relaxed">
                Retail signage programs for convenience, tobacco, QSR, grocery, and beverage chains.
              </p>
            </div>

            {/* Col 2 — Services */}
            <div>
              <p className="font-semibold text-sm tracking-widest uppercase text-white/40 mb-4">
                Services
              </p>
              <ul>
                {[
                  { label: "Signage Programs",       href: "/services/signage-programs" },
                  { label: "Graphic Design",          href: "/services/graphic-design" },
                  { label: "Custom Print Production", href: "/services/custom-print-production" },
                  { label: "Store Surveys",           href: "/services/store-surveys" },
                  { label: "Fulfillment Services",    href: "/services/direct-store-delivery" },
                  { label: "Signage Management Software", href: "/services/signage-management-software" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-brand-sky hover:text-white text-sm leading-8 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Industries */}
            <div>
              <p className="font-semibold text-sm tracking-widest uppercase text-white/40 mb-4">
                Industries
              </p>
              <ul>
                {[
                  { label: "Convenience Retail",  href: "/#industries" },
                  { label: "Tobacco & Nicotine",  href: "/#industries" },
                  { label: "QSR",                 href: "/#industries" },
                  { label: "Grocery",             href: "/#industries" },
                  { label: "Beverage",            href: "/#industries" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-brand-sky hover:text-white text-sm leading-8 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Contact */}
            <div>
              <p className="font-semibold text-sm tracking-widest uppercase text-white/40 mb-4">
                Contact
              </p>
              <ul className="text-white/60 text-sm leading-8">
                <li>4897 W. Waters Ave, Suite H</li>
                <li>Tampa, FL 33634</li>
                <li><a href="tel:+18136235335" className="hover:text-white transition-colors">(813) 623-5335</a></li>
                <li>Fax: (813) 626-7074</li>
                <li><a href="mailto:info@usgfla.com" className="hover:text-white transition-colors">info@usgfla.com</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="max-w-7xl mx-auto px-8 border-t border-white/10 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} Universal Signage & Graphics. All rights reserved.
            </p>
            <div className="flex gap-5">
              <Link href="/privacy" className="text-white/40 text-xs hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-white/40 text-xs hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </footer>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
