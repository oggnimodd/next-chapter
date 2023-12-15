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
  Modal,
  Button,
  CardActions,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { searchBooks, Item } from "@acme/google-books";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { Clear } from "@mui/icons-material";
import { api } from "trpc";

interface SearchResultsItemProps {
  item: Item;
}

const SearcResultsItem: FC<SearchResultsItemProps> = ({ item }) => {
  const { data } = api.shelf.get.useQuery("clq218jsv00005nuqacy6gr10");
  const [opened, handlers] = useDisclosure(false);

  console.log(data);

  return (
    <>
      <Card variant="outlined" className="w-full flex flex-col">
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
        <CardActions className="flex flex-col flex-1 h-full justify-end items-end">
          <Button
            onClick={() => handlers.open()}
            variant="outlined"
            size="small"
          >
            Add
          </Button>
        </CardActions>
      </Card>
      <Modal
        open={opened}
        onClose={() => handlers.close()}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-background-default border-2 border-black shadow-2xl p-10 rounded flex flex-col">
          <Typography
            className="text-primary-main"
            id="modal-title"
            variant="h6"
            component="h2"
          >
            {item.volumeInfo.title}
          </Typography>
          <Typography
            className="line-clamp-4"
            id="modal-description"
            sx={{ mt: 2 }}
          >
            {item.volumeInfo.description}
          </Typography>
          <Button
            className="mt-4 ml-auto"
            variant="contained"
            onClick={() => handlers.close()}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

interface SearchResultsProps {
  books: Item[];
}

const Books: FC<SearchResultsProps> = ({ books }) => {
  return (
    <div className="grid gap-3 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-5">
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
