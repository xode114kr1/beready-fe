import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStack from "./HomeStack";
import MenuStack from "./MenuStack";
import WaitEstimationStack from "./WaitEstimationStack";
import { useSelector } from "react-redux";
import MyPageStack from "./MyPageStack";
import SignInStack from "./SignInStack";
import MenuAdminScreen from "../screens/MenuAdminScreen/MenuAdminScreen";
import MenuAdminStack from "./MenuAdminStack";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { isLogin, isAdmin } = useSelector((state) => state.user);
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
        component={HomeStack}
        options={{ title: "메인" }}
      />
      <Tab.Screen
        name="Wait"
        component={WaitEstimationStack}
        options={{ title: "대기열" }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuStack}
        options={{ title: "메뉴" }}
      />
      <Tab.Screen
        name="Profile"
        component={isLogin ? MyPageStack : SignInStack}
        options={{ title: isLogin ? "마이페이지" : "로그인" }}
      />
      {isAdmin && (
        <Tab.Screen
          name="Admin"
          component={MenuAdminStack}
          options={{
            title: "관리자",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}
