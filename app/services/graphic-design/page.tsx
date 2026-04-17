import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Graphic Design | USG",
  description: "Point-of-sale graphic design for retail and CPG brands.",
};

export default function GraphicDesignPage() {
  return (
    <ServicePage
      title="Graphic Design"
      subtitle="Service"
      description="Our in-house designers understand retail environments deeply — creating graphics that communicate instantly, comply fully, and look great in print."
      features={[
        "Point-of-sale creative concepting",
        "Brand identity and style guide application",
        "Multi-format template systems",
        "FDA/regulatory compliance checks",
        "Pre-press and print-ready file preparation",
        "Digital asset variants (social, e-commerce)",
        "Revision rounds and stakeholder approval workflow",
        "Asset library management",
      ]}
      benefits={[
        {
          heading: "Retail-First Thinking",
          body: "We design for the shelf, not the screen — understanding how light, distance, and shopper behaviour affect visual impact.",
        },
        {
          heading: "Compliance Built In",
          body: "Our team stays current on FDA, MSA, and retailer-specific requirements so your designs never get rejected at the gate.",
        },
        {
          heading: "Fast, Consistent Output",
          body: "Template systems and established brand libraries mean we can turn around revisions in hours, not days.",
        },
      ]}
    />
  );
}
