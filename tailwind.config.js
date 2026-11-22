/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cctu: {
          green: '#0F5C3E',
          'green-dark': '#0B462F',
          gold: '#C29B38',
          navy: '#0B2545',
        }
      }
    },
  },
  plugins: [],
}
