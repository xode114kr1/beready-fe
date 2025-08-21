// screens/LilacMenuList/LilacMenuScreen.js
import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";

const { width } = Dimensions.get("window");
const CARD_GAP = 12;
const CARD_WIDTH = Math.round(width * 0.8);
const SIDE_PADDING = Math.round((width - CARD_WIDTH) / 2);
const WEEK_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

export default function LilacMenuScreen() {
  const now = new Date();
  const jsDay = now.getDay(); // Sun=0 .. Sat=6
  const todayIdxMon0 = (jsDay + 6) % 7; // Mon=0 .. Sun=6

  const weeklyMenu = useMemo(
    () => [
      { items: ["콩불 덮밥", "두부 샐러드", "유부장국"] }, // 월(0)
      { items: ["치킨 커리", "그린샐러드", "나초칩"] }, // 화(1)
      { items: ["함박스테이크", "구운야채", "토마토수프"] }, // 수(2)
      { items: ["연어스테이크", "퀴노아샐러드", "콘스프"] }, // 목(3)
      { items: ["오므라이스", "양배추샐러드", "미소국"] }, // 금(4)
      { items: ["돈카츠", "양배추채", "우동국물"] }, // 토(5)
      { items: ["비빔국수", "군만두", "동치미"] }, // 일(6)
    ],
    []
  );

  // 이번 주 월요일
  const monday = useMemo(() => {
    const d = new Date(now);
    d.setDate(now.getDate() - todayIdxMon0);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [now, todayIdxMon0]);

  // 날짜/라벨 부착
  const weekWithDates = useMemo(
    () =>
      weeklyMenu.map((m, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const dateStr = `${d.getMonth() + 1}/${d.getDate()}`;
        return {
          ...m,
          idx: i, // 월=0
          label: WEEK_LABELS[i],
          dateStr,
          isToday: i === todayIdxMon0,
        };
      }),
    [weeklyMenu, monday, todayIdxMon0]
  );

  // 오늘~일요일만
  const remaining = useMemo(
    () => weekWithDates.slice(todayIdxMon0),
    [weekWithDates, todayIdxMon0]
  );

  return (
    <GradientScreenWrapper>
      <View style={styles.container}>
        {/* ⬆️ 상단 정보 박스: 운영시간/위치 (문구는 임시, 원하면 바꿔줘) */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>라일락 운영 정보</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>운영시간</Text>
            <Text style={styles.infoValue}>11:20-14:00</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>위치</Text>
            <Text style={styles.infoValue}>미래관</Text>
          </View>
        </View>

        <FlatList
          horizontal
          data={remaining}
          keyExtractor={(it) => `lilac-${it.idx}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SIDE_PADDING }}
          ItemSeparatorComponent={() => <View style={{ width: CARD_GAP }} />}
          snapToInterval={CARD_WIDTH + CARD_GAP}
          snapToAlignment="start"
          decelerationRate="fast"
          renderItem={({ item }) => (
            <View style={[styles.card, item.isToday && styles.cardToday]}>
              <Text
                style={[styles.cardDay, item.isToday && styles.cardDayToday]}
              >
                {item.label}요일 · {item.dateStr}
              </Text>
              {item.items.map((it, idx) => (
                <Text
                  key={idx}
                  style={[
                    styles.cardItem,
                    item.isToday && styles.cardItemToday,
                  ]}
                >
                  • {it}
                </Text>
              ))}
            </View>
          )}
        />
      </View>
    </GradientScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 12, gap: 8 },

  infoBox: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e9e9ef",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  infoLabel: { width: 68, fontSize: 13, color: "#666" },
  infoValue: { fontSize: 14, color: "#111", fontWeight: "600" },

  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e9e9ef",
    marginBottom: 15,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  cardToday: {
    backgroundColor: "#F2F5FF",
    borderColor: "#3B63C4",
    borderWidth: 1.5,
  },
  cardDay: {
    fontSize: 15,
    fontWeight: "700",
    color: "#3B63C4",
    marginBottom: 6,
  },
  cardDayToday: { color: "#2344A5" },
  cardItem: { fontSize: 13.5, color: "#444", marginTop: 3 },
  cardItemToday: { color: "#2A387A" },
});
