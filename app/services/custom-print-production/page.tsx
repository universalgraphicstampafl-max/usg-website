import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Custom Print Production | USG",
  description: "High-quality custom print production for every retail display format.",
};

export default function CustomPrintProductionPage() {
  return (
    <ServicePage
      title="Custom Print Production"
      subtitle="Service"
      description="From cooler door clings to large-format window graphics, USG produces durable, vibrant print materials on the right substrate for every retail application."
      features={[
        "Large-format digital printing",
        "Substrate selection consulting (vinyl, cling, polystyrene, corrugated, and more)",
        "UV-resistant and weather-rated options",
        "Cold-vault and freezer-grade materials",
        "Precision die-cutting and finishing",
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
          heading: "Colour Consistency",
          body: "Calibrated presses and strict colour management ensure Pantone-accurate results every run, every location.",
        },
        {
          heading: "Scale Without Sacrifice",
          body: "Whether you need 50 pieces or 50,000, quality and lead time stay consistent thanks to our production partnerships.",
        },
      ]}
    />
  );
}
