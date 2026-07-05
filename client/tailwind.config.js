/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        education: {
          50: '#faf7f2',
          100: '#f3ece0',
          200: '#e5d7c0',
          300: '#d3bc99',
          400: '#be9c70',
          500: '#aa804f',
          600: '#9b7143',
          700: '#815c36',
          800: '#684a2f',
          900: '#563e2a',
          950: '#2f2014',
        },
        sage: {
          50: '#f4f7f6',
          100: '#e6edea',
          200: '#cedcd7',
          300: '#a8c2ba',
          400: '#7ea198',
          500: '#61857c',
          600: '#4d6b63',
          700: '#405650',
          800: '#364843',
          900: '#2f3d3a',
          950: '#192321',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
