import { FC, useState } from "react";
import { BaseLayout } from "layouts";
import { Box, TextField, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "@acme/google-books";
import { useDebouncedValue } from "@mantine/hooks";
import { Clear } from "@mui/icons-material";
import { BookListSearch } from "components";

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

      {!isFetching && !isError && books?.items && (
        <BookListSearch books={books.items} />
      )}
    </BaseLayout>
  );
};

export default Search;
