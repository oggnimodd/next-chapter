import { useParams } from "react-router-dom";
import { getBookDetails } from "@acme/google-books";
import { useQuery } from "@tanstack/react-query";
import { api } from "trpc";
import { getGoogleBooksId } from "utils";
import { useNavigateOnError } from "hooks";

const useBooksDetails = () => {
  const { id } = useParams();
  const { data: bookDetails, isError } = api.book.get.useQuery(id || "", {
    retry: false,
  });

  const googleBooksId = getGoogleBooksId(bookDetails?.googleBooksUrl || "");

  const { isError: isGoogleBooksError, ...googleBooksDetails } = useQuery(
    ["googleBooksDetails", googleBooksId],
    () => getBookDetails(googleBooksId || ""),
    {
      enabled: Boolean(googleBooksId),
      retry(_failureCount, error) {
        console.log(error);
        if (error instanceof Error && error.message.includes("404")) {
          return true;
        }
        return false;
      },
    },
  );

  useNavigateOnError({
    isError: isGoogleBooksError || isError,
    displayMessage: false,
  });

  return {
    ...googleBooksDetails,
    isError: isGoogleBooksError || isError,
    id,
    shelf: bookDetails?.shelf,
  };
};

export default useBooksDetails;
