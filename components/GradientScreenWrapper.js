import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useHeaderHeight } from "@react-navigation/elements";

export default function GradientScreenWrapper({ children }) {
  const headerHeight = useHeaderHeight(); // ✅ 함수 내부에서 호출

  return (
    <LinearGradient colors={["#DFF2FF", "#fff"]} style={styles.container}>
      <View style={[styles.inner, { paddingTop: headerHeight }]}>
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});
