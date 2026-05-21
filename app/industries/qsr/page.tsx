import IndustryPage from "@/components/IndustryPage";

export const metadata = {
  title: "QSR & Fast Casual | USG",
  description: "Promotional signage programs for QSR chains and fast casual franchise organizations. Direct-to-location delivery for multi-unit operators.",
};

export default function QSRPage() {
  return (
    <IndustryPage
      title="Signage programs built for the pace of quick service."
      subtitle="Industry · QSR & Fast Casual"
      image="/images/easy/qsr-hangry-burger-menu-board.webp"
      description="Monthly promotional cycles across hundreds of locations. USG handles design, production, and direct-to-location delivery for QSR chains of any size."
      challenges={[
        "Tight promotional windows with no room for error",
        "Hundreds of locations requiring consistent brand execution",
        "Multiple menu and promotional cycles running simultaneously",
      ]}
      solutions={[
        {
          heading: "Signage Programs",
          body: "Fully managed promotional programs built for QSR's fast cycles — from creative brief to every location, on time.",
          href: "/services/signage-programs",
        },
        {
          heading: "Graphic Design",
          body: "In-house design for window graphics, counter cards, table tents, and menu promotions — no upcharges, ever.",
          href: "/services/graphic-design",
        },
        {
          heading: "Direct Store Delivery",
          body: "Each location receives exactly what it needs, shipped direct — no distribution centre, no lost kits.",
          href: "/services/direct-store-delivery",
        },
      ]}
    />
  );
}
