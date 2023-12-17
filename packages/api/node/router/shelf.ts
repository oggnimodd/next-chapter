import { createTRPCRouter, protectedProcedure } from "../trpc";
import { INITIAL_SHELVES } from "models";
import { TRPCError } from "@trpc/server";
import { findShelf, findShelves } from "../helpers";
import { isAuthorized } from "../middlewares";
import { z } from "zod";
import { Book, Shelf } from "@acme/db";

export const shelfRouter = createTRPCRouter({
  generateInitialShelves: protectedProcedure.mutation(async ({ ctx }) => {
    // We need to check if user already have shelves or not first
    const shelves = await findShelves(ctx);

    // If not we need to initialize shelves
    if (shelves.length === 0) {
      const results = await Promise.all(
        INITIAL_SHELVES.map((shelf) => {
          return ctx.prisma.shelf.create({
            data: {
              type: shelf.type,
              userId: ctx.auth.userId,
              isDefault: true,
            },
          });
        }),
      );

      return results;
    }

    // Return error because shelves are already initialized
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Shelves are already initialized",
    });
  }),
  // Get all shelves from the current user
  getAll: protectedProcedure.query(({ ctx }) => {
    return findShelves(ctx) as Promise<(Shelf & { Book: Book[] })[]>;
  }),
  get: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const shelf = await findShelf(ctx, input);

    // Authorize the user
    await isAuthorized({
      ctx,
      resourceUserId: shelf.userId,
    });

    return shelf;
  }),
  create: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.shelf.create({
        data: {
          type: input,
          userId: ctx.auth.userId,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const shelf = await findShelf(ctx, input);

      // Check if shelf is a default shelf or not
      if (shelf.isDefault) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You can't delete default shelves",
        });
      }

      // Authorize the user
      await isAuthorized({
        ctx,
        resourceUserId: shelf.userId,
      });

      await ctx.prisma.shelf.delete({
        where: {
          id: input,
        },
      });

      return {
        success: true,
        message: "Shelf deleted successfully",
      };
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        type: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Find the shelf
      const shelf = await findShelf(ctx, input.id);

      // Authorize
      await isAuthorized({
        ctx,
        resourceUserId: shelf.userId,
      });

      // Check i this is a default shelf
      if (shelf.isDefault) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You can't update default shelves",
        });
      }

      return ctx.prisma.shelf.update({
        where: {
          id: input.id,
        },
        data: {
          type: input.type,
        },
      });
    }),
});
