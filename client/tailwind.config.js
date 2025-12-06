/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],

  theme: {
    extend: {
      fontFamily: {
        psRegular: ["ProductSansRegular", "sans-serif"],
        psItalic: ["ProductSansItalic", "sans-serif"],
        psBold: ["ProductSansBold", "sans-serif"],
      },
    },
  },

  plugins: [],
};
