import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Store Surveys | USG",
  description: "Field audits and store surveys for planogram compliance and signage accuracy.",
};

export default function StoreSurveysPage() {
  return (
    <ServicePage
      title="Store Surveys"
      subtitle="Service"
      description="You can't manage what you can't see. USG's store survey teams provide accurate, actionable field data so you always know the state of your in-store presence."
      features={[
        "Pre-program baseline surveys",
        "Planogram compliance auditing",
        "Signage condition and placement reporting",
        "Competitive share-of-shelf measurement",
        "Photo documentation by store and fixture",
        "Reset opportunity identification",
        "Branded reporting dashboards",
        "Follow-up corrective action tracking",
      ]}
      benefits={[
        {
          heading: "Ground Truth, Not Assumptions",
          body: "Field data from real stores beats retailer portal data — we capture what's actually on the floor.",
        },
        {
          heading: "Actionable Reports",
          body: "Photo-backed reports organised by store, district, and issue type so your team can act fast.",
        },
        {
          heading: "Close the Loop",
          body: "Survey findings feed directly into our production and delivery workflows — identify a gap, fix it fast.",
        },
      ]}
    />
  );
}
