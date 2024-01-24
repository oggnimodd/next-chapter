import { create } from "zustand";

interface ThemeState {
  isThemeDark: boolean;
}

interface ThemeActions {
  toggleTheme: () => void;
}

type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>((set) => ({
  isThemeDark: false,
  toggleTheme: () => set((state) => ({ isThemeDark: !state.isThemeDark })),
}));

export default useThemeStore;
