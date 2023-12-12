import { z } from "zod";

export const shelfTypeSchema = z.enum([
  "READ",
  "TO_BE_READ",
  "CURRENTLY_READING",
]);

export const shelfSchema = z.object({
  name: z.string(),
  type: shelfTypeSchema,
  id: z.string(),
});

export const initialShelvesSchema = z.array(shelfSchema);

export type Shelf = z.infer<typeof shelfSchema>;
export type ShelfType = z.infer<typeof shelfTypeSchema>;
export type InitialShelves = z.infer<typeof initialShelvesSchema>;

export const INITIAL_SHELVES: InitialShelves = [
  {
    name: "To Be Read",
    type: "TO_BE_READ",
    id: "1",
  },
  {
    name: "Currently Reading",
    type: "CURRENTLY_READING",
    id: "2",
  },
  {
    name: "Read",
    type: "READ",
    id: "3",
  },
];
