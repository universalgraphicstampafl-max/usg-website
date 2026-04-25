import IndustryPage from "@/components/IndustryPage";

export const metadata = {
  title: "Convenience Retail | USG",
  description: "Retail signage programs for convenience store chains. Monthly promotional kits designed, produced, and delivered direct to every location.",
};

export default function ConvenienceRetailPage() {
  return (
    <IndustryPage
      title="Convenience Retail"
      subtitle="Industry Focus"
      description="Convenience stores are high-traffic, high-impulse environments. USG delivers fast-turn, compliant signage that drives category performance and keeps shelves looking sharp — chain-wide."
      challenges={[
        "High SKU velocity requiring frequent graphic updates",
        "Planogram compliance across hundreds of locations",
        "Short windows for installation without disrupting operations",
        "Regulatory age-gating requirements at point of sale",
        "Balancing multiple vendor brand standards simultaneously",
      ]}
      solutions={[
        {
          heading: "Signage Programs",
          body: "Fully managed sign programs — from creative through delivery — built for c-store speed and scale.",
          href: "/services/signage-programs",
        },
        {
          heading: "Store Surveys",
          body: "Field audits that verify planogram compliance and capture reset opportunities before they become problems.",
          href: "/services/store-surveys",
        },
        {
          heading: "Direct Store Delivery",
          body: "White-glove delivery and installation, coordinated to minimise disruption during peak hours.",
          href: "/services/direct-store-delivery",
        },
        {
          heading: "Graphic Design",
          body: "Eye-catching POS creative engineered to interrupt the impulse path and convert browsers into buyers.",
          href: "/services/graphic-design",
        },
        {
          heading: "Custom Print Production",
          body: "Durable substrate printing for cooler doors, pump toppers, counter cards, and every format in between.",
          href: "/services/custom-print-production",
        },
        {
          heading: "Product Photography",
          body: "Studio-quality imagery for print and digital assets that makes every product look its best.",
          href: "/services/product-photography",
        },
      ]}
      stats={[
        { value: "300+", label: "C-Store Locations" },
        { value: "48hr", label: "Avg Turnaround" },
        { value: "98%", label: "Compliance Rate" },
        { value: "15+", label: "Years in Channel" },
      ]}
    />
  );
}
