import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MenuAdminScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📋 메뉴 관리자 화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});
