import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useTheme } from "@/hooks";
import tw from "twrnc";

const HomeScreen = () => {
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
    </View>
  );
};

export default HomeScreen;
