import * as React from "react";
import { Button, Text, Avatar } from "react-native-paper";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { RootStackParamList } from "./types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import tw from "twrnc";
import { View } from "react-native";
import { useTheme } from "@/hooks";

type Props = NativeStackScreenProps<RootStackParamList, "MyProfileScreen">;

const MyProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { toggleTheme, isThemeDark } = useTheme();
  const { signOut } = useAuth();
  const { user } = useUser();

  const onSignOutPress = async () => {
    try {
      await signOut();
    } catch (err: any) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <View style={tw`flex-1 items-center gap-y-5 py-10 px-4`}>
      <Text style={tw`text-2xl font-bold`}>Hello {user?.firstName}</Text>
      {user?.imageUrl && (
        <Avatar.Image source={{ uri: user?.imageUrl }} size={100} />
      )}
      <Button
        style={tw`w-full`}
        icon={isThemeDark ? "lightbulb-on" : "lightbulb-off"}
        onPress={toggleTheme}
        mode="contained"
      >
        Switch Theme
      </Button>
      <Button
        style={tw`w-full`}
        icon="logout"
        onPress={onSignOutPress}
        mode="contained-tonal"
      >
        Sign out
      </Button>
    </View>
  );
};

export default MyProfileScreen;
