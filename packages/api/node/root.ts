import { bookRouter } from "./router/book";
import { shelfRouter } from "./router/shelf";
import { reviewRouter } from "./router/review";
import { noteRouter } from "./router/note";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  book: bookRouter,
  shelf: shelfRouter,
  review: reviewRouter,
  note: noteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
