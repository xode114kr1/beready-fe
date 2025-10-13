// screens/LilacMenuList/LilacMenuScreen.js
import React, { useEffect, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";
import { getLilacMenuList } from "../../features/lilac/lilacSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";

const { width } = Dimensions.get("window");
const CARD_GAP = 12;
const CARD_WIDTH = Math.round(width * 0.8);
const SIDE_PADDING = Math.round((width - CARD_WIDTH) / 2);

const lilacMenuDump = [
  {
    date: "2025-10-13",
    label: "10월 13일 (Monday)",
    menus: [
      "잡곡밥/흰밥",
      "순두부찌개",
      "떡고기산적",
      "멸치볶음",
      "다시마채무침",
      "마카로니샐러드",
      "그린샐러드",
      "발사믹/오리엔지드레싱",
      "배추김치",
    ],
  },
  {
    date: "2025-10-14",
    label: "10월 14일 (Tuesday)",
    menus: [
      "잡곡밥/흰밥",
      "건새우미역국",
      "매운순살닭조림",
      "단무지",
      "청포묵무침",
      "양상추샐러드",
      "크리미소스",
      "배추김치",
    ],
  },
  {
    date: "2025-10-15",
    label: "10월 15일 (Wednesday)",
    menus: [
      "잡곡밥/흰밥",
      "시래기된장국",
      "두부조림",
      "연근조림",
      "김치전",
      "배추김치",
    ],
  },
];

const toYMD = (d) => {
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
};

export default function LilacMenuScreen() {
  const { menuList, isLoading, error } = useSelector((state) => state.lilac);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLilacMenuList());
  }, []);

  const todayStr = toYMD(new Date());
  const remaining = useMemo(() => {
    const base = (menuList || lilacMenuDump)
      .filter((d) => (d?.date || "") >= todayStr)
      .sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0))
      .map((d, i) => ({
        ...d,
        idx: i,
        isToday: d.date === todayStr,
      }));
    return base;
  }, [todayStr]);
  return (
    <GradientScreenWrapper>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Spinner size={64} thickness={6} />
          </View>
        ) : (
          <View style={styles.container}>
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
              ItemSeparatorComponent={() => (
                <View style={{ width: CARD_GAP }} />
              )}
              snapToInterval={CARD_WIDTH + CARD_GAP}
              snapToAlignment="start"
              decelerationRate="fast"
              renderItem={({ item }) => (
                <View style={[styles.card, item.isToday && styles.cardToday]}>
                  <Text
                    style={[
                      styles.cardDay,
                      item.isToday && styles.cardDayToday,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {(item.menus || []).map((menu, idx) => (
                    <Text
                      key={idx}
                      style={[
                        styles.cardItem,
                        item.isToday && styles.cardItemToday,
                      ]}
                    >
                      • {menu}
                    </Text>
                  ))}
                </View>
              )}
            />
          </View>
        )}
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
