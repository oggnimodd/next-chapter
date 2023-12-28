import { FC } from "react";
import { Book } from "@acme/db";
import { Typography } from "@mui/material";
import { CardShelf } from "components/Card";

interface BookListShelfProps {
  books: Book[];
  type: string;
}

const BookListShelf: FC<BookListShelfProps> = ({ books, type }) => {
  return (
    <>
      <Typography
        variant="h2"
        className="font-bold text-2xl mb-3"
        color="primary"
      >
        {type}

        <span className="dark:text-white text-black/90 text-lg">{` (${
          books.length
        } ${books.length === 1 ? "book" : "books"})`}</span>
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {books.map((book) => (
          <CardShelf key={book.id} book={book} />
        ))}
      </div>
    </>
  );
};

export default BookListShelf;
