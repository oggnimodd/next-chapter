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
import { useSignIn } from "@clerk/clerk-expo";
import { OAuthButtons } from "@/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import tw from "twrnc";

const SignInScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, "SignInScreen">
> = ({ navigation }) => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.log(JSON.stringify(err));
    }
  };

  const onSignUpPress = () => navigation.replace("SignUpScreen");

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Content>
          <Title>Welcome Back</Title>
          <Paragraph>Please enter your credentials to sign in.</Paragraph>
        </Card.Content>
      </Card>

      <OAuthButtons />

      <View style={tw`flex flex-col gap-y-2 mt-2 mb-4`}>
        <TextInput
          label="Email"
          mode="outlined"
          onChangeText={setEmailAddress}
          value={emailAddress}
        />

        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry
        />
      </View>

      <Button mode="contained" onPress={onSignInPress} style={styles.button}>
        Sign In
      </Button>

      <View style={tw`flex flex-row justify-center items-center`}>
        <Text> Don't have an account?</Text>
        <Button onPress={onSignUpPress}>Sign Up</Button>
      </View>
    </ScrollView>
  );
};

export default SignInScreen;

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
