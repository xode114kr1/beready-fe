// MenuSelectScreen.js
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";

export default function MenuSelectScreen() {
  const navigation = useNavigation();
  const goToMenu = (hall) => {
    navigation.navigate(`${hall}MenuList`); // hall: 'Lilac' | 'Dalelac'
  };

  return (
    <GradientScreenWrapper>
      <View style={styles.container}>
        <View style={styles.row}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="라일락 메뉴 선택"
            onPress={() => goToMenu("Lilac")}
            style={({ pressed }) => [
              styles.card,
              styles.cardLilac,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.badgeRow}>
              <View style={[styles.badge, { backgroundColor: "#3B63C4" }]}>
                <Text style={styles.badgeText}>라일락</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>뷔페형</Text>
            <Text style={styles.cardDesc}>원하는 만큼 담아먹기</Text>
            <Text style={styles.cardCTA}>메뉴 보러가기 ›</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="다래락 메뉴 선택"
            onPress={() => goToMenu("Dalelac")}
            style={({ pressed }) => [
              styles.card,
              styles.cardDarerak,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.badgeRow}>
              <View style={[styles.badge, { backgroundColor: "#3CB371" }]}>
                <Text style={styles.badgeText}>다래락</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>고정 메뉴</Text>
            <Text style={styles.cardDesc}>카테고리별 선택 주문</Text>
            <Text style={styles.cardCTA}>메뉴 보러가기 ›</Text>
          </Pressable>
        </View>
      </View>
    </GradientScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e9e9ef",
    padding: 16,
    justifyContent: "space-between",
    minHeight: 160,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardLilac: {},
  cardDarerak: {},
  pressed: { opacity: 0.8, transform: [{ scale: 0.99 }] },
  badgeRow: { flexDirection: "row" },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: { color: "#fff", fontWeight: "700" },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
    color: "#111",
  },
  cardDesc: { fontSize: 13, color: "#666", marginTop: 2 },
  cardCTA: { marginTop: 12, fontWeight: "700", color: "#555" },
});
