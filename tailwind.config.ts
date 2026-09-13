import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            50: "#f0f7ff",
            100: "#e0effe",
            200: "#bae0fd",
            300: "#7cc8fb",
            400: "#36acf6",
            500: "#0c92e7",
            600: "#0072c6",
            700: "#015ba2",
            800: "#064d85",
            900: "#0b416e",
          },
          green: {
            50: "#f0fdf4",
            100: "#dcfce7",
            200: "#bbf7d0",
            300: "#86efac",
            400: "#4ade80",
            500: "#22c55e",
            600: "#16a34a",
            700: "#15803d",
            800: "#166534",
            900: "#14532d",
          },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(2, 132, 199, 0.3)',
        'glow-green': '0 0 25px -5px rgba(22, 163, 74, 0.3)',
        'card-hover': '0 20px 30px -10px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
export default config;
