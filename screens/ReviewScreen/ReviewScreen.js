import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";
import { useNavigation, useRoute } from "@react-navigation/native";
import ReviewCard from "./components/ReviewCard";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { getReviewList } from "../../features/review/reviewSlice";

export default function ReviewScreen() {
  const dispatch = useDispatch();
  const { name: initialName, category: initialCategory } = useRoute().params;
  const navigation = useNavigation();

  const [onlyMine, setOnlyMine] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || "전체"
  );
  const [selectedMenu, setSelectedMenu] = useState(initialName || "전체");

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const { reviewList } = useSelector((state) => state.review);
  const { user } = useSelector((state) => state.user);

  const categories = ["전체", "한식", "분식", "퓨전"];

  const menuByCategory = {
    전체: [],
    한식: ["제육볶음", "비빔밥"],
    분식: ["등심돈까스", "김밥", "치킨마요덮밥"],
    일품: ["짜장면", "스파게티"],
  };

  const menuOptions =
    selectedCategory === "전체"
      ? [].concat(...Object.values(menuByCategory))
      : menuByCategory[selectedCategory] || [];
  const menuList = ["전체", ...menuOptions];

  const filteredReviews = (reviewList || []).filter((review) => {
    if (onlyMine && !(review?.userId._id == user?._id)) return false;
    if (
      selectedCategory !== "전체" &&
      review.menuId.category !== selectedCategory
    )
      return false;
    if (selectedMenu !== "전체" && review.menuId.name !== selectedMenu)
      return false;
    return true;
  });

  const handleEdit = (id) => {
    navigation.navigate("ReviewForm", { reviewId: id });
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  useEffect(() => {
    dispatch(getReviewList());
  }, []);

  return (
    <GradientScreenWrapper>
      <View style={styles.container}>
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.checkboxContainer, onlyMine && styles.checked]}
            onPress={() => setOnlyMine((prev) => !prev)}
            activeOpacity={0.7}
          >
            <Checkbox
              value={onlyMine}
              onValueChange={setOnlyMine}
              color={onlyMine ? "#1E40AF" : undefined}
              style={styles.checkbox}
            />
            <Text
              style={[styles.checkboxLabel, onlyMine && styles.checkedLabel]}
            >
              내 리뷰
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCategoryModalVisible(true)}
            style={[styles.tag, { width: "20%" }]}
          >
            <Text style={styles.tagText}>{selectedCategory}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setMenuModalVisible(true)}
            style={[styles.tag, { width: "30%" }]}
          >
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.tagText}>
              {selectedMenu}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ReviewForm")}
            style={[styles.tag, { width: "10%" }]}
          >
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.tagText}>
              +
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredReviews}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ReviewCard
              review={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
        />

        <Modal transparent visible={categoryModalVisible} animationType="fade">
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setCategoryModalVisible(false)}
          >
            <View style={styles.modal}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => {
                    setSelectedCategory(cat);
                    setSelectedMenu("전체"); // 선택된 메뉴 초기화
                    setCategoryModalVisible(false);
                  }}
                  style={styles.modalItem}
                >
                  <Text>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>

        <Modal transparent visible={menuModalVisible} animationType="fade">
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setMenuModalVisible(false)}
          >
            <View style={styles.modal}>
              {menuList.map((m) => (
                <TouchableOpacity
                  key={m}
                  onPress={() => {
                    setSelectedMenu(m);
                    setMenuModalVisible(false);
                  }}
                  style={styles.modalItem}
                >
                  <Text>{m}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>
      </View>
    </GradientScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#1E40AF",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: "30%",
  },
  checked: {
    backgroundColor: "#1E40AF",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E40AF",
  },

  checkedLabel: {
    color: "#FFFFFF", // Text에 적용
  },
  tag: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BFE2FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  selectedTag: {
    backgroundColor: "#A7D8FF",
  },
  tagText: {
    fontSize: 15,
    color: "#1E40AF",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: 240,
  },
  modalItem: {
    paddingVertical: 10,
  },
});
