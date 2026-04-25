import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Signage Programs | USG",
  description: "Monthly and bi-monthly POP signage programs for multi-location retailers and franchise chains. Custom kits shipped direct to every store location.",
};

export default function SignageProgramsPage() {
  return (
    <ServicePage
      title="Signage Programs"
      subtitle="Service"
      description="USG manages your entire signage lifecycle — strategy, creative, production, and delivery — so you can focus on selling, not logistics."
      features={[
        "Program strategy and scope definition",
        "Creative brief development and art direction",
        "Regulatory and brand compliance review",
        "Print production and quality control",
        "Kitting and fulfilment by store",
        "Direct store delivery and installation coordination",
        "Post-launch compliance auditing",
        "Ongoing program management and reporting",
      ]}
      benefits={[
        {
          heading: "Single Point of Contact",
          body: "One partner manages everything from brief to shelf. No vendor juggling, no dropped handoffs.",
        },
        {
          heading: "Speed to Market",
          body: "Streamlined workflows and established print partnerships mean faster lead times than managing it yourself.",
        },
        {
          heading: "Chain-Wide Consistency",
          body: "Identical execution across every location — your brand looks the same in store one as it does in store five hundred.",
        },
      ]}
    />
  );
}
