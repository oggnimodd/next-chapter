import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createBookInput } from "models";
import { TRPCError } from "@trpc/server";
import { isAuthorized } from "../middlewares";
import { findBook, findBooks, findShelf } from "../helpers";

export const bookRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.book.findMany({
      where: {
        userId: ctx.auth.userId,
      },
    });
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

      const books = findBooks(ctx, shelf.id);

      return books;
    }),
  create: protectedProcedure
    .input(createBookInput)
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
});
