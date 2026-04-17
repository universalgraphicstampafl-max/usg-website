import ServicePage from "@/components/ServicePage";

export const metadata = {
  title: "Product Photography | USG",
  description: "Studio-quality product photography for CPG and retail brands.",
};

export default function ProductPhotographyPage() {
  return (
    <ServicePage
      title="Product Photography"
      subtitle="Service"
      description="Great in-store graphics start with great product imagery. USG's studio produces clean, vibrant, print-ready photography that makes your products irresistible — on shelf and online."
      features={[
        "White-background product isolation shots",
        "Lifestyle and in-context scene photography",
        "360° spin photography for e-commerce",
        "Multi-SKU batch photography",
        "Retouching and colour grading",
        "Print-resolution file delivery",
        "Digital web and social variants",
        "Asset library organisation and delivery",
      ]}
      benefits={[
        {
          heading: "Print-First Quality",
          body: "Shot at resolutions that support large-format print — no pixelation when your 3-inch image becomes a 3-foot banner.",
        },
        {
          heading: "One Source, Every Format",
          body: "A single shoot produces assets for print, digital, social, and retailer portals — maximising your investment.",
        },
        {
          heading: "Fast Turnaround",
          body: "Established studio workflows and experienced retouchers mean finished assets delivered in days, not weeks.",
        },
      ]}
    />
  );
}
