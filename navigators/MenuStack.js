import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DalelacMenuScreen from "../screens/DalelacMenuScreen/DalelacMenuScreen";
import MenuDetailScreen from "../screens/MenuDetailScreen/MenuDetailScreen";
import ReviewScreen from "../screens/ReviewScreen/ReviewScreen";
import ReviewFormScreen from "../screens/ReviewFormScreen/ReviewFormScreen";
import MenuSelectScreen from "../screens/MenuSelectScreen/MenuSelectScreen";
import LilacMenuScreen from "../screens/LilacMenuScreen/LilacMenuScreen";

const Stack = createNativeStackNavigator();

export default function MenuStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
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
      <Stack.Screen
        name="MenuSelect"
        component={MenuSelectScreen}
        options={{ title: "식당 선택" }}
      />
      <Stack.Screen
        name="LilacMenuList"
        component={LilacMenuScreen}
        options={{ title: "메뉴-라일락" }}
      />
      <Stack.Screen
        name="DalelacMenuList"
        component={DalelacMenuScreen}
        options={{ title: "메뉴-다래락" }}
      />
      <Stack.Screen
        name="MenuDetail"
        component={MenuDetailScreen}
        options={{ title: "메뉴 상세" }}
      />
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
        options={{ title: "리뷰" }}
      />
      <Stack.Screen
        name="ReviewForm"
        component={ReviewFormScreen}
        options={{ title: "리뷰 작성" }}
      />
    </Stack.Navigator>
  );
}
