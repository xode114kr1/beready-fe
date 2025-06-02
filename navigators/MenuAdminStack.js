import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuAdminScreen from "../screens/MenuAdminScreen/MenuAdminScreen";

const Stack = createNativeStackNavigator();

export default function MenuAdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: "관리자",
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
      <Stack.Screen name="HomeMain" component={MenuAdminScreen} />
    </Stack.Navigator>
  );
}
