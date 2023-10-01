import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  Auth,
  UserCredential,
  initializeAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDf304VdWxJD0MEPorT5tCXCqX_WAi8vlQ",
  authDomain: "koepesesafio.firebaseapp.com",
  projectId: "koepesesafio",
  storageBucket: "koepesesafio.appspot.com",
  messagingSenderId: "106065627119",
  appId: "1:106065627119:web:dff2ad0890220f45d0181a",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
