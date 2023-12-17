/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        heroOne: "url('../src/assets/welcome-1.jpg')",
        heroTwo: "url('../src//assets/welcome-2.jpg')",
        heroThree: "url('../src/assets/welcome-3.jpg')",
        pricingBg: "url('../src/assets/pricing-bg.jpg')"
      },
      boxShadow: {
        small: "0px 17.7729px 54.686px rgba(27, 25, 86, 0.06)",
        card: "0px 4px 32px 0px rgba(6, 7, 13, 0.01)",
      },
    },
  },
  plugins: [],
};
