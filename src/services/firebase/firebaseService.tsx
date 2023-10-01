import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyDf304VdWxJD0MEPorT5tCXCqX_WAi8vlQ",
  authDomain: "koepesesafio.firebaseapp.com",
  projectId: "koepesesafio",
  storageBucket: "koepesesafio.appspot.com",
  messagingSenderId: "106065627119",
  appId: "1:106065627119:web:dff2ad0890220f45d0181a",
};

const app = firebase.initializeApp(firebaseConfig);

const auth = app.auth();
const DB = app.firestore();

export { auth, DB };
