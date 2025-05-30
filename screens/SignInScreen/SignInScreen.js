import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, adminLogin } from "../../features/user/userSlice";

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();
  const { isLogin, isAdmin } = useSelector((state) => state.user);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🔐 로그인 화면</Text>
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
      <Button
        title="➡️ 회원가입하기"
        onPress={() => navigation.navigate("SignUp")}
      />
      <View style={{ marginTop: 10 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, marginBottom: 20 },
});
