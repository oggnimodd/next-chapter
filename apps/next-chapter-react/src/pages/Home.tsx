import { FC } from "react";
import { BaseLayout } from "layouts";
import { api } from "trpc";
import { BookListShelfPreview } from "components";

const Home: FC = () => {
  const { data: shelves, isLoading, isError } = api.shelf.getAll.useQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <BaseLayout>
      <div className="flex flex-col gap-4">
        {shelves?.map((shelf) => (
          <BookListShelfPreview
            key={shelf.id}
            title={shelf.type}
            books={shelf.Book}
            shelfId={shelf.id}
          />
        ))}
      </div>
    </BaseLayout>
  );
};

export default Home;
