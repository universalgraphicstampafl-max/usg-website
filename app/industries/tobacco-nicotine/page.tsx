import IndustryPage from "@/components/IndustryPage";

export const metadata = {
  title: "Tobacco & Nicotine | USG",
  description: "Compliant signage programs for tobacco and nicotine brands in chain retail locations. Precision production and direct-to-store delivery.",
};

export default function TobaccoNicotinePage() {
  return (
    <IndustryPage
      title="Tobacco & Nicotine"
      subtitle="Industry Focus"
      image="/images/industries/tobacco-nicotine.webp"
      description="In a category defined by strict FDA regulations and shrinking display space, USG keeps your brand visible, compliant, and competitive — from cigarette fixtures to next-gen nicotine alternatives."
      challenges={[
        "FDA and MSA compliance requirements for every point-of-sale piece",
        "Age-verification and warning label placement mandates",
        "Limited shelf space and intense competition for premium positioning",
        "Rapid category evolution: cigarettes, cigars, vape, pouches, and HTP",
        "State-by-state regulatory variance requiring localised executions",
      ]}
      solutions={[
        {
          heading: "Compliant Signage Programs",
          body: "Fully managed programs with built-in regulatory review to ensure every piece meets federal and state requirements.",
          href: "/services/signage-programs",
        },
        {
          heading: "Graphic Design",
          body: "Category-savvy creative that communicates brand and product within tight compliance guardrails.",
          href: "/services/graphic-design",
        },
        {
          heading: "Custom Print Production",
          body: "Fixture wraps, header cards, shelf strips, and display panels — produced to spec every time.",
          href: "/services/custom-print-production",
        },
        {
          heading: "Store Surveys",
          body: "Compliance audits that document fixture status and identify corrective actions before regulators do.",
          href: "/services/store-surveys",
        },
        {
          heading: "Direct Store Delivery",
          body: "Precise install logistics ensuring the right materials reach the right stores — no mix-ups.",
          href: "/services/direct-store-delivery",
        },
        {
          heading: "Product Photography",
          body: "Compliant product imagery for in-store print, digital menus, and retailer portals.",
          href: "/services/product-photography",
        },
      ]}
      stats={[
        { value: "100%", label: "Compliance Rate" },
        { value: "50+", label: "Brand Partners" },
        { value: "5", label: "Product Segments" },
        { value: "10yr+", label: "Category Expertise" },
      ]}
    />
  );
}
