import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";
import { useEffect, useState } from "react";
import { backApi } from "../../utils/api";
import RestaurantCardCarousel from "./components/RestaurantCardCarousel";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [randomMenu, setRandomMenu] = useState(null);

  const fetchRandomMenu = async () => {
    try {
      const res = await backApi.get("/menu/random");
      setRandomMenu(res.data.data);
    } catch (error) {
      console.log("fetchRandomMenu error : ", error.message);
    }
  };

  useEffect(() => {
    fetchRandomMenu();
  }, []);

  return (
    <GradientScreenWrapper>
      <View style={styles.container}>
        <View style={styles.imageBox}>
          <Image
            source={require("../../assets/Logo.png")}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>Beready</Text>
        </View>

        <RestaurantCardCarousel randomMenu={randomMenu} />

        <View style={styles.rowButtons}>
          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => navigation.navigate("Wait")}
          >
            <Text style={styles.bigButtonText}>대기인원{"\n"}바로가기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => navigation.navigate("Menu")}
          >
            <Text style={styles.bigButtonText}>메뉴{"\n"}바로가기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GradientScreenWrapper>
  );
}

const BLUE = "#00A8FF";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: "center",
  },
  imageBox: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  logoImage: { width: 44, height: 44, resizeMode: "contain" },
  logoText: { fontSize: 18, fontWeight: "600" },

  restaurantBox: {
    backgroundColor: "#F3F5F7",
    borderRadius: 12,
    borderLeftColor: colors.leftBorder,
    borderLeftWidth: 4,
    padding: 14,
    alignItems: "center",
  },
  restaurantTitle: { fontSize: 18, fontWeight: "bold" },
  time: { fontSize: 13, color: "#5A6570" },

  heroBox: {
    height: 190,
    borderWidth: 3,
    borderColor: BLUE,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.02)",
    position: "relative",
    overflow: "hidden",
    justifyContent: "flex-end",
    paddingBottom: 18,
  },
  menuBanner: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 18,
    backgroundColor: "#D6D6D6", // 스케치의 회색 배너
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  bannerTitle: { fontSize: 14, fontWeight: "700", marginBottom: 6 },
  bannerMenu: { fontSize: 15, lineHeight: 20 },

  /* 하단 버튼 2개 */
  rowButtons: {
    paddingHorizontal: 15,
    flexDirection: "row",
    gap: 14,
  },
  bigButton: {
    flex: 1,
    backgroundColor: BLUE,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  bigButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  reviewWrap: { gap: 10, marginTop: 4 },
  reviewBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderLeftColor: colors.leftBorder,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewStar: { fontSize: 15, fontWeight: "bold" },
  reviewText: { marginTop: 4, color: "#444" },
});
