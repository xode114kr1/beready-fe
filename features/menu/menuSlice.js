import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backApi, fastApi } from "../../utils/api";

export const getMenu = createAsyncThunk(
  "menu",
  async (_, { rejectWithValue }) => {
    try {
      const res = await backApi.get("/menu");
      return res.data.menuList;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

export const createMenu = createAsyncThunk(
  "post/menu",
  async ({ newMenu, hasFile }, { rejectWithValue }) => {
    try {
      const res = await backApi.post("/menu", newMenu, {
        headers: hasFile
          ? { "Content-Type": "multipart/form-data" }
          : undefined,
      });

      return res.data;
    } catch (error) {
      console.error("메뉴 생성 오류 :", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateMenu = createAsyncThunk(
  "put/menu",
  async ({ id, editMenu, hasFile }, { rejectWithValue }) => {
    try {
      const res = await backApi.put(`/menu/${id}`, editMenu, {
        headers: hasFile
          ? { "Content-Type": "multipart/form-data" }
          : undefined,
      });

      return res.data;
    } catch (error) {
      console.error("메뉴 수정 오류 :", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuList: null,
    categoryList: [],
    menuByCategory: {},
    menuCount: 0,
    isLoading: false,
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenu.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";

        const menus = action.payload;
        state.menuList = menus;
        state.menuCount = menus.length;

        const categorySet = new Set();
        categorySet.add("전체");
        const grouped = menus.reduce((acc, item) => {
          const { category, name } = item;
          categorySet.add(category);
          if (!acc[category]) acc[category] = [];
          acc[category].push(name);
          return acc;
        }, {});
        state.categoryList = Array.from(categorySet);
        state.menuByCategory = grouped;
      })
      .addCase(getMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMenu.fulfilled, (state) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMenu.fulfilled, (state) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default menuSlice.reducer;
