import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050914",
        surface: {
          DEFAULT: "#0A1020",
          secondary: "#0E1628",
          tertiary: "#141F36",
          elevated: "#182542",
        },
        border: {
          subtle: "#162138",
          DEFAULT: "#1E2D4A",
          bright: "#2E436E",
        },
        accent: {
          blue: "#3B82F6",
          electric: "#2563EB",
          cyan: "#06B6D4",
          cyanLight: "#22D3EE",
        },
        risk: {
          low: "#10B981",
          medium: "#F59E0B",
          high: "#F97316",
          critical: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "Geist", "system-ui", "sans-serif"],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "IBM Plex Mono",
          "monospace",
        ],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "stream-travel": "streamTravel 2s linear infinite",
        "fade-in": "fadeIn 0.3s ease-out forwards",
      },
      keyframes: {
        streamTravel: {
          "0%": { transform: "translateX(0)", opacity: "0.2" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0.2" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
