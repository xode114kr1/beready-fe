import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Pressable,
} from "react-native";
import MenuItem from "./components/MenuItem";
import MenuCreateModal from "./components/MenuCreateModal";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../features/menu/menuSlice";
import { backApi } from "../../utils/api";

export default function MenuAdminScreen() {
  const dispatch = useDispatch();
  const { menuList, menuCount, isLoading, error, categoryList } = useSelector(
    (state) => state.menu
  );
  const [filteredMenuList, setFilteredMenuList] = useState([]);
  const [filteredMenuCount, setFilteredMenuCount] = useState([]);
  const [editingMenu, setEditingMenu] = useState(null);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const deleteSelected = async () => {
    try {
      const res = await backApi.delete("/menu", { data: { ids: selectedIds } });
      dispatch(getMenu());
    } catch (error) {
      console.error("메뉴 삭제 오류 : ", error);
    }
  };

  const handleCreate = async (newMenu) => {
    try {
      const res = await backApi.post("/menu", newMenu);
      dispatch(getMenu());
      setIsModalVisible(false);
    } catch (error) {
      console.error("메뉴 생성 오류 : ", error);
    }
  };

  const handleEdit = async (id, editMenu) => {
    try {
      const res = await backApi.put(`/menu/${id}`, editMenu);
      dispatch(getMenu());
      setIsModalVisible(false);
    } catch (error) {
      console.error("메뉴 수정 오류 : ", error);
    }
  };

  const handleMenuEditModal = (id) => {
    const selected = menuList.find((m) => m._id === id);
    if (!selected) return;
    setEditingMenu(selected);
    setIsModalVisible(true);
  };

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  useEffect(() => {
    if (!menuList) return;
    let updatedMenuList =
      selectedCategory === "전체"
        ? menuList
        : menuList.filter((menu) => menu.category === selectedCategory);
    updatedMenuList = updatedMenuList.filter((menu) =>
      menu.name.includes(search)
    );
    setFilteredMenuList(updatedMenuList);
    setFilteredMenuCount(updatedMenuList ? updatedMenuList.length : 0);
  }, [menuList, selectedCategory, search]);

  return (
    <GradientScreenWrapper>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.searchRow}>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setCategoryModalVisible(true)}
              >
                <Text>{selectedCategory}</Text>
              </TouchableOpacity>
              <TextInput
                placeholder="메뉴 검색"
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
              />
            </View>
            <View style={styles.buttonContanier}>
              <Text style={styles.textInfo}>Total : {filteredMenuCount}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.createButton}
                  onPress={() => {
                    setEditingMenu(null);
                    setIsModalVisible(true);
                  }}
                >
                  <Text style={styles.buttonText}>생성</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={deleteSelected}
                >
                  <Text style={styles.buttonText}>삭제</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.listWrapper}>
              {(filteredMenuList || []).map((menu) => (
                <MenuItem
                  key={menu._id}
                  menu={menu}
                  isSelected={selectedIds.includes(menu._id)}
                  onToggleSelect={() => toggleSelect(menu._id)}
                  handleMenuEditModal={handleMenuEditModal}
                />
              ))}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <MenuCreateModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setEditingMenu(null);
        }}
        onCreate={handleCreate}
        onEdit={handleEdit}
        initialData={editingMenu}
      />
      <Modal transparent visible={categoryModalVisible} animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setCategoryModalVisible(false)}
        >
          <View style={styles.modal}>
            {categoryList.map((m) => (
              <TouchableOpacity
                key={m}
                onPress={() => {
                  setSelectedCategory(m);
                  setCategoryModalVisible(false);
                }}
                style={styles.modalItem}
              >
                <Text>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </GradientScreenWrapper>
  );
}

const styles = StyleSheet.create({
  avoidingView: { flex: 1 },
  container: { padding: 16 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  searchRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  dropdown: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginRight: 8,
  },
  searchButton: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
  },
  buttonContanier: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  textInfo: {
    paddingTop: 10,
    color: "#5B5B5B",
    fontSize: 13,
  },
  buttonRow: {
    flexDirection: "row",
  },
  createButton: {
    backgroundColor: "#3399FF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#FF5A5A",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  listWrapper: {
    paddingBottom: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: 240,
  },
  modalItem: {
    paddingVertical: 10,
  },
});
