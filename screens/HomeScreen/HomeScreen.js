import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../features/user/userSlice";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏠 홈 화면</Text>
      <Text style={styles.status}>
        현재 상태: {isLogin ? "로그인됨" : "로그아웃됨"}
      </Text>
      <Button title="로그인" onPress={() => dispatch(login())} />
      <View style={{ height: 10 }} />
      <Button title="로그아웃" onPress={() => dispatch(logout())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, marginBottom: 20 },
  status: { fontSize: 18, marginBottom: 10 },
});
