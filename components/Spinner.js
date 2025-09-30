import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet, Text } from "react-native";

export default function Spinner({
  size = 48,
  thickness = 4,
  color = "#6EE7F9",
  trackColor = "rgba(255,255,255,0.25)",
  duration = 900,
  label,
  labelColor = "#fff",
  style,
}) {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [rotate, duration]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const half = size / 2;

  return (
    <View style={[styles.wrap, style]}>
      <View
        style={[
          styles.track,
          {
            width: size,
            height: size,
            borderRadius: half,
            borderWidth: thickness,
            borderColor: trackColor,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.arc,
          {
            width: size,
            height: size,
            borderRadius: half,
            borderWidth: thickness,
            borderTopColor: color,
            borderRightColor: "transparent",
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
            transform: [{ rotate: spin }],
          },
        ]}
      />
      {label ? (
        <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  track: {
    position: "absolute",
  },
  arc: {
    position: "absolute",
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
  },
});
