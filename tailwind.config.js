const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    fontFamily: {
      serif: ['Bentham', 'serif'],
      handwritten: ['Jenna Sue Regular', 'serif'],
    },
    colors: {
      slate: colors.slate,
      gray: colors.gray,
      emerald: colors.emerald,
      amber: colors.amber,
      rose: colors.rose,
      // Colors below generated at: https://uicolors.app/edit?sv1=bone:50-faf7f2/100-f2ede2/200-decfb5/300-d3be9e/400-c19f76/500-b4885b/600-a7764f/700-8b5f43/800-714e3b/900-5c4132;lime:50-f6f7f6/100-eaeeea/200-d5ddd5/300-bac6ba/400-8b9d8b/500-697e69/600-546554/700-445144/800-394239/900-303730;cyan:50-f4f9f8/100-daede9/200-b5dad2/300-88c0b6/400-60a198/500-46867e/600-366b65/700-315c58/800-284745/900-253c3b
      gold: {
        50: '#faf7f2',
        100: '#f2ede2',
        200: '#decfb5',
        300: '#d3be9e',
        400: '#c19f76',
        500: '#b4885b',
        600: '#a7764f',
        700: '#8b5f43',
        800: '#714e3b',
        900: '#5c4132',
      },
      lime: {
        50: '#f6f7f6',
        100: '#eaeeea',
        200: '#d5ddd5',
        300: '#bac6ba',
        400: '#8b9d8b',
        500: '#697e69',
        600: '#546554',
        700: '#445144',
        800: '#394239',
        900: '#303730',
      },
      cyan: {
        50: '#f4f9f8',
        100: '#daede9',
        200: '#b5dad2',
        300: '#88c0b6',
        400: '#60a198',
        500: '#46867e',
        600: '#366b65',
        700: '#315c58',
        800: '#284745',
        900: '#253c3b',
      },
    },
    extend: {
      screens: {
        xs: '480px',
      },
      fontSize: {
        hero: ['clamp(3.75rem, 10vw, 8rem)', '1'],
        resp: ['clamp(4.5rem, 10vw, 8rem)', '1'],
      },
      animation: {
        throb: 'throb 2s ease infinite',
        scaleIn: 'scaleIn 200ms ease',
        scaleOut: 'scaleOut 200ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 200ms ease',
        enterFromLeft: 'enterFromLeft 250ms ease',
        enterFromRight: 'enterFromRight 250ms ease',
        exitToLeft: 'exitToLeft 250ms ease',
        exitToRight: 'exitToRight 250ms ease',
      },
      keyframes: {
        throb: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        enterFromRight: {
          from: { opacity: 0, transform: 'translateX(200px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        enterFromLeft: {
          from: { opacity: 0, transform: 'translateX(-200px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        exitToRight: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(200px)' },
        },
        exitToLeft: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(-200px)' },
        },
        scaleIn: {
          from: { opacity: 0, transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
        },
        scaleOut: {
          from: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: 0, transform: 'rotateX(-10deg) scale(0.95)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({
          perspective: value,
        }),
      });
    }),
  ],
};
