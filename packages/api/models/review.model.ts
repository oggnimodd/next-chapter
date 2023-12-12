import { z } from "zod";

export const createReviewInput = z.object({
  rating: z.number().min(0).max(5),
  description: z.string(),
  bookId: z.string(),
});

export const updateReviewInput = z.object({
  rating: z.number().min(0).max(5).optional(),
  description: z.string().optional(),
  id: z.string(),
});
