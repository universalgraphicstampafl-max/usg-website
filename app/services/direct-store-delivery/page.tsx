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
        "Scheduled delivery windows by store",
        "In-store installation and merchandising",
        "Old material removal and disposal",
        "Delivery confirmation with photo proof",
        "Exception reporting and re-delivery coordination",
        "Temperature-controlled transport where required",
        "Nationwide coverage through managed carrier network",
      ]}
      benefits={[
        {
          heading: "Zero Room for Error",
          body: "Store-specific kits mean the Springfield location gets Springfield materials — not the ones for Charlotte.",
        },
        {
          heading: "Minimal Store Disruption",
          body: "Scheduled windows and trained install teams mean in and out fast, without disrupting store operations.",
        },
        {
          heading: "Full Visibility",
          body: "Real-time delivery confirmation and photo documentation give you a complete record of every install.",
        },
      ]}
    />
  );
}
