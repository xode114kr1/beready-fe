import { View, Text, StyleSheet, Button } from "react-native";

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🍴 Menu Screen</Text>
      <Button
        title="➡️ 메뉴 상세로 이동"
        onPress={() => navigation.navigate("MenuDetail")}
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
