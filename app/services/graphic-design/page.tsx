import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Graphic Design | USG",
  description: "World-class retail signage design, included at no extra charge. A full-time team creating fast, accurate, sales-driving artwork.",
};

export default function GraphicDesignPage() {
  return (
    <ServicePage
      title="World-Class Design. No Extra Charge."
      subtitle="Graphic Design"
      description="Our full-time design team lives at the intersection of market trends, retail strategy, and cutting-edge technology. They create fast, accurate, eye-catching signage that's proven to drive sales — all included for our partners at no additional cost."
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
