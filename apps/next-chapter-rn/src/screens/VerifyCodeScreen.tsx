import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  Text,
} from "react-native-paper";
import { useSignUp } from "@clerk/clerk-expo";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import tw from "twrnc";

const VerifyCodeScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, "VerifyCodeScreen">
> = ({ navigation }) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = React.useState("");

  const onPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Content>
          <Title>Verify Your Code</Title>
          <Paragraph>
            Please enter the verification code sent to your email.
          </Paragraph>
        </Card.Content>
      </Card>

      <View style={tw`flex flex-col gap-y-2 mt-2 mb-4`}>
        <TextInput
          label="Code"
          mode="outlined"
          value={code}
          onChangeText={(code) => setCode(code)}
        />
      </View>

      <Button mode="contained" onPress={onPress} style={styles.button}>
        Verify Email
      </Button>
    </ScrollView>
  );
};

export default VerifyCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputCard: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 8,
  },
});
