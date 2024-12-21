/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./docs/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  // corePlugins: {
  //   preflight: false, // Disable Preflight
  // },
  plugins: [],
};
