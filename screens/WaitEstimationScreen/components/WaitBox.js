import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = width * 0.85;

export default function WaitBox({ waitTime, peopleCount, theme }) {
  const gradientColors =
    theme === "다래락" ? ["#C8FACC", "#f1fff5ff"] : ["#A7D8FF", "#F5FAFF"];
  const styles = theme === "다래락" ? green_styles : blue_styles;

  return (
    <LinearGradient colors={gradientColors} style={styles.waiting_box}>
      <Text style={styles.time}>{waitTime}</Text>
      <Text style={styles.people}>
        대기인원 :{" "}
        <Text style={styles.peopleStrong}>
          {String(peopleCount).padStart(2, "0")}명
        </Text>
      </Text>
    </LinearGradient>
  );
}

const styles_common = {
  waiting_box: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#DFDFDF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  people: {
    marginTop: 8,
    fontSize: 18,
  },
};

const green_styles = StyleSheet.create({
  ...styles_common,
  time: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#3CB371", // 초록
  },
  peopleStrong: {
    color: "#3CB371",
    fontWeight: "bold",
  },
});

const blue_styles = StyleSheet.create({
  ...styles_common,
  time: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#3B63C4", // 파랑
  },
  peopleStrong: {
    color: "#3B63C4",
    fontWeight: "bold",
  },
});
