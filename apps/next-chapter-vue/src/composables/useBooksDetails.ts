import { useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { api } from "@/trpc";
import { getGoogleBooksId } from "@/utils/google-books";
import useNavigateOnError from "./useNavigateOnError";
import { getBookDetails } from "@acme/google-books";
import { computed } from "vue";

const useBooksDetails = () => {
  const router = useRouter();
  const { id } = router.currentRoute.value.params;
  const { data: bookDetails, isError } = useQuery({
    queryKey: ["bookDetails", id || ""],
    queryFn: () => api.book.get.query((id as string) || ""),
    retry: false,
  });

  const googleBooksId = getGoogleBooksId(
    bookDetails?.value?.googleBooksUrl || "",
  );

  const { isError: isGoogleBooksError, ...googleBooksDetails } = useQuery({
    queryKey: ["googleBooksDetails", googleBooksId],
    queryFn: () => getBookDetails(googleBooksId || ""),
    enabled: Boolean(googleBooksId),
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
    shelf: bookDetails?.value?.shelf,
  };
};

export default useBooksDetails;
