import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/user/userSlice";
import FullscreenLoader from "../../components/FullscreenLoader";

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);

  const handleRegister = async () => {
    if (!agree) return alert("개인정보 수집에 동의해주세요.");
    if (password !== confirm) return alert("비밀번호가 일치하지 않습니다.");

    try {
      await dispatch(register({ name, password, email })).unwrap();
      navigation.goBack();
    } catch (err) {
      console.log("회원가입 실패:", err);
    }
  };

  return (
    <GradientScreenWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <TextInput
              style={styles.input}
              placeholder="아이디(Username)"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="이메일"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="비밀번호 확인"
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry
            />

            <View style={styles.agreeContainer}>
              <Checkbox
                style={styles.checkbox}
                value={agree}
                onValueChange={setAgree}
                color={agree ? "#3399FF" : undefined}
              />
              <Text style={styles.agreeText}>개인정보 수집 및 동의</Text>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>가입하기</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
        <FullscreenLoader visible={isLoading} label="회원가입 중..." />
      </KeyboardAvoidingView>
    </GradientScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: "5%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  agreeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  checkbox: {
    marginRight: 8,
    ...Platform.select({
      ios: { width: 20, height: 20 },
    }),
  },
  agreeText: {
    paddingLeft: 5,
    fontSize: 14,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginVertical: 8,
    textAlign: "center",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#3399FF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
