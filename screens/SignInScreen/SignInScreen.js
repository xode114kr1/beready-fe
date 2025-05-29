import { View, Text, Button, StyleSheet } from "react-native";

export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🔐 로그인 화면</Text>
      <Button
        title="➡️ 회원가입하기"
        onPress={() => navigation.navigate("SignUp")}
      />
      <View style={{ marginTop: 10 }} />
      <Button
        title="➡️ 마이페이지 이동 (임시)"
        onPress={() => navigation.navigate("MyPage")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, marginBottom: 20 },
});
