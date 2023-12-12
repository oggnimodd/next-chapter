import { bookRouter } from "./router/book";
import { shelfRouter } from "./router/shelf";
import { reviewRouter } from "./router/review";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  book: bookRouter,
  shelf: shelfRouter,
  review: reviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
