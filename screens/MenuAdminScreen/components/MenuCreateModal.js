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
} from "react-native";
import axios from "axios";

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

  const isEditMode = !!initialData;
  useEffect(() => {
    if (visible) {
      setName(initialData?.name || "");
      setCategory(initialData?.category || "분식");
      setDescription(initialData?.description || "");
      setStatus(initialData?.status || "상시");
      setPrice(initialData?.price?.toString() || "");
    }
  }, [visible, initialData]);

  const handleSubmit = async () => {
    if (!name || !category || !description || !price) {
      console.error("폼을 다시 입력");
      return;
    }
    const payload = {
      name,
      category,
      description,
      price: Number(price),
      status,
    };
    if (isEditMode) {
      onEdit(initialData._id, payload);
    } else {
      onCreate(payload);
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
});
