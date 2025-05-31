// components/ReviewCard.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ReviewCard({ review, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.menuName}>{review.menu}</Text>
        <Text style={styles.user}>{review.user}</Text>
      </View>
      <Text style={styles.content}>"{review.content}"</Text>
      <Text style={styles.rating}>⭐ {review.rating.toFixed(1)}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.editBtn} onPress={() => onEdit(review)}>
          <Text style={styles.btnText}>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => onDelete(review.id)}
        >
          <Text style={styles.btnText}>삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0F0FF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  user: {
    color: "#666",
  },
  content: {
    marginVertical: 8,
    color: "#333",
  },
  rating: {
    marginBottom: 8,
    color: "#F8B400",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  editBtn: {
    backgroundColor: "#D6ECFF",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteBtn: {
    backgroundColor: "#FFD5D5",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 13,
  },
});
