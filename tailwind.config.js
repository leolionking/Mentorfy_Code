/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        'heroOne': "url('../src/assets/welcome-1.jpg')",
        'heroTwo': "url('../src//assets/welcome-2.jpg')",
        'heroThree': "url('../src/assets/welcome-3.jpg')",
      }
    },
  },
  plugins: [],
};
