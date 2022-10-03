const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    colors: {
      slate: colors.slate,
      gray: colors.gray,
      cyan: colors.cyan,
      emerald: colors.emerald,
      amber: colors.amber,
      rose: colors.rose,
      teal: {
        300: 'rgb(64, 104, 100)',
        500: 'rgb(49, 92, 88)',
        700: 'rgb(42, 85, 81)',
      },
      gold: {
        300: 'rgb(199, 172, 128)',
        500: 'rgb(170, 119, 78)',
        700: 'rgb(167, 119, 72)',
      },
    },
    extend: {
      screens: {
        xs: '480px',
      },
      fontSize: {
        hero: ['clamp(3.75rem, 10vw, 8rem)', '1'],
        resp: ['clamp(2.5rem, 6vw, 5rem)', '1'],
      },
      animation: {
        throb: 'throb 2s ease infinite',
      },
      keyframes: {
        throb: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
