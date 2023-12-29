const { createThemes } = require("tw-colors");
const vuetifyTailwindColors = require("./tailwind/vuetifyColors");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {},
  important: "#html-tag",
  darkMode: "class",
  corePlugins: {
    preflight: false, // for vuetify compatibility
  },
  plugins: [createThemes(vuetifyTailwindColors)],
};
