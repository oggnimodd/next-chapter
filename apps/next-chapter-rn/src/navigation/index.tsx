import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  MyProfileScreen,
  RootStackParamList,
  SignInScreen,
  SignUpScreen,
  VerifyCodeScreen,
} from "@/screens";
import { ClerkLoaded, useUser } from "@clerk/clerk-expo";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  const { isSignedIn } = useUser();

  return (
    <ClerkLoaded>
      <Stack.Navigator initialRouteName="HomeScreen">
        {isSignedIn ? (
          <>
            <Stack.Screen
              name="MyProfileScreen"
              component={MyProfileScreen}
              options={{ title: "MyProfile" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="HomeScreen"
              options={{ headerShown: false }}
              component={HomeScreen}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{ title: "Sign Up" }}
            />
            <Stack.Screen
              name="SignInScreen"
              component={SignInScreen}
              options={{ title: "Sign In" }}
            />
            <Stack.Screen
              name="VerifyCodeScreen"
              component={VerifyCodeScreen}
              options={{ title: "Sign Up" }}
            />
          </>
        )}
      </Stack.Navigator>
    </ClerkLoaded>
  );
};

export default Navigation;
