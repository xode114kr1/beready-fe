import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios"; // 또는 backApi 사용 가능

export default function MenuCreateModal({ visible, onClose }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async () => {
    if (!name || !price || !category) {
      Alert.alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post("http://YOUR_BACKEND_URL/api/menu", {
        name,
        category,
        description,
        price: parseInt(price),
      });

      if (res.data.status === "success") {
        Alert.alert("메뉴가 추가되었습니다.");
        setName("");
        setCategory("");
        setDescription("");
        setPrice("");
        onClose();
      } else {
        throw new Error("메뉴 추가 실패");
      }
    } catch (error) {
      Alert.alert("에러", error.message);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>메뉴 추가</Text>
          <TextInput
            placeholder="메뉴 이름"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="카테고리 (예: 분식)"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
          />
          <TextInput
            placeholder="설명"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <TextInput
            placeholder="가격"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={styles.input}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>추가</Text>
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
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: "#3399FF",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
