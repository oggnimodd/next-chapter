import { Typography } from "@mui/material";
import { FC } from "react";
import { Book } from "@acme/db";
import { CardShelf, CardEmptyShelf } from "components";

interface CardShelfProps {
  title: string;
  books: Book[];
}

const BookListShelfPreview: FC<CardShelfProps> = ({ books, title }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <Typography className="text-2xl font-bold">{title}</Typography>
      <div className="flex overflow-x-auto gap-x-3 snap-x snap-mandatory">
        {books.length === 0 && <CardEmptyShelf />}
        {books.map((book) => (
          <CardShelf key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookListShelfPreview;
