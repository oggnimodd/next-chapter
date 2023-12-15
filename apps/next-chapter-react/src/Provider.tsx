import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDarkMode } from "hooks";
import CssBaseline from "@mui/material/CssBaseline";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { ClerkProvider } from "@clerk/clerk-react";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { api } from "trpc";
import { useState } from "react";
import { getCookie } from "utils";
import { ShelvesProvider } from "providers";
import { Toaster } from "react-hot-toast";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

interface ProviderProps {
  children: React.ReactNode;
}

// biome-ignore lint/style/noNonNullAssertion: <>
const rootElement = document.getElementById("root")!;
const materiaThemeComponents = {
  MuiPopover: {
    defaultProps: {
      container: rootElement,
    },
  },
  MuiPopper: {
    defaultProps: {
      container: rootElement,
    },
  },
  MuiDialog: {
    defaultProps: {
      container: rootElement,
    },
  },
  MuiModal: {
    defaultProps: {
      container: rootElement,
    },
  },
};

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const { isDark } = useDarkMode();

  const materialTheme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
    components: materiaThemeComponents,
    breakpoints: {
      values: {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
      },
    },
  });

  // console.log(materialTheme);

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url:
            import.meta.env.VITE_APP_TRPC_URL || "http://localhost:8080/trpc",
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              Authorization: `Bearer ${getCookie("__session")}`,
            };
          },
        }),
      ],
      transformer: superjson as any,
    }),
  );

  return (
    <ClerkProvider publishableKey={clerkPubKey || ""}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <CssBaseline />
        <StyledEngineProvider injectFirst>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <ThemeProvider theme={materialTheme}>
                <ShelvesProvider>
                  <Toaster position="bottom-right" />
                  {children}
                </ShelvesProvider>
              </ThemeProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </StyledEngineProvider>
      </api.Provider>
    </ClerkProvider>
  );
};

export default Provider;
