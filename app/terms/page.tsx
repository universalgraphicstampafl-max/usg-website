import Link from "next/link";

export const metadata = {
  title: "Terms of Service | USG",
  description:
    "The terms governing use of the Universal Signage & Graphics website, client portal, and quote requests.",
};

/* ──────────────────────────────────────────────────────────────────────────
   STARTER LANGUAGE — have counsel review before publishing.
   Replace every [BRACKETED] value with USG's confirmed details:
   • [EFFECTIVE DATE]   — date these terms go live
   • [LEGAL EMAIL]      — e.g. legal@usgfla.com or hello@usgfla.com
   • [COUNTY]           — venue county (likely Hillsborough County, FL)
   Confirm with counsel: limitation-of-liability cap, warranty scope,
   and whether a separate Master Services Agreement / PO governs orders.
   ──────────────────────────────────────────────────────────────────────── */

const EFFECTIVE_DATE = "June 24, 2026";

type Block = { type: "p"; text: string } | { type: "ul"; items: string[] };
type Section = { heading: string; blocks: Block[] };

const SECTIONS: Section[] = [
  {
    heading: "1. Acceptance of These Terms",
    blocks: [
      {
        type: "p",
        text: "These Terms of Service (“Terms”) govern your access to and use of the Universal Signage & Graphics (“USG,” “we,” “us,” or “our”) website, client portal, and related services (collectively, the “Services”). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree, do not use the Services.",
      },
    ],
  },
  {
    heading: "2. About the Services",
    blocks: [
      {
        type: "p",
        text: "USG provides retail signage programs, graphic design, and print production for business clients. This website is informational and allows you to learn about our services, request quotes, book consultations, and — for authorized clients — access a client portal. The Services are intended for business use, not personal or household purposes.",
      },
    ],
  },
  {
    heading: "3. Eligibility & Authority",
    blocks: [
      {
        type: "p",
        text: "You must be at least 18 years old to use the Services. If you use the Services on behalf of a company or other entity, you represent that you have authority to bind that entity to these Terms.",
      },
    ],
  },
  {
    heading: "4. Quotes & Orders",
    blocks: [
      {
        type: "p",
        text: "Quote requests submitted through this site are requests for information and do not create a binding contract. Pricing, availability, and turnaround are estimates and may change. Any order is governed by a separately agreed quote, proposal, purchase order, or services agreement between you and USG, which controls in the event of any conflict with these Terms.",
      },
    ],
  },
  {
    heading: "5. Client Portal & Accounts",
    blocks: [
      {
        type: "p",
        text: "Access to the client portal requires an account. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. Notify us promptly of any unauthorized use. We may suspend or terminate accounts that violate these Terms or that we reasonably believe pose a security or legal risk.",
      },
    ],
  },
  {
    heading: "6. Client-Provided Content & Artwork",
    blocks: [
      {
        type: "p",
        text: "You retain ownership of artwork, logos, files, and other materials you provide to us (“Client Content”). By submitting Client Content, you represent and warrant that you own it or have all rights necessary to provide it, and you grant USG a license to use, reproduce, and modify it solely as needed to provide the Services and fulfill your orders. You are responsible for ensuring Client Content does not infringe the rights of any third party.",
      },
    ],
  },
  {
    heading: "7. Our Intellectual Property",
    blocks: [
      {
        type: "p",
        text: "The Services, including site content, designs, text, graphics, logos, and software, are owned by USG or its licensors and are protected by intellectual property laws. Except for Client Content, nothing in these Terms grants you any right to use USG’s trademarks, designs, or materials without our prior written consent.",
      },
    ],
  },
  {
    heading: "8. Acceptable Use",
    blocks: [
      { type: "p", text: "You agree not to:" },
      {
        type: "ul",
        items: [
          "Use the Services for any unlawful purpose or in violation of these Terms;",
          "Upload content that infringes third-party rights or contains malware;",
          "Attempt to gain unauthorized access to the Services or other users’ accounts;",
          "Interfere with or disrupt the integrity or performance of the Services; or",
          "Copy, scrape, or reproduce site content except as expressly permitted.",
        ],
      },
    ],
  },
  {
    heading: "9. Third-Party Services & Links",
    blocks: [
      {
        type: "p",
        text: "The Services may rely on or link to third-party services (such as scheduling, CRM, hosting, and analytics providers). We are not responsible for the availability, content, or practices of third parties, and your use of them may be subject to their own terms.",
      },
    ],
  },
  {
    heading: "10. Disclaimers",
    blocks: [
      {
        type: "p",
        text: "The Services are provided “as is” and “as available” without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Services will be uninterrupted, error-free, or secure. This section does not limit any product or service warranties set out in a separate signed agreement with USG.",
      },
    ],
  },
  {
    heading: "11. Limitation of Liability",
    blocks: [
      {
        type: "p",
        text: "To the fullest extent permitted by law, USG and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising out of or related to your use of the Services. Our total liability for any claim related to the Services will not exceed the amount you paid to USG for the Services giving rise to the claim. [Confirm liability cap with counsel.]",
      },
    ],
  },
  {
    heading: "12. Indemnification",
    blocks: [
      {
        type: "p",
        text: "You agree to indemnify and hold harmless USG and its officers, employees, and agents from any claims, damages, or expenses (including reasonable attorneys’ fees) arising from your Client Content, your use of the Services, or your violation of these Terms.",
      },
    ],
  },
  {
    heading: "13. Governing Law",
    blocks: [
      {
        type: "p",
        text: "These Terms are governed by the laws of the State of Florida, without regard to its conflict-of-laws rules. You agree that any dispute arising from these Terms or the Services will be brought exclusively in the state or federal courts located in Hillsborough County, Florida, and you consent to their jurisdiction.",
      },
    ],
  },
  {
    heading: "14. Changes to These Terms",
    blocks: [
      {
        type: "p",
        text: "We may update these Terms from time to time. When we do, we will revise the “last updated” date above. Your continued use of the Services after changes take effect constitutes acceptance of the updated Terms.",
      },
    ],
  },
  {
    heading: "15. Contact Us",
    blocks: [
      {
        type: "p",
        text: "Questions about these Terms can be directed to info@usgfla.com, Universal Signage & Graphics, Tampa, Florida.",
      },
    ],
  },
];

function LegalBody({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-10">
      {sections.map((s) => (
        <section key={s.heading}>
          <h2 className="text-xl font-extrabold text-brand-navy tracking-brand-tight mb-3">
            {s.heading}
          </h2>
          <div className="space-y-4 text-brand-navy/75 leading-relaxed">
            {s.blocks.map((b, i) =>
              b.type === "p" ? (
                <p key={i}>{b.text}</p>
              ) : (
                <ul key={i} className="list-disc pl-5 space-y-2">
                  {b.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="bg-brand-offwhite">
      <section className="bg-brand-navy text-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="section-sub !text-brand-gold">Legal</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-brand-tight mb-4 !text-white">
            Terms of Service
          </h1>
          <p className="text-white/60 text-sm">Last updated: {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <LegalBody sections={SECTIONS} />
          <div className="mt-12 pt-6 border-t border-gray-100">
            <Link href="/privacy" className="text-brand-sky hover:text-brand-navy text-sm font-semibold transition-colors">
              View our Privacy Policy &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
