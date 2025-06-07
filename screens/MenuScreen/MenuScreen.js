import { View, StyleSheet } from "react-native";
import MenuCard from "./components/MenuCard";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../features/menu/menuSlice";

const menuItems = [
  {
    image: "https://source.unsplash.com/featured/?bibimbap",
    name: "두루치기 정식",
    category: "한식",
    price: 6000,
  },
  {
    image: "https://source.unsplash.com/featured/?bibimbap",
    name: "비빔밥",
    category: "한식",
    price: 5500,
  },
  {
    image: "https://source.unsplash.com/featured/?pork-cutlet",
    name: "돈까스 정식",
    category: "분식",
    price: 6500,
  },
  {
    image: "https://source.unsplash.com/featured/?ramen",
    name: "라면 & 김밥 세트",
    category: "분식",
    price: 4500,
  },
  {
    image: "https://source.unsplash.com/featured/?curry",
    name: "치킨카레",
    category: "한식",
    price: 5000,
  },
  {
    image: "https://source.unsplash.com/featured/?jjajangmyeon",
    name: "짜장면 정식",
    category: "중식",
    price: 4800,
  },
  {
    image: "https://source.unsplash.com/featured/?spaghetti",
    name: "토마토 스파게티",
    category: "한식",
    price: 5200,
  },
  {
    image: "https://source.unsplash.com/featured/?udon",
    name: "우동 & 주먹밥",
    category: "한식",
    price: 5000,
  },
  {
    image: "https://source.unsplash.com/featured/?budae-jjigae",
    name: "부대찌개",
    category: "한식",
    price: 6000,
  },
];

export default function MenuScreen() {
  const dispatch = useDispatch();
  const { menuList } = useSelector((state) => state.menu);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getMenu());
  }, []);

  return (
    <GradientScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {menuList?.map((menu, index) => (
            <MenuCard
              key={menu._id ?? index}
              menu={menu}
              onPress={() => navigation.navigate("MenuDetail", { menu })}
            />
          ))}
        </View>
      </ScrollView>
    </GradientScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 32,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
});
