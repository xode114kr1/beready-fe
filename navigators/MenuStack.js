import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DalelacMenuScreen from "../screens/DalelacMenuScreen/DalelacMenuScreen";
import DalelacMenuDetailScreen from "../screens/DalelacMenuDetailScreen/DalelacMenuDetailScreen";
import DalelacReviewScreen from "../screens/DalelacReviewScreen/DalelacReviewScreen";
import DalelacReviewFormScreen from "../screens/DalelacReviewFormScreen/DalelacReviewFormScreen";
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
        component={DalelacMenuDetailScreen}
        options={{ title: "메뉴 상세" }}
      />
      <Stack.Screen
        name="Review"
        component={DalelacReviewScreen}
        options={{ title: "리뷰" }}
      />
      <Stack.Screen
        name="ReviewForm"
        component={DalelacReviewFormScreen}
        options={{ title: "리뷰 작성" }}
      />
    </Stack.Navigator>
  );
}
