import React, { useCallback, useEffect, useState } from "react";
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
import { useIsFocused } from "@react-navigation/native";
import { backApi } from "../../utils/api";

export default function DalelacReviewScreen() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

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
  const { categoryList, menuByCategory } = useSelector((state) => state.menu);
  const { user } = useSelector((state) => state.user);

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

  const handleDelete = async (id) => {
    try {
      const res = await backApi.delete(`/review/${id}`);
      dispatch(getReviewList());
    } catch (error) {
      console.error("리뷰 삭제 실패 : ", error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getReviewList());
    }
  }, [isFocused, dispatch]);
  return (
    <GradientScreenWrapper variant="green">
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
              color={onlyMine ? "#3CB371" : undefined}
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
            style={[styles.tag, { width: "25%" }]}
          >
            <Text style={styles.tagText}>{selectedCategory}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setMenuModalVisible(true)}
            style={[styles.tag, { width: "35%" }]}
          >
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.tagText}>
              {selectedMenu}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredReviews}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ReviewCard
              review={item}
              user={user}
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
              {categoryList.map((cat) => (
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
    color: "#22543D",
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
    borderColor: "#3CB371",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: "30%",
  },
  checked: {
    backgroundColor: "#3CB371",
    borderColor: "#3CB371",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#3CB371",
  },
  checkedLabel: {
    color: "#FFFFFF",
  },
  tag: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAFBF2",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#BFE8D1",
  },
  selectedTag: {
    backgroundColor: "#DDF6EA",
    borderColor: "#BFE8D1",
  },
  tagText: {
    fontSize: 15,
    color: "#2F855A",
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
