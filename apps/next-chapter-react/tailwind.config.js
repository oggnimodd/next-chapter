const { createThemes } = require("tw-colors");
const { materialTailwindColors } = require("./tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  important: "#html-tag",
  darkMode: "class",
  corePlugins: {
    preflight: false, // for antd compatibility
  },
  plugins: [createThemes(materialTailwindColors)],
};
