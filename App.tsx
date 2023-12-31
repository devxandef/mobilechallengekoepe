import React from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import store from "./src/services/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreenComponent from "./src/presentation/components/Splash"; // Importe o componente da splash screen
import { AppOrAuthStack } from "./src/presentation/navigation/";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "react-query";
import "./ReactotronConfig";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SplashScreenComponent
          image={{
            uri: "https://www.freepnglogos.com/uploads/w-logo/w-letter-alphabet-inspiration-vector-logo-design-25.png",
          }}
        >
          <QueryClientProvider client={queryClient}>
            <AppOrAuthStack />
          </QueryClientProvider>
        </SplashScreenComponent>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}
