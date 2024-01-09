import { FC } from "react";
import { BaseLayout } from "layouts";
import { useParams } from "react-router-dom";
import { BookListShelf, CardEmptyShelf } from "components";
import { api } from "trpc";
import { useNavigateOnError } from "hooks";

const Shelf: FC = () => {
  const { id } = useParams();
  const { data: shelfInfo } = api.shelf.get.useQuery(id || "");
  const {
    data: books,
    isLoading,
    isError,
    error,
  } = api.book.getBooksInShelf.useQuery(id || "");

  useNavigateOnError({ isError, message: error?.message });

  return (
    <BaseLayout>
      {isLoading && <p>Loading...</p>}

      {isError && <p>Error...</p>}

      {!isLoading && !isError && books && (
        <BookListShelf type={shelfInfo?.type || ""} books={books} />
      )}

      {!isLoading && !isError && books?.length === 0 && <CardEmptyShelf />}
    </BaseLayout>
  );
};

export default Shelf;
