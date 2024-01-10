import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createReviewInput, updateReviewInput } from "models";
import { isAuthorized } from "../middlewares";
import { z } from "zod";
import { findReview, findReviewByBook } from "../helpers";

export const reviewRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.review.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      include: {
        book: true,
      },
    });
  }),
  get: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const review = await findReview(ctx, input);

    // Authorize
    await isAuthorized({
      ctx,
      resourceUserId: review.userId,
    });

    return review;
  }),
  getReviewByBook: protectedProcedure
    .input(z.object({ reviewId: z.string(), bookId: z.string() }))
    .query(async ({ ctx, input }) => {
      const review = await findReviewByBook(ctx, {
        reviewId: input.reviewId,
        bookId: input.bookId,
      });

      // Authorize
      await isAuthorized({
        ctx,
        resourceUserId: review.userId,
      });

      return review;
    }),
  create: protectedProcedure
    .input(createReviewInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.review.create({
        data: {
          ...input,
          userId: ctx.auth.userId,
        },
      });
    }),
  update: protectedProcedure
    .input(updateReviewInput)
    .mutation(async ({ ctx, input }) => {
      // Find the review
      const review = await findReview(ctx, input.id);

      // Authorize
      await isAuthorized({
        ctx,
        resourceUserId: review.userId,
      });

      return ctx.prisma.review.update({
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
      // Find the review
      const review = await findReview(ctx, input);

      // Authorize
      await isAuthorized({
        ctx,
        resourceUserId: review.userId,
      });

      return ctx.prisma.review.delete({
        where: {
          id: input,
        },
      });
    }),
});
