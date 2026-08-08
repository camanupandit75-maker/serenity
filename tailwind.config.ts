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
        night: "var(--night)",
        deep: "var(--deep)",
        slate: "var(--slate)",
        mist: "var(--mist)",
        fog: "var(--fog)",
        amber: "var(--amber)",
        sage: "var(--sage)",
        aurora: "var(--aurora)",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      zIndex: {
        100: "100",
      },
    },
  },
  plugins: [],
};
export default config;
