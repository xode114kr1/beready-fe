import { View, Text, StyleSheet, Button } from "react-native";

export default function MenuDetailScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📄 메뉴 상세 화면</Text>
      <Button
        title="➡️ 리뷰 목록으로 이동"
        onPress={() => navigation.navigate("Review")}
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
