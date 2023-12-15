import { FC, useState } from "react";
import { BaseLayout } from "layouts";
import {
  Box,
  Card,
  TextField,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { searchBooks, Item } from "@acme/google-books";
import { useDebouncedValue } from "@mantine/hooks";
import { Clear } from "@mui/icons-material";

interface SearchResultsItemProps {
  item: Item;
}

const SearcResultsItem: FC<SearchResultsItemProps> = ({ item }) => {
  return (
    <Card variant="outlined">
      <CardMedia
        className="w-full h-64 object-cover"
        component="img"
        image={
          item.volumeInfo.imageLinks?.large ||
          item.volumeInfo.imageLinks?.thumbnail ||
          "/no_cover.png"
        }
        alt={item.volumeInfo.title}
      />
      <CardContent>
        <Typography
          variant="h5"
          className="font-semibold line-clamp-2 text-primary-main text-xl"
        >
          {item.volumeInfo.title}
        </Typography>
        <Typography className="mt-2 line-clamp-3" variant="body2">
          {item.volumeInfo.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

interface SearchResultsProps {
  books: Item[];
}

const Books: FC<SearchResultsProps> = ({ books }) => {
  return (
    <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-5">
      {books.map((book) => (
        <SearcResultsItem key={book.id} item={book} />
      ))}
    </div>
  );
};

const Search: FC = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 500);

  const {
    data: books,
    isFetching,
    isError,
  } = useQuery(
    ["books", debouncedQuery],
    () =>
      searchBooks({
        query: debouncedQuery,
      }),
    {
      enabled: Boolean(debouncedQuery),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  return (
    <BaseLayout>
      <Box className="flex gap-x-2 max-w-lg w-full">
        <TextField
          fullWidth
          size="small"
          label="Search Books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            endAdornment: query && (
              <Clear
                className="cursor-pointer text-primary-main text-lg"
                onClick={() => setQuery("")}
              />
            ),
          }}
        />
        <div className="w-[10%]">
          {isFetching && <CircularProgress color="primary" />}
        </div>
      </Box>

      {!isFetching && !isError && books?.items && <Books books={books.items} />}
    </BaseLayout>
  );
};

export default Search;
