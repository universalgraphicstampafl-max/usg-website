import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Signage Management Software | USG",
  description:
    "Signage management made simple — our proprietary platform keeps store profiles accurate and streamlines art approvals, ordering, and reordering.",
};

export default function SignageManagementSoftwarePage() {
  return (
    <ServicePage
      title="Signage Management Made Simple"
      subtitle="Signage Management Software"
      description="Our proprietary software keeps every store profile accurate, streamlines art approvals, and makes ordering and reordering signage easy from the store level or corporate office. Less back-and-forth, fewer mistakes, and a faster path from idea to installation."
      features={[
        "Accurate store profiles for every location",
        "Streamlined art proof and approval workflow",
        "Store-level and corporate ordering",
        "Efficient reordering of past programs",
        "Centralized signage and asset history",
        "Order status and delivery tracking",
      ]}
      benefits={[
        {
          heading: "Fewer Mistakes",
          body: "Accurate store profiles mean the right signage reaches the right location every time — no guesswork, no costly reprints.",
        },
        {
          heading: "Less Back-and-Forth",
          body: "Art approvals and ordering happen in one place, so programs move from idea to installation faster.",
        },
        {
          heading: "Store or Corporate",
          body: "Order from the field or from HQ — everyone works from the same accurate, up-to-date store profiles.",
        },
      ]}
    />
  );
}
