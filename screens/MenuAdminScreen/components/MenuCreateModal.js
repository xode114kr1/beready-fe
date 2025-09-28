import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Image,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

export default function MenuCreateModal({
  visible,
  onClose,
  onCreate,
  initialData,
  onEdit,
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("분식");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("상시");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  const isEditMode = !!initialData;
  useEffect(() => {
    if (visible) {
      setName(initialData?.name || "");
      setCategory(initialData?.category || "분식");
      setDescription(initialData?.description || "");
      setStatus(initialData?.status || "상시");
      setPrice(initialData?.price?.toString() || "");
      setImage(initialData?.imageUrl ? { uri: initialData.imageUrl } : null);
    }
  }, [visible, initialData]);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "권한 필요",
        "이미지를 업로드하려면 사진 접근 권한이 필요합니다"
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    try {
      const ok = await requestPermission();
      if (!ok) return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // or 'images'
        allowsEditing: true,
        quality: 0.85, // 0~1
      });

      if (!result.canceled && result.assets?.length > 0) {
        const asset = result.assets[0];
        const uri = asset.uri;
        const fileName = asset.fileName || uri.split("/").pop() || "upload.jpg";
        const mime =
          asset.mimeType ||
          (fileName.toLowerCase().endsWith(".png")
            ? "image/png"
            : "image/jpeg");

        setImage({ uri, fileName, mime });
      }
    } catch (e) {
      console.error("pickImage error:", e);
    }
  };

  const removeImage = () => setImage(null);

  const handleSubmit = async () => {
    if (!name || !category || !description || !price) {
      console.error("폼을 다시 입력");
      return;
    }
    const form = new FormData();
    form.append("name", name);
    form.append("category", category);
    form.append("description", description);
    form.append("price", Number(price));
    form.append("status", status);
    if (image?.uri) {
      form.append("image", {
        uri: image.uri,
        name: image.fileName || "upload.jpg",
        type: image.mime || "image/jpeg",
      });
    }
    if (isEditMode) {
      onEdit(initialData._id, form, !!image?.uri);
    } else {
      onCreate(form, !!image?.uri);
    }
  };

  const categoryOptions = ["분식", "양식", "일품"];
  const statusOptions = ["상시", "한철", "중단"];

  useEffect(() => {
    if (!visible) {
      setName("");
      setCategory("분식");
      setDescription("");
      setStatus("상시");
      setPrice(0);
      setImage(null);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.avoiding}
          >
            <View style={styles.container}>
              <Text style={styles.title}>메뉴 추가</Text>

              <TextInput
                placeholder="메뉴 이름"
                placeholderTextColor="#666"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />

              <Text style={styles.label}>카테고리</Text>
              <View style={styles.categoryRow}>
                {categoryOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.categoryButton,
                      category === option && styles.categoryButtonSelected,
                    ]}
                    onPress={() => setCategory(option)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        category === option && styles.categoryTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.label}>이미지</Text>
              {image?.uri ? (
                <View style={{ alignItems: "center", marginBottom: 12 }}>
                  <Image
                    source={{ uri: image.uri }}
                    style={{ width: 180, height: 180, borderRadius: 8 }}
                    resizeMode="cover"
                  />

                  <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
                    <TouchableOpacity
                      style={styles.secondaryButton}
                      onPress={pickImage}
                    >
                      <Text style={styles.secondaryText}>다시 선택</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.secondaryButton}
                      onPress={removeImage}
                    >
                      <Text style={styles.secondaryText}>삭제</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={pickImage}
                >
                  <Text style={styles.secondaryText}>이미지 선택</Text>
                </TouchableOpacity>
              )}
              <TextInput
                placeholder="설명"
                placeholderTextColor="#666"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                style={[styles.input, styles.descriptionInput]}
              />
              <TextInput
                placeholder="가격"
                placeholderTextColor="#666"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                style={styles.input}
              />
              <Text style={styles.label}>상태</Text>
              <View style={styles.categoryRow}>
                {statusOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.categoryButton,
                      status === option && styles.categoryButtonSelected,
                    ]}
                    onPress={() => setStatus(option)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        status === option && styles.categoryTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                  {isEditMode ? "수정" : "추가"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onClose}
                style={[
                  styles.addButton,
                  { backgroundColor: "#aaa", marginTop: 8 },
                ]}
              >
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  avoiding: {
    width: "100%",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
    marginTop: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 15,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: "top",
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  categoryButton: {
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
  },
  categoryButtonSelected: {
    backgroundColor: "#3399FF",
    borderColor: "#3399FF",
  },
  categoryText: {
    color: "#555",
    fontWeight: "500",
  },
  categoryTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#3399FF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  secondaryButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  secondaryText: { color: "#333", fontWeight: "600" },
});
