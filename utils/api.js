import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { EXPRESS_DEPLOY_URL, FASTAPI_DEPLOY_URL } = Constants.expoConfig.extra;

export const backApi = axios.create({
  baseURL: EXPRESS_DEPLOY_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

backApi.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log("토큰 로딩 실패 : ", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fastApi = axios.create({
  baseURL: FASTAPI_DEPLOY_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
