import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen/HomeScreen";
import WaitEstimationScreen from "../screens/WaitEstimationScreen/WaitEstimationScreen";
import MenuScreen from "../screens/MenuScreen/MenuScreen";
import SignInScreen from "../screens/SignInScreen/SignInScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Wait")
            iconName = focused ? "time" : "time-outline";
          else if (route.name === "Menu")
            iconName = focused ? "restaurant" : "restaurant-outline";
          else if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#aaa",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "메인" }}
      />
      <Tab.Screen
        name="Wait"
        component={WaitEstimationScreen}
        options={{ title: "대기열" }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{ title: "메뉴" }}
      />
      <Tab.Screen
        name="Profile"
        component={SignInScreen}
        options={{ title: "마이페이지" }}
      />
    </Tab.Navigator>
  );
}
