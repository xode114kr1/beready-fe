// components/ReviewCard.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ReviewCard({ review, user, onEdit, onDelete }) {
  const isMine = review.userId._id.toString() === user?._id.toString();
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.menuName}>{review.menuId?.name}</Text>
        <Text style={styles.user}>{review.userId?.name}</Text>
      </View>
      <Text style={styles.content}>{review.content}</Text>
      <Text style={styles.rating}>⭐ {review.rating.toFixed(1)}</Text>
      {isMine && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => onEdit(review._id)}
          >
            <Text style={styles.btnText}>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => onDelete(review._id)}
          >
            <Text style={styles.btnText}>삭제</Text>
          </TouchableOpacity>
        </View>
      )}
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
  myReview: {
    display: "flex",
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
