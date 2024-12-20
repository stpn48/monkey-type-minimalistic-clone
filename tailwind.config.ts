import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        caretFlashSmooth: "caretFlashSmooth 1s infinite",
      },
      keyframes: {
        caretFlashSmooth: {
          "0%, 100%": {
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
        },
      },
      fontFamily: {
        "geist-mono": ["var(--font-geist-mono)", "monospace"],
        "geist-sans": ["var(--font-geist-sans)", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        text: "hsl(var(--text))",
        "text-primary": "hsl(var(--text-primary))",
        "incorrect-text": "hsl(var(--incorrect-text))",
        "incorrect-text-overflow": "hsl(var(--incorrect-text-overflow))",
      },
    },
  },
};
export default config;
