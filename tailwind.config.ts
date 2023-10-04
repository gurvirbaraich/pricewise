import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spaceGrotesk: "'Space Grotesk', sans-serif",
      },
      fontSize: {
        "4.5xl": "42px"
      }
    },
  },
  plugins: [],
};
export default config;
