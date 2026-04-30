import IndustryPage from "@/components/IndustryPage";

export const metadata = {
  title: "Grocery & Supermarket | USG",
  description: "In-store signage programs for grocery chains and supermarket franchise organizations. High-frequency promotional production and direct store delivery.",
};

export default function GroceryPage() {
  return (
    <IndustryPage
      title="In-store signage programs that keep up with your promotions."
      subtitle="Industry · Grocery & Supermarket"
      image="/images/industries/grocery.webp"
      description="Weekly and monthly promotional signage for grocery chains — designed, produced, and shipped direct to every store location."
      challenges={[
        "High-frequency promotional cycles requiring fast turnaround",
        "Large store footprints with multiple signage zones",
        "Brand consistency across owned and franchise locations",
      ]}
      solutions={[
        {
          heading: "Signage Programs",
          body: "End-to-end managed programs that keep pace with weekly ad cycles and seasonal promotions — at chain scale.",
          href: "/services/signage-programs",
        },
        {
          heading: "Custom Print Production",
          body: "Shelf talkers, aisle banners, end cap graphics, and floor decals — every format, produced to spec.",
          href: "/services/custom-print-production",
        },
        {
          heading: "Direct Store Delivery",
          body: "Direct shipment to every store location so graphics arrive ready to install, not stuck in a regional warehouse.",
          href: "/services/direct-store-delivery",
        },
      ]}
    />
  );
}
