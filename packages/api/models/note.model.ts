import { z } from "zod";

export const createNoteInput = z.object({
  description: z.string(),
  bookId: z.string(),
});

export const updateNoteInput = z.object({
  description: z.string().optional(),
  id: z.string(),
});
