import "dotenv/config";

export default ({ config }) => ({
  ...config,
  name: "beready-fe",
  slug: "beready-fe",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: { supportsTablet: true },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
  },
  platforms: ["ios", "android"],

  runtimeVersion: { policy: "sdkVersion" },
  updates: {
    url: "https://u.expo.dev/c05012a1-77e5-4f74-9fbf-825ca3800ba5", // projectId 기반
  },
  extra: {
    EXPRESS_DEPLOY_URL: process.env.EXPRESS_DEPLOY_URL,
    FASTAPI_LOCAL_URL:
      process.env.FASTAPI_LOCAL_URL ?? "http://192.168.0.138:8000/api/",
    eas: { projectId: "c05012a1-77e5-4f74-9fbf-825ca3800ba5" },
  },
});
