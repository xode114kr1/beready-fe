import { Image, Pressable, StyleSheet, Text } from "react-native";

export default function MenuCard({ menu, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: menu.image }} style={styles.image} />
      <Text style={styles.title}>{menu.name}</Text>
      <Text style={styles.price}>{menu.price}원</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: "30%",
    aspectRatio: 3 / 4,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  image: {
    width: "80%",
    height: "60%",
    borderRadius: 8,
    resizeMode: "cover",
  },
  title: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});
