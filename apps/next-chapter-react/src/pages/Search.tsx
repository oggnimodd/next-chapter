import React, { FC, useState, useRef } from "react";
import { BaseLayout } from "layouts";
import { Box, TextField, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "@acme/google-books";
import { Clear, Search as SearchIcon } from "@mui/icons-material";
import { BookListSearch } from "components";

const Search: FC = () => {
  const [query, setQuery] = useState("");
  const queryRef = useRef<HTMLInputElement | null>(null);

  const {
    data: books,
    isFetching,
    isError,
  } = useQuery(
    ["books", query],
    () =>
      searchBooks({
        query: query,
      }),
    {
      enabled: Boolean(query),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  const handleSearch = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent,
  ) => {
    e.preventDefault();
    setQuery(queryRef?.current?.value || "");
  };

  const clear = () => {
    setQuery("");
    if (queryRef.current) {
      queryRef.current.value = "";
    }
  };

  return (
    <BaseLayout>
      <Box
        onSubmit={handleSearch}
        component="form"
        className="flex gap-x-2 max-w-lg w-full"
      >
        <TextField
          autoFocus
          fullWidth
          size="small"
          label="Search Books"
          inputRef={queryRef}
          InputProps={{
            endAdornment: (
              <div className="flex items-center gap-x-2">
                <Clear
                  className="cursor-pointer text-primary-main text-lg"
                  onClick={clear}
                />
                <SearchIcon
                  className="cursor-pointer text-primary-main text-lg"
                  onClick={handleSearch}
                />
              </div>
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
