import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Direct Store Delivery | USG",
  description: "White-glove direct store delivery and installation of signage and displays.",
};

export default function DirectStoreDeliveryPage() {
  return (
    <ServicePage
      title="Direct Store Delivery"
      subtitle="Service"
      description="Getting the right materials to the right store on the right day is harder than it looks. USG's DSD network handles precision logistics so your program lands perfectly — every time."
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
