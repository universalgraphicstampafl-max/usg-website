import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Custom Print Production | USG",
  description: "Precision print production at scale — custom shapes, sizes, and high-volume runs at consistent, high quality. Built to grow with your program.",
};

export default function CustomPrintProductionPage() {
  return (
    <ServicePage
      title="Precision Production at Scale"
      subtitle="Custom Print Production"
      description="Our state-of-the-art facility is built to handle custom shapes, sizes, and high-volume runs without passing the cost on to you. The result is consistent, high-quality signage that fits your brand today and grows with your program tomorrow."
      features={[
        "Wide-format digital printing",
        "Substrate consulting (vinyl, cling, polystyrene, corrugated, and more)",
        "UV-resistant and weather-rated options",
        "Cold-vault and freezer-grade materials",
        "Precision routing and finishing",
        "Kitting and pack-out by store",
        "Quality inspection before shipment",
        "Rush production capabilities",
      ]}
      benefits={[
        {
          heading: "The Right Material Matters",
          body: "We match substrate to environment — cooler clings that don't peel, outdoor graphics that don't fade, floor decals that last.",
        },
        {
          heading: "Brand Consistency",
          body: "Using your brand guidelines to build consistency across every sign type at every store.",
        },
        {
          heading: "Scale Without Sacrifice",
          body: "Whether you need 50 pieces or 50,000, quality and lead time stay consistent thanks to our high volume production equipment & multi shift business strategy.",
        },
      ]}
    />
  );
}
