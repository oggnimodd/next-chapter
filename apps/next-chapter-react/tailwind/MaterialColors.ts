import { createTheme } from "@mui/material";
import type { Palette } from "@mui/material";

const ligthTheme = createTheme({
  palette: {
    mode: "light",
  },
}).palette;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
}).palette;

const mapThemeToTailwindColors = (theme: Palette) => {
  const collectColors: Record<string, Record<string, string>> = {};
  Object.keys(theme).forEach((key) => {
    const palleteProperty = theme[key as keyof typeof theme];

    const collectVariants: Record<string, string> = {};
    if (typeof palleteProperty === "object") {
      Object.keys(palleteProperty).forEach((key) => {
        const item = palleteProperty[key];

        // Check if the item is a hex or rgba
        if (
          typeof item === "string" &&
          (item.startsWith("#") || item.startsWith("rgba"))
        ) {
          collectVariants[key] = item;
        }
      });
    }

    if (Object.keys(collectVariants).length > 0) {
      collectColors[key] = collectVariants;
    }
  });

  return collectColors;
};

export const materialTailwindColors = {
  light: mapThemeToTailwindColors(ligthTheme),
  dark: mapThemeToTailwindColors(darkTheme),
};
