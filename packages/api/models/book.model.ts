import { z } from "zod";

export const createBookInput = z.object({
  title: z.string(),
  description: z.string().optional(),
  author: z.string().optional(),
  cover: z
    .string()
    .url()
    .optional()
    .refine((url) => {
      if (url) {
        const coverUrl = new URL(url);
        return coverUrl.hostname === "books.google.com";
      }
    }),
  shelfId: z.string(),
});
