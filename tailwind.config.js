/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-barlow)"],
      },
      keyframes: {
        skeleton: {
          "0%": { opacity: 0.2, transform: "translateY(6px) scale(0.98)" },

          "85%": { opacity: 1, transform: "translateY(0px) scale(1)" },
          "100%": { opacity: 1, transform: "translateY(0px) scale(1)" },
        },
      },
      animation: {
        "skeleton-animation":
          "skeleton 1s ease-in-out forwards alternate infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".skeleton-line": {
          backgroundColor: "lighten('#15202B', 7%)",
          borderRadius: "3px",
          marginBottom: "0.3rem",
        },
      });
    }),
  ],
};
