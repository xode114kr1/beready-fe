// components/GradientScreenWrapper.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useHeaderHeight } from "@react-navigation/elements";

const GRADIENTS = {
  blue: ["#E9F0FF", "#FFFFFF"],
  green: ["#e8faf2ff", "#FFFFFF"],
};

export default function GradientScreenWrapper({ children, variant = "blue" }) {
  const headerHeight = useHeaderHeight();
  const colors = GRADIENTS[variant] || GRADIENTS.blue;

  return (
    <LinearGradient colors={colors} style={styles.container}>
      <View style={[styles.inner, { paddingTop: headerHeight }]}>
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1 },
});
