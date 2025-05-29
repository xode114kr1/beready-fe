import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    isAdmin: false,
  },
  reducers: {
    login(state) {
      state.isLogin = true;
      state.isAdmin = false;
    },
    adminLogin(state) {
      state.isLogin = true;
      state.isAdmin = true;
    },
    logout(state) {
      state.isLogin = false;
      state.isAdmin = false;
    },
  },
});

export const { login, logout, adminLogin } = userSlice.actions;
export default userSlice.reducer;
