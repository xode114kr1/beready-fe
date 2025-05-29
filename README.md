# 🍽️ 위드센터 식당 대기 앱

React Native 기반으로 제작된 학식당 대기 인원 예측 및 식단 확인 모바일 앱입니다.

## 주요 기능

- 실시간 식당 대기 인원 확인 (카메라 연동 예정)
- 식단표 확인 (하루/주 단위)
- 사용자 리뷰 열람
- 로그인 UI

## 기술 스택

- React Native (Expo)
- Redux Toolkit
- React Navigation
  - @react-navigation/native
  - @react-navigation/bottom-tabs
  - @react-navigation/native-stack
- Axios
- Linear Gradient (`expo-linear-gradient`)
- TabView (`react-native-tab-view`)
- Icons (`@expo/vector-icons`)

## 설치 및 실행

```bash
# Expo CLI 설치 (최초 1회)
npm install -g expo-cli

# 프로젝트 생성
npx create-expo-app myApp --template blank

# 의존성 설치
npm install
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install @reduxjs/toolkit react-redux axios react-native-tab-view
npx expo install expo-linear-gradient @expo/vector-icons

# 실행
npx expo start
```
