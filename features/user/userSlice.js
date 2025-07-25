import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backApi } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const register = createAsyncThunk(
  "user/register",
  async ({ name, password, email }, { rejectWithValue }) => {
    try {
      const res = await backApi.post("/user", {
        name,
        password,
        email,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await backApi.post("/auth/login", { email, password });
      const { token, user } = res.data;
      await AsyncStorage.setItem("token", token);
      return user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLogin: false,
    isAdmin: false,
    error: "",
    isLoading: false,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isLogin = false;
      state.isAdmin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.error = "";
        state.isLoading = false;
        state.user = action.payload;
        state.isLogin = true;
        if (action.payload.level === "admin") state.isAdmin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
