/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'swiggy-orange': '#FC8019',
        'swiggy-dark': '#1C1C1C',
      },
    },
  },
  plugins: [],
}

