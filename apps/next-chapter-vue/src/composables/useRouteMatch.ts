import { ref } from "vue";
import { useRouter } from "vue-router";

const useRouteMatch = (patterns: readonly string[]) => {
  const router = useRouter();
  const matchedPattern = ref<string | null>(null);

  patterns.forEach((pattern) => {
    const regex = new RegExp(`^${pattern.replace(/:\w+/g, ".+")}$`);
    if (regex.test(router.currentRoute.value.fullPath)) {
      matchedPattern.value = pattern;
    }
  });

  return matchedPattern;
};

export default useRouteMatch;
