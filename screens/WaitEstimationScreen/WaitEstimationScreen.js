import { View, Text, StyleSheet, Dimensions } from "react-native";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = width * 0.85;

export default function WaitEstimationScreen() {
  return (
    <GradientScreenWrapper>
      <View style={styles.container}>
        <LinearGradient
          colors={["#A7D8FF", "#F5FAFF"]}
          style={styles.waiting_box}
        >
          <Text style={styles.time}>04:03</Text>
          <Text style={styles.people}>
            대기인원 : <Text style={styles.peopleStrong}>05명</Text>
          </Text>
        </LinearGradient>
      </View>
    </GradientScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
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
  time: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#3B63C4",
  },
  people: {
    marginTop: 8,
    fontSize: 18,
    color: "#333",
  },
  peopleStrong: {
    color: "#3B63C4",
    fontWeight: "bold",
  },
});
