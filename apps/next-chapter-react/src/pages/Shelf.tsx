import { FC, useEffect } from "react";
import { BaseLayout } from "layouts";
import { useParams, useNavigate } from "react-router-dom";
import { BookListShelf, CardEmptyShelf } from "components";
import { api } from "trpc";
import toast from "react-hot-toast";

const Shelf: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: shelfInfo } = api.shelf.get.useQuery(id || "");
  const {
    data: books,
    isLoading,
    isError,
    error,
  } = api.book.getBooksInShelf.useQuery(id || "");

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
      navigate("/");
    }
  }, [isError]);

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
