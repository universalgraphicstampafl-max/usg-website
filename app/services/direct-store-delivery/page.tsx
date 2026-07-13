import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Fulfillment Services | USG",
  description: "Fulfillment you can count on — we pick, pack, and ship custom items to every location at 99.7% accuracy. Built for multi-location retail.",
};

export default function DirectStoreDeliveryPage() {
  return (
    <ServicePage
      title="Fulfillment You Can Count On"
      subtitle="Fulfillment Services"
      description="We pick, pack, and ship high-volume orders with custom items for every location — and we do it with a 99.7% accuracy rating. Fast, efficient, and built for the complexity of multi-location retail."
      features={[
        "Store-specific kitting and labelling",
        "Delivery status by tracking number",
        "Exception reporting and re-delivery coordination",
        "Nationwide coverage through managed carrier network",
        "Vendor provided signage coordination",
        "Custom box selection for shipping cost optimization",
      ]}
      benefits={[
        {
          heading: "Zero Room for Error",
          body: "Store-specific kits mean the Springfield location gets Springfield materials — not the ones for Charlotte.",
        },
        {
          heading: "Minimal Store Disruption",
          body: "On-time delivery ensures your promotions start when they\u2019re supposed to.",
        },
        {
          heading: "Packing Quality",
          body: "Packed with care and precision to ensure your signage arrives intact and without damage.",
        },
      ]}
    />
  );
}
