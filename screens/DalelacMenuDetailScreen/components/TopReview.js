import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TopReview({ review }) {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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

  return (
    <View style={styles.reviewCard}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{review.title}</Text>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{review.userId.name}</Text>
          <Text style={styles.reviewDate}>{formatDate(review.createdAt)}</Text>
        </View>
      </View>
      <Text style={styles.reviewContent}>{review.content}</Text>
      <View style={styles.ratingRow}>
        <Text style={styles.stars}>{renderStars(review.rating)}</Text>
        <Text style={styles.ratingText}>{review.rating.toFixed(1)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: "#f5f5f5", // 전체 회색톤 배경
    padding: 16,
    marginVertical: 4,
    borderRadius: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    flex: 1,
  },
  userInfo: {
    alignItems: "flex-end",
  },
  userName: {
    fontSize: 12,
    color: "#999",
  },
  reviewDate: {
    fontSize: 12,
    color: "#bbb",
  },
  reviewContent: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  stars: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});
