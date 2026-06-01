import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        "surface-3": "var(--color-surface-3)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        accent: "var(--color-accent)",
        border: "var(--color-border)",
      },
      animation: {
        "rgb-border": "rgb-border 4s linear infinite",
        "rgb-glow": "rgb-glow 4s linear infinite",
      },
      keyframes: {
        "rgb-border": {
          "0%, 100%": { borderColor: "#ff0080" },
          "25%": { borderColor: "#7928ca" },
          "50%": { borderColor: "#0070f3" },
          "75%": { borderColor: "#00dfd8" },
        },
        "rgb-glow": {
          "0%, 100%": { boxShadow: "0 0 12px 2px rgba(255,0,128,0.35)" },
          "25%": { boxShadow: "0 0 12px 2px rgba(121,40,202,0.35)" },
          "50%": { boxShadow: "0 0 12px 2px rgba(0,112,243,0.35)" },
          "75%": { boxShadow: "0 0 12px 2px rgba(0,223,216,0.35)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
