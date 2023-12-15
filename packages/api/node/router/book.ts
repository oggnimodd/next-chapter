import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { updateBookInput } from "models";
import { TRPCError } from "@trpc/server";
import { isAuthorized } from "../middlewares";
import { findBook, findBooksInShelf, findShelf } from "../helpers";

export const bookRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.book.findMany({
      where: {
        userId: ctx.auth.userId,
      },
    });
  }),
  get: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const book = await findBook(ctx, input);

    // Authorize
    await isAuthorized({
      ctx,
      resourceUserId: book.userId,
    });

    return book;
  }),
  getBooksInShelf: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      // Find the shelf
      const shelf = await findShelf(ctx, input);

      // Authorize the user
      await isAuthorized({
        ctx,
        resourceUserId: shelf.userId,
      });

      const books = findBooksInShelf(ctx, shelf.id);

      return books;
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        author: z.string().optional(),
        cover: z.string().url().optional(),
        shelfId: z.string(),
        googleBooksUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Find the shelf
      const shelf = await findShelf(ctx, input.shelfId);

      // Authorize the user
      await isAuthorized({
        ctx,
        resourceUserId: shelf?.userId,
      });

      // Create the book
      return ctx.prisma.book.create({
        data: {
          ...input,
          userId: ctx.auth.userId,
          shelfId: input.shelfId,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      // Find the book
      const book = await findBook(ctx, input);

      // If found but not belong to the user
      await isAuthorized({
        ctx,
        resourceUserId: book.userId,
      });

      try {
        // Delete the book
        await ctx.prisma.book.delete({
          where: {
            id: input,
          },
        });

        // Return success message
        return {
          success: true,
          message: "Book deleted successfully",
        };
      } catch (error) {
        // Return error message
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),

  moveToShelf: protectedProcedure
    .input(z.object({ bookId: z.string(), shelfId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Find the book
      const book = await findBook(ctx, input.bookId);

      // If found but not belong to the user
      await isAuthorized({
        ctx,
        resourceUserId: book.userId,
      });

      // Find the shelf
      const shelf = await findShelf(ctx, input.shelfId);

      // If found but not belong to the user
      await isAuthorized({
        ctx,
        resourceUserId: shelf.userId,
      });

      // Move the book
      return ctx.prisma.book.update({
        where: {
          id: input.bookId,
        },
        data: {
          shelfId: input.shelfId,
        },
      });
    }),
  update: protectedProcedure
    .input(updateBookInput)
    .mutation(async ({ ctx, input }) => {
      // Find the book
      const book = await findBook(ctx, input.id);

      // If found but not belong to the user
      await isAuthorized({
        ctx,
        resourceUserId: book.userId,
      });

      // Update the book
      return ctx.prisma.book.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),
});
