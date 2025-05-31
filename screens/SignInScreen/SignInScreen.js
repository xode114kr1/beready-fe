import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, adminLogin } from "../../features/user/userSlice";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <GradientScreenWrapper>
      <View style={styles.container}>
        {/* TODO : 로고 넣기 */}
        <TextInput
          placeholder="아이디"
          style={styles.input}
          value={userId}
          onChangeText={setUserId}
        />
        <TextInput
          placeholder="비밀번호"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => dispatch(login())}
        >
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>

        <Text>
          아직 회원이 아니신가요?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate("SignUp")}
          >
            회원가입
          </Text>
        </Text>
      </View>
    </GradientScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: "10%",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#3399FF",
    paddingVertical: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    marginTop: 16,
    fontSize: 14,
    color: "#444",
  },
  signupLink: {
    marginTop: 12,
    fontSize: 14,
    color: "#3399FF",
    fontWeight: "bold",
  },
});
