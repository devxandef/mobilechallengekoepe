import { useSelector } from "react-redux";

import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";

export const AppOrAuthStack = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  return isAuthenticated ? <AppStack /> : <AuthStack />;
};
