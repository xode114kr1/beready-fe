import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPageScreen from "../screens/MyPageScreen/MyPageScreen";

const Stack = createNativeStackNavigator();

export default function MyPageStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: "#000",
      }}
    >
      <Stack.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{ title: "마이페이지" }}
      />
    </Stack.Navigator>
  );
}
