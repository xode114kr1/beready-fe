import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { backApi } from "../../utils/api";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";
import { useSelector } from "react-redux";

export default function ReviewFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isLogin } = useSelector((state) => state.user);
  const { reviewId, menu: menuParam } = route.params || {};

  const isEdit = !!reviewId;

  const [menu, setMenu] = useState(menuParam?.name || "");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const menuId = menuParam?._id;

  useEffect(() => {
    if (isEdit) {
      fetchReviewData();
    }
  }, []);

  useEffect(() => {
    if (!isLogin) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Profile", state: { routes: [{ name: "SignIn" }] } }],
      });
    }
  }, [isLogin]);

  useEffect(() => {
    navigation.setOptions({
      title: isEdit ? "리뷰 수정" : "리뷰 작성",
    });
  }, [isEdit]);

  const fetchReviewData = async () => {
    try {
      const res = await backApi.get(`/review/${reviewId}`);
      const review = res.data.data;
      setMenu(review.menuId.name);
      setTitle(review.title);
      setRating(review.rating);
      setContent(review.content);
    } catch (error) {
      console.log("리뷰 불러오기 실패,", error.message);
    }
  };

  const createReview = async () => {
    try {
      const res = await backApi.post("/review", {
        title,
        content,
        rating,
        menuId,
      });
      navigation.goBack();
    } catch (error) {
      console.log("리뷰 생성 오류 : ", error.message);
    }
  };
  const editReview = async () => {
    try {
      const res = await backApi.post(`/review/${reviewId}`, {
        title,
        content,
        rating,
      });
      navigation.goBack();
    } catch (error) {
      console.log("리뷰 수정 오류 : ", error.message);
    }
  };

  const handleSubmit = async () => {
    if (isEdit) {
      await editReview();
    } else {
      await createReview();
    }
  };

  return (
    <GradientScreenWrapper variant="green">
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.label}>메뉴</Text>
            <Text style={styles.input}>{menu}</Text>

            <Text style={styles.label}>평점 (1~5)</Text>
            <TextInput
              style={styles.input}
              placeholder="5"
              keyboardType="numeric"
              value={rating.toString()}
              onChangeText={(text) => setRating(Number(text))}
            />

            <Text style={styles.label}>리뷰 제목</Text>
            <TextInput
              style={styles.input}
              placeholder="제목을 입력하세요"
              value={title}
              onChangeText={setTitle}
              multiline
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </GradientScreenWrapper>
  );
}

const styles = StyleSheet.create({
  avoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: "5%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#22543D",
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "600",
    color: "#2F855A",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#BFE8D1",
    color: "#1A202C",
  },
  readonly: {
    color: "#2D3748",
  },
  textarea: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    height: 120,
    borderWidth: 1,
    borderColor: "#BFE8D1",
    textAlignVertical: "top",
    marginBottom: 24,
    color: "#1A202C",
  },
  button: {
    backgroundColor: "#3CB371",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#3CB371",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
