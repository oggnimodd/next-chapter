import { Book, Note, Review, Shelf } from "@acme/db";
import { AuthenticatedContext } from "@/node/trpc";
import { TRPCError } from "@trpc/server";

export const findShelf = async (
  ctx: AuthenticatedContext,
  id: string,
): Promise<Shelf> => {
  const shelf = await ctx.prisma.shelf.findUnique({
    where: {
      id,
    },
  });

  if (!shelf) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Shelf not found",
    });
  }

  return shelf;
};

export const findShelves = async (
  ctx: AuthenticatedContext,
): Promise<Shelf[]> => {
  const shelves = await ctx.prisma.shelf.findMany({
    where: {
      // We only use it for authenticated users so the userId is guaranteed to be present
      userId: ctx.auth?.userId as string,
    },
    // Include 10 books
    include: {
      Book: {
        take: 10,
      },
    },
  });

  return shelves;
};

export const findBook = async (
  ctx: AuthenticatedContext,
  id: string,
): Promise<Book & { shelf: Shelf }> => {
  const book = await ctx.prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!book) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Book not found",
    });
  }

  const shelf = await ctx.prisma.shelf.findUnique({
    where: {
      id: book.shelfId,
    },
  });

  if (!shelf) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Shelf not found",
    });
  }

  return {
    ...book,
    shelf: shelf,
  };
};

export const findBooksInShelf = async (
  ctx: AuthenticatedContext,
  shelfId: string,
): Promise<Book[]> => {
  const books = await ctx.prisma.book.findMany({
    where: {
      shelfId,
    },
  });

  if (!books) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Books not found",
    });
  }

  return books;
};

export const findReview = async (
  ctx: AuthenticatedContext,
  id: string,
): Promise<Review> => {
  const review = await ctx.prisma.review.findUnique({
    where: {
      id,
    },
  });

  if (!review) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Review not found",
    });
  }

  return review;
};

export const findReviewByBook = async (
  ctx: AuthenticatedContext,
  { bookId, reviewId }: { bookId: string; reviewId: string },
): Promise<Review> => {
  const review = await ctx.prisma.review.findUnique({
    where: {
      id: reviewId,
      bookId,
    },
  });

  if (!review) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Review not found",
    });
  }

  return review;
};

export const findNote = async (
  ctx: AuthenticatedContext,
  id: string,
): Promise<Note> => {
  const note = await ctx.prisma.note.findUnique({
    where: {
      id,
    },
  });

  if (!note) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Note not found",
    });
  }

  return note;
};
