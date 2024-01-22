import { FC } from "react";
import { BaseLayout } from "layouts";
import { api } from "trpc";
import { BookListShelfPreview } from "components";

const typeOrder = {
  "Currently Reading": 0,
  "To Be Read": 1,
  Read: 2,
};

const Home: FC = () => {
  const { data: shelves, isLoading, isError } = api.shelf.getAll.useQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  const sorted = shelves.sort(
    (a, b) =>
      typeOrder[a.type as keyof typeof typeOrder] -
      typeOrder[b.type as keyof typeof typeOrder],
  );

  return (
    <BaseLayout>
      <div className="flex flex-col gap-4">
        {sorted?.map((shelf) => (
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
