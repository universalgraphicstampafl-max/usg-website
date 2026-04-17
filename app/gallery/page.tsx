export const metadata = {
  title: "Gallery | USG",
  description: "USG portfolio — in-store graphics, signage programs, and print production.",
};

const categories = [
  "All",
  "Signage Programs",
  "Graphic Design",
  "Print Production",
  "Store Surveys",
  "Product Photography",
];

const placeholders = [
  { title: "C-Store Cooler Clings", category: "Print Production", bg: "bg-brand-sky/20" },
  { title: "Tobacco Fixture Wrap", category: "Signage Programs", bg: "bg-brand-navy/10" },
  { title: "Energy Drink Header Panel", category: "Print Production", bg: "bg-brand-gold/20" },
  { title: "Floor Decal System", category: "Print Production", bg: "bg-brand-sky/10" },
  { title: "POS Counter Card Set", category: "Graphic Design", bg: "bg-brand-navy/10" },
  { title: "SKU Isolation Shots", category: "Product Photography", bg: "bg-brand-gold/10" },
  { title: "Compliance Survey Report", category: "Store Surveys", bg: "bg-brand-sky/20" },
  { title: "Pump Topper Program", category: "Signage Programs", bg: "bg-brand-navy/10" },
  { title: "Lifestyle Scene Photography", category: "Product Photography", bg: "bg-brand-gold/20" },
];

export default function GalleryPage() {
  return (
    <div className="bg-brand-offwhite">
      {/* Hero */}
      <section className="bg-brand-navy text-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-sub !text-brand-gold">Our Work</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-brand-tight mb-4 !text-white">
            Gallery
          </h1>
          <p className="text-lg text-white/70 max-w-xl">
            A look at the programs, prints, and photography we&apos;ve produced for leading retail brands.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex gap-2 flex-wrap">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-brand-tight transition-colors ${
                i === 0
                  ? "bg-brand-navy text-white"
                  : "bg-brand-offwhite text-brand-navy hover:bg-brand-navy hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {placeholders.map((item) => (
            <div
              key={item.title}
              className="group rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`${item.bg} h-52 flex items-center justify-center text-brand-navy/30`}
              >
                <svg
                  className="w-16 h-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="p-4">
                <p className="text-xs text-brand-sky font-semibold tracking-brand-wide uppercase mb-1">
                  {item.category}
                </p>
                <h3 className="font-bold text-brand-navy text-sm tracking-brand-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
