import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";
import colors from "../../styles/colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { backApi } from "../../utils/api";
import TopReview from "./components/TopReview";
import { useDispatch, useSelector } from "react-redux";
import { getTopReviewList } from "../../features/review/reviewSlice";

export default function MenuDetailScreen({ route }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { topReviewList } = useSelector((state) => state.review);
  console.log(topReviewList);
  const { menu: initialMenu } = route.params;
  const [menu, setMenu] = useState(initialMenu);
  const navigator = useNavigation();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
      </>
    );
  };

  const fetchMenuData = async () => {
    try {
      const res = await backApi.get(`/menu/${initialMenu._id}`);
      setMenu(res.data.data);
    } catch (error) {
      console.error("메뉴 정보 불러오기 실패 ", error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchMenuData();
      dispatch(getTopReviewList(menu._id));
    }
  }, [isFocused]);

  return (
    <GradientScreenWrapper>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.image_view}>
            <Image source={{ uri: menu.image }} style={styles.image} />
          </View>
          <Text style={styles.name}>{menu.name}</Text>
          <Text style={styles.price}>
            <Text style={{ fontWeight: "bold" }}>가격 : </Text>
            {menu.price.toLocaleString()}원
          </Text>
          <Text style={styles.description}>
            <Text style={{ fontWeight: "bold" }}>설명 : </Text>
            {menu.description}
          </Text>
          <Text style={styles.rating}>
            <Text style={{ fontWeight: "bold" }}>평점 : </Text>
            {renderStars(menu.rating)} {menu.rating.toFixed(1)}
          </Text>
        </View>

        <Text style={styles.reviewTitle}>대표 리뷰</Text>
        {topReviewList && topReviewList.length > 0 ? (
          topReviewList.map((review) => (
            <TopReview key={review._id} review={review} />
          ))
        ) : (
          <View style={styles.noReviewBox}>
            <Text style={styles.noReviewText}>
              아직 리뷰가 없어요. 첫 리뷰를 작성해보세요!
            </Text>
          </View>
        )}
        <View style={styles.button_contanier}>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() =>
              navigator.navigate("Review", {
                name: menu.name,
                category: menu.category,
              })
            }
          >
            <Text style={styles.moreButtonText}>리뷰 더보기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => navigation.navigate("ReviewForm", { menu: menu })}
          >
            <Text style={styles.moreButtonText}>리뷰 작성하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GradientScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 24,
    borderLeftColor: colors.leftBorder,
    borderLeftWidth: 5,
  },
  image_view: {
    width: "100%",
    height: 180,
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "cover",
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  reviewBox: {
    backgroundColor: "#DFF2FF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  reviewUser: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  reviewContent: {
    fontSize: 14,
    marginBottom: 4,
  },
  reviewRating: {
    fontSize: 13,
  },
  button_contanier: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "15%",
  },
  moreButton: {
    marginTop: 12,
    marginBottom: 20,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: "#BFE2FF",
  },
  moreButtonText: {
    color: "#2471D6",
    fontWeight: "bold",
  },
  noReviewBox: {
    padding: 20,
    marginVertical: 4,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  noReviewText: {
    fontSize: 14,
    color: "#999",
  },
});
