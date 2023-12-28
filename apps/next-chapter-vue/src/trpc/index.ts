import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { appRouter } from "../../../../packages/api/node";
import superjson from "superjson";

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

export const api = createTRPCProxyClient<typeof appRouter>({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_APP_TRPC_URL || "http://localhost:8080/trpc",
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          Authorization: `Bearer ${getCookie("__session")}`,
        };
      },
    }),
  ],
  transformer: superjson as any,
});
