import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WaitEstimationScreen from "../screens/WaitEstimationScreen/WaitEstimationScreen";

const Stack = createNativeStackNavigator();

export default function WaitEstimationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: "메뉴",
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: "#000",
      }}
    >
      <Stack.Screen name="MenuMain" component={WaitEstimationScreen} />
    </Stack.Navigator>
  );
}
