import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeState {
  isThemeDark: boolean;
}

interface ThemeActions {
  setIsThemeDark: (theme: boolean) => void;
}

type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>((set) => ({
  isThemeDark: true,
  setIsThemeDark: async () => {
    set(({ isThemeDark }) => {
      AsyncStorage.setItem("theme", JSON.stringify(isThemeDark));
      return { isThemeDark };
    });
  },
}));

export default useThemeStore;
