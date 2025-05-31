import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";
import Checkbox from "expo-checkbox";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);

  return (
    <GradientScreenWrapper>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="아이디(Username)"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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
            value={agree}
            onValueChange={setAgree}
            color={agree ? "#3399FF" : undefined}
          />
          <Text style={styles.agreeText}>개인정보 수집 및 동의</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>가입하기</Text>
        </TouchableOpacity>
      </View>
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
