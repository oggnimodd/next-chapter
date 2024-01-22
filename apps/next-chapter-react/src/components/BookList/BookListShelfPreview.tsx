import { Typography } from "@mui/material";
import { FC } from "react";
import { Book } from "@acme/db";
import { CardShelf, CardEmptyShelf } from "components/Card";
import { Link } from "react-router-dom";

interface CardShelfProps {
  title: string;
  books: Book[];
  shelfId: string;
}

const BookListShelfPreview: FC<CardShelfProps> = ({
  books,
  title,
  shelfId,
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <Typography className="text-2xl font-bold" color="primary">
          {title}
        </Typography>

        <Link
          to={`/shelf/${shelfId}`}
          className="text-primary-main font-semibold h-full"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {books.length === 0 && <CardEmptyShelf />}
        {books.map((book) => (
          <CardShelf key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookListShelfPreview;
