import { Item } from "@acme/google-books";
import { FC } from "react";
import { CardSearch } from "components/Card";

interface BookListSearchProps {
  books: Item[];
}

const BookListSearch: FC<BookListSearchProps> = ({ books }) => {
  return (
    <div className="grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-5">
      {books.map((book) => (
        <CardSearch key={book.id} item={book} />
      ))}
    </div>
  );
};

export default BookListSearch;
