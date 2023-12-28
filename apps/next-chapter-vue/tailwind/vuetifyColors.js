import { createVuetify } from "vuetify";

const themes = createVuetify().theme.themes.value;

export const vuetifyTailwindColors = {
  light: themes.light.colors,
  dark: themes.dark.colors,
};
