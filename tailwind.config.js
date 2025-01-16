/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./docs/**/index.{html,js}", "./docs/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
