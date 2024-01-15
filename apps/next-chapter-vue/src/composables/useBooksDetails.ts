import { useRouter, useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { api } from "@/trpc";
import { getGoogleBooksId } from "@/utils/google-books";
import useNavigateOnError from "./useNavigateOnError";
import { getBookDetails } from "@acme/google-books";
import { computed, ref, watch } from "vue";
import { Shelf } from "@acme/db";

// TODO : learn vue reactivity to refactor this code
const useBooksDetails = () => {
  const router = useRouter();
  const route = useRoute();
  const _id = router.currentRoute.value.params._id;
  const id = ref<string>(Array.isArray(_id) ? _id[0] : _id);
  const googleBooksId = ref<string | null>(null);
  const shelf = ref<Shelf | null>(null);

  watch(
    router.currentRoute,
    (newVal) => {
      if (newVal.params.id !== id.value) {
        id.value = newVal.params.id as string;
      }
    },
    { immediate: true },
  );

  const { data: bookDetails, isError } = useQuery({
    queryKey: ["bookDetails", id],
    queryFn: async () => {
      return api.book.get.query(id?.value || "");
    },
    enabled: Boolean(id),
    retry: false,
  });

  // Watch data and update googlebooksid
  watch(
    bookDetails,
    (newVal) => {
      if (newVal) {
        googleBooksId.value = getGoogleBooksId(newVal.googleBooksUrl as string);
        shelf.value = newVal.shelf;
      }
    },
    { immediate: true },
  );

  const isGoogleBooksIdSet = computed(() => Boolean(googleBooksId.value));

  const { isError: isGoogleBooksError, ...googleBooksDetails } = useQuery({
    queryKey: ["googleBooksDetails", route.fullPath],
    queryFn: () => {
      if (googleBooksId.value) {
        return getBookDetails(googleBooksId.value || "");
      }
      return null;
    },
    enabled: isGoogleBooksIdSet,
  });

  const combinedError = computed(
    () => isGoogleBooksError.value || isError.value,
  );

  useNavigateOnError({
    isError: combinedError,
    displayMessage: false,
  });

  return {
    ...googleBooksDetails,
    isError: combinedError,
    id,
    shelf,
  };
};

export default useBooksDetails;
