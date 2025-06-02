import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ReviewFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { reviewId, menu: menuParam } = route.params || {};

  const isEdit = !!reviewId;

  const [menu, setMenu] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");

  // 수정 모드일 경우 API로 데이터 불러오기
  useEffect(() => {
    if (isEdit) {
      fetchReviewData(reviewId);
    } else if (menuParam) {
      setMenu(menuParam);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: isEdit ? "리뷰 수정" : "리뷰 작성",
    });
  }, [isEdit]);

  const fetchReviewData = async (id) => {};

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>메뉴</Text>
      <TextInput
        style={styles.input}
        placeholder="메뉴 이름"
        value={menu}
        onChangeText={setMenu}
      />

      <Text style={styles.label}>평점 (1~5)</Text>
      <TextInput
        style={styles.input}
        placeholder="5"
        keyboardType="numeric"
        value={rating.toString()}
        onChangeText={(text) => setRating(Number(text))}
      />

      <Text style={styles.label}>리뷰 내용</Text>
      <TextInput
        style={styles.textarea}
        placeholder="리뷰를 입력하세요"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isEdit ? "수정 완료" : "리뷰 작성"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: "5%",
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  textarea: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    height: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlignVertical: "top",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
