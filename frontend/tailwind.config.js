/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-green':'#22c55e',
      },
      fontFamily: {
        'chivo': ['Chivo', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter','sans-serif'],
      },

    },
  },
  plugins: [],
}

