import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";

export const AppOrAuthStack = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userState = useSelector((state: any) => state.auth.isAuthenticated);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userToken = await AsyncStorage.getItem("user");
        setIsAuthenticated(userToken !== null);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return null;
  }

  return isAuthenticated || userState ? <AppStack /> : <AuthStack />;
};
