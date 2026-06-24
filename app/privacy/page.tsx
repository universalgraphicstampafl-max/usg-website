import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | USG",
  description:
    "How Universal Signage & Graphics collects, uses, and protects information submitted through this website and client portal.",
};

/* ──────────────────────────────────────────────────────────────────────────
   STARTER LANGUAGE — have counsel review before publishing.
   Replace every [BRACKETED] value with USG's confirmed details:
   • [EFFECTIVE DATE]      — date this policy goes live
   • [PRIVACY EMAIL]       — e.g. privacy@usgfla.com
   • [PHONE]               — main business line
   • [MAILING ADDRESS]     — Tampa, FL business address
   • [ANALYTICS TOOLS]     — confirm what you actually run (e.g. Google
                             Analytics, HubSpot tracking)
   ──────────────────────────────────────────────────────────────────────── */

const EFFECTIVE_DATE = "June 24, 2026";

type Block = { type: "p"; text: string } | { type: "ul"; items: string[] };
type Section = { heading: string; blocks: Block[] };

const SECTIONS: Section[] = [
  {
    heading: "1. Overview",
    blocks: [
      {
        type: "p",
        text: "Universal Signage & Graphics (“USG,” “we,” “us,” or “our”) respects your privacy. This Privacy Policy explains what information we collect through this website and our client portal, how we use it, and the choices you have. By using this site, you agree to the practices described here.",
      },
      {
        type: "p",
        text: "USG is a business-to-business provider of retail signage programs, graphic design, and print production based in Tampa, Florida. This site is intended for business and informational use.",
      },
    ],
  },
  {
    heading: "2. Information We Collect",
    blocks: [
      {
        type: "p",
        text: "We collect information in three ways: information you provide directly, information collected automatically, and information from third parties.",
      },
      {
        type: "p",
        text: "Information you provide directly. When you submit a contact or quote request, book a call, create a client portal account, or otherwise communicate with us, we may collect your name, company, job title, email address, phone number, mailing address, project details, and any files or artwork you upload.",
      },
      {
        type: "p",
        text: "Information collected automatically. When you visit the site, we and our service providers may collect technical and usage data such as your IP address, browser type, device information, referring pages, and the pages you view. We collect this through cookies and similar technologies, including Google Analytics.",
      },
      {
        type: "p",
        text: "Information from third parties. We may receive information from service providers that help us operate the site, manage leads, and communicate with prospects and clients.",
      },
    ],
  },
  {
    heading: "3. How We Use Information",
    blocks: [
      { type: "p", text: "We use the information we collect to:" },
      {
        type: "ul",
        items: [
          "Respond to inquiries, quote requests, and support requests;",
          "Provide, manage, and improve our services and client portal;",
          "Process and fulfill orders and signage programs;",
          "Send service-related and, where permitted, marketing communications (you may opt out of marketing at any time);",
          "Maintain the security and integrity of the site and portal;",
          "Analyze site usage to improve our content and user experience; and",
          "Comply with legal obligations and enforce our agreements.",
        ],
      },
    ],
  },
  {
    heading: "4. How We Share Information",
    blocks: [
      {
        type: "p",
        text: "We do not sell your personal information. We may share information in the following limited circumstances:",
      },
      {
        type: "ul",
        items: [
          "Service providers. Vendors that perform services on our behalf — such as website hosting, content management, customer relationship management (CRM), email delivery, analytics, and payment processing — may process information solely to provide those services to us.",
          "Legal and safety. We may disclose information if required by law, subpoena, or other legal process, or to protect the rights, property, or safety of USG, our clients, or others.",
          "Business transfers. If USG is involved in a merger, acquisition, or sale of assets, information may be transferred as part of that transaction.",
        ],
      },
    ],
  },
  {
    heading: "5. Cookies & Analytics",
    blocks: [
      {
        type: "p",
        text: "We use cookies and similar technologies to operate the site, remember preferences, and understand how visitors use our pages. You can control cookies through your browser settings; disabling them may affect how parts of the site function. Where required, analytics are provided by third-party tools subject to their own privacy practices.",
      },
    ],
  },
  {
    heading: "6. Data Retention",
    blocks: [
      {
        type: "p",
        text: "We retain personal information for as long as needed to fulfill the purposes described in this policy, to maintain business records, and to comply with our legal obligations. When information is no longer needed, we take reasonable steps to delete or de-identify it.",
      },
    ],
  },
  {
    heading: "7. Data Security",
    blocks: [
      {
        type: "p",
        text: "We use reasonable administrative, technical, and physical safeguards designed to protect the information we collect. No method of transmission or storage is completely secure, however, and we cannot guarantee absolute security.",
      },
    ],
  },
  {
    heading: "8. Your Choices & Rights",
    blocks: [
      {
        type: "p",
        text: "You may request to access, correct, or delete personal information we hold about you, and you may opt out of marketing communications by using the unsubscribe link or contacting us. Depending on your jurisdiction, you may have additional rights regarding your personal information. To exercise any of these choices, contact us using the details below.",
      },
    ],
  },
  {
    heading: "9. Children’s Privacy",
    blocks: [
      {
        type: "p",
        text: "This site is intended for businesses and is not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us information, please contact us and we will take appropriate steps to remove it.",
      },
    ],
  },
  {
    heading: "10. Third-Party Links",
    blocks: [
      {
        type: "p",
        text: "Our site may contain links to third-party websites and services. We are not responsible for the privacy practices or content of those third parties, and we encourage you to review their policies.",
      },
    ],
  },
  {
    heading: "11. Changes to This Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this Privacy Policy from time to time. When we do, we will revise the “last updated” date above. Material changes will be communicated as appropriate. Your continued use of the site after changes take effect constitutes acceptance of the updated policy.",
      },
    ],
  },
  {
    heading: "12. Contact Us",
    blocks: [
      {
        type: "p",
        text: "If you have questions about this Privacy Policy or our data practices, contact us at info@usgfla.com, (813) 623-5335, or 4897 W. Waters Ave, Suite H, Tampa, FL 33634.",
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

export default function PrivacyPage() {
  return (
    <div className="bg-brand-offwhite">
      <section className="bg-brand-navy text-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="section-sub !text-brand-gold">Legal</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-brand-tight mb-4 !text-white">
            Privacy Policy
          </h1>
          <p className="text-white/60 text-sm">Last updated: {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <LegalBody sections={SECTIONS} />
          <div className="mt-12 pt-6 border-t border-gray-100">
            <Link href="/terms" className="text-brand-sky hover:text-brand-navy text-sm font-semibold transition-colors">
              View our Terms of Service &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
