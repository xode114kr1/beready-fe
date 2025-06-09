import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice"; // 경로는 너 프로젝트 구조에 맞게 조정해
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyPageScreen() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      "로그아웃",
      "정말 로그아웃 하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        {
          text: "확인",
          onPress: async () => {
            await AsyncStorage.removeItem("token");
            dispatch(logout());
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>👤 마이페이지 화면</Text>
      <View style={styles.buttonContainer}>
        <Button title="로그아웃" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, marginBottom: 20 },
  buttonContainer: { width: "50%" },
});
