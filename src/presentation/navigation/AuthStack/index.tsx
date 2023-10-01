import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/Login/signIn";
import RegisterScreen from "../../screens/Login/signUp";

const Stack = createStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerStyle: { backgroundColor: "#f9f9f9" } }}
    />
  </Stack.Navigator>
);
