import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Signage Programs | USG",
  description: "Custom signage programs at a flat price — we evaluate your setup, identify the gaps, and build a tailored path forward. No surprises.",
};

export default function SignageProgramsPage() {
  return (
    <ServicePage
      title="Your Brand. Your Program. Your Price."
      subtitle="Signage Programs"
      description="Every great signage program starts with understanding where you are today. Our experts evaluate your current setup, identify the gaps, and build a custom path forward — at a flat price with no surprises."
      features={[
        "Program strategy and scope definition",
        "Creative brief development and art direction",
        "Regulatory and brand compliance review",
        "Print production and quality control",
        "Kitting and fulfilment by store",
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
