import { View, StyleSheet, Text } from "react-native";
import MenuCard from "./components/MenuCard";
import GradientScreenWrapper from "../../components/GradientScreenWrapper";
import { ScrollView } from "react-native-gesture-handler";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../features/menu/menuSlice";
import Spinner from "../../components/Spinner";

export default function MenuScreen() {
  const dispatch = useDispatch();
  const { menuList, error, isLoading } = useSelector((state) => state.menu);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const categoryMap = {
    분식: "분식",
    양식: "양식",
    일품: "일품",
  };

  const getMenusByCategory = (category) => {
    return (
      menuList?.filter(
        (menu) => menu.category === category && menu.status !== "중단"
      ) || []
    );
  };

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  // useFocusEffect(
  //   useCallback(() => {
  //     dispatch(getMenu());
  //   }, [dispatch])
  // );

  return (
    <GradientScreenWrapper variant="green">
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Spinner size={64} thickness={6} />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {Object.entries(categoryMap).map(([key, label]) => {
              const categoryMenus = getMenusByCategory(key);

              if (categoryMenus.length === 0) return null;

              return (
                <View key={key} style={styles.categorySection}>
                  <Text style={styles.categoryTitle}>{label}</Text>
                  <View style={styles.grid}>
                    {categoryMenus.map((menu, index) => (
                      <MenuCard
                        key={menu._id ?? index}
                        menu={menu}
                        onPress={() =>
                          navigation.navigate("MenuDetail", { menu })
                        }
                      />
                    ))}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    </GradientScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 32,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
});
