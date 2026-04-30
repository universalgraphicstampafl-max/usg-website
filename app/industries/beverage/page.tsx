import IndustryPage from "@/components/IndustryPage";

export const metadata = {
  title: "Beverage | USG",
  description: "Beverage brand signage programs for convenience and grocery chain locations. Cooler door graphics, dispense station programs, and direct delivery.",
};

export default function BeveragePage() {
  return (
    <IndustryPage
      title="Beverage"
      subtitle="Industry Focus"
      image="/images/industries/beverage.webp"
      description="The cold vault and warm shelf are your brand's most valuable real estate. USG creates high-impact beverage graphics — from cooler door clings to floor displays — that stop shoppers and drive velocity."
      challenges={[
        "Standing out in densely packed cold vault environments",
        "Communicating innovation and flavour variety at speed",
        "Seasonal and promotional refresh cycles with tight lead times",
        "Cooler-specific substrates that withstand condensation and temperature swings",
        "Coordinating national promotions across a fragmented retail network",
      ]}
      solutions={[
        {
          heading: "Cooler & Cold Vault Graphics",
          body: "Door clings, header panels, and interior graphics engineered for refrigerated environments.",
          href: "/services/custom-print-production",
        },
        {
          heading: "Signage Programs",
          body: "Turnkey seasonal and promotional programs that execute seamlessly from concept to store.",
          href: "/services/signage-programs",
        },
        {
          heading: "Graphic Design",
          body: "Bold, shelf-stopping creative that communicates taste and brand personality in under a second.",
          href: "/services/graphic-design",
        },
        {
          heading: "Product Photography",
          body: "Mouth-watering product shots for packaging, POS, and digital that make your SKUs pop.",
          href: "/services/product-photography",
        },
        {
          heading: "Store Surveys",
          body: "Cold vault audits capturing compliance, share of shelf, and competitive positioning data.",
          href: "/services/store-surveys",
        },
        {
          heading: "Direct Store Delivery",
          body: "Rapid deployment of promotional materials coordinated with your distribution network.",
          href: "/services/direct-store-delivery",
        },
      ]}
      stats={[
        { value: "200+", label: "Retail Banners" },
        { value: "72hr", label: "Promo Turnaround" },
        { value: "12+", label: "Beverage Segments" },
        { value: "99%", label: "On-Time Delivery" },
      ]}
    />
  );
}
