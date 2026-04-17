import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#1B2D5E",
          "navy-dark": "#142248",
          gold: "#F0A500",
          "gold-dark": "#C78A00",
          sky: "#3AABDC",
          "sky-dark": "#2A8BB5",
          offwhite: "#F5F4F0",
        },
      },
      letterSpacing: {
        "brand-logo": "0.20em",
        "brand-sub": "0.30em",
        "brand-wide": "0.12em",
        "brand-tight": "0.02em",
      },
    },
  },
  plugins: [],
};
export default config;
