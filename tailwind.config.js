/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_includes/**/*.{njk,html}",
    "./**/*.{njk,html,md}",
    "./styles/input.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
