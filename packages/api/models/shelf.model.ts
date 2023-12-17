import { z } from "zod";

export const shelfTypeSchema = z.enum([
  "Read",
  "To Be Read",
  "Currently Reading",
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
    type: "To Be Read",
    id: "1",
  },
  {
    name: "Currently Reading",
    type: "Currently Reading",
    id: "2",
  },
  {
    name: "Read",
    type: "Read",
    id: "3",
  },
];
