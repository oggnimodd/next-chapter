import { bookRouter } from "./router/book";
import { shelfRouter } from "./router/shelf";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  book: bookRouter,
  shelf: shelfRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
