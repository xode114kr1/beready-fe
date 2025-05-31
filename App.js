import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigators/TabNavigator";
import { Provider } from "react-redux";
import store from "./features/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
