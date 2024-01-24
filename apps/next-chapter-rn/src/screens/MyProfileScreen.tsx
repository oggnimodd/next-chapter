import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Avatar } from "react-native-paper";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { RootStackParamList } from "./types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import tw from "twrnc";

type Props = NativeStackScreenProps<RootStackParamList, "MyProfileScreen">;

const MyProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { getToken, signOut } = useAuth();
  const { user } = useUser();

  const [sessionToken, setSessionToken] = React.useState("");

  const onSignOutPress = async () => {
    try {
      await signOut();
    } catch (err: any) {}
  };

  React.useEffect(() => {
    const scheduler = setInterval(async () => {
      const token = await getToken();
      setSessionToken(token as string);
    }, 1000);

    return () => clearInterval(scheduler);
  }, []);

  return (
    <View style={tw`flex-1 items-center justify-center gap-y-5`}>
      <Text style={styles.title}>Hello {user?.firstName}</Text>
      {/* Profile Picture */}
      {user?.imageUrl && (
        <Avatar.Image source={{ uri: user?.imageUrl }} size={100} />
      )}

      <Button icon="logout" onPress={onSignOutPress} mode="contained">
        Sign out
      </Button>
    </View>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  token: {
    marginTop: 15,
    paddingVertical: 15,
    fontSize: 15,
  },
});
