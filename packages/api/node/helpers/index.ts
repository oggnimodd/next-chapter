import { AuthenticatedContext } from "@/node/trpc";
import { TRPCError } from "@trpc/server";

export const findShelf = async (ctx: AuthenticatedContext, id: string) => {
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

export const findShelves = async (ctx: AuthenticatedContext) => {
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

export const findBook = async (ctx: AuthenticatedContext, id: string) => {
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

  return book;
};

export const findBooks = async (ctx: AuthenticatedContext, shelfId: string) => {
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

export const findReview = async (ctx: AuthenticatedContext, id: string) => {
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
