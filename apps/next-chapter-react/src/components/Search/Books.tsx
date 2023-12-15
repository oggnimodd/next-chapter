import { Item } from "@acme/google-books";
import { FC } from "react";
import Card from "./Card";

interface BooksProps {
  books: Item[];
}

const Books: FC<BooksProps> = ({ books }) => {
  return (
    <div className="grid gap-3 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-5">
      {books.map((book) => (
        <Card key={book.id} item={book} />
      ))}
    </div>
  );
};

export default Books;
