import { createTRPCReact } from "@trpc/react-query";
import { appRouter } from "../../../../packages/api/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import React, { useState } from "react";
import superjson from "superjson";
import { useSession } from "@clerk/clerk-expo";
import Constants from "expo-constants";

const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   *
   * **NOTE**: This is only for development. In production, you'll want to set the
   * baseUrl to your production API URL.
   */
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(":")[0];

  if (!localhost) {
    // return "https://turbo.t3.gg";
    throw new Error(
      "Failed to get localhost. Please point to your production server.",
    );
  }
  return `http://${localhost}:8080`;
};

export const api = createTRPCReact<typeof appRouter>();

interface TrpcProviderProps {
  children: React.ReactNode;
}

export const TrpcProvider: React.FC<TrpcProviderProps> = ({ children }) => {
  const { session } = useSession();
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: process.env.EXPO_PUBLIC_TRPC_URL || "http://localhost:8080/trpc",
          // You can pass any HTTP headers you wish here
          async headers() {
            const token = session ? await session.getToken() : "";
            return {
              Authorization: `Bearer ${token}`,
            };
          },
        }),
      ],
      transformer: superjson as any,
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
};
