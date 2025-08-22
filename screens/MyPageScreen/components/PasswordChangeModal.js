import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  TouchableNativeFeedback,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../../features/user/userSlice";

const CARD_BG = "#ffffff";
const ACCENT = "#2F7AF8";
const BORDER = "rgba(0,0,0,0.08)";

export default function PasswordChangeModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const [currPw, setCurrPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPw2, setNewPw2] = useState("");

  useEffect(() => {
    if (visible) {
      setCurrPw("");
      setNewPw("");
      setNewPw2("");
    }
  }, [visible]);

  const handleSubmit = async () => {
    if (!currPw || !newPw) {
      Alert.alert("입력 필요", "현재/새 비밀번호를 모두 입력해 주세요.");
      return;
    }
    if (newPw !== newPw2) {
      Alert.alert("오류", "새 비밀번호가 일치하지 않습니다");
      return;
    }

    try {
      await dispatch(
        updatePassword({ oldPassword: currPw, newPassword: newPw })
      ).unwrap();
      onClose();
      Alert.alert("완료", "비밀번호가 변경되었습니다.");
    } catch (e) {
      Alert.alert("실패", "비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableNativeFeedback onPress={Keyboard.dismiss} accessible={false}>
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
              placeholderTextColor="#4B5563"
              secureTextEntry
              style={styles.input}
              returnKeyType="next"
              autoCapitalize="none"
            />
            <TextInput
              value={newPw}
              onChangeText={setNewPw}
              placeholder="새 비밀번호"
              placeholderTextColor="#4B5563"
              secureTextEntry
              style={styles.input}
              returnKeyType="next"
              autoCapitalize="none"
            />
            <TextInput
              value={newPw2}
              onChangeText={setNewPw2}
              placeholder="새 비밀번호 확인"
              placeholderTextColor="#4B5563"
              secureTextEntry
              style={styles.input}
              returnKeyType="done"
              autoCapitalize="none"
              onSubmitEditing={handleSubmit}
            />

            <View style={styles.modalBtns}>
              <Pressable
                style={[styles.btn, styles.btnGhost]}
                onPress={onClose}
              >
                <Text style={styles.btnGhostTxt}>취소</Text>
              </Pressable>

              <Pressable
                style={[styles.btn, styles.btnPrimary]}
                onPress={handleSubmit}
              >
                <Text style={styles.btnPrimaryTxt}>변경</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableNativeFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrap: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  modalCard: {
    backgroundColor: CARD_BG,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  modalBtns: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  btn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnGhost: {
    backgroundColor: "#F3F4F6",
  },
  btnPrimary: {
    backgroundColor: ACCENT,
  },
  btnGhostTxt: {
    color: "#111827",
    fontWeight: "600",
  },
  btnPrimaryTxt: {
    color: "white",
    fontWeight: "700",
  },
});
