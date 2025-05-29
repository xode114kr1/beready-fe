import { View, Text, StyleSheet } from "react-native";

export default function ReviewFormScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>✍️ 리뷰 작성 화면</Text>
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
