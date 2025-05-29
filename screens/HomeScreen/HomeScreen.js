// screens/HomeScreen/HomeScreen.js
import { View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, adminLogin } from "../../features/user/userSlice";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { isLogin, isAdmin } = useSelector((state) => state.user);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text style={{ fontSize: 18 }}>
        현재 상태:{" "}
        {isLogin
          ? isAdmin
            ? "관리자 로그인됨"
            : "일반 로그인됨"
          : "로그아웃됨"}
      </Text>
      <Button title="일반 로그인" onPress={() => dispatch(login())} />
      <Button title="관리자 로그인" onPress={() => dispatch(adminLogin())} />
      <Button title="로그아웃" onPress={() => dispatch(logout())} />
    </View>
  );
}
