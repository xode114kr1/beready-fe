import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

export default function MenuItem({ menu, isSelected, onToggleSelect }) {
  return (
    <View style={styles.itemRow}>
      <Checkbox value={isSelected} onValueChange={onToggleSelect} />
      <Text style={[styles.cell, { flex: 2 }]}>{menu.name}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>
        {menu.price.toLocaleString()}원
      </Text>
      <Text style={[styles.cell, { flex: 1 }]}>{menu.category}</Text>
      <TouchableOpacity
        style={[
          styles.statusButton,
          { backgroundColor: menu.status === "상시" ? "#3399FF" : "#ccc" },
        ]}
      >
        <Text style={{ color: "#fff" }}>{menu.status}</Text>
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
