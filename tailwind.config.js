module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      fontSize: {
        hero: ['clamp(3.75rem, 10vw, 8rem)', '1'],
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
