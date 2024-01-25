import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useTheme } from "@/hooks";
import tw from "twrnc";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

const HomeScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, "HomeScreen">
> = ({ navigation }) => {
  const { toggleTheme } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello world from Next.js </Text>
      <Button
        icon="camera"
        style={tw`mt-4`}
        mode="contained"
        onPress={() => toggleTheme()}
      >
        Hello world
      </Button>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("MyProfileScreen")}
      >
        Getting Started
      </Button>
    </View>
  );
};

export default HomeScreen;
