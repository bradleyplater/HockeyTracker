/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        teal: {
          100: "#ade5e8",
          200: "#79d3d9",
          300: "#44c1cb",
          400: "#18b5c1",
          500: "#00a8b8",
          600: "#0099a7",
          700: "#00858e",
          800: "#007178",
          900: "#004f4f",
        },
      },
    },
  },

  plugins: [],
};
