import { createNoteInput, updateNoteInput } from "../../models";
import { findNote } from "../helpers";
import { isAuthorized } from "../middlewares";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const noteRouter = createTRPCRouter({
  getAll: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.prisma.note.findMany({
      where: {
        userId: ctx.auth.userId,
        bookId: input,
      },
      include: {
        book: true,
      },
    });
  }),
  get: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const note = await findNote(ctx, input);

    // Authorize
    await isAuthorized({
      ctx,
      resourceUserId: note.userId,
    });

    return note;
  }),
  create: protectedProcedure
    .input(createNoteInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.note.create({
        data: {
          ...input,
          userId: ctx.auth.userId,
        },
      });
    }),
  update: protectedProcedure
    .input(updateNoteInput)
    .mutation(async ({ ctx, input }) => {
      const note = await findNote(ctx, input.id);

      // Authorize
      await isAuthorized({
        ctx,
        resourceUserId: note.userId,
      });

      return ctx.prisma.note.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const note = await findNote(ctx, input);

      // Authorize
      await isAuthorized({
        ctx,
        resourceUserId: note.userId,
      });

      await ctx.prisma.note.delete({
        where: {
          id: input,
        },
      });

      return {
        success: true,
        message: "Note deleted successfully",
      };
    }),
});
