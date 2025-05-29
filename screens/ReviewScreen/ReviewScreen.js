import { View, Text, StyleSheet, Button } from "react-native";

export default function ReviewScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📝 리뷰 목록 화면</Text>
      <Button
        title="➡️ 리뷰 작성하기"
        onPress={() => navigation.navigate("ReviewForm")}
      />
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
    marginBottom: 20,
  },
});
