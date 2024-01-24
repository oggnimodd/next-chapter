import { useThemeStore } from "@/stores";
import React from "react";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import merge from "deepmerge";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
};

const useTheme = () => {
  const isThemeDark = useThemeStore((state) => state.isThemeDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  return {
    isThemeDark,
    theme,
    toggleTheme,
  };
};

export default useTheme;
