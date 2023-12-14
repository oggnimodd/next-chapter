import { googleBooksApi } from "./fetcher";
import { SearchResults, Item } from "./types";

export interface SearchBooks {
  query: string;
  startIndex?: number;
  maxResults?: number;
}

export const searchBooks = async (options: SearchBooks) => {
  const { data } = await googleBooksApi.get<SearchResults>("/volumes", {
    params: {
      q: options.query,
      startIndex: options.startIndex || 0,
      maxResults: options.maxResults || 40,
    },
  });

  return data;
};

// Book details
export const getBookDetails = async (id: string) => {
  const { data } = await googleBooksApi.get<Item>(`/volumes/${id}`);

  return data;
};

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

export const getTotalPages = ({
  pageSize,
  total,
}: Pick<Pagination, "pageSize" | "total">) => {
  return Math.ceil(total / pageSize);
};

export const getNextPageCursor = ({ page, pageSize, total }: Pagination) => {
  const totalPages = getTotalPages({ pageSize, total });
  const nextPage = page + 1;

  if (nextPage <= totalPages) {
    return nextPage;
  }

  return null;
};

export const getPreviousPageCursor = ({ page }: Pick<Pagination, "page">) => {
  const previousPage = page - 1;

  if (previousPage > 0) {
    return previousPage;
  }

  return null;
};
