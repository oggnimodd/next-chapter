import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, RootStackParamList } from "@/screens";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/hooks";
import "react-native-get-random-values";

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  const { theme, isThemeDark } = useTheme();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <SafeAreaProvider>
          <StatusBar style={isThemeDark ? "light" : "dark"} />
          <QueryClientProvider client={queryClient}>
            <Stack.Navigator initialRouteName="HomeScreen">
              <Stack.Screen
                name="HomeScreen"
                options={{ headerShown: false }}
                component={HomeScreen}
              />
            </Stack.Navigator>
          </QueryClientProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
