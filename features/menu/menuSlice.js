import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backApi } from "../../utils/api";

export const getMenu = createAsyncThunk(
  "menu",
  async (_, { rejectWithValue }) => {
    try {
      const res = await backApi.get("/menu");
      return res.data.menuList;
    } catch (error) {
      return rejectWithValue(error.error);
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
      });
  },
});

export default menuSlice.reducer;
