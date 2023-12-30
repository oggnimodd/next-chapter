import { ref, watchEffect } from "vue";
import { useTheme } from "vuetify";

const useDarkMode = () => {
  const theme = useTheme();
  const isDark = ref(localStorage.getItem("theme") === "dark");

  // Update theme when isDark changes
  watchEffect(() => {
    theme.global.name.value = isDark.value ? "dark" : "light";

    const root = window.document.body;
    root.classList.remove(isDark.value ? "light" : "dark");
    root.classList.add(isDark.value ? "dark" : "light");
  });

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  };

  return { isDark, toggleTheme };
};

export default useDarkMode;
