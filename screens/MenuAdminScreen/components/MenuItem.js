import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

export default function MenuItem({
  menu,
  isSelected,
  onToggleSelect,
  handleMenuEditModal,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "상시":
        return "#3399FF"; // 파랑
      case "한철":
        return "#FFD700"; // 노랑
      case "중단":
        return "#999999"; // 회색
      default:
        return "#ccc"; // 기본
    }
  };
  return (
    <View style={styles.itemRow}>
      <Checkbox value={isSelected} onValueChange={onToggleSelect} />
      <TouchableOpacity
        onPress={() => handleMenuEditModal(menu._id)}
        style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
        activeOpacity={0.7}
      >
        <Text style={[styles.cell, { flex: 2 }]}>{menu.name}</Text>
        <Text style={[styles.cell, { flex: 1 }]}>
          {menu.price.toLocaleString()}원
        </Text>
        <Text style={[styles.cell, { flex: 1 }]}>{menu.category}</Text>
        <View
          style={[
            styles.statusButton,
            { backgroundColor: getStatusColor(menu.status) },
          ]}
        >
          <Text style={{ color: "#fff" }}>{menu.status}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cell: {
    flex: 1,
    marginLeft: 8,
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
});
