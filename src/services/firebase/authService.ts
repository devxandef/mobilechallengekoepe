import { auth } from "./firebaseService";
import {
  setAuthenticated,
  setUnauthenticated,
  setUser,
} from "../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const signIn = async (
  dispatch: any,
  email: string,
  password: string
): Promise<any> => {
  try {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(async (user: any) => {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        dispatch(setAuthenticated());
      });
  } catch (erro: any) {
    let msg = "";
    if (erro.code === "auth/user-not-found") {
      msg = "Usuário não encontrado. Verifique o endereço de e-mail.";
    } else if (erro.code === "auth/wrong-password") {
      msg = "Senha incorreta. Por favor, tente novamente.";
    } else {
      msg =
        "Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.";
    }
    Toast.show({
      type: "error",
      text1: msg,
      position: "bottom",
    });
  }
};

const signOutUser = async (dispatch: any): Promise<void> => {
  try {
    dispatch(setUnauthenticated());
    await AsyncStorage.removeItem("user");
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};

const getInfoUser = async (): Promise<any> => {
  try {
    const item = await AsyncStorage.getItem("user");
    return JSON.parse(item || "");
  } catch (error) {
    throw error;
  }
};
const signUp = async (
  email: string,
  password: string,
  userName: string
): Promise<any> => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );

    if (userCredential.user) {
      await userCredential.user.updateProfile({
        displayName: userName,
      });
    }
  } catch (error: any) {
    let errorMessage =
      "Ocorreu um erro durante o processo de registro. Por favor, tente novamente mais tarde.";
    if (error.code === "auth/email-already-in-use") {
      errorMessage =
        "Este endereço de e-mail já está sendo usado por outra conta.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "O endereço de e-mail fornecido não é válido.";
    } else if (error.code === "auth/weak-password") {
      errorMessage =
        "A senha fornecida é muito fraca. Tente uma senha mais forte.";
    }

    Toast.show({
      type: "error",
      text1: errorMessage,
      position: "bottom",
    });
    return { success: false, error: errorMessage };
  }
};

export { signIn, signOutUser, signUp, getInfoUser };
