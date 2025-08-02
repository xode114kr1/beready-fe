import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";
import WaitBox from "./components/WaitBox";
import { useDispatch, useSelector } from "react-redux";
import {
  getEstimationdalelac,
  getEstimationLilac,
} from "../../features/estimation/estimationSlice";

export default function WaitEstimationScreen() {
  const dispatch = useDispatch();
  const { time, peopleCount } = useSelector((state) => state.estimation);
  console.log(time, peopleCount);
  const [theme, setTheme] = useState("라일락");
  const [selectedCategory, setSelectedCategory] = useState("일식");

  const isDarerak = theme === "다래락";
  useEffect(() => {
    dispatch(getEstimationLilac());
  }, [dispatch]);

  useEffect(() => {
    if (theme == "라일락") {
      dispatch(getEstimationLilac());
    } else if (theme == "다래락") {
      dispatch(getEstimationdalelac(selectedCategory));
    }
  }, [theme, selectedCategory]);

  return (
    <GradientScreenWrapper>
      <View style={styles.container}>
        <View style={styles.themeToggle}>
          <TouchableOpacity
            style={[
              styles.themeButton,
              theme === "라일락" && styles.selectedTheme_lilac,
            ]}
            onPress={() => setTheme("라일락")}
          >
            <Text
              style={[
                styles.themeText,
                theme === "라일락" && styles.selectedThemeText,
              ]}
            >
              라일락
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.themeButton,
              theme === "다래락" && styles.selectedTheme_dalelac,
            ]}
            onPress={() => setTheme("다래락")}
          >
            <Text
              style={[
                styles.themeText,
                theme === "다래락" && styles.selectedThemeText,
              ]}
            >
              다래락
            </Text>
          </TouchableOpacity>
        </View>

        <WaitBox waitTime={time} peopleCount={peopleCount} theme={theme} />

        <View
          style={[
            styles.buttonContainer,
            { opacity: isDarerak ? 1 : 0 },
            !isDarerak && { pointerEvents: "none" }, // 클릭 방지
          ]}
        >
          {["일식", "한식", "일품"].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedCategory === category && styles.selectedButtonText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </GradientScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  themeToggle: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  themeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#EDEDED",
    borderRadius: 20,
  },
  selectedTheme_lilac: {
    backgroundColor: "#3B63C4",
  },
  selectedTheme_dalelac: {
    backgroundColor: "#3bc459ff",
  },
  themeText: {
    color: "#000",
    fontWeight: "600",
  },
  selectedThemeText: {
    color: "#ffffff",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 24,
    gap: 12,
  },
  categoryButton: {
    backgroundColor: "#e0ffe7ff",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: "#3bc469ff",
  },
  buttonText: {
    fontSize: 16,
    color: "#3bc480ff",
    fontWeight: "600",
  },
  selectedButtonText: {
    color: "white",
  },
});
