module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontSize: {
        hero: ['clamp(3.75rem, 10vw, 8rem)', '1'],
      }
    },
  },
  plugins: [],
};
