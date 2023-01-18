/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        23: "5.75rem",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
