import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../../features/user/userSlice";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!userId || !password) {
      // TODO: alert 처리 가능
      return;
    }
    dispatch(login({ email: userId, password }));
  };

  return (
    <GradientScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.imageBox}>
              <Image
                source={require("../../assets/Logo.png")}
                style={styles.logoImage}
              />
              <Text style={styles.logoText}>Beready</Text>
            </View>
            <TextInput
              placeholder="이메일"
              style={styles.input}
              value={userId}
              onChangeText={setUserId}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="비밀번호"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </GradientScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: "10%",
    alignItems: "center",
  },
  imageBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: "cover",
  },
  logoText: {
    fontSize: 25,
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
  signupLink: {
    marginTop: 12,
    fontSize: 14,
    color: "#3399FF",
    fontWeight: "bold",
  },
});
