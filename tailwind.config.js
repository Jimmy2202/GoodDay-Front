/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js.ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cd_cursive: ["Cedarville Cursive", "cursive"],
        silkscreen: ["Silkscreen", "sans-serif"],
        viaoda: ["Viaoda Libre", "serif"],
      },
      screens: {
        "max-md": { max: "768px" },
      },
    },
  },
  plugins: [],
};
