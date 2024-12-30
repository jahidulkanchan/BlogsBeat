/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#554fc1',   
        secondary: '#e7008f',
        darkPrimary: '#443ebb'
      },
    },
  },
  plugins: [],
}