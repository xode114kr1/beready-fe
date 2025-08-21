import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  logout /*, setName */,
  updateName,
} from "../../features/user/userSlice";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";
import { backApi } from "../../utils/api";
// import { backApi } from "../../utils/api"; // 너 프로젝트에 맞게 주석 해제

export default function MyPageScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const initialName = useMemo(() => user?.name || "사용자", [user]);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [pwModal, setPwModal] = useState(false);
  const [currPw, setCurrPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          dispatch(logout());
        },
      },
    ]);
  };

  const saveName = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert("이름 오류", "이름을 입력해 주세요.");
      return;
    }
    try {
      dispatch(updateName(trimmed));
      setEditing(false);
      Alert.alert("완료", "이름이 변경되었습니다.");
    } catch (e) {
      Alert.alert(
        "실패",
        e?.response?.data?.error || "이름 변경에 실패했습니다."
      );
    }
  };

  const cancelEdit = () => {
    setName(initialName);
    setEditing(false);
  };

  const openPwModal = () => {
    setCurrPw("");
    setNewPw("");
    setNewPw2("");
    setPwModal(true);
  };

  const submitPassword = async () => {
    if (!currPw || !newPw) {
      Alert.alert("입력 필요", "현재/새 비밀번호를 모두 입력해 주세요.");
      return;
    }
    if (newPw.length < 6) {
      Alert.alert("조건 미충족", "새 비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    if (newPw !== newPw2) {
      Alert.alert("불일치", "새 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    try {
      // TODO: 서버 연동
      // await backApi.patch("/users/me/password", {
      //   currentPassword: currPw,
      //   newPassword: newPw,
      // });
      setPwModal(false);
      Alert.alert("완료", "비밀번호가 변경되었습니다.");
    } catch (e) {
      Alert.alert(
        "실패",
        e?.response?.data?.error || "비밀번호 변경에 실패했습니다."
      );
    }
  };

  return (
    <GradientScreenWrapper>
      <View style={styles.container}>
        {/* 상단 프로필 영역 */}
        <View style={styles.headerCard}>
          <View style={styles.avatarPlaceholder}>
            <Text style={{ fontSize: 22 }}>👤</Text>
          </View>

          {/* 이름 + 인라인 수정 */}
          {!editing ? (
            <View style={styles.row}>
              <Text style={styles.name}>{name}</Text>
              <Pressable
                style={styles.inlineBtn}
                onPress={() => setEditing(true)}
              >
                <Text style={styles.inlineBtnTxt}>수정</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.editRow}>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="이름 입력"
                style={styles.nameInput}
                maxLength={20}
              />
              <Pressable
                style={[styles.inlineBtn, styles.confirm]}
                onPress={saveName}
              >
                <Text style={styles.inlineBtnTxt}>확인</Text>
              </Pressable>
              <Pressable
                style={[styles.inlineBtn, styles.cancel]}
                onPress={cancelEdit}
              >
                <Text style={styles.inlineBtnTxt}>취소</Text>
              </Pressable>
            </View>
          )}
        </View>

        <Pressable style={styles.actionCard} onPress={openPwModal}>
          <Text style={styles.actionTitle}>비밀번호 수정</Text>
          <Text style={styles.chevron}>›</Text>
        </Pressable>

        <Pressable
          style={[styles.actionCard, styles.danger]}
          onPress={handleLogout}
        >
          <Text style={[styles.actionTitle, styles.dangerTxt]}>로그아웃</Text>
        </Pressable>

        <Modal visible={pwModal} animationType="slide" transparent>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.modalWrap}
          >
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>비밀번호 수정</Text>
              <TextInput
                value={currPw}
                onChangeText={setCurrPw}
                placeholder="현재 비밀번호"
                secureTextEntry
                style={styles.input}
              />
              <TextInput
                value={newPw}
                onChangeText={setNewPw}
                placeholder="새 비밀번호 (6자 이상)"
                secureTextEntry
                style={styles.input}
              />
              <TextInput
                value={newPw2}
                onChangeText={setNewPw2}
                placeholder="새 비밀번호 확인"
                secureTextEntry
                style={styles.input}
              />

              <View style={styles.modalBtns}>
                <Pressable
                  style={[styles.btn, styles.btnGhost]}
                  onPress={() => setPwModal(false)}
                >
                  <Text style={styles.btnGhostTxt}>취소</Text>
                </Pressable>
                <Pressable
                  style={[styles.btn, styles.btnPrimary]}
                  onPress={submitPassword}
                >
                  <Text style={styles.btnPrimaryTxt}>변경</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </GradientScreenWrapper>
  );
}

const CARD_BG = "#ffffff";
const ACCENT = "#2F7AF8";
const BORDER = "rgba(0,0,0,0.08)";
const DANGER = "#FF3B30";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  headerCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: BORDER,
  },
  avatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E9EEF9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  name: { fontSize: 22, fontWeight: "700", color: "#111" },
  nameInput: {
    flex: 1,
    backgroundColor: "#F6F8FF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: BORDER,
    fontSize: 18,
  },
  inlineBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#E7EEFF",
    marginLeft: 10,
  },
  inlineBtnTxt: { color: "#0F58F8", fontWeight: "600" },
  confirm: { backgroundColor: "#DCE7FF" },
  cancel: { backgroundColor: "#F0F3FA" },

  actionCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionTitle: { fontSize: 16, fontWeight: "600", color: "#111" },
  chevron: { fontSize: 22, color: "#9AA3B2" },

  danger: { borderColor: "rgba(255,59,48,0.18)" },
  dangerTxt: { color: DANGER },

  modalWrap: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  input: {
    backgroundColor: "#F6F8FF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: BORDER,
    fontSize: 16,
    marginBottom: 10,
  },
  modalBtns: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 6,
  },
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10 },
  btnGhost: { backgroundColor: "#EEF2FF" },
  btnGhostTxt: { color: "#2A2F3A", fontWeight: "600" },
  btnPrimary: { backgroundColor: ACCENT },
  btnPrimaryTxt: { color: "#fff", fontWeight: "700" },
});
