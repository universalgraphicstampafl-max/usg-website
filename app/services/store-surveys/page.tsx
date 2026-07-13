import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Store Surveys | USG",
  description: "Every store measured, every detail captured — accurate store profiles for perfectly fitting signage, less waste, and effortless ordering.",
};

export default function StoreSurveysPage() {
  return (
    <ServicePage
      title="Every Store Measured. Every Detail Captured."
      subtitle="Store Surveys"
      description="Our team visits each location, documents every asset, and builds an accurate store profile in our proprietary software. The result is perfectly fitting signage, less waste, lower costs, and an ordering process so simple your team never has to worry about store details again. And because our experts see your stores firsthand, we can spot opportunities to improve your signage and grow your sales."
      features={[
        "Pre-program baseline surveys",
        "Signage condition and placement reporting",
        "Photo documentation by store and fixture",
        "Equipment audit",
      ]}
      benefits={[
        {
          heading: "Ground Truth, Not Assumptions",
          body: "Field data from real stores beats retailer portal data — we capture what's actually on the floor.",
        },
        {
          heading: "Actionable Reports",
          body: "Photo-backed survey results organised by store.",
        },
        {
          heading: "Close the Loop",
          body: "Survey findings feed directly into our production and delivery workflows — identify a gap, fix it fast.",
        },
      ]}
    />
  );
}
