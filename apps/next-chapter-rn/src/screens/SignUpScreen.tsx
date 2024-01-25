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
import { OAuthButtons } from "@/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import tw from "twrnc";

const SignUpScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, "SignUpScreen">
> = ({ navigation }) => {
  const { isLoaded, signUp } = useSignUp();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignUpPress = async () => {
    console.log("calling sign up");
    if (!isLoaded) {
      return;
    }

    console.log("isloaded");

    try {
      console.log("Creating the sign up");
      console.log({
        firstName,
        lastName,
        emailAddress,
        password,
      });
      // TODO : add first name and last name
      await signUp.create({
        emailAddress,
        password,
      });
      console.log("signing up");
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      navigation.navigate("VerifyCodeScreen");
    } catch (err: any) {
      console.log("error");
      console.log(JSON.stringify(err));
    }
  };

  const onSignInPress = () => navigation.replace("SignInScreen");

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Content>
          <Title>Create Account</Title>
          <Paragraph>Please enter your details to create an account.</Paragraph>
        </Card.Content>
      </Card>

      <OAuthButtons />

      <View style={tw`flex flex-col gap-y-2 mt-2 mb-4`}>
        {/* <TextInput
          label="First Name"
          mode="outlined"
          value={firstName}
          onChangeText={(firstName) => setFirstName(firstName)}
        />

        <TextInput
          label="Last Name"
          mode="outlined"
          value={lastName}
          onChangeText={(lastName) => setLastName(lastName)}
        /> */}

        <TextInput
          label="Email"
          mode="outlined"
          value={emailAddress}
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />

        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry
        />
      </View>

      <Button mode="contained" onPress={onSignUpPress} style={styles.button}>
        Sign Up
      </Button>

      <View style={tw`flex flex-row justify-center items-center`}>
        <Text> Already have an account?</Text>
        <Button onPress={onSignInPress}>Sign In</Button>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

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
