import React, { useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";

const THEMES = {
  blue: {
    accent: "#3B63C4",
    boxBorder: "#3B63C4",
    cardBorder: "#3B63C4",
    dot: "#3B63C4",
  },
  green: {
    accent: "#3CB371",
    boxBorder: "#3CB371",
    cardBorder: "#3CB371",
    dot: "#3CB371",
  },
};

export default function RestaurantCardCarousel() {
  // --- 하드코딩 카드 데이터 (이미지 경로만 네 프로젝트에 맞게 교체) ---
  const cards = [
    {
      key: "lilac",
      theme: "blue",
      image: require("../../../assets/lilac.jpg"),
      title: "미래관 - 라일락",
      time: "Open 11:30 / Close 14:00",
      boxTitle: "대표 메뉴",
      menu: ["제육볶음", "샐러드바", "디저트(리일일, 요거트)"],
    },
    {
      key: "dallae",
      theme: "green",
      image: require("../../../assets/dalelac.jpg"),
      title: "위드센터 - 다래락",
      time: "Open 09:00 / Close 19:00",
      boxTitle: "추천 메뉴",
      menu: ["스멸김밥 3,500원", "된장국", "샐러드"],
    },
  ];

  const [page, setPage] = useState(0);

  return (
    <View style={styles.wrap}>
      <FlatList
        data={cards}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(it) => it.key}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        renderItem={({ item }) => {
          const t = THEMES[item.theme];
          return (
            <View
              style={[
                styles.card,
                { borderColor: t.cardBorder, shadowColor: t.cardBorder },
              ]}
            >
              <View style={styles.imageHolder}>
                <Image source={item.image} style={styles.image} />
              </View>

              <Text style={[styles.title, { color: t.accent }]}>
                {item.title}
              </Text>
              <Text style={styles.time}>{item.time}</Text>

              <View style={[styles.menuBox, { borderColor: t.boxBorder }]}>
                <Text style={[styles.menuTitle, { color: t.accent }]}>
                  {item.boxTitle}
                </Text>
                {item.menu.map((m, i) => (
                  <Text key={i} style={styles.menuLine}>
                    {m}
                  </Text>
                ))}
              </View>

              <View style={{ height: 8 }} />
            </View>
          );
        }}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x /
              e.nativeEvent.layoutMeasurement.width
          );
          setPage(index);
        }}
      />

      <View style={styles.dots}>
        {cards.map((c, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              page === i && {
                backgroundColor: THEMES[c.theme].dot,
                width: 10,
                height: 10,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: "100%", paddingTop: 8 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  brand: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1A1A",
  },

  card: {
    width: 350, // 시안처럼 중앙부 고정폭 카드
    backgroundColor: "#fff",
    borderRadius: 24,
    borderWidth: 2, // 테두리 강조 (테마 색 적용)
    padding: 16,
    overflow: "hidden",

    // 그림자 디테일
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  imageHolder: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 4,
  },
  time: {
    fontSize: 16,
    color: "#1F2937",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 14,
  },

  // Inner menu box with rounded blue/green border
  menuBox: {
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },
  menuLine: {
    fontSize: 16,
    color: "#111",
    marginBottom: 6,
  },

  // Dots
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 10,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#D1D5DB",
  },
});
