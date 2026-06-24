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
          navy: "#001132",
          "navy-dark": "#000A1E",
          gold: "#FBB034",
          "gold-dark": "#D89214",
          marigold: "#FBB034",
          "marigold-dark": "#D89214",
          sky: "#00356B",
          "sky-dark": "#00264D",
          offwhite: "#EFEFEE",
        },
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "serif"],
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
