import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  Auth,
  UserCredential,
  initializeAuth,
} from "firebase/auth";

import { auth } from "./firebaseService";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

//const auth: Auth = getAuth(app);

const signIn = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    throw error;
  }
};

const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

const signUp = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export { signIn, signOutUser, signUp };
