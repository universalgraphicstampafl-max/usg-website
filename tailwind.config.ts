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
          gold: "#EFA51E",
          "gold-dark": "#C8830A",
          marigold: "#EFA51E",
          "marigold-dark": "#C8830A",
          sky: "#5CB8E4",
          "sky-dark": "#3A9DCC",
          offwhite: "#F5F4F0",
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
