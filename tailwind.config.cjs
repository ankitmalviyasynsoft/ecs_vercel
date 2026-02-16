// tailwind.config.js
const { heroui } = require('@heroui/react')
const { culturesummitTheme } = require('./src/themes-config/culturesummit.theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      fontFamily: {
        kaff: ['var(--font-kaff)', 'sans-serif'],
      },
      fontSize: {
        't-15': ['15px', '22px'],
        't-20': ['20px', '28px'],
        't-25': ['25px', '34px'],
        't-30': ['30px', '40px'],
        't-40': ['40px', '52px'],
        't-45': ['45px', '58px'],
        't-55': ['55px', '70px'],
      },

      fontWeight: {
        regular: 400,
        semibold: 600,
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        'default-light': culturesummitTheme.culturesummitLight,
        'default-dark': culturesummitTheme.culturesummitDark,
        'culturesummit-light': culturesummitTheme.culturesummitLight,
        'culturesummit-dark': culturesummitTheme.culturesummitDark,
      },
    }),
  ],
}
