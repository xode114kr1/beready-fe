import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Spinner from "./Spinner";

export default function FullscreenLoader({
  visible = false,
  label = "로딩 중...",
  dismissible = false,
  onDismiss,
}) {
  if (!visible) return null;

  const Body = (
    <View style={styles.center}>
      <Spinner size={56} thickness={5} label={label} />
    </View>
  );

  if (dismissible) {
    return (
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.overlay}>{Body}</View>
      </TouchableWithoutFeedback>
    );
  }
  return <View style={styles.overlay}>{Body}</View>;
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    elevation: 999,
  },
  center: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
});
