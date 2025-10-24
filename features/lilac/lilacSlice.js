import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fastApi } from "../../utils/api";

export const getLilacTodayMenu = createAsyncThunk(
  "lilac/menu/today",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fastApi.get("/lilac/menu/today");
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

export const getLilacMenuList = createAsyncThunk(
  "lilac/menu",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fastApi.get("/lilac/menu");
      return res.data.days;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

const lilacSlice = createSlice({
  name: "lilac",
  initialState: {
    menuList: null,
    todayMenu: null,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLilacMenuList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getLilacMenuList.fulfilled, (state, action) => {
        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
        const todayMenu = action.payload.find((menu) => menu.date == todayStr);

        state.isLoading = false;
        state.menuList = action.payload;
        state.todayMenu = todayMenu;
        state.error = "";
      })
      .addCase(getLilacMenuList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getLilacTodayMenu.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getLilacTodayMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todayMenu = action.payload;
        state.error = "";
      })
      .addCase(getLilacTodayMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default lilacSlice.reducer;
