import { View, Text, StyleSheet } from "react-native";

export default function WaitEstimationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>⏳ Wait Estimation Screen</Text>
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
