import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ClerkProvider } from "@clerk/clerk-expo";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/hooks";
import Navigation from "@/navigation";
import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";

const tokenCache = {
  getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return null;
    }
  },
};

const queryClient = new QueryClient();

export default function App() {
  const { theme, isThemeDark } = useTheme();

  return (
    <ClerkProvider
      tokenCache={tokenCache as any}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
    >
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <SafeAreaProvider>
            <StatusBar style={isThemeDark ? "light" : "dark"} />
            <QueryClientProvider client={queryClient}>
              <Navigation />
            </QueryClientProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </PaperProvider>
    </ClerkProvider>
  );
}
