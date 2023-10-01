import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { signUp } from "./src/services/firebase/authService";

export default function App() {
  const handleSignUp = async () => {
    const email: string = "meuemail@example.com"; // Certifique-se de que email seja uma string
    const password: string = "minhasenha123"; // Certifique-se de que password seja uma string
    const userCredential = await signUp(email, password);
  };

  useEffect(() => {
    handleSignUp();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
