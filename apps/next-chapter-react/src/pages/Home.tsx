import { FC } from "react";
import { BaseLayout } from "layouts";
import { api } from "trpc";
import { Book } from "@acme/db";
import { Typography } from "@mui/material";

interface ShelfPrview {
  title: string;
  books: Book[];
}

const ShelfPreview: FC<ShelfPrview> = ({ title, books }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <Typography className="text-2xl font-bold">{title}</Typography>
      <div className="flex overflow-x-auto">
        {books.map((book) => (
          <div key={book.id} className="px-2 min-w-[200px] max-w-[200px]">
            <img
              className="mb-3 object-cover w-full h-[285px]"
              src={book.cover || "./no_cover.png"}
              alt={book.title}
            />
            <Typography className="max-w-full line-clamp-2">
              {book.title}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

const Home: FC = () => {
  const { data: shelves, isLoading, isError } = api.shelf.getAll.useQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <BaseLayout>
      <div className="flex flex-col gap-4">
        {shelves?.map((shelf) => (
          <ShelfPreview key={shelf.id} title={shelf.type} books={shelf.Book} />
        ))}
      </div>
    </BaseLayout>
  );
};

export default Home;
