// screens/HomeScreen/HomeScreen.js
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";
import { useEffect, useState } from "react";
import { backApi } from "../../utils/api";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [randomReviewOne, setRandomReviewOne] = useState();
  const [randomReviewTwo, setRandomReviewTwo] = useState();
  const [randomMenu, setRandomMenu] = useState(null);
  const fetchRandomMenu = async () => {
    try {
      const res = await backApi.get("/menu/random");
      setRandomMenu(res.data.data);
    } catch (error) {
      console.log("fetchRandomMenu error : ", error.message);
    }
  };
  const fetchRandomReview = async () => {
    try {
      const res1 = await backApi.get("/review/random");
      const res2 = await backApi.get("/review/random");
      setRandomReviewOne(res1.data.data);
      setRandomReviewTwo(res2.data.data);
    } catch (error) {
      console.log("fetchRandomReview error", error.message);
    }
  };
  useEffect(() => {
    fetchRandomMenu();
    fetchRandomReview();
  }, []);

  return (
    <GradientScreenWrapper>
      <View style={styles.container}>
        <View style={styles.restaurantBox}>
          <Text style={styles.restaurantTitle}>위드센터식당 다래락</Text>
          <Text style={styles.time}>Open4시 30분</Text>
          <Text style={styles.time}>Close 18시 30분</Text>
        </View>
        {/* 추천 메뉴 박스 */}
        <View style={styles.recommendBox}>
          <Text style={styles.recommendTitle}>오늘의 추천 메뉴 📸</Text>
          <Text style={styles.recommendMenu}>
            {randomMenu?.name} - {randomMenu?.price.toLocaleString()}원
          </Text>
        </View>
        {/* 버튼들 */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Wait")}
        >
          <Text style={styles.buttonText}>예상 대기인원 검색</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Menu")}
        >
          <Text style={styles.buttonText}>학식당 메뉴 상세</Text>
        </TouchableOpacity>
        <View style={styles.reviewBox}>
          <Text style={styles.reviewStar}>
            ⭐️ {randomReviewOne?.menuId.name}
          </Text>
          <Text style={styles.reviewText}>
            "{randomReviewOne?.content}" - {randomReviewOne?.userId.name}
          </Text>
        </View>
        <View style={styles.reviewBox}>
          <Text style={styles.reviewStar}>
            ⭐️ {randomReviewTwo?.menuId.name}
          </Text>
          <Text style={styles.reviewText}>
            "{randomReviewTwo?.content}" - {randomReviewTwo?.userId.name}
          </Text>
        </View>
      </View>
    </GradientScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    justifyContent: "center",
  },
  restaurantBox: {
    backgroundColor: "#eee",
    borderRadius: 12,
    borderLeftColor: colors.leftBorder,
    borderLeftWidth: 4,
    padding: 16,
    alignItems: "center",
  },
  restaurantTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  time: {
    fontSize: 14,
    color: "#555",
  },
  recommendBox: {
    backgroundColor: "#D6ECFF",
    borderRadius: 12,
    padding: 16,
  },
  recommendTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  recommendMenu: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#339CFF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  reviewBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    borderLeftColor: colors.leftBorder,
    borderLeftWidth: 4,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewStar: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewText: {
    marginTop: 4,
    color: "#444",
  },
  reviewButton: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  reviewButtonText: {
    fontSize: 16,
  },
});
